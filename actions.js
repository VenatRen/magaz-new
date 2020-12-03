import {
    ACTION_TYPE_SET_PRODUCT_LIST,
    ACTION_TYPE_SET_CATEGORY_LIST,
    ACTION_TYPE_CART_SET_PRODUCTS,
    ACTION_TYPE_CART_ADD_PRODUCT,
    ACTION_TYPE_CART_DELETE_PRODUCT,
    ACTION_TYPE_CART_CLEAR,
    ACTION_TYPE_CART_DECREASE_QUANTITY,
    ACTION_TYPE_CART_INCREASE_QUANTITY,
    ACTION_TYPE_CART_CHANGE_QUANTITY,
    ACTION_TYPE_CART_COMPUTE_TOTAL_PRICE,
    ACTION_TYPE_ORDERS_SET_LIST,
    ACTION_TYPE_ORDERS_ADD_TO_LIST,
    ACTION_TYPE_DELIVERY_CHANGE_FIELD,
    ACTION_TYPE_DELIVERY_CLEAR,
    ACTION_TYPE_ORDER_CHANGE_STATUS,
    ACTION_TYPE_ORDER_DELETE,
    ACTION_TYPE_MODAL_SHOW,
    ACTION_TYPE_MODAL_CLOSE,
    ACTION_TYPE_MODAL_TOGGLE,
    ACTION_TYPE_USER_SET_DATA,
    ACTION_TYPE_USER_SET_TOKENS,
} from "./types.js"

export const SetProductList = (products, id) => {
    return {type: ACTION_TYPE_SET_PRODUCT_LIST, payload: products, id};
};

export const SetCategoryList = (categories) => {
    return {type: ACTION_TYPE_SET_CATEGORY_LIST, payload: categories};
};

export const SetCartProducts = (cartItems) => {
    return {type: ACTION_TYPE_CART_SET_PRODUCTS, payload: cartItems};
};

export const AddProductToCart = (product, dispatch, t) => {
    return {type: ACTION_TYPE_CART_ADD_PRODUCT, payload: product, dispatch, t};
};

export const DeleteProductFromCart = (id, showAlert) => {
    return {type: ACTION_TYPE_CART_DELETE_PRODUCT, payload: id, showAlert};
};

export const ClearCart = () => {
    return {type: ACTION_TYPE_CART_CLEAR};
};

export const DecreaseProductQuantity = (id, dispatch, t) => {
    return {type: ACTION_TYPE_CART_DECREASE_QUANTITY, payload: id, dispatch, t};
};

export const IncreaseProductQuantity = (id) => {
    return {type: ACTION_TYPE_CART_INCREASE_QUANTITY, payload: id};
};

export const ChangeProductQuantity = (id, quantity, dispatch, t) => {
    return {type: ACTION_TYPE_CART_CHANGE_QUANTITY, payload: id, quantity, dispatch, t};
};

export const ComputeTotalPrice = () => {
    return {type: ACTION_TYPE_CART_COMPUTE_TOTAL_PRICE};
};

export const SetOrderList = (data) => {
    return {type: ACTION_TYPE_ORDERS_SET_LIST, payload: data};
};

export const AddOrderToList = (data) => {
    return {type: ACTION_TYPE_ORDERS_ADD_TO_LIST, payload: data};
};

export const ChangeDeliveryField = (fieldName, value, valid=true) => {
    return {type: ACTION_TYPE_DELIVERY_CHANGE_FIELD, fieldName, payload: value, valid};
};

export const ClearDeliveryDetails = () => {
    return {type: ACTION_TYPE_DELIVERY_CLEAR};
};

export const ChangeOrderStatus = (id, status) => {
    return {type: ACTION_TYPE_ORDER_CHANGE_STATUS, payload: status, id};
};

export const DeleteOrder = (id) => {
    return {type: ACTION_TYPE_ORDER_DELETE, payload: id};
};

export const ShowModal = (data={}) => {
    return {type: ACTION_TYPE_MODAL_SHOW, payload: data};
};

export const CloseModal = () => {
    return {type: ACTION_TYPE_MODAL_CLOSE};
};

export const ToggleModal = (data={}) => {
    return {type: ACTION_TYPE_MODAL_TOGGLE, payload: data};
};

export const SetUserData = (data) => {
    return {type: ACTION_TYPE_USER_SET_DATA, payload: data};
};

export const SetUserTokens = (data) => {
    return {type: ACTION_TYPE_USER_SET_TOKENS, payload: data};
};