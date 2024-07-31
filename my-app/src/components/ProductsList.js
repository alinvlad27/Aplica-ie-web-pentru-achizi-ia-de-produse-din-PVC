import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductsList = ({ data }) => {
  // Stare pentru activarea reducerii
  const [discountActive, setDiscountActive] = useState(true);

  // Funcție pentru a dezactiva reducerea la finalul timer-ului
  const handleTimerEnd = () => {
    setDiscountActive(false);
  };

  // useEffect pentru a verifica dacă timpul reducerii a expirat
  useEffect(() => {
    const now = new Date().getTime();
    const timerEnd = new Date('July 20, 2024').getTime();
    if (now >= timerEnd) {
      handleTimerEnd();
    }
  }, []);

  return (
    <>
      {data.map((item) => (
        <ProductCard key={item.id} item={item} discountActive={discountActive} />
      ))}
    </>
  );
};

export default ProductsList;
