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
      padding: "10px ",
      height: "10px",
      width: '100%',
    }, 
    '& .MuiFormLabel-root': {
      marginInline: '4px',
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
  },
  //Targeting Birth-date and mobile number
  bday_mobile: {
    display: "flex",
    flexDirection: "row",
    gap: "25px",

    "& .css-11a8txn-MuiStack-root": {
      width: "270px",
    },
    "& .css-1u3bzj6-MuiFormControl-root-MuiTextField-root": {
      width: "50%",  //270px
    },
  },

  // Targeting Parents component
  parents: {
    display: "flex",
    flexDirection: "row",
    gap: "25px",
  },
      // Targeting Address
      address: {
        width: "100%",
        padding: "11px",
        borderRadius: "4px",
        border: "1px solid rgba(0, 0, 0, 0.23)",
        fontFamily: "Arial, sans-serif",
        // fontSize: "1rem",
        // lineHeight: "1.4375em",
        // letterSpacing: "0.00938em",
        // marginBlock: "5px",

    
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
    // Targeting image 
    image : {
      width: '200px',
      height: '200px',
      objectFit: 'contain',
    }

}));

export default useStyles;
