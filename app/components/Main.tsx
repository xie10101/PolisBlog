"use client"
import HeaderNav from "./HeaderBar/HeaderNav";
import { useEffect, useRef } from "react";
import useLayoutStore from "@/store/other";
// import {faCoffee} from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import Footer from "./Footer";
export default function Main({children}:{children:React.ReactNode,className?:string}) { 
  const show = useLayoutStore(state=>state.showDrawer);
  const toggle = useLayoutStore(state=>state.toggle);

  //为body 和 sidebar 添加 动态class 样式 
  useEffect(()=>{
    if(show){
  //  获取 body 下 sidebar 的节点
      const sidebar = document.querySelector(".sidebar");
      document.body.classList.add("transition1");
      sidebar?.classList.add("transition2");
    }else{
      document.body.classList.remove("transition1");
      const sidebar = document.querySelector(".sidebar");
      sidebar?.classList.remove("transition2");
    }
},[show]); 
  
  const nodeRef = useRef(null);

  return (
          <div  className={"flex-1  height-screen"} ref={nodeRef} >
            <div className="flex flex-col h-screen">
              <HeaderNav></HeaderNav>
              <div className="overflow-y-auto  h-[calc(100vh-100px)] flex flex-col justify-between">
                <main className="">{children}
                </main>
                <Footer></Footer>
              </div>
            </div>
            <button className="absolute top-4 left-4  bg-gray-200 rounded-full p-2 text-black z-10" onClick={
              ()=>{toggle();}}>
              {/* <FontAwesomeIcon icon={faCoffee} />  */}
            </button> 
          </div>
  );
}
