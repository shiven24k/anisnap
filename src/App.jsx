
import { Navigate, Route,Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
import PageLayout from './Layouts/PageLayout/PageLayout'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import useSupabaseAuth from './hooks/useSupabaseAuth'

function App() {
  
 const { user: authUser } = useSupabaseAuth()
  return (
  <PageLayout>
   <Routes>
    <Route path='/' element={authUser ? <HomePage/> : <Navigate to='/auth'/>}/>
    <Route path='/auth' element={!authUser ? <AuthPage/> : <Navigate to='/'/>}/>
    <Route path='/:username'element={<ProfilePage/>}/>
   </Routes>
   </PageLayout>
   )
  
}

export default App
