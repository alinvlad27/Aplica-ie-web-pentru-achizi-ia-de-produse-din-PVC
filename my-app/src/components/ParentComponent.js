import React, { useState } from 'react';
import Clock from './Clock';
import ProductCard from './ProductCard';
import products from '../data/products'; // Import your products data

const YourComponent = () => {
  // Stare pentru a activa/dezactiva reducerea
  const [discountActive, setDiscountActive] = useState(true);

  const handleTimerEnd = () => {
    setDiscountActive(false); // Dezactivează reducerea când cronometrul se termină
  };

  return (
    <div>
      <Clock onTimerEnd={handleTimerEnd} setDiscountActive={setDiscountActive} />
      <div className="product-list">
        {products.map(product => (
          <ProductCard key={product.id} item={product} discountActive={discountActive} />
        ))}
      </div>
    </div>
  );
};

export default YourComponent;
