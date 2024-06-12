import SearchIcon from '@mui/icons-material/Search';
import { IconButton, TextField } from '@mui/material';
import { useState } from 'react';
const LvlSearch = ({onSearch}) =>{
    const [keyword, setKeyword] = useState("");
    const handleClickBtnSearch = () =>{
        onSearch(keyword);
    }
    return <TextField value={keyword} onChange={(e) => setKeyword(e.target.value)} size='small' fullWidth={true} placeholder='Type to seach...' InputProps={{
            style: {
                padding: '0 14px',
              },
            endAdornment: (
                <IconButton>
                <SearchIcon onClick={handleClickBtnSearch}/>
              </IconButton>
            )
          }}/>
}

export default LvlSearch;