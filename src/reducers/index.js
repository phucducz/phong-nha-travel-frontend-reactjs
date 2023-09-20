import { combineReducers } from "redux";

import checkoutReducer from "./checkout";
import couponReducer from "./coupon";
import paymentReducer from "./payment";
import cartReducer from "./cart";
import messageReducer from "./message";
import searchReducer from './search';
import tourCategoriesReducer from "./tourCategories";
import menuReducer from './menu';

const rootReducer = combineReducers({
    checkout: checkoutReducer,
    coupon: couponReducer,
    payment: paymentReducer,
    cart: cartReducer,
    message: messageReducer,
    search: searchReducer,
    tourCategories: tourCategoriesReducer,
    menu: menuReducer
});

export default rootReducer;