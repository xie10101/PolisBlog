'use client';
import { MetaItem } from '@/app/(frontend)/types/meta';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faEye,
  faFileWord,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
export default function PostTips(props: {
  meta: MetaItem | null;
  className?: string;
}) {
  if (props.meta == null) {
    return null;
  }

  return (
    <div
      className={clsx(
        'mb-4 w-full rounded-2xl bg-gray-100 p-4 text-sm text-slate-700 shadow-sm',
        'sm:flex sm:items-center sm:justify-between sm:gap-4',
        props.className,
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <p className="flex items-center gap-2 text-slate-600">
          <FontAwesomeIcon icon={faCalendarAlt} />
          <span>发表于：{props.meta.publishedAt || '无时间'}</span>
        </p>
        <p className="text-slate-600">
          <FontAwesomeIcon icon={faEye} />
          阅读次数：{props.meta.viewCount ?? 0}
        </p>
      </div>

      <div className="mt-3 flex flex-col gap-3 sm:mt-0 sm:flex-row sm:items-center sm:gap-6">
        <p className="flex items-center gap-2 text-slate-600">
          <FontAwesomeIcon icon={faFileWord} />
          <span>本文字数：{props.meta.wordCount ?? 0}</span>
        </p>
        <p className="flex items-center gap-2 text-slate-600">
          <FontAwesomeIcon icon={faClock} />
          <span>阅读时长：{props.meta.readTime ?? '未知'}</span>
        </p>
      </div>
    </div>
  );
}
