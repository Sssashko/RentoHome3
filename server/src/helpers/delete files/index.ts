import { SERVER_URL } from 'config';
import { unlink } from 'fs/promises';
import { join, normalize } from 'path';

const deleteFiles = async (...urls: string[]) => {
	await Promise.all(
		urls.map((url) => {
			const fileName = url.replace(`${SERVER_URL}/images/`, '');
			const normalizedFileName = normalize(fileName).replace(/^(\.\.(\/|\\|$))*/, ''); // Prevent path traversal
			const filePath = join(__dirname, '..', '..', '..', 'images', normalizedFileName);
			
			if (!filePath.startsWith(join(__dirname, '..', '..', '..', 'images'))) {
				throw new Error('Invalid file path');
			}
			
			return unlink(filePath);
		})
	);
};

export default deleteFiles;
