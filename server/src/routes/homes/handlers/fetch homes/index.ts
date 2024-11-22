import { fetchHomes } from 'database/queries/homes';
import { Request, Response } from 'express';

const handleFetchHomes = async (req: Request, res: Response) => {
  try {
    const homes = await fetchHomes();
    res.status(200).json(homes);
  } catch (error) {
    console.log('Error while fetching homes', error);
    res.status(500).json('Error while fetching homes');
  }
};

export default handleFetchHomes;
