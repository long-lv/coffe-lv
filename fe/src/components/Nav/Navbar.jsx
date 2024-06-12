import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavItems from "./NavItems";

const NavBar = () => {
    const navigate = useNavigate();
    const [navBars,setNavBars] = useState([
        {
            navName: 'dashboard',
            active : true,
            path : "/"
        },
        {
            navName: 'user',
            active : false,
            path : "/admin/user"
        },
        {
            navName: 'category',
            active : false,
            path : "/admin/category"
        },
        {
            navName: 'product',
            active : false,
            path : "/admin/product"
        },
        {
            navName: 'post',
            active : false,
            path : "/admin/post"
        },
        {
            navName: 'setting',
            active : false,
            path : "/admin/setting"
        },
        {
            navName: 'oder',
            active : false,
            path : "/admin/oder"
        },
        {
            navName: 'customer',
            active : false,
            path : "/admin/customer"
        },
        {
            navName: 'menu',
            active : false,
            path : "/admin/menu"
        },
    ])

    const setActiveNav = (index,path) =>{
        const setActiveBar = navBars.map((item,key) =>{
            if(key === index){
                item.active = true;
            }else{
                item.active = false;
            }
            return item;
        })
        navigate(path);
        setNavBars(setActiveBar);

    }
    return <>
        <div className='col-span-1'>
            <ul>
                {
                    navBars.map((nav,key) =>{
                        return <NavItems key={key} indexNav={key} navItems={nav} setActiveNav={setActiveNav}/>
                    })
                }
            </ul>
        </div>
    </>
}

export default NavBar;