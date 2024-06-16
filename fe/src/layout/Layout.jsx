import Header from "../components/Layer/Header";
import NavBar from "../components/Layer/Navbar";
const Layout = ({children}) =>{
    return <>
        <div className="wrapper grid grid-cols-5 h-screen">
           <div className="bg-primary">
            <NavBar></NavBar>
           </div>
            <div className={'col-span-4 block h-full flex flex-col' } >
                <div className="bg-white-400 py-2 h-16">
                    <Header></Header>
                </div>
                <div className="wrap-content text-primary h-full bg-white-200 px-9">
                    <main className="overflow-y-auto">{children}</main>
                </div>
            </div>
        </div>
    </>
}

export default Layout;