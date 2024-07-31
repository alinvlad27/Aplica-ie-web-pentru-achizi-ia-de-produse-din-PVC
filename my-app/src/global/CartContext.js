import React, { createContext, useReducer, useEffect } from 'react';
import { CartReducer } from './CartReducer';
import { auth, db } from '../config/Config';

// Creează contextul pentru coșul de cumpărături
export const CartContext = createContext();

// Definirea furnizorului de context pentru coșul de cumpărături
export const CartContextProvider = (props) => {
  // Definirea stării inițiale și a reducerului pentru coșul de cumpărături
  const [cart, dispatch] = useReducer(CartReducer, {
    shoppingCart: [],
    totalPrice: 0,
    totalQty: 0
  });

   // Efect care rulează la schimbarea stării de autentificare a utilizatorului
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // Referință la documentul coșului de cumpărături al utilizatorului în Firestore
        const cartRef = db.collection('carts').doc(user.uid);
        cartRef.get().then(doc => {
          if (doc.exists) {
            // Dacă documentul există, setează coșul de cumpărături cu datele din Firestore
            const userCart = doc.data().cart;
            dispatch({ type: 'SET_CART', cart: userCart });
          } else {
            // Dacă documentul nu există, inițializează un coș gol
            dispatch({ type: 'SET_CART', cart: { shoppingCart: [], totalPrice: 0, totalQty: 0 } });
          }
        });
      } else {
        // Dacă utilizatorul nu este autentificat, setează un coș gol
        dispatch({ type: 'SET_CART', cart: { shoppingCart: [], totalPrice: 0, totalQty: 0 } });
      }
    });

    return () => unsubscribe(); // Curăță efectul la demontarea componentului
  }, []);

   // Efect care rulează la schimbarea stării coșului de cumpărături
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      // Referință la documentul coșului de cumpărături al utilizatorului în Firestore
      const cartRef = db.collection('carts').doc(user.uid);
      // Actualizează documentul cu starea curentă a coșului de cumpărături
      cartRef.set({ cart }, { merge: true });
    }
  }, [cart]);

  return (
    // Furnizează contextul coșului de cumpărături către componentele descendente
    <CartContext.Provider value={{ ...cart, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};
