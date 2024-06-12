const NavItems = ({navItems, setActiveNav,indexNav}) =>{
    const {navName,active,path} = navItems;
    return <>
        <li className={active ? 'px-2 py-2 text-primary cursor-pointer bg-white' :''} style={{cursor:"pointer"}} onClick={() =>setActiveNav(indexNav,path)}>{navName}</li>
    </>
}

export default NavItems;