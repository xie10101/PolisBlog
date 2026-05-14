'use server';

import { CategoryRepository } from '@/app/modules/category/category.server';
import {
  CreateCategoryDto,
  CreateCategorySchema,
} from '@/app/modules/category/dto/category-create.dto';
import {
  UpdateCategoryDto,
  UpdateCategorySchema,
} from '@/app/modules/category/dto/category-update.dto';

// 获取所有分类
export async function getAllCategories() {
  try {
    const categories = await CategoryRepository.findAll();
    return { success: true, data: categories };
  } catch (error) {
    console.error('Get categories error:', error);
    return { success: false, error: '获取分类列表失败' };
  }
}

// 获取所有激活分类
export async function getActiveCategories() {
  try {
    const categories = await CategoryRepository.findAllActive();
    return { success: true, data: categories };
  } catch (error) {
    console.error('Get active categories error:', error);
    return { success: false, error: '获取激活分类列表失败' };
  }
}

// 获取分类详情根据id
export async function getCategoryById(id: string) {
  try {
    const category = await CategoryRepository.findById(id);
    if (!category) {
      return { success: false, error: '分类不存在' };
    }
    return { success: true, data: category };
  } catch (error) {
    console.error('Get category error:', error);
    return { success: false, error: '获取分类详情失败' };
  }
}
// 获取分类详情根据slug
export async function getCategoryBySlug(slug: string) {
  try {
    const category = await CategoryRepository.findBySlug(slug);
    if (!category) {
      return { success: false, error: '分类不存在' };
    }
    return { success: true, data: category };
  } catch (error) {
    console.error('Get category by slug error:', error);
    return { success: false, error: '获取分类详情失败' };
  }
}

// 创建分类
export async function createCategory(data: CreateCategoryDto) {
  try {
    const validated = CreateCategorySchema.safeParse(data); // 校验 （校验是单独执行的和 class-validator 不同）
    if (!validated.success) {
      return {
        success: false,
        error: '数据验证失败',
        details: validated.error.format(),
      };
    }

    const existing = await CategoryRepository.findBySlug(validated.data.slug);
    if (existing) {
      return { success: false, error: 'slug已存在' };
    }

    const result = await CategoryRepository.create(validated.data);
    return { success: true, data: result };
  } catch (error) {
    console.error('Create category error:', error);
    return { success: false, error: '创建分类失败' };
  }
}
// 更新分类根据id
export async function updateCategory(data: UpdateCategoryDto) {
  try {
    const validated = UpdateCategorySchema.safeParse(data);
    if (!validated.success) {
      return {
        success: false,
        error: '数据验证失败',
        details: validated.error.format(),
      };
    }

    const { id, ...updateData } = validated.data;

    const existing = await CategoryRepository.findById(id);
    if (!existing) {
      return { success: false, error: '分类不存在' };
    }

    if (updateData.slug && updateData.slug !== existing.slug) {
      const slugExists = await CategoryRepository.findBySlug(updateData.slug);
      if (slugExists) {
        return { success: false, error: 'slug已存在' };
      }
    }

    const result = await CategoryRepository.update(id, updateData);
    return { success: true, data: result };
  } catch (error) {
    console.error('Update category error:', error);
    return { success: false, error: '更新分类失败' };
  }
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
