'use server';
//  -- 有关 用户 模块的 服务器端- controller 部分  逻辑
import UserRepository from '@/app/modules/user/server';
import { registerDto } from './dto/register.dto';

export async function getUserByUserName(username: string) {
  return await UserRepository.getUserByName(username);
}

// 获取当前第一个用户信息

export async function getFirstUser() {
  return await UserRepository.getFirstUser();
}

// 存入用户信息
export async function register(data: registerDto) {
    //  保证用户名/邮箱不重复 ：

  // 处理密码加密问题 ：
  const password 
     
  const res = await UserRepository.insertUser(data);
}
