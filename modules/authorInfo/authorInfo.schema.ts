import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

const blogInfo = pgTable('blog_info', {
  id: serial('id').primaryKey(),
  siteName: varchar('site_name', { length: 50 }).default(''),
  siteDesc: varchar('site_desc', { length: 200 }).default(''),
  authorName: varchar('author_name', { length: 30 }).default(''),
  authorIntro: text('author_intro'),
  github: varchar('github', { length: 255 }).default(''),
  gitee: varchar('gitee', { length: 255 }).default(''),
  wechat: varchar('wechat', { length: 100 }).default(''),
  qq: varchar('qq', { length: 20 }).default(''),
  backgroundImg: varchar('background_img', { length: 255 }).default(''),
  createTime: timestamp('create_time', { withTimezone: true }).defaultNow(),
  updateTime: timestamp('update_time', { withTimezone: true }).defaultNow(),
});

export default blogInfo;
