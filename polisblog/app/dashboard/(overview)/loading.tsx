// loading文件- 流式传输 布局 


export default function Loading() { 
     
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-t-blue-500 border-solid rounded-full animate-spin"></div>
             <p className="text-xl font-bold">Loading...</p>
             <p className="text-sm text-gray-500">Please wait while we load your content.</p>
             <p className="text-sm text-gray-500">This may take a few seconds.</p>
             <p className="text-sm text-gray-500">Thank you for your patience.</p> 
        </div>
    )
}
