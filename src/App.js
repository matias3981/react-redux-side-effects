import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Notification from './components/Notification/Notification';
import Products from './components/Shop/Products';
import { retrieveCartDataAction, sendCartDataAction } from './store/cart-actions';

let initialStart = true;

function App() {
  const showCart = useSelector(state => state.ui.showCart);
  const showNotification = useSelector(state => state.ui.showNotification);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveCartDataAction());
  }, [dispatch])

  useEffect(() => {
    if (initialStart) {
      initialStart = false;
      return;
    }
    if (cart.updated) {
      dispatch(sendCartDataAction(cart))
     }
  }, [cart, dispatch]);

  return (
    <>
      {showNotification && <Notification {...showNotification} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
