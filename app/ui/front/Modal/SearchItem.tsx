//  单个搜索项的设置 
import "./SearchItem.css"
interface BlogSearchItem {
slug: string;
title: string;
summary: string; 
tags: [];
}

type Props = {
  item: BlogSearchItem; 
  onClick?: () => void;
}; 
const SearchItem = ({item,onClick}:{item:BlogSearchItem,onClick?: () => void}) => {
  return (
    <li className="p-2 hover:bg-gray-100 cursor-pointer flex w-full" onClick={onClick}>
         <span className="block w-2 h-2 rounded-full bg-gray-500 m-2 "></span>    

         <main  className="border-b-2  border-dashed  border-gray-300  pb-3 w-full">
            <h3 className=" inline-block border-b-2 border-gray-300 mb-2 ">
                {item.title}
            </h3 >
            <p  className=" test" >{ item.summary}</p>
         </main>
    </li>
    //  处理方式 - 宽度固定 -不受文字限制 - 超出部分省略号 
  )
} 


export  default SearchItem;
