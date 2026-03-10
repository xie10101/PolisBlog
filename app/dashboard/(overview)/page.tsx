"use client"
import { Button } from "@/components/ui/button"
import {Card,CardHeader,CardTitle,CardDescription,CardAction,CardContent,CardFooter} from "@/components/ui/card"
export default function Overview() {
  return (
    <>
    <div className="flex flex-col h-full w-full gap-4">
      {/* Dashboard Header --  */} 
      <header className="flex flex-row justify-between items-center">
        {/*icon 的使用 或者 自定义 svg插入  */}
           {/* 折叠侧边栏按钮 */}
          <Button variant="outline" className="fl">
             折叠
           </Button>  
           {/* 图标按钮  */}
           <div className="flex flex-row flex-1 justify-end items-center">
           {/* 喜欢-  */}
           <Button>
             喜欢
           </Button> 
           {/* 后台消息接收  */}
           <Button>
             消息
           </Button> 
           </div>
      </header>
      <main className="flex flex-col flex-1 gap-6">
        <header className="flex flex-row relative" >
          <div className="flex flex-col">
            <h2 className="font-normal text-2xl">Dashboard</h2> 
            <p className="text-lg  ">Welcome back! Here what is going on with your blog today</p>
          </div>
              <Button variant="outline" className="absolute right-10">
                  写文章 
              </Button>
        </header>
        <main className="flex flex-row  gap-4 h-40">
             <Card className="flex-1">
              <CardHeader>
              <CardTitle>今日新文章</CardTitle>
              <CardAction>文章图标</CardAction>
              </CardHeader>
              <CardContent>
                 <h2 className="text-2xl font-bold">12</h2>
              </CardContent>
              <CardFooter>
              <p>+2 较往日</p>
              </CardFooter>
             </Card>
             <Card className="flex-1">
              <CardHeader>
              <CardTitle>今日新评论</CardTitle>
              <CardAction>评论图标</CardAction>
              </CardHeader>
              <CardContent>
                 <h2 className="text-2xl font-bold">456</h2>
              </CardContent>
              <CardFooter>
              <p>+2 较往日</p>
              </CardFooter>
             </Card>
             <Card className="flex-1">
              <CardHeader>
              <CardTitle>今日新用户</CardTitle>
              <CardAction>用户图标</CardAction>
              </CardHeader>
              <CardContent>
                 <h2 className="text-2xl font-bold">789</h2>
              </CardContent>
              <CardFooter>
              <p>+2 较往日</p>
              </CardFooter>
             </Card>
        </main>
        {/* 列表项 */}
        <main className="grid grid-cols-2 gap-4">
           
          
        </main>
      </main>
      </div>
    </>
  )
}