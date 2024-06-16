const NavItems = ({navItems, setActiveNav,indexNav}) =>{
    const {navName,active,path} = navItems;
    return <>
        <li className={active ? 'px-2 py-2 text-primary cursor-pointer bg-white' :''} 
            style={
                {
                    cursor:"pointer",
                    margin : "10px 0"
                }
            } 
            onClick={() =>setActiveNav(indexNav,path,true)}>
            <h4 className="uppercase">{navName}</h4>
        </li>
    </>
}

export default NavItems;