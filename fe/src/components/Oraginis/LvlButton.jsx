import { Button } from "@mui/material";

const LvlButton = ({label,disabled=false,styled,primary = false,onClick,className}) =>{
    return <>
        <Button disabled={disabled} sx={styled} variant={primary ? 'contained' : 'outlined'} classes={className} onClick={onClick}>{label}</Button>
    </>
}

export default LvlButton;