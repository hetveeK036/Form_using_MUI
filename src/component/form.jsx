import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "./use-debounce.js";
import axios from 'axios';
import useStyles from "./style.js";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  InputLabel,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import dayjs from "dayjs";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SelectInput from "@mui/material/Select/SelectInput.js";
// const DAYJS_CODEC = {
//   parse: (dateString) => dayjs(dateString),
//   stringify: (date) => date.toISOString(),
// };

const Form = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [educationList, setEducationList] = useState([{ degree: "", institution: "" }]);
  const [childList, setChildList] = useState([{ value: "" }]);
  const [hobbyName, setHobbyName] = useState([]) // used for Hobby

 // state to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    // birthday: "",
    birthday: dayjs().format("DD-MM-YYYY"), // Set default date format
    mobile: "",
    gender: "",
    fatherName: "",
    motherName: "",
    education:  [{ degree: "", institution: "" }],
    children: [{value: " "}],
    address: "",
    city: "",
    pin: "",
    country: "",
    aadhar: "",
    job: "",
    salary: "",
    image: null,
    imageUrl: "",
  });
const Hobby = [
    'Reading',
    'Cooking',
    'Traveling',
    'Photography',
    'Watching Movies/Series',
    'Cycling',
    'Tracking',
    'Drawing',
    'Singing',
    'Dancing',
    'Writing',
    'Crafting',
    'Learning new things',
    'Acting',
    'Gardening',
  ]
  const debouncedFormData = useDebounce(formData, 1200);
 // Handle input change for all fields expect education and children(dynamic fields).
 const handleInputChange = (e) => {
   const { name, value } = e.target;
   setFormData({ ...formData, [name]: value }); // use spread operator it create a new object that contain all properties of formData
  //  console.log("Form Data: ", formData);

  if (name === "hobby") {
    setHobbyName(
      typeof value === 'string' ? value.split(',') : value
    );
  }
 };
 useEffect(() => {
  console.log("Debounced Form Data: ", debouncedFormData);
}, [debouncedFormData]);


// handle change of the Gender
 const handleGenderChange = (e) => {
   setFormData({ ...formData, gender: e.target.value });
 };
//Handle the change of BirthDay selection
const handleDateChange = (date) => {
  if (date && date.isValid()) {
    setFormData({
      ...formData,
      birthday: date.format("DD-MM-YYYY"),
    });
  } else {
    setFormData({
      ...formData,
      birthday: null,
    });
  }
};
//Handle image file upload and Preview URL
const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: file, imageUrl });
    }
};
const truncateUrl = (url, length) => {
    if (url.length <= length) {
      return url;
    }
    const start = url.substring(0, length / 2);
    const end = url.substring(url.length - length / 2, url.length);
    return `${start}...${end}`;
};
const maxLength = 20; // maximum length of URL
//Handle education Change
const handleEducationChange = (index, field, event) => {
  const newEducationList = [...educationList];
  newEducationList[index][field] = event.target.value; // Update degree or institution field
  setEducationList(newEducationList);
};
// Add a new education entry
const handleAddField = () => {
  // setEducationList([...educationList, { degree: "", institution: "" }]);
  const newEducationList = [...educationList, { degree: "", institution: "" }];
  setEducationList(newEducationList);
  console.log("Updated Education List:", newEducationList); 
};
// Remove education entry
const handleRemoveField = (index) => {
  const newEducationList = [...educationList];
  newEducationList.splice(index, 1);
  setEducationList(newEducationList);
  console.log("Updated Education List after Removal :",newEducationList)
};

//Handle Children change  of each entry
const handleChildChange = (index, event) => {
  const values = [...childList];
  values[index].value = event.target.value;
  setChildList(values);
};
// Add child entry
const handleAddChild = () => {
  // setChildList([...childList, { value: " " }]);
  const newChildList = [...childList, {value: " "}];
  setChildList(newChildList);
  console.log("Updated Children List:", newChildList); 
};
// remove child entry
const handleRemoveChild = (index) => {
  const newChildList = [...childList];
  newChildList.splice(index, 1);
  setChildList(newChildList);
  console.log("Updated Education List after Removal :", newChildList); 
};
// Handle form submission store data in local storage
const handleSubmit = (e) => {
  e.preventDefault();
  // const updatedFormData = {
  //   ...formData,
  //   education: educationList.map((item) => item.value),
  //   children: childList.map((item) => item.value),
  // };
  const updatedFormData = {
    ...formData,
    education: educationList, // No need to map, just use the array as is
    children: childList, // No need to map, just use the array as is
  };
  const formDataToSend = new FormData();
  for (const [key, value] of Object.entries(updatedFormData)) {
    if (key === 'image' && value) {
      formDataToSend.append(key, value); // Append file directly
    } else if (Array.isArray(value)) {
      formDataToSend.append(key, JSON.stringify(value)); // Append array as JSON string
    } else {
      formDataToSend.append(key, value);
    }
  }
  // Send form data to the backend
  axios
    .post("http://localhost:8081/form", formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      console.log("Response from server: ", res.data);
      if (res.data === "Success") {
        alert("Form Data Successfully Uploaded");
      } else {
        alert("Error");
      }
    // navigate to the login page on submit of form
      navigate("/home");
    })
    .catch((err) => {
      console.log("There was an error! = ", err);
    });


   // Store updated form data in localStorage
  localStorage.setItem("user Data : ", JSON.stringify(updatedFormData));
  console.log("formData  = ", formData)
  console.log("Form data submitted: ", updatedFormData);
  
  // Clear form data (if needed)
  setFormData({ })
 
};





  return (
    <Container className={classes.container} maxWidth="sm">
      <Box>
        <Typography
          variant="h3"
          component="h4"
          sx={{ fontFamily: "Times New Roman", fontWeight: "500" }}
        >
          Registration Form
        </Typography>
        <form>
          <TextField
            className="name"
            label="Name :"
            variant="standard"
            margin="normal"
            placeholder="Enter your Name."
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            className="email"
            label="E-mail"
            variant="standard"
            type="email"
            margin="none"
            placeholder="Enter your E-mail."
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <TextField
            className="pass"
            label="Password"
            variant="standard"
            type="password"
            margin="none"
            placeholder="Enter your Password."
            name="password"
            autoComplete="current-password"
            fullWidth
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <TextField
            className="cpass"
            label="Confirm Password"
            variant="standard"
            type="password"
            margin="none"
            placeholder="Enter your Password."
            name="cPassword"
            autoComplete="current-password"
            fullWidth
            value={formData.cPassword}
            onChange={handleInputChange}
            required
          />
          {/* Birth-day and mobile no  */}
          <Box className={classes.bday_mobile}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="birthday"
                label="Birth-Date"
                fullWidth
                // value={formData.birthday}
                value={dayjs(formData.birthday, "DD-MM-YYYY")}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    label: "Birth-Date :",
                    variant: "standard",
                    size: "small",
                  },
                }}
              />
            </LocalizationProvider>
            <TextField
              className={classes.mobile}
              label="Mobile No. :"
              variant="standard"
              type="tel"
              placeholder="Enter your Mobile No."
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Box>
          {/* Gender and Image */}
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <FormControl
              name="gender"
              className="gender"
              >
              <FormLabel required>Gender :</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={formData.gender}
                onChange={handleGenderChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>

        {formData.imageUrl ? (
          <Box sx={{ display: 'flex', marginTop: '15px' }}>
            <FileUploadOutlinedIcon
              sx={{
                marginRight: '8px',
                fontSize: '20px',
                color: "#1976d2" //blue
              }}
            />
            <Typography variant="body2" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {truncateUrl(formData.imageUrl, maxLength)}
            </Typography>
          </Box>
         ) : (
            <Button
              variant="outlined"
              component="label"
              sx={{
                marginTop: '10px',
                position: 'relative',
                height: '32px',
                width: '175px',
              }}
            >
              Upload Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
              <FileUploadOutlinedIcon
                sx={{
                  marginInline: '3px',
                  position: 'absolute',
                  fontSize: '18px',
                  right: '5px',
                  top: '5px',
                }}
              />
            </Button>
          )}
          </Box>

          <div className={classes.parents}>
            <TextField
              className="fName"
              label="Father Name :"
              variant="standard"
              placeholder="Enter your Father Name."
              name="fatherName"
              fullWidth
              value={formData.fatherName}
              onChange={handleInputChange}

              required
            />
            <TextField
              className="mName"
              label="Mother Name :"
              variant="standard"
              placeholder="Enter your Mother Name."
              name="motherName"
              fullWidth
              value={formData.motherName}
              onChange={handleInputChange}
              required
            />
          </div>
     


          <TextField
            className="sName"
            label="Spouse Name :"
            variant="standard"
            placeholder="Enter your Spouse Name."
            name="spouseName"
            value={formData.spouseName}
            onChange={handleInputChange}            
            fullWidth
          />
          {/* children */}
          {childList.map((children, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                label="Child"
                variant="standard"
                placeholder="Enter your Child's Name."
                // name={childName_${index}}
                fullWidth
                value={children.value}
                onChange={(e) => handleChildChange(index, e)}
              />
              <IconButton
                onClick={() => handleAddChild()}
                name="additionalChildren"
                aria-label="Add"
                color="primary"
                sx={{ paddingInline: "1px" }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
              {childList.length > 1 && (
                <IconButton
                  onClick={() => handleRemoveChild(index)}
                  aria-label="Remove"
                  color="error"
                  sx={{ paddingInline: "1px" }}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              )}
            </Box>
          ))}
        {/* education */}
          {/* {educationList.map((education, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                label="Education"
                value={education.value}
                onChange={(event) => handleEducationChange(index, event) }
                fullWidth
                margin="normal"
                variant="standard"
                sx={{ position: "relative" }}
              />
              <IconButton
                onClick={handleAddField}
                name="additionalEducation"
                aria-label="add"
                color="primary"
                sx={{ paddingInline: "1px" }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
              {educationList.length > 1 && (
                <IconButton
                  onClick={() => handleRemoveField(index)}
                  aria-label="remove"
                  color="error"
                  sx={{ paddingInline: "1px" }}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              )}
            </Box>
          ))} */}
          {/* Education Fields with Degree and Institution */}
          {educationList.map((education, index) => (
            <Box key={index} sx={{ display: "flex", flexDirection: "row", position: 'relative' }}>
              <Box sx={{display: 'flex', gap: '25px', width: '90%'}}>
                <TextField
                label="Degree"
                value={education.degree}
                onChange={(event) => handleEducationChange(index, "degree", event)}
                fullWidth
                margin="normal"
                variant="standard"
              />
              <TextField
                label="Institution / University"
                value={education.institution}
                onChange={(event) => handleEducationChange(index, "institution", event)}
                fullWidth
                margin="normal"
                variant="standard"
              />
              </Box>

              <Box sx={{ position:'absolute', bottom: '10px', right: '1px'}}>
                <IconButton onClick={handleAddField} color="primary">
                  <AddCircleOutlineIcon /> 
                </IconButton>
                {educationList.length > 1 && (
                  <IconButton onClick={() => handleRemoveField(index)} color="error">
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
          ))}
      

          <TextField
            className={classes.address}
            label="Address :"
            name="address"
            variant="standard"
            placeholder="Enter Your Address."
            value={formData.address}
            onChange={handleInputChange}
            fullWidth
          />
          <div className={classes.city_pin}>
            <TextField
              className="city"
              label="City :"
              variant="standard"
              placeholder="Enter your City"
              name="city"
              fullWidth
              value={formData.city}
              onChange={handleInputChange}           
            />
            <TextField
              className="pin"
              label="Pin :"
              variant="standard"
              placeholder="Enter your Pin."
              name="pin"
              fullWidth
              value={formData.pin}
              onChange={handleInputChange}
            />
          </div>

          <div className={classes.aadhar_country}>
            <TextField
              className="country"
              label="Country :"
              variant="standard"
              placeholder="Enter Your Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              className="aadhar"
              label="Aadhar No. :"
              variant="standard"
              placeholder="Enter Your Aadhar Number"
              name="aadhar"
              value={formData.aadhar}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </div>
          <div className={classes.job_salary}>
            <TextField
              className="job"
              label="Occupation :"
              variant="standard"
              placeholder="Enter Your Profession"
              name="job"
              value={formData.job}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              className="salary"
              label="Salary :"
              variant="standard"
              placeholder="Enter Your Salary"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <FormControl fullWidth variant="standard">
          <InputLabel id="demo-multiple-checkbox-label">Hobby :</InputLabel>
              <Select
                name="hobby"
                multiple
                sx= {{marginTop: '0px'}}
                value={hobbyName} // use formData to track the hobby value 
                 onChange={handleInputChange}
                 renderValue={(selected) => selected.join(', ')}
                 >
                {Hobby.map((hobby, index) => (
                  <MenuItem key={index} value = {hobby} sx={{height:'25px', marginTop: '0px'}}>
                    <Checkbox  checked={hobbyName.indexOf(hobby)> -1 }/>
                      <ListItemText primary={hobby} sx={{backgroundColor: 'transparent', minHeight: 'unset'}}/>
                  </MenuItem>
                ))}
              </Select>
          </FormControl>

          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            size="medium"
            sx={{ padding: "6px 50px", marginBlock: "15px" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>

      </Box>
    </Container>
  );
};

export default Form;