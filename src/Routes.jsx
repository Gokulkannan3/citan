import React from "react";
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home/home';
import Leaf  from './pages/lea/leaf';
import Login from './pages/Login/login'
import Signup from './pages/Signup/Signup'
import Shipping from './pages/Shipping/shipping'


const AllRoutes= ()=>{
    return(
        <Routes>
            <Route exact path ='/' element={<Home/>}/>
            <Route exact path='/map' element={<Leaf/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/Signup' element={<Signup/>}/>
            <Route exact path='/shipping' element={<Shipping/>}/>
        </Routes>
        
    )   
}
export default AllRoutes