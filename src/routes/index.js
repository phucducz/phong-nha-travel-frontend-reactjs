import { routes } from '~/config';
import Home from '~/pages/Home';
import Lienhe from '~/pages/Lienhe';
import Camnang from '~/pages/Camnang';
import ViewTour from '~/pages/ViewTour';
import Cart from '~/pages/Cart';
import CheckOut from '~/pages/CheckOut';
import Account from '~/pages/Account';
import Admin from '~/pages/Admin';
import AdminLayout from '~/layouts/AdminLayout';
import TourCategory from '~/pages/TourCategory';
import Policy from '~/pages/Policy';
import ToursSearch from '~/pages/ToursSearch';

const publicRoutes = [
    { path: routes.Home, component: Home },
    { path: routes.Lienhe, component: Lienhe },
    { path: routes.Camnang, component: Camnang },
    { path: routes.ViewTour, component: ViewTour },
    { path: routes.Cart, component: Cart },
    { path: routes.CheckOut, component: CheckOut },
    { path: routes.Account, component: Account },
    { path: routes.Admin, component: Admin, layout: AdminLayout },
    { path: routes.TourCategory, component: TourCategory },
    { path: routes.ToursSearch, component: ToursSearch },
    { path: routes.Policy, component: Policy }
];

export { publicRoutes }