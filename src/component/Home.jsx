import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();

    const handleLogIn = () => {
        navigate('/login');
    }
    const handleRegister = () => {
        navigate('/form');
    }
  return (
    <Container maxWidth= 'sm'>
        <Box sx={{textAlign: 'center',}}>
            <Typography variant='h3' component='h2'>Home Page</Typography>
            <Typography variant='h5' component='h4'>Welcome to HomPage</Typography>
            <Box sx={{margin: '3px'}}>
                <Button variant='contained' color='primary' sx={{margin: '5px'}} onClick={handleLogIn}>Login</Button>
                <Button variant='contained' color='primary' sx={{margin: '5px'}} onClick={handleRegister} >Register</Button>
            </Box>
         
        </Box>
    </Container>
  )
}

export default Home
