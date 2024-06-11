import NavBar from "../components/Navbar";
const Layout = ({children}) =>{
    return <>
        <div className="wrapper grid grid-cols-5">
            <NavBar ></NavBar>
            <div className={'col-span-4 block'}>
                <div className="wrap-content text-primary">
                    <main>{children}</main>
                </div>
            </div>
        </div>
    </>
}

export default Layout;