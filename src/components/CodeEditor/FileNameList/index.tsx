import { useContext, useState, useEffect } from 'react'
import { PlaygroundContext } from '../../../ReactPlaygroud/PlaygroundContext.tsx'
import styles from './index.module.scss'
import FileNameItem from './FileNameItem'
import { ENTRY_FILE_NAME } from '../../../ReactPlaygroud/file.ts'


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
   const [creating, setCreating] = useState(false)

   useEffect(() => {
    setTabs(Object.keys(files))
   }, [files])

   const handleEditComplete = (name: string, prevName: string) => {
      updateFileName(prevName, name)
      setSelectedFileName(name)

      setCreating(false)
   }

   
   const addTab = () => {
      const newFileName = 'Comp' + Math.random().toString().slice(2, 8) + '.tsx'
      addFile(newFileName)  // 全局增加了一个文件
      setSelectedFileName(newFileName)
      setCreating(true)
   }

   const handleRemove = (name: string) => {
      removeFile(name)
      setSelectedFileName(ENTRY_FILE_NAME)
   }

  return (
    <div className={styles['tabs']}>
      {
        tabs.map((tab, index, arr) => (
          <FileNameItem 
            key={index} 
            onClick={() => setSelectedFileName(tab)}
            value={tab}
            creating={creating && index === arr.length - 1}
            actived={selectedFileName === tab}
            onEditComplete={(name: string) => {handleEditComplete(name, tab)}}
            onRemove={(e) => {
              e.stopPropagation()
              handleRemove(tab)
            }}
            ></FileNameItem>
        ))
      }
      <div className={styles['add']} onClick={addTab}>+</div>
    </div>
  )
}
