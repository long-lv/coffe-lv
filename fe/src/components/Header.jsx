import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import LvlSearch from "./Oraginis/LvlSearchBar";
const Header = () => {
   const [searchTerm,setSearchTerm] = useState("");
   // handle search 
   const handleSearch = (value) =>{
    console.log('search keyword:', value);
    setSearchTerm(value);
   }
    return <>
        <div className='flex items-center text-white'>
           <MenuIcon className='mr-3'/>
           <div className='flex w-full justify-between items-center'>
            <div className='flex-1'>
                <LvlSearch onSearch={handleSearch}/>
            </div>
            <div className='info-wrap'>
                <h4 className='pr-4 ml-2'>LongLv-Longlv@runsystem.net</h4>
            </div>
           </div>
        </div>
    </>
}

export default Header;