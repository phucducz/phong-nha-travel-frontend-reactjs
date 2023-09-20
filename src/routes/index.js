import { routes } from "~/config";
import Home from "~/pages/Home";
import Lienhe from "~/pages/Lienhe";
import Camnang from "~/pages/Camnang";
import ViewTour from "~/pages/ViewTour";
import Cart from "~/pages/Cart";
import BookTour from "~/pages/BookTour";
import CartPage from "~/pages/CartPage";
import AccountPage from "~/pages/AccountPage";
import Admin from "~/pages/Admin";
import AdminLayout from "~/layouts/AdminLayout";

const publicRoutes = [
    { path: routes.Home, component: Home },
    { path: routes.Lienhe, component: Lienhe },
    { path: routes.Camnang, component: Camnang },
    { path: routes.ViewTour, component: ViewTour },
    { path: routes.Cart, component: Cart },
    { path: routes.BookTour, component: BookTour },
    { path: routes.CartPage, component: CartPage },
    { path: routes.AccountPage, component: AccountPage },
    { path: routes.Admin, component: Admin, layout: AdminLayout}
];

export { publicRoutes }