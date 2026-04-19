'use client';
import * as React from 'react';
import Image from 'next/image';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { MoreHorizontal, Search, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { fetchAllPosts } from '@/app/actions/post.actions';
import { mapPostDBToUI } from '@/utils/map';
// import { getFirstUser } from '../../actions/user.actions';
// import useUserInfoStore from '@/store/user';
// mock 数据

export type Article = {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  // tags: string[];
  status: 'Published' | 'Draft' | 'Scheduled';
  publishTime: string;
  views: number;
};

//  待了解 ：全静态是否合适？-- columnHelper 处理的优势 ？
// Column Definitions
export const columns: ColumnDef<Article>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      //  待了解 --- 全选 与 部分选中 状态的处理
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      // 待了解 --- 行选中 与 取消选中 状态的处理
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: 'Article Title',
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        {
          <Image
            src={row.original.imageUrl}
            alt="article image"
            width={40}
            height={40}
            className="h-10 w-10 rounded-md object-cover"
            //  错误处理 -- 的目标地址？？
            onError={() => (
              <Image
                src="/file.svg"
                alt="placeholder image"
                width={40}
                height={40}
                className="h-10 w-10 rounded-md object-cover"
              />
            )}
          />
        }
        <span className="font-medium">{row.getValue('title')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  // {
  //   accessorKey: 'tags',
  //   header: 'Tags',
  //   cell: ({ row }) => (
  //     <div className="flex flex-wrap gap-1">
  //       {row.original.tags.map(tag => (
  //         // 组件属性待了解
  //         <Badge key={tag} variant="secondary">
  //           {tag}
  //         </Badge>
  //       ))}
  //     </div>
  //   ),
  // },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const variant =
        status === 'Published'
          ? 'default'
          : status === 'Draft'
            ? 'outline'
            : 'secondary';
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: 'publishTime',
    header: 'Publish Time',
  },
  {
    accessorKey: 'views',
    header: 'Views',
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue('views')}</div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Operations',
    // 如何 设置 colpan为 2
    // meta: {
    //   colSpan: 2,
    // },
    cell: ({ row }) => {
      const article = row.original;
      //  待处理 - 下拉框actions的设置
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          {/* <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(article.id)}
            >
              Copy article ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent> */}
        </DropdownMenu>
      );
    },
  },
];

// Main Component
export default function ArticlesPage() {
  //简单处理
  // const setInfo = useUserInfoStore(state => state.setInfo);
  // const userInfo = getFirstUser().then(res => {
  //   const first = res[0];

  //   const userInfo = {
  //     id: first.id,
  //     email: first.email,
  //     avatar: first.avatar,
  //     username: first.username,
  //     bio: first.bio,
  //   };
  //   setInfo(userInfo);
  // });

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  // 2. 初始化状态，默认可以给个空数组或之前的 mock 数据作为初始值
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // 3. 使用 useEffect 获取真实数据
  useEffect(() => {
    const loadData = async () => {
      const result = await fetchAllPosts();
      if (result.success) {
        // 注意：这里需要确保数据库返回的字段与 Article 类型匹配
        // 如果不匹配，需要在这里进行 map 转换
        // 需要做map 映射处理 ：
        setArticles(result?.data?.map(mapPostDBToUI) || []);
      }
      setLoading(false);
    };
    loadData();
  }, []);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // 了解是中怎样的处理方式
  const table = useReactTable({
    data: articles,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full p-4 md:p-8">
      {/*  响应式处理- md:xx  */}
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Articles</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Article
        </Button>
      </header>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              {/*  待了解处理方式  */}
              <Input
                placeholder="Search articles..."
                value={
                  (table.getColumn('title')?.getFilterValue() as string) ?? ''
                }
                onChange={event =>
                  table.getColumn('title')?.setFilterValue(event.target.value)
                }
                className="w-full pl-10 md:w-1/3"
              />
            </div>
            {/* 待了解使用  */}
            <Select
              onValueChange={value =>
                table
                  .getColumn('status')
                  ?.setFilterValue(value === 'all' ? '' : value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
            {/* <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Frontend">Frontend</SelectItem>
                <SelectItem value="Backend">Backend</SelectItem>
                <SelectItem value="Architecture">Architecture</SelectItem>
                <SelectItem value="AI/ML">AI/ML</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <div className="flex items-center justify-between space-x-2 py-4">
        {/* <div className="text-muted-foreground text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            {/* 单页显示列表数配置  */}
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={value => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            {/*  当前页码  */}
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </div>
          {/* <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m15 6l-6 6l6 6"
                />
              </svg>
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m9 6l6 6l-6 6"
                />
              </svg>
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
