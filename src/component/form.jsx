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
    additionalEducation: "",
    children: "",
    additionalChildren: "",
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
  const truncateUrl = (url, length) => {
    if (url.length <= length) {
      return url;
    }
    const start = url.substring(0, length / 2);
    const end = url.substring(url.length - length / 2, url.length);
    return `${start}...${end}`;
  };
  const maxLength = 20; // maximum length of URL
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

    console.log("education list :", educationList);
    console.log("education set value :", setEducationList(values));
  };

  const handleAddField = (e) => {
    e.preventDefault();
    setEducationList([...educationList, { value: "" }]);
  };

  const handleRemoveField = (index) => {
    const values = [...educationList];
    values.splice(index, 1);
    setEducationList(values);
  };

  // Adding Children

  const [childList, setChildList] = useState([{ value: "" }]);

  const handleChildChange = (index, event) => {
    const values = [...childList];
    values[index].value = event.target.value;
    setChildList(values);

    console.log("child list :", childList);
    console.log("child set value :", setChildList(values));
  };

  const handleAddChild = (e) => {
    // e.preventDefault();
    setChildList([...childList, { value: " " }]);
  };

  const handleRemoveChild = (index) => {
    const values = [...childList];
    values.splice(index, 1);
    setChildList(values);

    console.log("remove child :", setChildList(values));
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

          <Box className={classes.bday_mobile}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="birthday"
                label="Birth-Date"
                fullWidth
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
              fullWidth
              required
            />
          </Box>
          {/* Gender Image */}
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
        <Box sx={{ display: 'flex', marginTop: '5px' }}>
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
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
          </div>
          {/* education */}
          {educationList.map((education, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                // label={` Add Education ${index + 1}`}
                label="Education"
                value={education.value}
                onChange={(event) => handleEducationChange(index, event)}
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
          {/* children */}
          {childList.map((child, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                // label={`Child ${index + 1} Name`}
                label="Child"
                variant="standard"
                placeholder="Enter your Child's Name."
                // name={`childName_${index}`}
                fullWidth
                value={child.value}
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

          <TextField
            className={classes.address}
            label="Address :"
            name="address"
            variant="standard"
            placeholder="Enter Your Address."
            value={formData.address}
            onChange={handleChange}
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
              onChange={handleChange}
              
            />
            <TextField
              className="pin"
              label="Pin :"
              variant="standard"
              placeholder="Enter your Pin."
              name="pin"
              fullWidth
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
              onChange={handleChange}
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
              onChange={handleChange}
              fullWidth
            />
            <TextField
              className="salary"
              label="Salary :"
              variant="standard"
              placeholder="Enter Your Salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              fullWidth

            />
          </div>

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
