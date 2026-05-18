'use server';

import UserRepository from '@/app/modules/user/server';
import { RegisterSchema, registerDto } from './dto/register.dto';
import bcrypt from 'bcryptjs';

export async function getUserByUserName(username: string) {
  return await UserRepository.getUserByName(username);
}

// 获取当前第一个用户信息
export async function getFirstUser() {
  return await UserRepository.getFirstUser();
}

// 注册用户
// 类型分离 -- 不包含 confirm
export async function Register(data: registerDto) {
  // 1. Zod 验证数据
  const parsed = RegisterSchema.safeParse(data);
  if (!parsed.success) {
    return { error: '参数校验失败', details: parsed.error.issues };
  }

  const { username, email, password } = parsed.data;

  // 2. 检查用户名是否已存在
  const existingUser = await UserRepository.getUserByName(username);
  if (existingUser) {
    return { error: '用户名已被注册' };
  }

  // 3. 检查邮箱是否已存在
  const existingEmail = await UserRepository.getUserByEmail(email);
  if (existingEmail) {
    return { error: '邮箱已被注册' };
  }

  // 4. 密码加密
  const passwordHash = await bcrypt.hash(password, 10);

  // 5. 插入用户（排除 confirmPassword）
  await UserRepository.insertUser({
    username,
    email,
    passwordHash,
  });

  return { success: true };
}

// 最终的收获是完整的实现数据收集 - 数据获取 - 完整可靠 