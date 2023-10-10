import React, { useEffect, useState } from 'react'
import LoginHeader from '../header/LoginHeader'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import axios from 'axios'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';



function OrderProductPage(props) {
    const navigate = useNavigate()
    const back = props.prodDetail
    

    const[name,setName] =  useState("")
    const[contactNumber,setContactNumber] =  useState("")
    const[street,setStreet] =  useState("")
    const[state,setState] =  useState("")
    const[city,setCity] =  useState("")
    const[landmark,setLandmark] =  useState("")
    const[zipCode,setzipCode] =  useState()
    const[stepCount,setStepCount] = useState(0)
    const [selectAddress, setSelectAddress] = useState(-1);
    const [addList,setAddList] = useState([])
    const [open, setOpen] = useState(false);
    const [confirmOrder, setConfirmOrder] = useState(false);
    let quantity = props.Quantity
    let prod = {...props.productDetails}

    const handleChange = (event) => {
    setSelectAddress(event.target.value)
    setStepCount(2)
  };






   // <----- GET ADDRESS DETAILS  ----->
   async function GetAddress(){
    try {
    const response  = await axios.get('http://localhost:3001/api/v1/addresses',
    {
      headers:{
        "x-auth-token" : localStorage.getItem('x-auth-token'),
      }
    });

    setAddList(response.data)
    console.log(addList);
    } catch (error) {
      console.log(error);
    }

  }


  useEffect(()=>{
    GetAddress()
  },[open])


    const steps = [
        'Items',
        'Select Address',
        'Confirm Order',
      ];

    if(stepCount == 0){
        return (
            <>
            <LoginHeader/>
            <div className='relative top-[30px]'>
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={stepCount} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
            </div>
            <div className=' flex justify-center relative top-[100px]'> 
            <div className=' max-w-[60%] gap-5 flex '>
                <img className=' h-[250px] w-[250px]' src={prod.imageURL}></img>
                <div>
                    <div className='flex justify-between'>
                        <h1 className=' text-[32px] '>{prod.name}</h1>
                    </div>
                    <h3>Category <span className='font-bold'>{prod.category}</span></h3>
                    <h3>Quantity <span className='font-bold'>{quantity}</span></h3>
                    <p className='mt-6 text-[12px]'>{prod.description}</p>
                    <h1 className=' mt-8 text-red-500 text-[32px]'>Total Price : ₹{quantity * prod.price}</h1>
                    <Button onClick={()=>{
                        navigate(back)
                    }} style={{backgroundColor : "#3f51b5"}} className=' relative top-8' variant="contained">BACK</Button>
                    <Button onClick={()=>{
                        setStepCount(1)
                    }} style={{backgroundColor : "#3f51b5"}}  className='left-5 relative top-8' variant="contained">NEXT</Button>
                </div>
            </div>
            </div>
            </>
          )
      }  

    else if(stepCount==1){ 

        return (
        <>
        <LoginHeader/>
        <div className='fixed top-[22%] left-[78%] w-[100%]'>
       <Box sx={{ width: '20%' }}>
       <Collapse in={open}>
        <Alert 
        onClose={() => {
            setOpen(false)
          }}
        variant='filled'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Address added successfully
        </Alert>
      </Collapse>
    </Box>
    </div>

        <div className=' w-screen flex flex-col justify-center items-center relative top-[30px]'>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={stepCount} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
    <div  className=' mt-10 min-w-[50%] '>
    <InputLabel id="demo-simple-select-label">Select Address</InputLabel>
    
    
    <Select
      labelId="demo-simple-select-label"
      className='w-[100%]'
      id="demo-simple-select"
      value={selectAddress}
      label="Select Address"
      onChange={handleChange}
      >
      
        {
          addList.map((item,index)=>{
              return <MenuItem value={index}>{item.name}, {item.state}, {item.city}</MenuItem>
            })
        }
    </Select>
    </div>
    </div> 

    <div className=' relative top-6 items-center justify-center flex flex-col'>
        <h1 className=' text-[24px]'>-or-</h1>
        <h1 className=' text-[32px] mt-5'>Add Address</h1>
        <ValidatorForm onSubmit={()=>{
                    const data = {name,contactNumber,city,zipCode,landmark,state,street}
                    props.postAdd(data)
                    setTimeout(() => {
                      setOpen(true)
                    }, 200);
                    setTimeout(() => {
                      setOpen(false)
                    }, 2000);
                }} className=' items-center justify-center flex flex-col min-w-[30%] gap-5'>
                    <TextValidator
                    label="Name"
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    validators={["required"]}
                    errorMessages={["Name can't be empty"]}
                    className=' w-[500px]'
                    >
                    </TextValidator>
                    <TextValidator
                    label="Contact Number"
                    value={contactNumber}
                    onChange={(e)=>{setContactNumber(e.target.value)}}
                    validators={["required"]}
                    errorMessages={["Contact Number can't be empty"]}
                    className=' w-[500px]'
                    >
                    </TextValidator>
                    <TextValidator
                    label="City"
                    value={city}
                    onChange={(e)=>{setCity(e.target.value)}}
                    validators={["required"]}
                    errorMessages={["City can't be empty"]}
                    className=' w-[500px]'
                    >
                    </TextValidator>
                    <TextValidator
                    label="Pincode"
                    value={zipCode}
                    onChange={(e)=>{setzipCode(e.target.value)}}
                    validators={["required"]}
                    errorMessages={["Pincode can't be empty"]}
                    className=' w-[500px]'
                    >
                    </TextValidator>  
                    <TextValidator
                    label="Landmark"
                    value={landmark}
                    onChange={(e)=>{setLandmark(e.target.value)}}
                    className=' w-[500px]'
                    >
                    </TextValidator>
                    <TextValidator
                    label="State"
                    value={state}
                    onChange={(e)=>{setState(e.target.value)}}
                    validators={["required"]}
                    errorMessages={["State can't be empty"]}
                    className=' w-[500px]'
                    >
                    </TextValidator>
                    <TextValidator
                    label="Street"
                    value={street}
                    onChange={(e)=>{setStreet(e.target.value)}}
                    validators={["required"]}
                    errorMessages={["Street can't be empty"]}
                    className=' w-[500px]'
                    >
                    </TextValidator>
                    

                    <Button type='submit' style={{backgroundColor : "#3f51b5"}}  className=' w-[100%] relative top-3' variant="contained">Set Address</Button> <br/>
                
                </ValidatorForm>
    </div>
        
    </>
      )
    }

    else if(stepCount == 2){
        return(
            <>
            <LoginHeader/>
            <div className=' w-screen flex flex-col justify-center items-center relative top-[30px]'>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={stepCount} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
            </div> 

            <div className='fixed top-[22%] left-[78%] w-[100%]'>
       <Box sx={{ width: '20%' }}>
       <Collapse in={confirmOrder}>
        <Alert 
        onClick={() => {
            setConfirmOrder(false)
          }}
        variant='filled'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Order confirmed successfully
        </Alert>
      </Collapse>
    </Box>
    </div>


     <div className=' p-5 flex relative gap-3 top-[70px] left-[50%] -translate-x-[50%] rounded-3xl hover:shadow-2xl shadow-xl w-[800px]'>
        <div className='w-[70%] flex items-start gap-5 flex-col'>
          <h1 className='text-[28px]'>{prod.name}</h1>
          <h3 className=''> Quantity <span className='font-bold'>{quantity}</span></h3>
          <h3> Category <span className='font-bold'>{prod.category}</span></h3>
          <p className=' overflow-hidden mt-2 text-[14px] min-h-[80px] max-h-[80px] '>{prod.description}</p>
          <h1 className=' text-red-600 text-[24px]'>Total Price :₹ {prod.price * quantity}</h1>
        </div>
        <div className=' bg-gray-700 w-[1px]'></div>
        <div className='flex flex-col gap-3 items-start'>
          <h1 className='text-[28px]'>Address Details</h1>
          <h3>{addList[selectAddress].name}</h3>
          <h3>{addList[selectAddress].contactNumber}</h3>
          <h3>{addList[selectAddress].city}</h3>
          <h3>{addList[selectAddress].state}</h3>
        </div>
      </div>
     <div className=' absolute top-[80%] left-[50%] -translate-x-[50%]'>
        <Button onClick={()=>{
            setConfirmOrder(true)
            setTimeout(() => {
              navigate('/products')
            }, 1500);
          }} variant='contained' style={{backgroundColor : "#3f51b5"}} color="info">Place order</Button>
        </div>
        </>
        )
    }
    }
    
    export default OrderProductPage