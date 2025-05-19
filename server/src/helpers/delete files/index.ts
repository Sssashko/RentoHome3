import { SERVER_URL } from 'config'
import { unlink } from 'fs/promises'
import { join, normalize } from 'path'

/**
 * Delete one or more image files based on their public URLs.
 * - Strips the SERVER_URL prefix to get the stored filename
 * - Normalizes the path and prevents path traversal
 * - Removes each file from the local `images/` directory
 */
const deleteFiles = async (...urls: string[]) => {
  await Promise.all(
    urls.map((url) => {
      // Remove the base URL so only the filename remains
      const fileName = url.replace(`${SERVER_URL}/images/`, '')

      // Normalize and strip any "../" to avoid escaping the images folder
      const normalizedFileName = normalize(fileName).replace(/^(\.\.(\/|\\|$))*/, '')
      const imagesDir = join(__dirname, '..', '..', '..', 'images')
      const filePath = join(imagesDir, normalizedFileName)

      // Double-check we stayed inside the images directory
      if (!filePath.startsWith(imagesDir)) {
        throw new Error('Invalid file path')
      }

      // Delete the physical file
      return unlink(filePath)
    })
  )
}

export default deleteFiles
