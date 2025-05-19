import { Request, Response } from 'express'
import { SERVER_URL } from 'config'
import { createHome } from 'database/queries/homes'
import { createImage } from 'database/queries/images'
import { Home, Image, User } from 'types'

const handleCreateHome = async (req: Request, res: Response) => {
  try {
    // 1) get authenticated user from middleware
    const user = req.user as User
    // 2) parse (analizē) home data (sent as JSON string in multipart/form-data)
    const home = JSON.parse(req.body.home) as Home

    // 3) insert home record, get its new ID
    const home_id = await createHome(home, user.id)

    // 4) save uploaded images and collect their metadata
    const uploaded: Omit<Image, 'id'>[] = []
    if (Array.isArray(req.files)) {
      await Promise.all(
        req.files.map(async (file, index) => {
          const name = file.filename
          const originalName = file.originalname
          const url = `${SERVER_URL}/images/${name}`

          // insert into images table
          await createImage(name, originalName, url, null, home_id, index)
          uploaded.push({ name, originalName, url })
        })
      )
    }

    // 5) respond with full home object including new ID, user, images
    const createdHome = { ...home, id: home_id, user, images: uploaded }
    res.status(200).json(createdHome)
  } catch (error) {
    console.error('Error while creating home', error)
    res.status(500).json('Error while creating home')
  }
}

export default handleCreateHome
