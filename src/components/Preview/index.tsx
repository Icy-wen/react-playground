import { useContext, useState, useEffect } from 'react'
import { compile } from './complier'
import { PlaygroundContext } from '../../ReactPlaygroud/PlaygroundContext'
import iframeRaw from './iframe.html?raw'

import { IMPORT_MAP_FILE_NAME } from '../../ReactPlaygroud/file'


export default function Perview() {
  const { files } = useContext(PlaygroundContext)
  // const code = compile(files) as string // main.tsx
  const [code, setCode] = useState('')
  useEffect(() => {
    const newCode = compile(files) as string
    setCode(newCode)
  }, [files])

  const getIframeUrl = () => {
    const res = iframeRaw.replace(
      '<script type="importmap"></script>',
      `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
    ).replace(
      '<script type="module"></script>',
      `<script type="module">${code}</script>`
    )
    return URL.createObjectURL(new Blob([res], { type: 'text/html' }))
  }

  const [iframeUrl, setIframeUrl] = useState(getIframeUrl())
  useEffect(() => {
    setIframeUrl(getIframeUrl())
  }, [code])

  return (
    <div style={{ height: '100%' }}>
      <iframe
        src = {iframeUrl}
        style={{ 
          width: '100%', 
          height: '100%',
          padding: 0,
          border: 0,
        }}
      />

      {/* <Editor file={{
        name: 'preview',
        language: 'javascript',
        value: code
      }} /> */}
    </div>
  )
}
