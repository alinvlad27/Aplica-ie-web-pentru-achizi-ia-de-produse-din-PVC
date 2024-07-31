import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Configurarea notificărilor toast
toast.configure();

// Definirea reducerului pentru coșul de cumpărături
export const CartReducer = (state, action) => {
  let product;
  let index;
  let updatePrice;
  let updateQty;

   // Gestionarea acțiunilor în funcție de tipul lor
  switch (action.type) {
    case 'SET_CART':
      // Setează coșul de cumpărături cu datele furnizate
      const { shoppingCart, totalPrice, totalQty } = action.cart;
      return {
        shoppingCart,
        totalPrice,
        totalQty
      };

    case 'ADAUGA_IN_COS':
      // Adaugă un produs în coș
      product = action.product;
      updateQty = state.totalQty + 1;
      updatePrice = state.totalPrice + product.ProductPrice;
      return {
        shoppingCart: [product, ...state.shoppingCart],
        totalPrice: updatePrice,
        totalQty: updateQty
      };

    case 'INC':
      // Crește cantitatea unui produs din coș
      product = action.cart;
      product.qty = ++product.qty;
      product.TotalProductPrice = product.ProductPrice * product.qty;
      updateQty = state.totalQty + 1;
      updatePrice = state.totalPrice + product.ProductPrice;
      index = state.shoppingCart.findIndex(cart => cart.ProductID === action.id);
      state.shoppingCart[index] = product;
      return {
        shoppingCart: [...state.shoppingCart],
        totalPrice: updatePrice,
        totalQty: updateQty
      };

    case 'DELETE':
      // Șterge un produs din coș
      const filtered = state.shoppingCart.filter(product => product.ProductID !== action.id);
      product = action.cart;
      updateQty = state.totalQty - product.qty;
      updatePrice = state.totalPrice - product.qty * product.ProductPrice;
      return {
        shoppingCart: [...filtered],
        totalPrice: updatePrice,
        totalQty: updateQty
      };

    case 'EMPTY':
      // Golește coșul de cumpărături
      return {
        shoppingCart: [],
        totalPrice: 0,
        totalQty: 0
      };

    default:
      // Returnează starea curentă dacă acțiunea nu este recunoscută
      return state;
  }
};
