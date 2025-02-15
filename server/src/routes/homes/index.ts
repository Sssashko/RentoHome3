import { Router } from 'express'
import { upload } from 'helpers'
import { authenticate } from 'middleware'

import { handleCreateHome, handleDeleteHome, handleFetchHomes, handleUpdateHome } from './handlers'

const homesRouter = Router()

homesRouter.get('/', handleFetchHomes)

homesRouter.post('/', authenticate, upload.array('image'), handleCreateHome)
homesRouter.patch('/', authenticate, upload.array('image'), handleUpdateHome)

homesRouter.delete('/:id', authenticate, handleDeleteHome)

export default homesRouter