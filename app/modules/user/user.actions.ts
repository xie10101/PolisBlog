'use server';

import UserRepository from '@/app/modules/user/server';
import { RegisterSchema, registerDto } from './dto/register.dto';
import bcrypt from 'bcryptjs';
import { actionHandler } from '@/lib/api-handler';

export async function getUserByUserName(username: string) {
  return await UserRepository.getUserByName(username);
}

// // 获取当前第一个用户信息
// export async function getFirstUser() {
//   return await UserRepository.getFirstUser();
// }

export async function Register(data: registerDto) {
  // 1. Zod 验证数据
  const parsed = RegisterSchema.safeParse(data);
  if (!parsed.success) {
    // 兜底
    throw new Error('参数校验失败');
  }

  const { username, email, password } = parsed.data;

  // 2. 检查用户名是否已存在
  const existingUser = await UserRepository.getUserByName(username);
  if (existingUser) {
    throw new Error('用户名已经存在');
  }

  // 3. 检查邮箱是否已存在
  const existingEmail = await UserRepository.getUserByEmail(email);
  if (existingEmail) {
    throw new Error('邮箱已被注册');
  }

  // 4. 密码加密
  const passwordHash = await bcrypt.hash(password, 10);

  // 5. 插入用户（排除 confirmPassword）
  await UserRepository.insertUser({
    username,
    email,
    passwordHash,
  });

  return { success: true, message: '注册成功' }; // 我在胡乱返回
}

export async function RegisterHandler(data: registerDto) {
  const res = await actionHandler(() => Register(data));
  return res;
}
