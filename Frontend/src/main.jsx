import {useRoutes} from "react-router-dom"
import * as React from 'react'
import Home from "././Home"
import NewPage from "./NewLandingPage"
import Contact from "./Contact"
import Profile from "./Profile"


const  MainRoutes = () => {


return useRoutes ([


{
    path: '/',
    element: <Home/>
},


{
    path: '/ShoppingCart',
    element: <NewPage/>
},

{
    path: '/Contact',
    element: <Contact/>
},


{
    path: '/Profile',
    element: <Profile/>
},


])




}

export default MainRoutes