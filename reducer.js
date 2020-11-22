import { Alert, ToastAndroid } from "react-native";
import { DeleteProductFromCart } from "./actions";

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
} from "./types";
import {
    addProductToCartDB,
    deleteProductFromCart,
    clearCart,
    addOrderToDB,
    getDBOrders,
    updateOrderStatus,
    deleteOrderFromDB,
} from "./db_handler";

const showToastMessage = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
};

export const initialState = {
    modal: {
        visible: false,
        title: { text: "", params: {} },
        text: { text: "", params: {} },
        animationIn: "slideInRight",
        animationOut: "slideOutLeft",
        buttons: [],
    },
    cartItems: new Map(),
    cartTotalPrice: 0,
    orders: new Map(),
    deliveryDetails: {
        name: {
            name: "name",
            placeholder: "orderFormName",
            value: "",
            valid: false,
        },
        phone: {
            name: "phone",
            placeholder: "orderFormPhone",
            value: "",
            valid: false,
        },
        address: {
            name: "address",
            placeholder: "orderFormAddress",
            value: "",
            valid: false,
        },
        floor: {
            name: "floor",
            placeholder: "orderFormFloor",
            value: "",
            valid: true,
        },
        notes: {
            name: "notes",
            placeholder: "orderFormNotes",
            value: "",
            valid: true,
        },
        time: {
            name: "time",
            placeholder: "orderFormDeliveryTime",
            value: "",
            valid: false,
        },
    },
    allDetailsAreValid: false,
};

/**
 * Редюсер
 * @param  {object} state - объект state
 * @param  {object} action - объект action
 */
export const reducer = (state, action) => {
    /**
     * Проверяет тип действия
     */
    switch (action.type) {

        /**
         * Устанавливает список продуктов для текущей страницы
         */
        case ACTION_TYPE_SET_PRODUCT_LIST: {
            const newState = {...state};

            newState.products = {...newState.products, [action.id]: action.payload.products.nodes};

            return newState;
        }

        /**
         * Устанавливает список категорий для текущей страницы
         */
        case ACTION_TYPE_SET_CATEGORY_LIST: {
            const newState = {...state};

            newState.categories = action.payload;

            return newState;
        }

        /**
         * Загружает данные корзины из базы данных в state
         */
        case ACTION_TYPE_CART_SET_PRODUCTS: {
            const newState = {...state};

            newState.cartItems = action.payload || [];

            // Расчитываем итоговую цену
            newState.cartTotalPrice = 0;
            if ( newState.cartItems.size ) {
                newState.cartItems.forEach( (value) => {
                    newState.cartTotalPrice += value.price * value.productQuantity;
                });
            }

            return newState;
        }

        /**
         * Заносит товар и его данные в state
         */
        case ACTION_TYPE_CART_ADD_PRODUCT: {
            const t = action.t; // Translate
            const newState = {...state};

            if ( state.cartItems.has(action.payload.productId) ) {
                const item = state.cartItems.get(action.payload.productId);
                item.productQuantity += action.payload.productQuantity;
            } else {
                state.cartItems.set(action.payload.productId, action.payload);
            }

            // Расчитываем итоговую цену
            newState.cartTotalPrice = 0;
            if ( newState.cartItems.size ) {
                newState.cartItems.forEach( (value) => {
                    newState.cartTotalPrice += value.price * value.productQuantity;
                });
            }

            addProductToCartDB(action.payload.name,
                action.payload.productId,
                action.payload.imageLink,
                action.payload.productQuantity,
                action.payload.price,
                action.payload.selectedVariants,
                action.payload.stockQuantity);

            showToastMessage(t("productAddedMessage", {product: action.payload.name}));

            return newState;
        }

        /**
         * Удаляет товар из корзины
         */
        case ACTION_TYPE_CART_DELETE_PRODUCT: {
            const newState = {...state};

            newState.cartItems.delete(action.payload);

            // Расчитываем итоговую цену
            newState.cartTotalPrice = 0;
            if ( newState.cartItems.size ) {
                newState.cartItems.forEach( (value) => {
                    newState.cartTotalPrice += value.price * value.productQuantity;
                });
            }

            deleteProductFromCart(action.payload);
            return newState;
        }

        case ACTION_TYPE_CART_CLEAR: {
            const newState = {...state};

            newState.cartItems = new Map();
            newState.cartTotalPrice = 0;

            clearCart();

            return newState;
        }

        /**
         * Минусует 1 товар из корзины
         */
        case ACTION_TYPE_CART_DECREASE_QUANTITY: {
            const t = action.t;
            const newState = {...state};

            if ( state.cartItems.has(action.payload) ) {
                const item = state.cartItems.get(action.payload);

                if ( item.productQuantity === 1 ) {
                    Alert.alert(t("cartDeleteTitle"), t("cartDeleteMessage"), [
                        {
                            text: t("cancel"),
                            style: "cancel"
                        },
                        {
                            text: t("ok"),
                            onPress: () => {
                                action.dispatch(DeleteProductFromCart(action.payload));
                            }
                        }
                    ],
                    {cancelable: false});

                } else {
                    item.productQuantity = Math.clamp(item.productQuantity - 1, 0, item.stockQuantity || 99);

                    // Расчитываем итоговую цену
                    newState.cartTotalPrice = 0;
                    if ( newState.cartItems.size ) {
                        newState.cartItems.forEach( (value) => {
                            newState.cartTotalPrice += value.price * value.productQuantity;
                        });
                    }

                    addProductToCartDB(item.name, item.productId, item.imageLink, item.productQuantity, item.price, item.selectedVariants, item.stockQuantity);
                }
            }
            else
                return state;

            return newState;
        }

        /**
         * Плюсует 1 товар в корзину
         */
        case ACTION_TYPE_CART_INCREASE_QUANTITY: {
            const newState = {...state};

            if ( newState.cartItems.has(action.payload) ) {
                const item = newState.cartItems.get(action.payload);
                item.productQuantity = Math.clamp(item.productQuantity + 1, 1, item.stockQuantity || 99);

                // Расчитываем итоговую цену
                newState.cartTotalPrice = 0;
                if ( newState.cartItems.size ) {
                    newState.cartItems.forEach( (value) => {
                        newState.cartTotalPrice += value.price * value.productQuantity;
                    });
                }

                addProductToCartDB(item.name, item.productId, item.imageLink, item.productQuantity, item.price, item.selectedVariants, item.stockQuantity);
            }
            else 
                return state;
            
            return newState;
        }

        /**
         * Расчитывает итог для корзины
         */
        // Не рекомендуется к использованию.
        case ACTION_TYPE_CART_COMPUTE_TOTAL_PRICE: {
            const newState = {...state};
            newState.cartTotalPrice = 0;
            

            if ( newState.cartItems.size ) {
                newState.cartItems.forEach( (value) => {
                    newState.cartTotalPrice += value.price * value.productQuantity;
                });
            } else {
                newState.cartTotalPrice = 0;
                return newState;
            }
            
            return newState;
        }

        /**
         * Записывает заказы в state
         */
        case ACTION_TYPE_ORDERS_SET_LIST: {
            const newState = {...state};

            newState.orders = action.payload;

            return newState;
        }

        /**
         * Заносит заказ в state и в бд
         */
        case ACTION_TYPE_ORDERS_ADD_TO_LIST: {
            const newState = {...state};
            const { payload } = action;
            newState.orders.set(payload.uuid, payload);

            addOrderToDB(payload.uuid,
                payload.deliveryDetails.name,
                payload.deliveryDetails.phone,
                payload.deliveryDetails.address,
                payload.deliveryDetails.floor,
                payload.deliveryDetails.notes,
                payload.deliveryDetails.time, payload.status, payload.products, payload.totalPrice);

            return newState;
        }

        /**
         * Изменяет поле в deliveryDetails
         */
        case ACTION_TYPE_DELIVERY_CHANGE_FIELD: {
            const newState = {...state};
            const { fieldName } = action;
            let valid = true;

            newState.deliveryDetails[fieldName].value = action.payload;
            newState.deliveryDetails[fieldName].valid = true;

            for ( const [fn, data] of Object.entries(newState.deliveryDetails) ) {
                if ( !data.valid )
                    valid = true;
            }
            newState.allDetailsAreValid = valid;

            return newState;
        }

        /**
         * Очищает deliveryDetails
         */
        case ACTION_TYPE_DELIVERY_CLEAR: {
            const newState = {...state};
            newState.deliveryDetails = {
                name: {
                    name: "name",
                    placeholder: "orderFormName",
                    value: "",
                    valid: false,
                },
                phone: {
                    name: "phone",
                    placeholder: "orderFormPhone",
                    value: "",
                    valid: false,
                },
                address: {
                    name: "address",
                    placeholder: "orderFormAddress",
                    value: "",
                    valid: false,
                },
                floor: {
                    name: "floor",
                    placeholder: "orderFormFloor",
                    value: "",
                    valid: true,
                },
                notes: {
                    name: "notes",
                    placeholder: "orderFormNotes",
                    value: "",
                    valid: true,
                },
                time: {
                    name: "time",
                    placeholder: "orderFormDeliveryTime",
                    value: "",
                    valid: false,
                },
            };
            newState.allDetailsAreValid = false;

            return newState;
        }

        /**
         * Изменяет статус заказа
         */
        case ACTION_TYPE_ORDER_CHANGE_STATUS: {
            const newState = {...state};

            const order = newState.orders.get(action.id);
            order.status = action.payload;
            newState.orders.set(action.id, order);

            updateOrderStatus(action.id, action.payload);

            return newState;
        }

        /**
         * Удаляет заказ
         */
        case ACTION_TYPE_ORDER_DELETE: {
            const newState = {...state};

            newState.orders.delete(action.payload);

            deleteOrderFromDB(action.payload);

            return newState;
        }

        /**
         * Открывает модальное окно
         */
        case ACTION_TYPE_MODAL_SHOW: {
            const newState = {...state};
            const { payload } = action;
            if ( payload )
                newState.modal = { ...newState.modal, ...payload }
            newState.modal.visible = true;

            return newState;
        }
        /**
         * Закрывает модальное окно
         */
        case ACTION_TYPE_MODAL_CLOSE: {
            const newState = {...state};
            newState.modal.visible = false;

            return newState;
        }
        /**
         * Переключает состояние модального окна
         */
        case ACTION_TYPE_MODAL_TOGGLE: {
            const newState = {...state};
            const { payload } = action;
            if ( payload )
                newState.modal = { ...newState.modal, ...payload }
            newState.modal.visible = !newState.modal.visible;

            return newState;
        }

        default:
            return state;
    }
};
