import { SidebarBlog } from '@/app/ui/dashboard/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { User } from '../ui/dashboard/user';
import { Button } from '@/components/ui/button';

export default function OverviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="flex h-full">
        <SidebarProvider className="w-[250px]">
          <SidebarBlog>
            <User></User>
          </SidebarBlog>
        </SidebarProvider>
        {/*  隐藏滚动条 */}
        <main className="no-scrollbar flex-1 flex-col overflow-y-auto bg-[#fafafa]">
          <main className="m-2 h-full items-center justify-center rounded-xl bg-white shadow-lg">
            <header className="mb-6 flex flex-row items-center justify-between border-b-1 p-4">
              {/* 使用奇怪各自模型- border ， padding 置于宽度中 便于处理   */}
              <Button variant="outline" className="fl">
                折叠
              </Button>
              <div className="flex flex-1 flex-row items-center justify-end gap-2">
                <Button>喜欢</Button>
                <Button>消息</Button>
              </div>
            </header>
            <div className="p-4">{children}</div>
          </main>
        </main>
      </section>
    </>
  );
}
