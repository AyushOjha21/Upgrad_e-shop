import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';


const NotLoginHeader = () => {
  return (
    <div className=''>
    <Box sx={{ flexGrow: 1 }} >
    <AppBar position="static" style={{backgroundColor : "#3f51b5"}}>
      <Toolbar>
        <ShoppingCartIcon
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </ShoppingCartIcon>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Link to={"/"}>upGrad Eshop</Link>
        </Typography>
       
        <Button color="inherit"><Link to={"/sign-up"}>Sign-Up</Link></Button>
        <Button color="inherit"><Link to={"/sign-in"}>Sign-In</Link></Button>
      </Toolbar>
    </AppBar>
    </Box>
    </div>
  )
}

export default NotLoginHeader