import React from 'react'
import Editor from './Editor/index.tsx'
import FileNameList from './FileNameList/index.tsx'
import { useContext } from 'react'
import { PlaygroundContext } from '../../ReactPlaygroud/PlaygroundContext.tsx'

export default function CodeEditor() {
 const { 
    files,
    setFiles,
    selectedFileName,
    setSelectedFileName,
   } = useContext(PlaygroundContext)

  const onEditorChange=(value:string)=>{
    console.log(value);

  }
  const file=files[selectedFileName]
  return (
    <div style={{height:'100%'}}>

        <FileNameList />
        <Editor file={file} onChange={onEditorChange} />

    </div>
  )
}
