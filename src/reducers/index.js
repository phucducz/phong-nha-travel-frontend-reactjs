import { combineReducers } from "redux";

import checkoutReducer from "./checkout";
import couponReducer from "./coupon";
import paymentReducer from "./payment";
import cartReducer from "./cart";
import messageReducer from "./message";
import searchReducer from './search';
import tourCategoriesReducer from "./tourCategories";
import menuReducer from './menu';
import checkoutDetailReducer from "./checkoutDetail";
import loadingReducer from "./loading";
import userReducer from "./user";
import roleReducer from './role';

const rootReducer = combineReducers({
    checkout: checkoutReducer,
    coupon: couponReducer,
    payment: paymentReducer,
    cart: cartReducer,
    message: messageReducer,
    search: searchReducer,
    tourCategories: tourCategoriesReducer,
    menu: menuReducer,
    checkoutDetail: checkoutDetailReducer,
    loading: loadingReducer,
    userfAdmin: userReducer,
    rolefAdmin: roleReducer
});

export default rootReducer;