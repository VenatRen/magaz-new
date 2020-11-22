export const ORDER_STATUS_TO_BE_SHIPPED = 0;
export const ORDER_STATUS_SHIPPED 		= 1;
export const ORDER_STATUS_CANCELED 		= 2;

export const statusToText = (status) => {
    const states = [
        "orderStatusToBeShipped",
        "orderStatusShipped",
        "orderStatusCanceled",
    ];
    return states[status] || "orderStatusToBeShipped"
};