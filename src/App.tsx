import { useRoutes } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  const elements = useRoutes([
    {
      path: '/',
      element: <Home />
    }
  ])
  return <div className='App'>{elements}</div>
}

export default App
