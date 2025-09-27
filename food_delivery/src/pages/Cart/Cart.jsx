import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount ,url } = useContext(StoreContext);
  const [promoCode, setPromoCode] = React.useState('');

  const cartTotal = getTotalCartAmount();
  const deliveryFee = cartTotal > 0 ? 40 : 0;
  const grandTotal = cartTotal + deliveryFee;

const navigate = useNavigate ();



  return (
    <div className='cart'>
      <div className="cart-container">
        {/* Column Headers */}
        <div className="cart-headers">
          <p className="header-item">Items</p>
          <p className="header-item">Title</p>
          <p className="header-item">Price</p>
          <p className="header-item">Quantity</p>
          <p className="header-item">Total</p>
          <p className="header-item">Remove</p>
        </div>

        {/* Cart Items */}
        <div className="cart-items-list">
          {food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              const itemTotal = item.price * cartItems[item._id];
              return (
                <div key={item._id} className="cart-item">
                  <div className="item-image">
                    <img src={   url+"/images/" + item.image} alt={item.name} />
                  </div>
                  <p className="item-title">{item.name}</p>
                  <p className="item-price">₹{item.price.toFixed(2)}</p>
                  <p className="item-quantity">{cartItems[item._id]}</p>
                  <p className="item-total">₹{itemTotal.toFixed(2)}</p>
                  <p 
                    className="item-remove"
                    onClick={() => removeFromCart(item._id)}
                  >
                    ✕
                  </p>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Cart Total Section */}
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{cartTotal.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount()===0?0:40}</p>
              <p>₹{deliveryFee.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{ getTotalCartAmount()===0 ?0:grandTotal.toFixed(2)}</b>
            </div>
            <button  onClick={()=>navigate('/order')} className="checkout-btn">PROCEED TO CHECKOUT</button>
          </div>

          {/* Promo Code Section */}
          <div className="cart-promocode">
            <p>If you have a promo code, enter it here</p>
            <div className='cart-promocode-input'>
              <input 
                type="text" 
                placeholder='promo code' 
                maxLength={10}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;