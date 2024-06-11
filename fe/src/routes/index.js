import Dashboard from "../pages/home/Dashboard";
import Menu from "../pages/menu/Menu";
import Product from "../pages/product/Product";

const privateRoutes =  [
    { path : "/",component : Dashboard},
    { path : "/admin/product",component : Product},
    { path : "/admin/menu",component : Menu}
]

export { privateRoutes };
