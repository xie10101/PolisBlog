import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

/**
 * 统一的响应接口定义
 */
export type ActionResponse<T> = {
  // 数据层响应成功与否标志
  success: boolean;
  data?: T;
  error?: string; // 用于存储常规错误信息 -string类型
  errors?: Record<string, string[]>; // 用于存储 Zod 验证错误 - 实际的错误对象
};

/**
 * Server Action 全局拦截/包装器
 * 用于统一处理错误日志、验证错误以及返回格式
 */
export async function actionHandler<T>(
  action: () => Promise<T>,
): Promise<ActionResponse<T>> {
  try {
    const data = await action();
    return { success: true, data };
  } catch (error) {
    console.error('Server Action Error:', error);

    // 处理 Zod 验证错误
    if (error instanceof ZodError) {
      return {
        success: false,
        error: '输入数据验证失败',
        errors: error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    // 处理常规错误
    return {
      success: false,
      error: error instanceof Error ? error.message : '服务器内部错误',
    };
  }
}

/**
 * API Routes 全局拦截/包装器
 * 用于统一处理 API 路由的响应格式和异常
 */
export function apiHandler(handler: (...args: any[]) => Promise<any>) {
  return async (...args: any[]) => {
    try {
      const result = await handler(...args);

      // 如果 handler 已经返回了 NextResponse，则直接透传
      if (result instanceof NextResponse) {
        return result;
      }

      // 否则包装成统一的 JSON 格式
      return NextResponse.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('API Route Error:', error);

      const isZodError = error instanceof ZodError; // controller 包含了 输入数据校验部分 
      const status = isZodError ? 400 : 500; // 400 - 对应 Zod 验证错误，500 - 对应常规错误
      const message = error instanceof Error ? error.message : '服务器内部错误';

      return NextResponse.json(
        {
          success: false,
          error: message,
          errors: isZodError
            ? (error.flatten().fieldErrors as Record<string, string[]>)
            : undefined, // 返回校验错误对象
          data: null,
        },
        { status },
      );
    }
  };
}
