import { TextField } from "@mui/material";

const LvlTextField = ({label="",placeholder = "",size = "small",value,onChange}) =>{
    return <>
        <TextField label={label}  size={size} placeholder={placeholder} value={value} onChange={onChange} />
    </>
}

export default LvlTextField;