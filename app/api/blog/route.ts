//  SSR 服务端 API 路由 


// app/api/blog/route.js
export async function GET() {
  // 1. 可以在这里查询数据库（如 Prisma / db.query）
  const posts = [
    { id: '1', title: 'Hello Next.js' },
    { id: '2', title: 'API Routes' },
  ];

  // 2. 返回 JSON 数据
  return Response.json(posts);
}

// 3. 也可以处理 POST 请求
export async function POST(request) {
  const data = await request.json(); // 获取 POST 请求的 body
  return Response.json({ message: 'Data received!', data });
}
