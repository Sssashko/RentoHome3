import { hash } from 'bcrypt'
import { SERVER_URL } from 'config'
import { storeRefreshToken } from 'database/queries/refresh tokens'
import { createUser, fetchUserByEmail } from 'database/queries/users'
import { Request, Response } from 'express'
import { createAccessToken, createRefreshToken } from 'helpers/jwt'

const handleSignUp = async (req: Request, res: Response) => {
	try {
		const username = req.body.username as string
		const email = req.body.email as string
		const password = await hash(req.body.password, 10)

		const avatar = `${SERVER_URL}/images/${req.file ? req.file.filename : 'guest.png'}`

		const userExists = await fetchUserByEmail(email)

		if (userExists) {
			return res.status(409).json('User already exists')
		}

		const id = await createUser({ username, email, avatar, password })

		const user = { id, username, email, avatar, password }

		const accessToken = createAccessToken(user)
		const refreshToken = createRefreshToken(user)

		res.cookie('accessToken', accessToken, {
			maxAge: 1000 * 60 * 60 * 24,
			secure: true,
			httpOnly: true
		})
		await storeRefreshToken(refreshToken, user.id)

		res.status(200).json(user)
	} catch (error) {
		console.log('Error while signing up', error)
		res.status(500).json('Error while signing up')
	}
}

export default handleSignUp
