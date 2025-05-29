// 📄 src/services/userService.ts

import UserModel from '@/models/UserModel';

// Получить пользователя по кошельку
export async function getUserByWallet(wallet: string) {
  return await UserModel.findOne({ wallet });
}

// Обновить профиль пользователя (имя, аватар, цитата)
export async function updateUserProfile({ wallet, name, avatar, quote }) {
  const user = await UserModel.findOneAndUpdate(
    { wallet },
    { $set: { name, avatar, quote } },
    { new: true }
  );
  return user;
}

// Зарегистрировать нового пользователя (если не существует)
export async function registerUserIfMissing(wallet: string) {
  let user = await UserModel.findOne({ wallet });
  if (!user) {
    user = new UserModel({ wallet, createdAt: new Date() });
    await user.save();
  }
  return user;
}
