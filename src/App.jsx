import {createBrowserRouter,RouterProvider, createRoutesFromElements, Route} from "react-router-dom";
import Home from "./components/Home.jsx";
import Error from "./components/Error";
import AddProduct from "./components/AddProduct.jsx";
import AllProduct from "./components/AllProduct.jsx";
import DeleteProduct from "./components/DeleteProduct.jsx";
import UpdateProduct from "./components/UpdateProduct.jsx";
import Discription from "./components/Discription.jsx";
import AllVarient from "./components/AllVarient.jsx";
import Ragistration from "./components/Ragistration.jsx";
import Login from "./components/Login.jsx";
import ForgotPawword from "./components/ForgotPassword.jsx";
import OtpVerification from "./components/OtpVerification.jsx";
import ResetPasswordPage from "./components/ResetPasswordPage.jsx";


function App() {

  const router = createBrowserRouter(

    createRoutesFromElements(

      <Route>
        <Route path="/ragistration" element={<Ragistration/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/forgotPassword" element={<ForgotPawword/>}></Route>
        <Route path="/resetpassword" element={<ResetPasswordPage/>}></Route>
        <Route path="/otp/:email" element={<OtpVerification/>}></Route>
        
        <Route path="/" element={<Home/>}>
          <Route path="/addproduct" element={<AddProduct/>}></Route>
          <Route path="/allproduct" element={<AllProduct/>}></Route>
          <Route path="/deleteproduct" element={<DeleteProduct/>}></Route>
          <Route path="/updateproduct" element={<UpdateProduct/>}></Route>
          <Route path="/discription" element={<Discription/>}></Route>
          <Route path="/allvarient" element={<AllVarient/>}></Route>
          <Route path="*" element={<Error/>}></Route>
        </Route>
      </Route>
    )
  )

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
