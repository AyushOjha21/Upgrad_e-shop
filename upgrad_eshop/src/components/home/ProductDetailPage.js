import React, { useState } from 'react'
import LoginHeader from '../header/LoginHeader'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


function ProductDetailPage(props) {
    const navigate = useNavigate()
    let prod = {...props.productDetails}
    const[quantity,setQuantity] = useState(1)

    const steps = [
        'Items',
        'Select Address',
        'Confirm Order',
      ];

      
        return (
            <>
            <LoginHeader/>
            <div className='relative top-[30px]'>
            </div>
            <div className=' flex justify-center relative top-[100px] '> 
            <div className=' max-w-[60%] gap-5 flex '>
                <img className=' h-[250px] w-[250px]' src={prod.imageURL}></img>
                <div className=''>
                    <div className='flex justify-between min-w-[500px]'>
                        <h1 className=' text-[32px] '>{prod.name}</h1>
                        <span className=' flex justify-center items-center h-8 mt-2 bg-violet-700 text-white px-2 py-1 rounded-[20px]'>Available Quantity {prod.availableItems}</span>
                    </div>
                    <h3>Category <span className='font-bold'>{prod.category}</span></h3>
                    <p className='mt-8 text-[12px]'>{prod.description}</p>
                    <h1 className=' mt-8 text-red-500 text-[32px]'>₹{prod.price}</h1>
                    <ValidatorForm className='mt-3'>
                        <TextValidator
                        label="Enter Quantity"
                        validators={["required",`maxNumber:${prod.availableItems}`]}
                        errorMessages={["Quantity can't be empty", "Not Available"]}
                        value={quantity}
                        onChange={(e)=>{setQuantity(e.target.value)}}
                        >
                   
                        </TextValidator>
                        <Button onClick={()=>{
                        props.navtoorder(quantity)
                    }} className='relative top-8' style={{backgroundColor : "#3f51b5"}} variant="contained">PLACE ORDER</Button>
                    </ValidatorForm>
                   
                </div>
            </div>
            </div>
            </>
          )
      }





     
      
 
  


//name contact street city state landmark pincode 

export default ProductDetailPage