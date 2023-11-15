import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Group from './components/Group'
import Home from './components/Home'

const App=()=><BrowserRouter>
<Routes>
<Route path='/' element={<Home/>}/>
<Route path='/group' element={<Group/>}/>  
</Routes>
</BrowserRouter>

export default App