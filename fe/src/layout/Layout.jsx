import Header from "../components/Header";
import NavBar from "../components/Nav/Navbar";
const Layout = ({children}) =>{
    return <>
        <div className="wrapper grid grid-cols-5 h-screen">
           <div className="bg-red-500">
            <NavBar></NavBar>
           </div>
            <div className={'col-span-4 block h-full flex flex-col' } >
                <div className="bg-primary py-2 h-16">
                    <Header></Header>
                </div>
                <div className="wrap-content text-primary h-full bg-green-300">
                    <main className="overflow-y-auto">{children}</main>
                </div>
            </div>
        </div>
    </>
}

export default Layout;