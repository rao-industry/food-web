import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHendler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

  let  orderData = {
    address:data,
    items:orderItems,
    amount:getTotalCartAmount()+40,

  }
  let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
  if (response.data.success) {
    const {session_url} = response.data;
    window.location.replace(session_url);

    
  }
else{
  alert ("Error")
}

  }

  const cartTotal = getTotalCartAmount();
  const deliveryFee = cartTotal > 0 ? 40 : 0;
  const grandTotal = cartTotal + deliveryFee;
   

const navigate = useNavigate ();

useEffect(()=>{
if (!token) {
  navigate ('/cart')
}
else if (getTotalCartAmount()===0){
  navigate('/')
}
},[token])



  return (
    <div className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <form onSubmit={handlePlaceOrder}>
          <div className="multi-fields">
            <input name='firstname' onChange={onChangeHendler} value={data.firstname} type="text" placeholder='First Name' required />
            <input name='lastname' onChange={onChangeHendler} value={data.lastname} type="text" placeholder='Last Name' required />
          </div>

          <input name='email' onChange={onChangeHendler} value={data.email} type="email" placeholder='Email Address' required />
          <input name='street' onChange={onChangeHendler} value={data.street} type="text" placeholder='Street' required />

          <div className="multi-fields">
            <input name='city' onChange={onChangeHendler} value={data.city} type="text" placeholder='City' required />
            <input name='state' onChange={onChangeHendler} value={data.state} type="text" placeholder='State' required />
          </div>

          <div className="multi-fields">
            <input name='zipcode' onChange={onChangeHendler} value={data.zipcode} type="text" placeholder='Zip Code' required maxLength={6} />
            <input name='country' onChange={onChangeHendler} value={data.country} type="text" placeholder='Country' required />
          </div>

          <input name='phone' onChange={onChangeHendler} value={data.phone} type="tel" placeholder='Phone' required maxLength={10} />

          <button type='submit' className="place-order-btn">
            Place Order (₹{grandTotal.toFixed(2)})
          </button>
        </form>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Order Summary</h2>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{cartTotal.toFixed(2)}</p>
          </div>

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{deliveryFee.toFixed(2)}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{grandTotal.toFixed(2)}</b>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
