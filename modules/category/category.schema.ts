import {
  pgEnum,
  pgTable,
  integer,
  timestamp,
  varchar,
  uuid,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const categoryStatusEnum = pgEnum('category_status', [
  'active',
  'inactive',
]);

const categories = pgTable(
  'categories',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    name: varchar('name', { length: 100 }).notNull().unique(), //分类名称 ，唯一
    slug: varchar('slug', { length: 100 }).notNull().unique(), //分类slug ，唯一
    description: varchar('description', { length: 500 }), //描述 

    status: categoryStatusEnum('status').default('active'), // open close 

    sortOrder: integer('sort_order').default(0), //自定义排序字段，默认值为0 

    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
  },
  table => [
    uniqueIndex('idx_categories_slug').on(table.slug),
    index('idx_categories_status').on(table.status),
    index('idx_categories_sort_order').on(table.sortOrder),
  ],
);

export default categories;
