import Category from "../pages/category/Category";
import Customer from "../pages/customers/Customers";
import Dashboard from "../pages/home/Dashboard";
import Menu from "../pages/menu/Menu";
import Order from "../pages/oder/Oder";
import Post from "../pages/post/Post";
import Product from "../pages/product/Product";
import Setting from "../pages/setting/Setting";
import User from "../pages/user/User";
const privateRoutes =  [
    { path : "/",component : Dashboard},
    { path : "/admin/product",component : Product},
    { path : "/admin/menu",component : Menu},
    { path : "/admin/user",component : User},
    { path : "/admin/category",component : Category},
    { path : "/admin/post",component : Post},
    { path : "/admin/setting",component : Setting},
    { path : "/admin/oder",component : Order},
    { path : "/admin/customer",component : Customer}
]

export { privateRoutes };

