'use server';

import { CategoryRepository } from '@/modules/category/category.server';
import {
  CreateCategoryDto,
  CreateCategorySchema,
} from '@/modules/category/dto/category-create.dto';
import {
  UpdateCategoryDto,
  UpdateCategorySchema,
} from '@/modules/category/dto/category-update.dto';
import { actionHandler } from '@/lib/api-handler';

// 获取所有分类
export async function getAllCategories() {
  return actionHandler(async () => {
    return await CategoryRepository.findAll();
  });
}

// 获取所有激活分类
export async function getActiveCategories() {
  return actionHandler(async () => {
    return await CategoryRepository.findAllActive();
  });
}

// 获取分类详情根据id
export async function getCategoryById(id: string) {
  return actionHandler(async () => {
    const category = await CategoryRepository.findById(id);
    if (!category) {
      throw new Error('分类不存在');
    }
    return category;
  });
}

// 获取分类详情根据slug
export async function getCategoryBySlug(slug: string) {
  return actionHandler(async () => {
    const category = await CategoryRepository.findBySlug(slug);
    if (!category) {
      throw new Error('分类不存在');
    }
    return category;
  });
}

// 创建分类
export async function createCategory(data: CreateCategoryDto) {
  return actionHandler(async () => {
    const validatedData = CreateCategorySchema.parse(data);

    const existing = await CategoryRepository.findBySlug(validatedData.slug);
    if (existing) {
      throw new Error('slug已存在');
    }

    return await CategoryRepository.create(validatedData);
  });
}

// 更新分类根据id
export async function updateCategory(data: UpdateCategoryDto) {
  return actionHandler(async () => {
    const validatedData = UpdateCategorySchema.parse(data);
    const { id, ...updateData } = validatedData;

    const existing = await CategoryRepository.findById(id);
    if (!existing) {
      throw new Error('分类不存在');
    }

    return await CategoryRepository.update(id, updateData);
  });
}
// 删除分类根据id
export async function deleteCategory(id: string) {
  try {
    const existing = await CategoryRepository.findById(id);
    if (!existing) {
      return { success: false, error: '分类不存在' };
    }

    await CategoryRepository.softDelete(id);
    return { success: true };
  } catch (error) {
    console.error('Delete category error:', error);
    return { success: false, error: '删除分类失败' };
  }
}
// 获取分类文章列表
export async function getCategoryPosts(categoryId: string) {
  try {
    const category = await CategoryRepository.findById(categoryId);
    if (!category) {
      return { success: false, error: '分类不存在' };
    }

    const posts = await CategoryRepository.getCategoryPosts(categoryId);
    return { success: true, data: posts };
  } catch (error) {
    console.error('Get category posts error:', error);
    return { success: false, error: '获取分类文章列表失败' };
  }
}
