'use server';

import { AuthorInfoRepository } from './authorInfo.server';
import { AuthorInfoDto } from './dto/authorInfo-update.dto';

export async function fetchAuthorInfo() {
  try {
    const data = await AuthorInfoRepository.getInfo();
    return { success: true, data };
  } catch (error) {
    console.error('获取博主信息失败:', error);
    return { success: false, error: '获取博主信息失败' };
  }
}

export async function updateAuthorInfo(id: number, data: AuthorInfoDto) {
  try {
    const result = await AuthorInfoRepository.updateInfo(id, data);
    return { success: true, data: result[0] };
  } catch (error) {
    console.error('更新博主信息失败:', error);
    return { success: false, error: '更新博主信息失败' };
  }
}
