import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/learning/Counter'
import InCart from './components/learning/InCart'
import { useDispatch } from 'react-redux'
import { setUserName } from './slices/CounterSlice'
import { useSelector } from 'react-redux'
import UserHome from './components/learning/UserHome'
import UserLogin from './components/learning/UserLogin'
import Navbar from './components/learning/Navbar'
import { Route, Routes } from 'react-router-dom'
import About from './components/learning/About'
import Contact from './components/learning/Contact'
import Registration from './components/learning/Registration'
import Home from './components/learning/Home'
import ChangePassword from './components/learning/Changepassword'
import Forgetpassword from './components/learning/Forgotpassword'
import Resetpassword from './components/learning/Resetpassword'
import AskQuestions from './components/learning/AskQuestions'
import "quill/dist/quill.snow.css"
import AllQuestions from './components/learning/AllQuestions'
import Questions_Details from './components/learning/Questions_Details'
import CategorySection from './components/learning/CategorySection'
import Profile from './components/learning/Profile'
import ShowProfile from './components/learning/ShowProfile'
import Showuserprofile from './components/learning/Showuserprofile'
import VerifyOTP from './components/learning/VerifyOTP'
//"quill/dist/quill.core.css"
function App() {
  // let username = "";
  // let userislogin = useSelector((store) => store.user.userislogin)

  return (

    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/verify/:id' element={<VerifyOTP />} />
        <Route path='/showuserprofile/:id' element={<Showuserprofile></Showuserprofile>} />
        <Route path='/showprofile' element={<ShowProfile></ShowProfile>} />
        <Route path='/distinct-categories' element={<CategorySection></CategorySection>} />
        <Route path='/Questions_details/:id' element={<Questions_Details></Questions_Details>} />
        <Route path='/allquestions' element={<AllQuestions></AllQuestions>} />
        <Route path='/testing' element={<AskQuestions></AskQuestions>} />
        <Route path="/" element={<Home></Home>} />
        <Route path="/about" element={<About></About>} />
        <Route path="/contact" element={<Contact></Contact>} />
        <Route path="/login" element={<UserLogin></UserLogin>} />
        <Route path="/registration" element={<Registration></Registration>} />
        <Route path='/logout' element={<UserHome></UserHome>} />
        <Route path='/changepassword' element={<ChangePassword></ChangePassword>} />
        <Route path='/forgotpassword' element={<Forgetpassword></Forgetpassword>} />
        <Route path='/resetpassword/:id' element={<Resetpassword></Resetpassword>} />
        <Route path='/profilesetting' element={<Profile></Profile>} />
      </Routes>
      {/* {(userislogin) ? <UserHome></UserHome> : <UserLogin></UserLogin>} */}
    </>
  )
}

export default App
