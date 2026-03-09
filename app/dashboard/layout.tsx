import { SidebarBlog } from "@/app/ui/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { User } from "../ui/dashboard/user";
export default function OverviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <section className="h-full flex">
      <SidebarProvider className="w-[250px]" >
        <SidebarBlog>
          <User></User>
        </SidebarBlog>
      </SidebarProvider> 
      {/*  隐藏滚动条 */}
      <main className= "  flex-1 bg-[#fafafa] overflow-y-auto no-scrollbar ">
      {/*  设置阴影  */}
       <main className=" h-full bg-white rounded-xl flex items-center justify-center m-2 shadow-lg"> 
             {children}
       </main>
      </main>
    </section>

    </>
  )
}