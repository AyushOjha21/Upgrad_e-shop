import React, { useEffect, useState } from "react";
import LoginHeader from "../header/LoginHeader";
import NotLoginHeader from "../header/NotLoginHeader";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import jwtDecode from "jwt-decode";
import AdminHeader from "../header/AdminHeader";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'

const ProductPage = (props) => {
  const [alignment, setAlignment] = React.useState("All");
  const [List, setList] = useState([]);
  const list = [...props.list];
  const [sort, setSort] = React.useState("");
  const [addProduct, setaddProduct] = useState(0);
  const navigate = useNavigate();
  let userdata = {};
  const [itemid, setItemid] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modifyalert, setmodifyalert] = useState(false);
  const [delalert, setdelalert] = useState(false);
  const [addalert, setaddalert] = useState(false);
  const [name, setname] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState();
  const [availableItems, setavailableitem] = useState(1);
  const [imageURL, setimageURL] = useState("");
  const [manufacturer, setmanufacturer] = useState("");
  const [modifyname, setmodifyname] = useState("");
  const [modifycategory, setmodifycategory] = useState("");
  const [modifydescription, setmodifydescription] = useState("");
  const [modifyprice, setmodifyprice] = useState(1);
  const [modifyavailableItems, setmodifyavailableitem] = useState(1);
  const [modifyimageURL, setmodifyimageURL] = useState("");
  const [modifymanufacturer, setmodifymanufacturer] = useState("");
  let newProdName
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // <----------API CALL FOR ADDING NEW PRODUCT---------------->
  async function addNewProduct(){
    try {
    const addprod = {name , category , description , price , availableItems , imageURL , manufacturer}
    console.log(addprod);
    const response  = await axios.post('http://localhost:3001/api/v1/products', addprod ,
    {
      headers:{
        "x-auth-token" : localStorage.getItem('x-auth-token'),
      }
    });
    addNewProduct = addprod.name
    } catch (error) {
      console.log(error);
    }
    
  }
  // <----------API CALL FOR MODIDFYING PRODUCT---------------->
  async function modifyProduct(){
    const modified = {name : modifyname,category : modifycategory ,description : modifydescription, price : modifyprice, availableItems : modifyavailableItems,imageURL : modifyimageURL,manufacturer: modifymanufacturer}
    console.log(modified);
    console.log(itemid._id);
    let result = await axios.put(`http://localhost:3001/api/v1/products/${itemid._id}`,modified,
    {
      headers:{
        "x-auth-token" : localStorage.getItem('x-auth-token'),
      }
    });
    props.productList()
    setaddProduct(0) 
    setmodifyalert(true)
  }

  // <----------API CALL FOR DELETING PRODUCT---------------->
  async function deleteItem(){

    let result = await axios.delete(`http://localhost:3001/api/v1/products/${itemid._id}`);
    props.productList()
    navigate('/products')
    setdelalert(true)

  }


  if (localStorage.getItem("x-auth-token")) {
    userdata = jwtDecode(localStorage.getItem("x-auth-token"));
  }
  

  const handleChanged = (event) => {
    setSort(event.target.value);
    let newValue = event.target.value;
    if (newValue === 10) {
      List.sort(revsortOrder("createdAt"));
    } else if (newValue === 20) {
      List.sort(revsortOrder("price"));
    } else if (newValue === 30) {
      List.sort(sortOrder("price"));
    } else if (newValue === 40) {
      List.sort(sortOrder("createdAt"));
    }
  };

  const handleChange = (e) => {
    let newAlignment = e.target.value;
    setAlignment(newAlignment);

    if (newAlignment !== "All") {
      let prod = list.filter((item) => item.category === newAlignment);
      setList(prod);
    } else {
      setList(list);
    }
  };

  function sortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) return 1;
      else if (a[prop] < b[prop]) return -1;
      else return 0;
    };
  }

  function revsortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) return -1;
      else if (a[prop] < b[prop]) return 1;
      else return 0;
    };
  }

  useEffect(() => {
    setList(props.list);
  }, [props.list]);

  //  PAGE FOR ADDING A NEW PRODUCT
  if(userdata.isAdmin && addProduct === 1){
    return(
      <>
      <AdminHeader/>
      <div className=" mt-10 flex justify-center items-center flex-col" >
        <h1 className=" text-[30px] mb-10">Add New Product</h1>
      <ValidatorForm onSubmit={()=>{
                    addNewProduct()
                    props.productList()
                    props.productList()
                    setaddProduct(0)
                    setaddalert(true)
                    setname("")
                    setcategory("")
                    setdescription("")
                    setprice(1)
                    setavailableitem(1)
                    setimageURL("")
                    setmanufacturer("")
                }} className=' items-center justify-center flex flex-col min-w-[30%] gap-5'>
                    <TextValidator
                    label="Name"
                    value={name}
                    onChange={(e)=>{setname(e.target.value)}}
                    validators={["required"]}
                    errorMessages={["Name can't be empty"]}
                    className=' w-[500px]'
                    >
                    </TextValidator>
                    <TextValidator
                    label="Category"
                    value={category}
                    onChange={(e)=>{setcategory(e.target.value)}}
                    validators={["required"]}
                    errorMessages={["Category can't be empty"]}
                    className=' w-[500px]'
                    >
                    </TextValidator>
                    <TextValidator
                    label="Description"
                    value={description}
                    onChange={(e)=>{setdescription(e.target.value)}}
                    className=' w-[500px]'
                    >
                    </TextValidator>
                    <TextValidator
                    label="Price"
                    value={price}
                    onChange={(e)=>{setprice(e.target.value)}}
                    validators={["required"]}
                    errorMessages={["Price can't be empty"]}
                    className=' w-[500px]'
                    >
                    </TextValidator>  
                    <TextValidator
                    label="Available Item"
                    value={availableItems}
                    onChange={(e)=>{setavailableitem(e.target.value)}}
                    validators={["required"]}
                    errorMessages={["Available item can't be empty"]}
                    className=' w-[500px]'
                    >
                    </TextValidator>
                    <TextValidator
                    label="Image URL"
                    value={imageURL}
                    onChange={(e)=>{setimageURL(e.target.value)}}
                    className=' w-[500px]'
                    >
                    </TextValidator>
                    <TextValidator
                    label="Manufacturer"
                    value={manufacturer}
                    onChange={(e)=>{setmanufacturer(e.target.value)}}
                    validators={["required"]}
                    errorMessages={["Manufacturer can't be empty"]}
                    className=' w-[500px]'
                    >
                    </TextValidator>
                    

                    <Button type='submit'  className=' w-[100%] relative top-3' variant="contained">Add Product</Button> <br/>
                
                </ValidatorForm>
                </div>          
      </>
    )
  }


  // //  PRODUCT PAGE FOR ADMIN ONLY WHICH HAS ROLE ADMIN AND AUTHENTICATED
  else if (userdata.isAdmin && addProduct === 0) {
    return (
      <div> 
        <AdminHeader setval={setaddProduct} />
        <div className='fixed top-[22%] left-[78%] w-[100%]'>
        <Box sx={{ width: '20%' }}>
       <Collapse in={delalert}>
        <Alert
        variant='filled'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setdelalert(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Product "{itemid.name}" deleted successfully
        </Alert>
      </Collapse>
        </Box>
        </div>

        <div className='fixed top-[22%] left-[78%] w-[100%]'>
        <Box sx={{ width: '20%' }}>
       <Collapse in={modifyalert}>
        <Alert
        variant='filled'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setmodifyalert(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Product "{itemid.name}" modified successfully
        </Alert>
      </Collapse>
        </Box>
        </div>

        <div className='fixed top-[22%] left-[78%] w-[100%]'>
        <Box sx={{ width: '20%' }}>
       <Collapse in={addalert}>
        <Alert
        variant='filled'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setaddalert(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Product Added successfully
        </Alert>
      </Collapse>
        </Box>
        </div>  

        {/* <-------DELETE MODAL-------> */}

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Delete?
          </Typography>
          <div>
            <div className=" my-2 flex justify-around">
        <Button onClick={()=>{ console.log("im called"); deleteItem(); handleClose()}} variant='contained' color="success">Yes</Button>
        <Button onClick={()=>{handleClose()}} variant='contained' color="error">No</Button>
        </div>
        </div>
        </Box>
      </Modal>

       {/* <-------CATEGORIES------> */}
        <div className=" flex justify-center items-center py-3">
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="All">All</ToggleButton>
            <ToggleButton value="Apparel">Apparel</ToggleButton>
            <ToggleButton value="Automotive">Automotive</ToggleButton>
            <ToggleButton value="Electronics">Electronics</ToggleButton>
            <ToggleButton value="Home Accessories">
              Home Accessories
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
       

       {/* <-------SORTING------> */}
        <div className="flex gap-5 pl-28">
          <Box sx={{ minWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="sort"
                onChange={handleChanged}
              >
                <MenuItem value={10}>Default</MenuItem>

                <MenuItem value={20}>Price high to low</MenuItem>

                <MenuItem value={30}>Price low to high</MenuItem>

                <MenuItem value={40}>Newest</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
       

       {/* <-------PRODUCT LIST------> */}
        <div className=" mt-10 justify-center flex flex-wrap gap-9 ">
        <div style={{}}></div>
          {List.map((list) => (
            <div className=" rounded-md hover:shadow-2xl shadow-xl p-3 h-[300px] w-[300px] overflow-hidden">
              <div className="flex justify-center ">
                <img className="h-[150px] w-[150px]" src={list.imageURL} />
              </div>

              <div className="flex justify-between font-bold text-gray-600">
                <h2>{list.name}</h2>
                <h2>₹{list.price}</h2>
              </div>

              <div>
                <p className=" mb-3 text-[13px] h-[55px] text-gray-500 overflow-hidden">
                  {list.description}
                </p>
                <div className=" flex justify-between items-center">
                  <Button
                    onClick={() => {
                      props.showDetailPage(list);

                      navigate(`/product-detail-${list._id}`);
                    }}
                    variant="contained"
                    style={{backgroundColor : "#3f51b5"}}
                  >
                    Buy
                  </Button>
                  <div>
                    <IconButton onClick={()=>{
                      setmodifyname(list.name)
                      setmodifycategory(list.category)
                      setmodifydescription(list.description)
                      setmodifyprice(list.price)
                      setmodifyavailableitem(list.availableItems)
                      setmodifyimageURL(list.imageURL)
                      setmodifymanufacturer(list.manufacturer)
                      setItemid(list)
                      setaddProduct(2)}} style={{color: "#6F706E"}} aria-label="delete" color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton style={{color: "#6F706E"}} aria-label="delete" color="primary" 
                    onClick={()=>{
                      setItemid(list)
                      handleOpen()
                    }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    );
  }


 // PAGE FOR MODIFYING EXSISTING PRODUCT
  else if(userdata.isAdmin && addProduct === 2){
    return(
      <>
      <AdminHeader/>
      <div className=" mt-10 flex justify-center items-center flex-col" >
        <h1 className=" text-[30px] mb-10">Modify Product</h1>
      <ValidatorForm onSubmit={()=>{
                    modifyProduct()
                     
                }} className=' items-center justify-center flex flex-col min-w-[30%] gap-5'>
                    <TextValidator
                    label="Name"
                    value={modifyname}
                    onChange={(e)=>{setmodifyname(e.target.value)}}
                    validators={["required"]}
                    errorMessages={["Name can't be empty"]}
                    className=' w-[500px]'
                    >
                    </TextValidator>
                    <TextValidator
                    label="Category"
                    value={modifycategory}
                    onChange={(e)=>{setmodifycategory(e.target.value)}}
                    validators={["required"]}
                    errorMessages={["Category can't be empty"]}
                    className=' w-[500px]'
                    >
                    </TextValidator>
                    <TextValidator
                    label="Description"
                    value={modifydescription}
                    onChange={(e)=>{setmodifydescription(e.target.value)}}
                    className=' w-[500px]'
                    >
                    </TextValidator>
                    <TextValidator
                    label="Price"
                    value={modifyprice}
                    onChange={(e)=>{setmodifyprice(e.target.value)}}
                    validators={["required"]}
                    errorMessages={["Price can't be empty"]}
                    className=' w-[500px]'
                    >
                    </TextValidator>  
                    <TextValidator
                    label="Available Item"
                    value={modifyavailableItems}
                    onChange={(e)=>{setmodifyavailableitem(e.target.value)}}
                    validators={["required"]}
                    errorMessages={["Available item can't be empty"]}
                    className=' w-[500px]'
                    >
                    </TextValidator>
                    <TextValidator
                    label="Image URL"
                    value={modifyimageURL}
                    onChange={(e)=>{setmodifyimageURL(e.target.value)}}
                    className=' w-[500px]'
                    >
                    </TextValidator>
                    <TextValidator
                    label="Manufacturer"
                    value={modifymanufacturer}
                    onChange={(e)=>{setmodifymanufacturer(e.target.value)}}
                    validators={["required"]}
                    errorMessages={["Manufacturer can't be empty"]}
                    className=' w-[500px]'
                    >
                    </TextValidator>
                    

                    <Button type='submit'  className=' w-[100%] relative top-3' variant="contained">Modify Product</Button> <br/>
                
                </ValidatorForm>
                </div>          
      </>
    )
  }

  // PRODUCT PAGE FOR USERS THOSE ARE AUTHENTICATED
  else if (userdata.isAdmin === false) {
    return (
      <>
        <LoginHeader />
        <div className=" flex justify-center items-center py-3">
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="All">All</ToggleButton>
            <ToggleButton value="Apparel">Apparel</ToggleButton>
            <ToggleButton value="Automotive">Automotive</ToggleButton>
            <ToggleButton value="Electronics">Electronics</ToggleButton>
            <ToggleButton value="Home Accessories">
              Home Accessories
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div className="flex gap-5 pl-28">
          <Box sx={{ minWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="sort"
                onChange={handleChanged}
              >
                <MenuItem value={10}>Default</MenuItem>

                <MenuItem value={20}>Price high to low</MenuItem>

                <MenuItem value={30}>Price low to high</MenuItem>

                <MenuItem value={40}>Newest</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>

        <div className=" mt-10 justify-center flex flex-wrap gap-9 ">
          {List.map((list) => (
            <div className=" rounded-md hover:shadow-2xl shadow-xl p-3 h-[300px] w-[300px] overflow-hidden">
              <div className="flex justify-center ">
                <img className="h-[150px] w-[150px]" src={list.imageURL} />
              </div>

              <div className="flex justify-between font-bold text-gray-600">
                <h2>{list.name}</h2>
                <h2>₹{list.price}</h2>
              </div>

              <div>
                <p className=" mb-3 text-[13px] h-[55px] text-gray-500 overflow-hidden">
                  {list.description}
                </p>
                <div>
                  <Button
                    onClick={() => {
                      props.showDetailPage(list);

                      navigate(`/product-detail-${list._id}`);
                    }}
                    variant="contained"
                    style={{backgroundColor : "#3f51b5"}}
                  >
                    Buy
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  // PRODUCT PAGE FOR USERS THOSE ARE NOT AUTHENTICATED
  else {
    return (
      <div className="h-screen">
        <NotLoginHeader />
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <h1 className="text-[20px] text-gray-600 uppercase">
            You are not authenticated, Please Sign In
          </h1>
        </div>
      </div>
    );
  }
};

export default ProductPage;
