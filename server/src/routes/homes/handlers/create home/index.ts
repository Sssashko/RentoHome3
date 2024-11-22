import { SERVER_URL } from 'config'
import { createHome } from 'database/queries/homes'
import { createImage } from 'database/queries/images'
import { Request, Response } from 'express'
import { Home, Image, User } from 'types'

const handleCreateHome = async (req: Request, res: Response) => {
	try {
		const user = req.user as User
		const home = JSON.parse(req.body.home) as Home

		const home_id = await createHome(home, user.id)

		const uploaded: Omit<Image, 'id'>[] = []

		if (Array.isArray(req.files)) {
			await Promise.all(
				req.files.map(async (file) => {
					const fileName = file.filename
					const originalName = file.originalname

					const url = `${SERVER_URL}/images/${file.filename}`

					await createImage(fileName, originalName, url, home_id)
					uploaded.push({ name: fileName, originalName, url })
				})
			)
		}

		const createdHome = { ...home, id: home_id, user, images: uploaded }

		res.status(200).json(createdHome)
	} catch (error) {
		console.log('Error while creating home', error)
		res.status(50).json('Error while creating home')
	}
}

export default handleCreateHome
