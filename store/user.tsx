import { create } from 'zustand';

interface UserInfo {
  id: string | null;
  email: string | null;
  avatar: string | null;
  username: string | null;
  bio: string | null;
}

interface UserInfoStore extends UserInfo {
  // 设置/更新用户信息（支持部分更新）
  setInfo: (info: Partial<UserInfo>) => void;
  // 清空用户信息（恢复初始状态）
  clearInfo: () => void;
}

const initialState: UserInfo = {
  id: null,
  email: null,
  avatar: null,
  username: null,
  bio: null,
};

const useUserInfoStore = create<UserInfoStore>(set => ({
  ...initialState,

  setInfo: info =>
    set(state => ({
      ...state,
      ...info,
    })),

  clearInfo: () => set(initialState),
}));

export default useUserInfoStore;

// persist 中间件的介绍

//登录状态追踪 ( isLoggedIn ) ：

// 新增了 isLoggedIn 属性。
//自动化逻辑 ：在调用 setInfo 时，系统会自动判断是否有 id 传入，从而自动更新登录状态。
