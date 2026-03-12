import { SidebarBlog } from '@/app/ui/dashboard/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { User } from '../ui/dashboard/user';
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
        <main className="no-scrollbar flex-1 overflow-y-auto bg-[#fafafa]">
          {/*  设置阴影  */}
          <main className="m-2 flex h-full items-center justify-center rounded-xl bg-white p-4 shadow-lg">
            {children}
          </main>
        </main>
      </section>
    </>
  );
}
