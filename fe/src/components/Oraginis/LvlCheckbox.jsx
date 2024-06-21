import { Checkbox } from "@mui/material";

const LvlCheckbox = ({value,onChange}) =>{
    return <>
        <Checkbox
            checked={value}
            onChange={onChange}
            inputProps={{ 'aria-label': 'controlled' }}
/>
    </>
}

export default LvlCheckbox;