import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
const LvlCalendar = ({defaultValue = "",label,value,onchange}) =>{
    return <>
 <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          defaultValue={defaultValue ? dayjs(defaultValue) : null}
          label={label}
          value={value}
          onChange={onchange}
        />
      </DemoContainer>
    </LocalizationProvider>
    </>
}

export default LvlCalendar;