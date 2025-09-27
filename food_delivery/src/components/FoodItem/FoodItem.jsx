import React, { useContext } from 'react';
import './FoodItem.css';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, description, price, image }) => {
  const { addToCart, removeFromCart, cartItems, url } = useContext(StoreContext);
  const quantity = cartItems[id] || 0;

  return (
    <div className="food-item">
      <img className="food-item-image"  src={url +"/images/"+image} />
 

      <div className="food-item-details">
        <h3>{name}</h3>
        <p>{description}</p>

        <div className="food-item-footer">
          <span className="food-item-price">₹{price}</span>

          <div className="food-item-controls">
            {quantity > 0 && (
              <>
                <button onClick={() => removeFromCart(id)} className="qty-btn">-</button>
                <span className="food-item-qty">{quantity}</span>
              </>
            )}
            <button onClick={() => addToCart(id)} className="qty-btn">+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
