import { Request, Response } from 'express'
import { fetchHomes } from 'database/queries/homes'

const handleFetchHomes = async (_req: Request, res: Response) => {
  try {
    // retrieve (dabūt) all homes with nested user & images
    const homes = await fetchHomes()
    res.status(200).json(homes)
  } catch (error) {
    console.error('Error while fetching homes', error)
    res.status(500).json('Error while fetching homes')
  }
}

export default handleFetchHomes
