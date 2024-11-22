import { JWT_SECRET } from 'config';
import { sign, verify } from 'jsonwebtoken';
import { User } from 'types';

const createAccessToken = (user: User) => sign(user, JWT_SECRET, { expiresIn: '1h' });
const createRefreshToken = (user: User) => sign(user, JWT_SECRET, { expiresIn: '24h' });

const verifyToken = (token: string) => {
	try {
		const { id, username, email, avatar } = verify(token, JWT_SECRET) as User;
		return { id, username, email, avatar };
	} catch (err) {
		throw new Error('Invalid token');
	}
};

export { createAccessToken, createRefreshToken, verifyToken };
