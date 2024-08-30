import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStyles from "./style.js";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  IconButton,
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
// const DAYJS_CODEC = {
//   parse: (dateString) => dayjs(dateString),
//   stringify: (date) => date.toISOString(),
// };

const Form = () => {
  const classes = useStyles();

  //Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    birthday: "",
    mobile: "",
    gender: "",
    fatherName: "",
    motherName: "",
    education: "",
    // additionalEducation: '',
    children: "",
    // additionalChildren: '',
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Set birth-date on value change.
  const [value, setValue] = useState(dayjs()); // Initialize with current date

  // Set Image
  // const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: file, imageUrl });
    }
  };
  //input name
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Adding Education
  const [educationList, setEducationList] = useState([{ value: "" }]);
  const handleEducationChange = (index, event) => {
    const values = [...educationList];
    values[index].value = event.target.value;
    setEducationList(values);
  };

  const handleAddField = (e) => {
    e.preventDefault()
    debugger;
    setEducationList([...educationList, { value: "" }]);
  };

  const handleRemoveField = (index) => {
    const values = [...educationList];
    values.splice(index, 1);
    setEducationList(values);
  };

  //form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.setItem("user", JSON.stringify(formData));
    navigate("/login");
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
        <form >
          <TextField
            className="name"
            label="Name :"
            variant="standard"
            margin="normal"
            placeholder="Enter your Name."
            name="name"
            fullWidth
            value={formData.name}
            // onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            required
          />

          <div className={classes.bday_mobile}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="birthday"
                label="Birth-Date"
                // value={formData.birthday}
                // onChange={handleChange}
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
              onChange={handleChange}
              required
            />
          </div>

          <FormControl
            name="gender"
            className="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <FormLabel id="demo-row-radio-buttons-group-label" required>
              Gender :
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>

          <div className={classes.parents}>
            <TextField
              className="fName"
              label="Father Name :"
              variant="standard"
              placeholder="Enter your Father Name."
              name="fatherName"
              fullWidth
              value={formData.fatherName}
              onChange={handleChange}
              required
            />
            <TextField
              className="mName"
              label="Mother Name :"
              variant="standard"
              placeholder="Enter your Mother Name."
              name="motherNames"
              fullWidth
              value={formData.motherName}
              onChange={handleChange}
              required
            />
          </div>

          {/* <TextField
            className="edu"
            label="Education"
            variant="standard"
            placeholder="Enter your Education"
            name="education"
            fullWidth
            value={formData.education}
            onChange={handleChange}
            required
          /> */}

          {educationList.map((education, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <TextField
                label={`Education ${index + 1}`}
                value={education.value}
                onChange={(event) => handleEducationChange(index, event)}
                fullWidth
                margin="normal"
                variant="standard"
                sx={{position: 'relative'}}
              />
          
              <IconButton onClick={handleAddField} aria-label="add">
                <AddCircleOutlineIcon />
              </IconButton>
              {educationList.length > 1 && (
              <IconButton onClick={() => handleRemoveField(index)} aria-label="remove">
                 <RemoveCircleOutlineIcon />
              </IconButton>
              )}
              
            
            </Box>
          ))}

          <TextField
            className="sName"
            label="Spouse Name :"
            variant="standard"
            placeholder="Enter your Spouse Name."
            name="spouseName"
            value={formData.spouseName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            className="cName"
            label="Children's Name :"
            variant="standard"
            placeholder="Enter your Children Name."
            name="childName"
            fullWidth
            value={formData.childName}
            onChange={handleChange}
          />

          <TextField
            className={classes.address}
            label="Address :"
            name="address"
            variant="standard"
            placeholder="Enter Your Address."
            value={formData.address}
            onChange={handleChange}
          />

          <div className={classes.city_pin}>
            <TextField
              label="City :"
              name="city"
              variant="standard"
              className={classes.city}
              value={formData.city}
              onChange={handleChange}
            />
            <TextField
              label="PIN :"
              name="pin"
              variant="standard"
              className={classes.pin}
              value={formData.pin}
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
            <TextField
              className="aadhar"
              label="Aadhar No. :"
              variant="standard"
              placeholder="Enter Your Aadhar Number"
              name="aadhar"
              value={formData.aadhar}
              onChange={handleChange}
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
              onChange={handleChange}
            />
            <TextField
              className="salary"
              label="Salary :"
              variant="standard"
              placeholder="Enter Your Salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>

          {/* <div className={classes.image}>
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
          </div> */}

          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            <FileUploadOutlinedIcon sx={{ marginInline: "3px" }} />
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          {formData.imageUrl && (
            <Box sx={{ mt: 2 }}>
              <img src={formData.imageUrl} alt="User" width="100%" />
            </Box>
          )}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            size="medium"
            sx={{ padding: "6px 50px", marginBlock: "5px" }}
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
