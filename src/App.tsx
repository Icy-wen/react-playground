import ReactPlayground from './ReactPlaygroud/index.tsx'
import './App.scss'
import { PlaygroundProvider } from './ReactPlaygroud/PlaygroundContext.tsx'
export default function App() {
  return (
      <PlaygroundProvider>
        <ReactPlayground />
      </PlaygroundProvider>
  )
}
