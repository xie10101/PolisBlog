// 内容简述组件
'use client';
import { MetaItem } from '@/app/types/meta';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faThumbTack } from '@fortawesome/free-solid-svg-icons';
import '@/app/reset.css';
// import PostTips from './components/Blog/PostTips';
import { useRouter } from 'next/navigation';
import {
  Item,
  ItemSeparator,
  ItemFooter,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from '../ui/item';
export default function Brief(props: { meta: MetaItem | null; slug: string }) {
  const router = useRouter();
  const handleLinkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    router.push(`/${props.slug}`);
    // 在这里添加你的自定义逻辑，例如打开一个新的窗口或进行其他操作
  };
  return (
    <Item
      variant="outline"
      className="m-6 w-2xl border-0 hover:bg-[#f7f7f8]"
      asChild
      role="listitem"
    >
      <div className="flex flex-col gap-2">
        <div
          onClick={handleLinkClick}
          className="flex w-full cursor-pointer items-center gap-2"
        >
          <ItemMedia variant="image" className="h-32 w-32 rounded-2xl">
            <img src="/images/1.png" alt="博客项图片" />
          </ItemMedia>
          <ItemContent className="w-40">
            <ItemTitle className="line-clamp-1">
              <span className="text-muted-foreground text-lg font-bold">
                {' '}
                {props.meta?.title || '无标题'}{' '}
              </span>
            </ItemTitle>
            <ItemDescription>
              <span className="text-muted-foreground text-sm font-bold">
                {' '}
                {props.meta?.createdAt || '无时间'}{' '}
              </span>
            </ItemDescription>
            <ItemDescription>
              <span className="text-muted-foreground text-sm font-bold">
                {props.meta?.summary || '无标签'}
              </span>
            </ItemDescription>
          </ItemContent>
        </div>
        <ItemFooter className="flex w-full items-center justify-between gap-2">
          <span> 作者：{props.meta?.wordCount || '无作者'} </span>
          <a
            href={`/${props.slug}`}
            className="text-sm text-[#202121] underline"
          >
            查看详情
          </a>
        </ItemFooter>
        <ItemSeparator />
      </div>
    </Item>
  );
}

/*

   
*/
