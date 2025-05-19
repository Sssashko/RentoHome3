import { Request, Response } from 'express'
import { SERVER_URL } from 'config'
import { createImage } from 'database/queries/images'
import { updateHome } from 'database/queries/homes'
import deleteImage from 'database/queries/images/delete image'
import { deleteFiles } from 'helpers'
import { Home } from 'types'

const handleUpdateHome = async (req: Request, res: Response) => {
  try {
    // debug incoming data
    console.log('Updating home:', req.body.home, req.body.removedImages, req.files)

    const home = JSON.parse(req.body.home) as Home

    // 1) save new image files and add to home.images
    if (Array.isArray(req.files)) {
      for (const file of req.files) {
        const name = file.filename
        const originalName = file.originalname
        const url = `${SERVER_URL}/images/${name}`

        const index = home.images?.length || 0
        await createImage(name, originalName, url, null, home.id, index)
        
        home.images = home.images || []
        home.images.push({ name, originalName, url })
      }
    }

    // 2) delete images the client requested to remove
    const removed: string[] = JSON.parse(req.body.removedImages ?? '[]')
    for (const url of removed) {
      const [result] = await deleteImage(url) as any
      if (result.affectedRows === 0) {
        console.warn('No DB row for', url)
      }
      const fileName = url.split('/').pop()
      if (fileName) {
        try {
          await deleteFiles(fileName)  // remove actual file
        } catch (err: any) {
          if (err.code !== 'ENOENT') throw err
          console.warn('File already deleted', fileName)
        }
      }
    }
    // remove deleted URLs from home.images before updating FK constraints (ierobežojumi)
    home.images = home.images.filter(img => !removed.includes(img.url))

    // 3) update home record itself
    await updateHome(home)

    res.status(200).json(home)
  } catch (error) {
    console.error('Error while updating home', error)
    res.status(500).json({ success: false, message: 'Error while updating home' })
  }
}

export default handleUpdateHome
