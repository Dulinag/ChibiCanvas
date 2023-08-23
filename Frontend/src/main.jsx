import {useRoutes} from "react-router-dom"
import * as React from 'react'
import Home from "././Home"
import NewPage from "./NewLandingPage"
import Contact from "./Contact"


const  MainRoutes = () => {


return useRoutes ([


{
    path: '/',
    element: <Home/>
},


{
    path: '/NewPage',
    element: <NewPage/>
},

{
    path: '/Contact',
    element: <Contact/>
},




])




}

export default MainRoutes