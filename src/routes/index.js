import { routes } from '~/config';
import AdminLayoutV2 from '~/layouts/AdminLayoutV2';
import Account from '~/pages/Account';
import AdminV2 from '~/pages/AdminV2';
import BTPV from '~/pages/BTPV';
import Camnang from '~/pages/Camnang';
import Cart from '~/pages/Cart';
import CheckOut from '~/pages/CheckOut';
import Home from '~/pages/Home';
import Lienhe from '~/pages/Lienhe';
import Login from '~/pages/Login';
import Policy from '~/pages/Policy';
import Test from '~/pages/Test';
import TourCategory from '~/pages/TourCategory';
import ToursSearch from '~/pages/ToursSearch';
import UserCreate from '~/pages/User/Create';
import UserEdit from '~/pages/User/Edit';
import UserManagement from '~/pages/User/Management';
import ViewTour from '~/pages/ViewTour';
import HandBookPage from '~/pages/HandBook';

const publicRoutes = [
    { path: routes.Home, component: Home },
    { path: routes.Lienhe, component: Lienhe },
    { path: routes.Camnang, component: Camnang },
    { path: routes.ViewTour, component: ViewTour },
    { path: routes.Cart, component: Cart },
    { path: routes.CheckOut, component: CheckOut },
    { path: routes.Login, component: Login },
    { path: routes.Admin, component: AdminV2, layout: AdminLayoutV2 },
    { path: routes.TourCategory, component: TourCategory },
    { path: routes.ToursSearch, component: ToursSearch },
    { path: routes.Policy, component: Policy },
    { path: routes.UserManagement, component: UserManagement, layout: AdminLayoutV2 },
    { path: routes.UserEdit, component: UserEdit, layout: AdminLayoutV2 },
    { path: routes.UserCreate, component: UserCreate, layout: AdminLayoutV2 },
    { path: routes.Test, component: Test },
    { path: routes.BTPV, component: BTPV },
    { path: routes.Account, component: Account },
    { path: routes.HandBook, component: HandBookPage }
];

export { publicRoutes };

