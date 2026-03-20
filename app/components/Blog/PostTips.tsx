    "use client"
    import { MetaItem } from "@/app/types/meta"
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faCalendarAlt,faFolder,faEye,faFileWord,faClock } from '@fortawesome/free-solid-svg-icons';

    export default function PostTips(props: {meta: MetaItem | null}  ){ 
      if(props.meta == null){
        return <div></div> 
        //  ？？？ 后续可以完善 
      }
       return (
       <div className="text-gray-400 font-light">
         <div className="flex flex-row items-center gap-2">
          <p><FontAwesomeIcon icon={faCalendarAlt} /> 发表于：{props.meta.createdAt}</p>
          <p><FontAwesomeIcon icon={faEye} />  阅读次数：{props.meta.readCount}</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p><FontAwesomeIcon icon={faFileWord} /> 本文字数: {props.meta.wordCount}</p>
          <p><FontAwesomeIcon icon={faClock} /> 阅读时间：{props.meta.readDuration}</p>
        </div>
      </div>
       )
    }
