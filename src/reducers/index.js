import { combineReducers } from "redux";

import cartReducer from "./cart";
import checkoutReducer from "./checkout";
import checkoutDetailReducer from "./checkoutDetail";
import couponReducer from "./coupon";
import loadingReducer from "./loading";
import { loginReducer } from "./login";
import menuReducer from './menu';
import messageReducer from "./message";
import paymentReducer from "./payment";
import roleReducer from './role';
import searchReducer from './search';
import { signUpReducer } from "./signup";
import tourCategoriesReducer from "./tourCategories";
import userReducer from "./user";

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
    user: userReducer,
    rolefAdmin: roleReducer,
    login: loginReducer,
    signUp: signUpReducer
});

export default rootReducer;