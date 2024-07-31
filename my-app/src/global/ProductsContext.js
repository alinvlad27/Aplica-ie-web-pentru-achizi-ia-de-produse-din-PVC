import React, { createContext, useState, useEffect } from 'react';
import { db } from '../config/Config';
import products from '../data/products';

// Crearea contextului pentru produse
export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    // Funcția asincronă pentru a aduce produsele din Firebase
    const fetchProducts = async () => {
      // Obține colecția de produse din Firebase
      const productsCollection = await db.collection('products').get();
      const firebaseProducts = productsCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Filtrează produsele locale care nu sunt deja în Firebase
      const uniqueFirebaseProducts = firebaseProducts.filter(firebaseProduct => {
        return !products.some(localProduct => localProduct.id === firebaseProduct.id);
      });

      // Combinați produsele locale cu produsele unice din Firebase
      const allProducts = [...products, ...uniqueFirebaseProducts];
      setProductsData(allProducts);
    };

    // Apelarea funcției pentru a aduce produsele
    fetchProducts();
  }, []);

  return (
    // Furnizarea contextului cu datele despre produse
    <ProductsContext.Provider value={{ products: productsData }}>
      {children}
    </ProductsContext.Provider>
  );
};
