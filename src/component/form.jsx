import React, { useState } from 'react';
import useStyles from './style.js';
import { Container, Box, Typography, TextField, Button, Link } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormLabel, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import dayjs from 'dayjs';

const DAYJS_CODEC = {
  parse: (dateString) => dayjs(dateString),
  stringify: (date) => date.toISOString(),
};

const Form = () => {
  const classes = useStyles();

  // Set birth-date on value change.
  const [value, setValue] = useState(dayjs()); // Initialize with current date

  // Set Image 
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setSelectedImage(imgUrl);
    }
  };

  return (
    <Container className={classes.container} maxWidth='sm'>
      <Box>
        <Typography variant='h3' component='h4' sx={{ fontFamily: 'Times New Roman', fontWeight: '500' }}>
          Registration Form 
        </Typography>
        <form action="">
          <TextField className='name' label='Name :' variant="standard" margin='normal' placeholder='Enter your Name.' name='name' fullWidth required />
          <TextField className='email' label='E-mail' variant="standard"  type='email' margin='none' placeholder='Enter your E-mail.' name='email' fullWidth required />
          <TextField className='pass' label='Password' variant="standard"  type='password' margin='none' placeholder='Enter your Password.' name='password' autoComplete="current-password" fullWidth required />
          
          <div className={classes.bday_mobile}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker     
              label="My Picker"
              slotProps={{
                textField: {
                  label: 'Birth-Date :',
                  variant: 'standard',
                  size: 'small',
                }
              }}
           />
            </LocalizationProvider>
            <TextField className={classes.mobile} label='Mobile No. :' variant="standard"  type='tel' placeholder='Enter your Mobile No.' name='mobile' required />
          </div>

          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label" required>Gender :</FormLabel>
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>

          <div className={classes.parents}>
            <TextField className='fName' label='Father Name :' variant="standard"  placeholder='Enter your Father Name.' name='fatherName' fullWidth required />
            <TextField className='mName' label='Mother Name :' variant="standard"  placeholder='Enter your Mother Name.' name='motherNames' fullWidth required />
          </div>

          <TextField className='edu' label='Education' variant="standard"  placeholder='Enter your Education' name='education' fullWidth />
         
          <TextField className='sName' label='Spouse Name :' variant="standard"  placeholder='Enter your Spouse Name.' name='spouseName' fullWidth />
          <TextField className='cName' label="Children's Name :" variant="standard"  placeholder="Enter your Children Name." name='childName' fullWidth />
          
          <TextField className={classes.address} label='Address :' variant="standard" placeholder='Enter Your Address.'  />

          <div className={classes.city_pin}>
            <TextField label="City :" variant="standard" className={classes.city} />
            <TextField label="PIN :" variant="standard" className={classes.pin} />
          </div>

          <div className={classes.aadhar_country}>
            <TextField className='country' label='Country :' variant="standard" placeholder='Enter Your Country' name='country' required />
            <TextField className='aadhar' label='Aadhar No. :' variant="standard"  placeholder='Enter Your Aadhar Number' name='aadhar' required />
          </div>

          <div className={classes.aadhar_country}>
            <TextField className='job' label='Occupation :' variant="standard" placeholder='Enter Your Profession' name='job' />
            <TextField className='salary' label='Salary :' variant="standard"  placeholder='Enter Your Salary' name='salary' />
          </div>

          <div className={classes.image}>
            <Link variant="contained" component="label" sx={{ padding: "6px 50px", marginBlock: '5px' }}>
              <FileUploadOutlinedIcon sx={{ marginInline: '3px' }} />
              Upload Image
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </Link>
            {selectedImage && (
              <div mt={2}>
                <img src={selectedImage} alt="Selected" />
              </div>
            )}
          </div>

          <Button className={classes.button} variant="contained" size='medium' sx={{ padding: "6px 50px", marginBlock: '5px' }}>Submit</Button>
        </form>
      </Box>
    </Container>
  );
};

export default Form;
