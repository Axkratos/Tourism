

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import SlidingLogin from './components/login/login'
import GuideLogin from './components/login/guidelogin'
import Signup from './components/register/register'
import GuideSignup from './components/register/guideregister'
import Footer from './components/common/Footer'
import ReviewCard from './components/review/review'
import Widget from './components/form/form'
import Demo from './components/dashboard/demo'
import Profiles from './components/dashboard/profile'
import {Navbar} from './components/common/Navbar'
import Dashboard from './admin/Dashboard'
import GuideVerification from './admin/GuideVerification'
import UserSection from './admin/UserSection'
import GuideSection from './admin/GuideSection'



import KYCForm from './components/form/kyc'
import Dash from './components/dashboard/dash'
export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/users" element={<UserSection />} />
    <Route path="/guides" element={<GuideSection />} />

        <Route path='/' element={<Home/>}></Route>
        <Route path='/demo' element={<Demo/>}></Route>
        <Route path='/signin' element={<SlidingLogin/>}></Route>
        <Route path='/login' element={<GuideLogin/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/register' element={<GuideSignup/>}></Route>
        <Route path='/footer' element={<Footer/>}></Route>
        <Route path='/form' element={<Widget/>}></Route>
        <Route path='/dash' element={<Dash/>}></Route>
        <Route path='/review' element={<ReviewCard/>}></Route>
        <Route path='/kyc' element={<KYCForm/>}></Route>
        <Route path='/profile' element={<Profiles/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path="/verify/:id" element={<GuideVerification />} />
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}