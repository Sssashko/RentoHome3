import { SERVER_URL } from 'config';
import { updateUser } from 'database/queries/users';
import { createImage, deleteImage } from 'database/queries/images';
import { Request, Response } from 'express';
import { deleteFiles } from 'helpers';
import bcrypt from 'bcrypt';

const handleUpdateUser = async (req: Request, res: Response) => {
    try {
      console.log('🛠️ handleUpdateUser called with body:', req.body);
      console.log('🖼️ Uploaded files:', req.files);

      const user = req.body;
      console.log('✅ Parsed user:', user);

      const updates: Partial<{ username: string; email: string; password?: string; avatar?: string }> = {
        username: user.username,
        email: user.email
      };

      // Обновляем пароль, только если он передан
      if (user.password) {
        console.log('🔑 Hashing password...');
        updates.password = await bcrypt.hash(user.password, 10);
      }

      // Обновляем аватар, если загружен новый
      if (Array.isArray(req.files) && req.files.length > 0) {
        console.log('🖼️ New avatar uploaded:', req.files[0]);

        const file = req.files[0];
        const fileName = file.filename;
        const url = `${SERVER_URL}/avatars/${file.filename}`;

        await createImage(fileName, file.originalname, url, user.id);

        if (user.avatar) {
          console.log('❌ Deleting old avatar:', user.avatar);
          await deleteImage(user.avatar);
          await deleteFiles(user.avatar);
        }

        updates.avatar = url;
      }

      console.log('🔄 Updating user in DB:', updates);
      await updateUser(user.id, updates);

      res.status(200).json({ ...user, ...updates });
    } catch (error) {
      console.error('❌ Error in handleUpdateUser:', error);
      res.status(500).json('An error occurred while updating user');
    }
};

export default handleUpdateUser;
