import { FormControl, MenuItem, Select } from "@mui/material";

const LvlSelect = ({options = [],optionLabel,label,optionValue,value,autoWidth=true,className,onChange}) =>{
    return <>
    <FormControl sx={{ m: 1, minWidth: 160,margin : 0 }} size="small">
        <Select
                className={className}
                autoWidth={autoWidth}
                value={value}
                label={label}
                onChange={onChange}
        >
                {
                    options.map((option,index) =>{
                        return  <MenuItem value={option[optionValue] ?? null} key={index}>{option[optionLabel] ?? ""}</MenuItem>
                    })
                }
        </Select>
    </FormControl>
    </>
}

export default LvlSelect;