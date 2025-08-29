import { useContext, useState, useEffect } from 'react'
import { PlaygroundContext } from '../../../ReactPlaygroud/PlaygroundContext.tsx'

export default function FileNameList() {
  const { 
    files,
    addFile,
    removeFile,
    updateFileName,
    selectedFileName,
    setSelectedFileName,
   } = useContext(PlaygroundContext)

   const [tabs, setTabs] = useState<string[]>([])


   useEffect(() => {
    setTabs(Object.keys(files))
   }, [files])
  return (
    <div>
      {
        tabs.map((tab,index)=>(
          <div key={index}>{tab}</div>
        ))
      }
    </div>
  )
    
}
