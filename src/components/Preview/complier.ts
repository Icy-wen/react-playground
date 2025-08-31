import {type Files, type File } from '../../ReactPlaygroud/PlaygroundContext'
import { transform } from '@babel/standalone'
import { ENTRY_FILE_NAME } from '../../ReactPlaygroud/file'

export const beforeTransformCode = (filename: string, code: string) => {
  let _code = code
  const regexReact = /import\s+React/g
  if ((filename.endsWith('.jsx')) || (filename.endsWith('.tsx')) && !regexReact.test(code)) {
    _code = `import React from 'react';\n${code}`
  }
  return _code
}

export const babelTransform = (filename: string, code: string, files: Files) => {
  // 将 code 进行编译
  let _code = beforeTransformCode(filename, code)
  let result = ''
  try {
    result = transform(_code, {
      presets: ['react', 'typescript'],
      filename,
      plugins: [customResolver(files)],  // 当我将 from './App.tsx' 替换为 from 'blob://xxxxx'
      retainLines: true
    }).code!
    return result
  } catch (error) {
    console.log('编译出错:' + error)
  }
}

// babel 编译时的插件，用于处理 import 语句
function customResolver(files: Files) {
  return {
    visitor: {
      ImportDeclaration: (path) => {
        const mudolePath = path.node.source.value  // './App'
        if (mudolePath.startsWith('.')) {
          const file = getModuleFile(files, mudolePath) // ./App.tsx
          if (!file) return 

          if (file.name.endsWith('.css')) {
            path.node.source.value = css2JS(file) // blob:http://localhost:5173/7a86c484-9b01-450d-ba7b-33b182658b86
          } else if (file.name.endsWith('.json')) {
            path.node.source.value = json2JS(file)
          } else {  // 'xx.tsx'
            path.node.source.value = URL.createObjectURL(
              new Blob([babelTransform(file.name, file.value, files)], { type: 'text/javascript' })
            )
          }
        }
      }
    }
  }
}


function css2JS(file: File) {
  // const js = `export default ${file.value}`;
  const randomId = new Date().getTime()
  const js = `
    (() => {
      const style = document.createElement('style')
      style.setAttribute('id', 'style_${randomId}_${file.name}')
      document.head.appendChild(style)

      const styleText = document.createTextNode(\`${file.value}\`)
      style.innerHTML = ''
      style.appendChild(styleText)
    })()
  `
  return URL.createObjectURL(new Blob([js], { type: 'text/javascript' }));
}

function getModuleFile(files: Files, mudolePath: string) {
  let moduleName = mudolePath.split('./').pop() || ''  // 'App'
  if (!moduleName.includes('.')) {
    const realModuleName = Object.keys(files).filter(key => {
      return key.endsWith('.ts') || key.endsWith('.tsx') || key.endsWith('.js') || key.endsWith('.jsx')
    }).find(key => {
      return key.split('.').includes(moduleName)
    })

    if (realModuleName) {
      moduleName = realModuleName
    }
  }
  
  return files[moduleName]
}

function json2JS(file: File) {
  const js = `export default ${file.value}`;
  return URL.createObjectURL(new Blob([js], { type: 'text/javascript' }));
}



// 手搓一个编译函数
export const compile = (files: Files) => {
  const main = files[ENTRY_FILE_NAME]
  return babelTransform(ENTRY_FILE_NAME, main.value, files)
}