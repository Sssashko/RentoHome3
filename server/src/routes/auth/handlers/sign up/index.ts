import { Request, Response } from 'express'
import path from 'path'
import fs from 'fs'
import { hash } from 'bcrypt'
import pool from 'database'
import createUser from 'database/queries/users/create user'
import createImage from 'database/queries/images/create image'
import { SERVER_URL } from 'config'
import { deleteFiles } from 'helpers'

// Default avatar filename when user doesn't upload one
const DEFAULT_AVATAR_FILENAME = 'guest.png'

// Path to public image folder
const IMAGES_DIR = path.join(__dirname, '..', '..', '..', 'public', 'images')

const handleSignUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body

    // Check if a user with this email already exists
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email])
    if ((existing as any[]).length > 0) {
      return res.status(409).json({ message: 'Email already in use' })
    }

    // Determine avatar filename: uploaded one or fallback to default
    let filename: string
    if (req.file) {
      filename = req.file.filename
    } else {
      filename = DEFAULT_AVATAR_FILENAME
      const defPath = path.join(IMAGES_DIR, filename)
      if (!fs.existsSync(defPath)) {
        console.warn(`[SignUp] Default avatar not found at ${defPath}`)
      }
    }

    // Generate full public avatar URL
    const avatarUrl = `${SERVER_URL}/images/${filename}`

    // Hash the user's password before saving
    const hashed = await hash(password, 10)

    // Insert the user into the database
    const userId = await createUser({
      username,
      email,
      avatar: avatarUrl,
      password: hashed
    })

    // If avatar was uploaded manually, save it into images table too
    if (req.file) {
      await createImage(
        filename,
        req.file.originalname,
        avatarUrl,
        userId
      )
    }

    // Return user info (excluding password)
    res.status(201).json({
      id: userId,
      username,
      email,
      avatar: avatarUrl
    })
  } catch (err) {
    console.error('[handleSignUp] Error:', err)
    res.status(500).json({ message: 'Sign up failed' })
  }
}

export default handleSignUp
