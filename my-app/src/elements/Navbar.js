import React, { useContext, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo1.png'
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import {auth} from '../config/Config'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../global/CartContext'
import { motion } from 'framer-motion'
import '../css/navbar.css'

const Navbar = ({user}) => {
  // Accesare cantitate totală din contextul coșului de cumpărături
  const {totalQty} = useContext(CartContext);

  const navigate = useNavigate();

  // Funcție pentru deconectare
  const logout = () => {
    auth.signOut().then(()=>{
      navigate('/login');
    })
  }

  // Referință la elementul de header
  const headerRef = useRef(null);

  // Adăugarea și eliminarea clasei sticky pentru header în funcție de poziția scroll-ului
  useEffect(() => {
    const stickyHeaderFunc = () => {
        if (headerRef.current) {
            if (window.scrollY > 1) {
                headerRef.current.classList.add("sticky_header");
            } else {
                headerRef.current.classList.remove("sticky_header");
            }
        }
    };
    
    window.addEventListener("scroll", stickyHeaderFunc);

    return () => {
        window.removeEventListener("scroll", stickyHeaderFunc);
    };
}, []);


  return (
    <div className='navbox' ref={headerRef}>
      <div className='leftside'>
        <Link to='/'>
          <img src={logo} alt=""></img>
        </Link>
  
      </div>
    
      <div className='navigation'>
        <ul className='menu'>
          <li className='nav_item'>
            <Link to='/'>HOME</Link>
          </li>
          <li className='nav_item'>
            <Link to='/shop'>SHOP</Link>
          </li>
          <li className='nav_item'>
            <Link to='/usa-personalizata'>UȘĂ PERSONALIZATĂ</Link>
          </li>
          <li className='nav_item'>
            <Link to='/fereastra-personalizata'>FEREASTRĂ PERSONALIZATĂ</Link>
          </li>
          <li className='nav_item'>
            <Link to='/cartproducts'>CART</Link>
          </li>
          <li className='nav_item'>
            <Link to='/contact'>CONTACT</Link>
          </li>
        </ul>
      </div>

      {/* /*daca nu avem niciun user* */}
      {!user && <div className='rightside'>
        <Link to='/signup' className='navlinks'>SIGN UP</Link>
        <Link to='/login' className='navlinks'>LOGIN</Link>
      </div>}
      {/* daca avem user */}
      {user && <div className='rightside'>
            <span><Link to = '/profil' className='navlink'>{user}</Link></span>
            <motion.span whileHover={{scale: 1.1}}><Link to = '/cartproducts' className='navlinks'><Icon icon={cart}/></Link></motion.span>
            <div className='relative'>
              <span className='no-of-products'>{totalQty}</span>
            </div>
            <motion.span whileHover={{scale: 1.1}}><button className='logout-btn' onClick={logout}>LOGOUT</button></motion.span>
        </div>}
    </div>
  )
}

export default Navbar
