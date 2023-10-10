import React, { useEffect, useState } from 'react'
import { Routes , Route, useNavigate } from 'react-router-dom'
import SignIn from '../components/login/SignIn'
import SignUp from '../components/login/SignUp'
import ProductPage from '../components/home/ProductPage'
import axios from 'axios'
import ProductDetailPage from '../components/home/ProductDetailPage'
import OrderProductPage from '../components/home/OrderProductPage'

const Main = () => {
  const[list,setList] = useState([])
  const [err, setErr] = useState("")
  const [colour, setcolour] = useState("")
  const [product, setProduct] = useState({})
  const navigate = useNavigate()
  let productPath = `/product-detail-${product._id}`
  let newAdd = `/order-${product._id}`
  const[quantity,setQuantity] = useState()
  



  //  <----- SIGN UP API CALL  ----->

  async function usercreate(data,setOpen){
    
    try {
    let result = await axios.post('http://localhost:3001/api/v1/users',data);
    console.log(result);

    } catch (e) {
      console.log(e.response.data);
      setTimeout(() => {
      setErr(e.response.data)
       setcolour("warning")
        setOpen(true);
      }, 500);
    }
  }


   //  <----- SIGN IN API CALL  ----->

  async function userAuthenticate(data,setOpen){

    try {
    const result  = await axios.post('http://localhost:3001/api/v1/auth', data);
    
    localStorage.setItem("x-auth-token",result.headers['x-auth-token']);
    setTimeout(() => {
      setOpen(true);
    }, 500);
    setTimeout(() => {
      navigate('/products')
    }, 1000);

    } catch (error) {
      alert("Something went wrong or Databse is not connected")
    }
  }


    //  <----- PRODUCT LIST API CALL  ----->
  
  async function ProdList(){
    try {
    const response  = await axios.get('http://localhost:3001/api/v1/products',
    {
      headers:{
        "x-auth-token" : localStorage.getItem('x-auth-token'),
      }
    });
    setList(response.data)
    } catch (error) {
      console.log(error);
    }
  }



  // <----- PRODUCT DETAIL PAGE  ----->
  function productDetailPage(prod){
    setProduct(prod)
  }


  // <----- navigate to ADDRESS DETAILS PAGE  ----->

  function navtoadd(quantity){
    setQuantity(quantity)
    navigate(newAdd)
  }



  // <----- POST ADDRESS DETAILS  ----->
  async function PostAddress(data){
    try {
    const response  = await axios.post('http://localhost:3001/api/v1/addresses', data,
    {
      headers:{
        "x-auth-token" : localStorage.getItem('x-auth-token'),
      }
    });
    } catch (error) {
      console.log(error);
    }
    
  }



  useEffect(()=>{
     ProdList()
  },[])

  return (
    <>
        <Routes>
            <Route path="/" element={<SignIn authenticate={userAuthenticate} />}/>
            <Route path="/sign-in" element={<SignIn authenticate={userAuthenticate}/>}/>
            <Route path="/sign-up" element={<SignUp err={err} colour={colour} create={usercreate}/>}/>
            <Route path="/products" element={<ProductPage productList={ProdList} showDetailPage={productDetailPage} list={list}/>}/>
            <Route path={productPath} element={<ProductDetailPage productDetails={product} navtoorder={navtoadd}/>}/>
            <Route path={newAdd} element={<OrderProductPage Quantity={quantity} productDetails={product} postAdd={PostAddress} prodDetail={productPath} />}/>
        </Routes>
    </>
  )
}

export default Main