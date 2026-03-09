// 一个用户信息展示卡片
import Image from "next/image";


// 用户信息的基础类型定义 
export type User = {
  id: number;
  name: string;
  email: string;
  avatarUrl: string; 
}

export function User({user}: {user?: User} = {user: {id: 0, name: "User", email: "Email not available", avatarUrl: ""}}) { 
  // const { name, email, avatarUrl } = user || {id: 0, name: "User", email: "Email not available", avatarUrl: ""};
  // 一般不进行以上结构的处理 

  return (
    <>
    <div className="w-full flex items-center h-full">
      {/*  用一个头像占位符替代  */}
        <Image src="/globe.svg" width={30} height={30} alt="avatar" className="rounded-full" />
        <div className="flex flex-col justify-center ml-4">
         <h2 className="text-l font-bold">{user?.name||"User"}</h2> 
         <p className="text-sm text-gray-500">{user?.email||"Email not available"}</p>
        </div>
    </div>
    </>
  )
}