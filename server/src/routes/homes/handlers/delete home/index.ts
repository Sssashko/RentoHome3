import { Request, Response } from 'express'
import pool from 'database'
import { fetchRelatedImages, deleteRelatedImages } from 'database/queries/images'
import { deleteHome } from 'database/queries/homes'
import { deleteFiles } from 'helpers'

const handleDeleteHome = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    // 1) remove all comments and likes for this home
    await pool.query('DELETE FROM comments WHERE home_id = ?', [id])
    await pool.query('DELETE FROM likes WHERE home_id = ?', [id])

    // 2) fetch and delete related image records & files
    const images = (await fetchRelatedImages(id)) || []  // array of URLs
    await deleteRelatedImages(id)                        // remove DB rows
    if (images.length) {
      // strip URL to filename then delete files from disk
      const fileNames = images.map(url => url.split('/').pop() || '')
      await deleteFiles(...fileNames)
    }

    // 3) finally delete the home record
    await deleteHome(id)

    res.status(200).json({ success: true, message: 'Home deleted' })
  } catch (error) {
    console.error('Error while deleting home', error)
    res.status(500).json({ success: false, message: 'Error while deleting home' })
  }
}

export default handleDeleteHome
