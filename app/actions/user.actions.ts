'use server';
//  -- 有关 用户 模块的 服务器端- controller 部分  逻辑
import UserRepository from '@/lib/modules/user/server';

export async function getUser() {
  return await UserRepository.getUsers();
}

// 获取当前第一个用户信息

export async function getFirstUser() {
  return await UserRepository.getFirstUser();
}
