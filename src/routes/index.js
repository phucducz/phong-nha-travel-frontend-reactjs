import { routes } from '~/config';
import Home from '~/pages/Home';
import Lienhe from '~/pages/Lienhe';
import Camnang from '~/pages/Camnang';
import ViewTour from '~/pages/ViewTour';
import Cart from '~/pages/Cart';
import CheckOut from '~/pages/CheckOut';
import Account from '~/pages/Account';
import AdminV2 from '~/pages/AdminV2';
import AdminLayoutV2 from '~/layouts/AdminLayoutV2';
import TourCategory from '~/pages/TourCategory';
import Policy from '~/pages/Policy';
import ToursSearch from '~/pages/ToursSearch';
import UserManagement from '~/pages/UserManagement';
import UserEdit from '~/pages/UserEdit';

const publicRoutes = [
    { path: routes.Home, component: Home },
    { path: routes.Lienhe, component: Lienhe },
    { path: routes.Camnang, component: Camnang },
    { path: routes.ViewTour, component: ViewTour },
    { path: routes.Cart, component: Cart },
    { path: routes.CheckOut, component: CheckOut },
    { path: routes.Account, component: Account },
    { path: routes.Admin, component: AdminV2, layout: AdminLayoutV2 },
    { path: routes.TourCategory, component: TourCategory },
    { path: routes.ToursSearch, component: ToursSearch },
    { path: routes.Policy, component: Policy },
    { path: routes.UserManagement, component: UserManagement, layout: AdminLayoutV2 },
    { path: routes.UserEdit, component: UserEdit, layout: AdminLayoutV2 }
];

export { publicRoutes }