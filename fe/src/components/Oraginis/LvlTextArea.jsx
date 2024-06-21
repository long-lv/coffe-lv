import { TextField } from "@mui/material";

const LvlTextArea = ({label="",placeholder = "",size = "small",fullWidth,rows,className,value,onChange}) =>{
    return <>
       <TextField 
            onChange={onChange}
            sx={{marginTop:"5px"}}
            className={className}
            placeholder={placeholder}
            fullWidth={fullWidth} 
            size={size} 
            label={label}
            multiline
            rows={rows}
            defaultValue={value}
            variant="outlined"
        />
    </>
}

export default LvlTextArea;