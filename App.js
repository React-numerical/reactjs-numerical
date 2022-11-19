import MyNavbar from "./components/MyNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
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
import Regression from "./components/Regression/Regression";
import Gauss from "./components/Marix/Gauss";
import Jacobi from "./components/Marix/Jacobi";
import Conjugate from "./components/Marix/Conjugate";
import Cramer from "./components/Marix/Cramer";
import Seidel from "./components/Marix/Seidel";
import MultipileRegression from "./components/Regression/MultipileRegress";


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
        <Route path="/gauss" element={<Gauss/>}/>
        <Route path="/cramer" element={<Cramer/>}/>
        <Route path="/jacobi" element={<Jacobi/>}/>
        <Route path="/seidel" element={<Seidel/>}/>
        <Route path="/conjugate" element={<Conjugate/>}/>
        <Route path="/lagrange" element={<Lagrange/>}/>
        <Route path="/spline" element={<Spline/>}/>
        <Route path="/regression" element={<Regression/>}/>
        <Route path="/multiregression" element={<MultipileRegression/>}/>
       </Routes>
      </BrowserRouter>
    </div>
  );
}

