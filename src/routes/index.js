import Home from "~/pages/Home";
import Contact from "~/pages/Contact";
import Lienhe from "~/pages/Lienhe";
import Camnang from "~/pages/Camnang";
import ViewTour from "~/pages/ViewTour";
import Cart from "~/pages/Cart";
import BookTour from "~/pages/BookTour";
import CartPage from "~/pages/CartPage";
import AccountPage from "~/pages/AccountPage";

const publicRoutes = [
    { path: "/", component: Home },
    { path: "/lienhe", component: Lienhe },
    { path: "/camnang", component: Camnang },
    { path: "/contact", component: Contact },
    { path: "/cart/tour/:tourId", component: ViewTour },
    { path: "/cart", component: Cart },
    { path: "/checkout/:tourId", component: BookTour },
    { path: "/cartpage", component: CartPage },
    { path: "/account", component: AccountPage }
];

export { publicRoutes }