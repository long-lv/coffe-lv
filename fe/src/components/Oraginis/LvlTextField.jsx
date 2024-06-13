import { TextField } from "@mui/material";
import { useState } from "react";

const LvlTextField = ({label = "", placeholder = "",size = "small",value,onChange}) =>{
    const [value,setValue] = useState("");
    return <>
        <TextField  size={size} placeholder={placeholder} value={value} />
    </>
}

export default LvlTextField;