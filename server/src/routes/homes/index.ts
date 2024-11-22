import { Router } from 'express'
import { upload } from 'helpers'
import { authenticate } from 'middleware'

import { handleCreateHome, handleDeleteHome, handleFetchHomes, handleUpdateHome } from './handlers'

const carsRouter = Router()

carsRouter.get('/', handleFetchHomes)

carsRouter.post('/', authenticate, upload.array('image'), handleCreateHome)
carsRouter.patch('/', authenticate, upload.array('image'), handleUpdateHome)

carsRouter.delete('/:id', authenticate, handleDeleteHome)

export default carsRouter