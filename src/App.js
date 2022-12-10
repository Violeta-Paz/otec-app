
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import General from './pages/general';
import Courses from './pages/courses';
import Students from './pages/students';
import Class from './pages/class';
import Index from './pages';
import Signin from './pages/auth';
import {AuthProvider} from './components/context/authContext';
import {ProtectedRoute} from './components/protectedRoute'
import AuthCourse from './pages/authCourse';



function App() {
  return (   
    <AuthProvider>
    <Router>
      <Routes>
        <Route  path='/general/:id' element={ <ProtectedRoute><General/> </ProtectedRoute>} exact  />
        <Route  path='/courses' element={ <ProtectedRoute> <Courses/> </ProtectedRoute>} exact />
        <Route  path='/students/:id' element={ <ProtectedRoute><Students/> </ProtectedRoute>} exact />
        <Route  path='/class/:id' element={ <ProtectedRoute> <Class/> </ProtectedRoute>} exact />
        <Route  path='/auth/:id' element={ <ProtectedRoute> <AuthCourse/> </ProtectedRoute>} exact />
        <Route  path='/signin' element={<Signin/>} exact />
        <Route  path='/' element={<Index/>} exact />
        
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
