// import { MarginOutlined } from '@mui/icons-material';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    border: "2px solid #000",
    borderRadius: "14px",
    padding: "2%",
    margin: "auto",
    textAlign: "center",

    // Targeting the root of the TextField to give margin and height
    "& .MuiTextField-root": {
      margin: "5px 0 3px 0",
    },

    // Targeting the input element within TextField for margin
    "& .MuiInputBase-input": {
      marginBlock: "5px",
      padding: "15px 10px 5px 10px  ",
      height: "10px",
      width: '100%',

     '& input:-webkit-autofill': {
        backgroundColor: 'red  !important',/* Example: light cyan */
        color: '#00695c !important', /* Example: dark green */
      }
    }, 
    '& .css-953pxc-MuiInputBase-root-MuiInput-root':{
      marginTop: '5px',
    },
    '& .MuiFormLabel-root': {
      marginInline: '4px',
    },
    '& .css-1eed5fa-MuiInputBase-root-MuiInput-root ': {
      marginTop: '0px',
    },
      
    // Targeting the asterisk for required fields
    "& .MuiFormLabel-asterisk": {
      MarginOutlined: "2px",
      color: "red",
    },

    //Targeting RadioButton for Gender
    "& .css-1nrlq1o-MuiFormControl-root ": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "left",
      marginBlock: "5px",

      "& .css-u4tvz2-MuiFormLabel-root": {
        fontSize: "16px",
        marginBlock: "10px",
        marginInline: "5px 15px",
        fontWeight: "600",
      },
      
    },
    '& input:-internal-autofill-selected ':{
      backgroundColor: 'transparent ' ,
    }
  },
    //Targeting Birth-date and mobile number
    bday_mobile: {
      display: "flex",
      flexDirection: "row",
      gap: "25px",

      // adjusting width of birthday field
      '& .css-z3c6am-MuiFormControl-root-MuiTextField-root': {
        width: '100%',
        '& .css-1eed5fa-MuiInputBase-root-MuiInput-root': {
          height: '45px'
        }
      },
    },
    // Targeting Parents component
    parents: {
      display: "flex",
      flexDirection: "row",
      gap: "25px",
    },
   // Targeting Addres  
    address: {
      width: "100%",
      padding: "11px",
      borderRadius: "4px",
      border: "1px solid rgba(0, 0, 0, 0.23)",
      fontFamily: "Arial, sans-serif",
    },
    //Targeting City and Pin
    city_pin : {
      display: "flex",
      flexDirection: "row",
      gap: "25px",

      "& .css-1u3bzj6-MuiFormControl-root-MuiTextField-root ": {
        width: "50%",
      },
    },
    // Targeting country and Aadhar number component
    aadhar_country: {
      display: "flex",
      flexDirection: "row",
      gap: "25px",

      '& .css-1u3bzj6-MuiFormControl-root-MuiTextField-root ': {
          width: '100%',
      }
    },
    // Targeting profession and Salary component
    job_salary: {
      display: "flex",
      flexDirection: "row",
      gap: "25px",

      '& .css-1u3bzj6-MuiFormControl-root-MuiTextField-root ': {
          width: '100%',
      }
    },
    // Targeting image 
    image : {
      width: '200px',
      height: '200px',
      objectFit: 'contain',
    },

    // Login Form

    
}));

export default useStyles;
