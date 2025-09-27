import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer' >
      

       <div className="footer-content">
        <div className="footer-content-left">
<img src={assets.logo} alt="" />
<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi maxime qui vero maiores, atque cupiditate, mollitia porro dignissimos tenetur, cumque commodi repudiandae vitae corrupti nulla voluptatem aut illo accusamus! Vel?</p>

<div className="footer-social-icons">

<img src={assets.facebook_icon} alt="" />
<img src={assets.twitter_icon} alt="" />
<img src={assets.linkedin_icon} alt="" />


</div>

   </div>

<div className="footer-content-center">

<h2>Company</h2>
<ul>
  <li>Home </li>
  <li>About Us</li>
  <li>Delivery</li>
  <li>Privacy Policy</li>
</ul>


</div>


<div className="footer-content-right">
<h2>GET IN TOUCH</h2>
<ul>
  <li>+91-1234567891</li>
  <li>contect@toamto.com</li>
</ul>
</div>




       </div>

       <hr />
       <p className="footer-copyright">
     Copyright © 2024 tomato.com – All Rights Reserved
       </p>
    </div>
  )
}

export default Footer
