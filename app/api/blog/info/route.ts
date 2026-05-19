import { db } from '@/lib/db';
import blogInfo from '@/app/modules/authorInfo/authorInfo.schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const info = await db.select().from(blogInfo).limit(1);
    return Response.json({
      success: true,
      data: info[0] || null,
    });
  } catch (error) {
    console.error('Failed to fetch blog info:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch blog info' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (id) {
      const result = await db
        .update(blogInfo)
        .set(data)
        .where(eq(blogInfo.id, id))
        .returning();
      return Response.json({
        success: true,
        data: result[0],
      });
    } else {
      const result = await db.insert(blogInfo).values(data).returning();
      return Response.json({
        success: true,
        data: result[0],
      });
    }
  } catch (error) {
    console.error('Failed to save blog info:', error);
    return Response.json(
      { success: false, error: 'Failed to save blog info' },
      { status: 500 }
    );
  }
}
