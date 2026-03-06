import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, User, Menu } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-8">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl tracking-tight">PolisBlog</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/posts"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              文章
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              分类
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              关于
            </Link>
          </nav>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <div className="hidden md:flex items-center space-x-2">
             <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
                <span className="sr-only">搜索</span>
             </Button>
             <Link href="/dashboard">
                <Button variant="outline">控制台</Button>
             </Link>
             <Button size="icon" variant="ghost">
                <User className="h-5 w-5" />
                <span className="sr-only">个人中心</span>
             </Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">菜单</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
