import { TextField } from "@mui/material";

const LvlTextField = ({label="",placeholder = "",size = "small",fullWidth,value,onChange}) =>{
    return <>
        <TextField 
            label={label} 
            fullWidth={fullWidth} 
            size={size} 
            placeholder={placeholder}
            value={value} 
            onChange={onChange} 
        />
    </>
}

export default LvlTextField;