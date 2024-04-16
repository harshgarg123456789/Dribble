import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import KnowYouBetter from './pages/KnowYouBetter';
import WhatBringsYou from './pages/WhatBringsYou';
import VerifyEmail from './pages/VerifyEmail';
import Error from './pages/Error';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from './services/operations/profileAPI';
import { useEffect } from 'react';
import ChangeEmail from './pages/ChangeEmail';
import Home from './pages/Home';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.profile)


  useEffect(() => {
    console.log(localStorage.getItem("token"))
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, user))
    }
  }, [])


  return (
    <div>
      <Routes>
        <Route path='/signup' element={
            <SignUp/>
        }/>
        
        <Route path='/login' element={
          <Login/>
        }/>
        <Route path='/knowyoubetter' element={
          <PrivateRoute>
            <KnowYouBetter/>
          </PrivateRoute>
        }/>
        <Route path='/whatbringsyou' element={
          <PrivateRoute>
            <WhatBringsYou/>
          </PrivateRoute>
        }/>
        <Route path='/verifyemail' element={
          <PrivateRoute>
            <VerifyEmail/>
          </PrivateRoute>
        }/>
        <Route path='/changemail' element={
          <PrivateRoute>
            <ChangeEmail/>
          </PrivateRoute>
        }/>
        <Route path='/' element={<Home/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
