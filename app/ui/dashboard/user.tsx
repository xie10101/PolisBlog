// 一个用户信息展示卡片
import Image from 'next/image';
import { auth } from '@/app/modules/auth';
import UserRepository from '@/app/modules/user/server';

// 用户信息的基础类型定义
export type User = {
  id: number;
  username: string;
  email: string;
  avatarUrl: string;
};

export async function User() {
  // 从server Action 中获取用户信息
  const session = await auth();
  const user = session?.user;
  const userId = user?.id || '0';
  const userInfo = await UserRepository.getUserById(userId);
  return (
    <>
      <div className="flex h-full w-full items-center">
        {/*  用一个头像占位符替代  */}
        <Image
          src={userInfo?.avatar || '/globe.svg'}
          width={30}
          height={40}
          alt="avatar"
          className="rounded-full"
        />
        <div className="ml-2 flex flex-col justify-center">
          <h2 className="text-l font-bold">{userInfo?.username || 'User'}</h2>
          <p className="text-[12px] text-gray-500">
            {userInfo?.email || 'Email not available'}
          </p>
        </div>
      </div>
    </>
  );
}
