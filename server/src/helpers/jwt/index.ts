import { JWT_SECRET } from 'config';
import { sign, verify } from 'jsonwebtoken';
import { User } from 'types';

const createAccessToken = (user: User) =>
	sign(
		{ id: user.id, username: user.username, email: user.email, avatar: user.avatar, password: user.password }, 
		JWT_SECRET, 
		{ expiresIn: '1h' }
	);

const createRefreshToken = (user: User) => sign(user, JWT_SECRET, { expiresIn: '24h' });

const verifyToken = (token: string) => {
	try {
		const user = verify(token, JWT_SECRET) as User;
		console.log('Decoded User:', user); // <-- Добавь это
		return { id: user.id, username: user.username, email: user.email, avatar: user.avatar, password: user.password };
	} catch (err) {
		console.error('Invalid token:', err);
		throw new Error('Invalid token');
	}
};


export { createAccessToken, createRefreshToken, verifyToken };