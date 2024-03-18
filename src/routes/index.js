import { routes } from '~/config';

import AdminLayout from '~/layouts/AdminLayout';

import Account from '~/pages/Account';
import Cart from '~/pages/Cart';
import CheckOut from '~/pages/CheckOut';
import HandBookPage from '~/pages/HandBook';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Policy from '~/pages/Policy';
import TourCategory from '~/pages/TourCategory';
import ToursSearch from '~/pages/ToursSearch';
import UserCreate from '~/pages/User/Create';
import UserEdit from '~/pages/User/Edit';
import UserManagement from '~/pages/User/Management';
import ViewTour from '~/pages/ViewTour';

const publicRoutes = [
    { path: routes.Home, component: Home },
    { path: routes.ViewTour, component: ViewTour },
    { path: routes.Cart, component: Cart },
    { path: routes.CheckOut, component: CheckOut },
    { path: routes.Login, component: Login },
    { path: routes.TourCategory, component: TourCategory },
    { path: routes.ToursSearch, component: ToursSearch },
    { path: routes.Policy, component: Policy },
    { path: routes.UserManagement, component: UserManagement, layout: AdminLayout },
    { path: routes.UserEdit, component: UserEdit, layout: AdminLayout },
    { path: routes.UserCreate, component: UserCreate, layout: AdminLayout },
    { path: routes.Account, component: Account },
    { path: routes.HandBook, component: HandBookPage }
];

export { publicRoutes };

