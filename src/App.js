import MyNavbar from "./components/MyNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import {  BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import Bisection from "./components/Bracketing Method/Bisection";
import Lagrange from "./components/Interpolation/Lagrange";
// import FormComponent from "./components/FormComponent";
import './App.css';
import FalsePosition from "./components/Bracketing Method/FalsePosition";
import OnePoint from "./components/Bracketing Method/OnePoint";
import Secant from "./components/Bracketing Method/Secant";
import NewtonRaphson from "./components/Bracketing Method/NewtonRaphson";
import Spline from "./components/Interpolation/Spline";

export default function App() {

  return (
    <div>
      <MyNavbar/>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/bisection" element={<Bisection/>}/>
        <Route path="/falseposition" element={<FalsePosition/>}/>
        <Route path="/onepoint" element={<OnePoint/>}/>
        <Route path="/newtonraphson" element={<NewtonRaphson/>}/>
        <Route path="/secant" element={<Secant/>}/>
        <Route path="/lagrange" element={<Lagrange/>}/>
        <Route path="/spline" element={<Spline/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

