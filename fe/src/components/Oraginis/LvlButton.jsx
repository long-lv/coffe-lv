import { Button } from "@mui/material";

const LvlButton = ({label,disabled=false,styled,primary = false,onClick}) =>{
    return <>
        <Button disabled={disabled} styled={styled} variant={primary ? 'contained' : 'outlined'} onClick={onClick}>{label}</Button>
    </>
}

export default LvlButton;