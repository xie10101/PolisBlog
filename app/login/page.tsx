'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SubmitHandler } from 'react-hook-form';
import { LoginDto, LoginSchema } from '../modules/user/dto/login.dto';
import { signIn } from '../modules/auth';
import { AuthError } from 'next-auth';
const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginDto>({
    // useForm 方法是一个多重封装高效架构的函数钩子
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
  });
  // 非必选配置 useActionstate -类似 useReducer  连接 action ?

  const onSubmit: SubmitHandler<LoginDto> = async data => {
    try {
      const test = await signIn('credentials', data);
      console.log(test);
    } catch (error) {
      // 如果登录失败
      if (error) {
        // 把错误设置到表单里 → 页面会显示
        setError('root', {
          message: '账号或密码错误，请重试',
        });
      }
    }
  };

  //   react-hook-form 中 如何处理 setErrors

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">登录</CardTitle>
          <CardDescription>请输入您的账号信息以继续</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="hookForm">
            {/* username 字段 */}
            <div className="space-y-2">
              <label className="text-sm font-medium">用户名</label>
              <Input
                id="username"
                type="text"
                placeholder="请输入用户名"
                {...register('username')}
              />
              {errors.username && (
                <span className="errorMessage">{errors.username.message}</span>
              )}
            </div>

            {/* Password 字段 */}
            <div className="space-y-2">
              <label className="text-sm font-medium">密码</label>
              <Input
                id="password"
                type="password"
                placeholder="请输入密码"
                {...register('password')}
              />
              {errors.password && (
                <span className="errorMessage">{errors.password.message}</span>
              )}
            </div>

            {/* 提交按钮 */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? '提交中...' : '登录'}
            </Button>
            {/*表单提交的整体性错误 - 可能不属于某个表单字段 */}

            {errors.root && (
              <span className="errorMessage">{errors.root.message}</span>
            )}
          </form>
          <div className="text-muted-foreground mt-4 text-center text-sm">
            还没有账号？{' '}
            <Button
              variant="link"
              className="p-0"
              onClick={() => router.push('/register')}
            >
              立即注册
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
