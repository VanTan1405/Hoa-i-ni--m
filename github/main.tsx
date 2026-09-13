
import React,{useEffect,useState} from "react";
import {createRoot} from "react-dom/client";
import Home from "../app/page";
import Login from "../app/dang-nhap/page";
import ClassRoom from "../app/lop/page";
import "../app/globals.css";
window.A14_STATIC=true;
function App(){const[route,setRoute]=useState(window.location.hash);useEffect(()=>{const changed=()=>{setRoute(window.location.hash);if(window.location.hash!=="#ky-uc")window.scrollTo(0,0)};window.addEventListener("hashchange",changed);return()=>window.removeEventListener("hashchange",changed)},[]);const path=route.slice(1).split("?")[0];return path==="/lop"?<ClassRoom/>:path==="/dang-nhap"?<Login/>:<Home/>}
createRoot(document.getElementById("root")!).render(<App/>);
