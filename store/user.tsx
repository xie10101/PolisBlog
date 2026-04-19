//保存用户个人信息
import { create } from 'zustand';

type userInfoStore = {
  id: string | null;
  email: string | null;
  avatar: string | null;
  username: string | null;
  bio: string | null;
  setInfo: (info: Omit<userInfoStore, 'setInfo'>) => void;
  // Partial 会把各个字段类型设置为可选的
};
const useUserInfoStore = create<userInfoStore>(set => ({
  id: '550e8400-e29b-41d4-a716-446655440000',
  email: '',
  avatar: '',
  username: '',
  bio: '',
  setInfo: (info: Partial<userInfoStore>) =>
    set(state => ({ ...state, ...info })),
}));
//  可以为null - 展示时默认使用空字符串 兜底

/**
 * setInfo: (info: Partial<userInfoStore>) =>
  set((state) => ({ ...state, ...info }))
 */

export default useUserInfoStore;

/**
 *  使用错误 ： 
 * const useBearStore = create((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
  }))
 * 
 */
