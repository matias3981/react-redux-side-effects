import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const sendCartDataAction = (cart) => {
  return async (dispatch) => {
    const sentCartData = async () => {
      dispatch(uiActions.showNotification({
        title: 'Sending...',
        message: 'Sending the cart',
      }));

      const response = await fetch(
        'https://react-http-c4764-default-rtdb.firebaseio.com/cart.json',
        { method: 'PUT', body: JSON.stringify(cart) }
      );

      dispatch(uiActions.showNotification({
        title: 'Success!',
        message: 'The data was sended successfully',
        status: 'success',
      }));
    }

    await sentCartData().catch(error => {
      dispatch(uiActions.showNotification({
        title: 'Error sending cart data',
        message: 'There was an error sending the cart',
        status: 'error',
      }));
    });
  }
}

export const retrieveCartDataAction = () => {
  return async (dispatch) => {
    const getCart = async () => {
      const response = await fetch(
        'https://react-http-c4764-default-rtdb.firebaseio.com/cart.json'
      );
      const data = await response.json();
      dispatch(cartActions.replaceCart(data));
    };

    try {
      await getCart();
    } catch (error) {
      dispatch(uiActions.showNotification({
        title: 'Error sending cart data',
        message: 'There was an error getting the cart',
        status: 'error',
      }));
    }
  }
}