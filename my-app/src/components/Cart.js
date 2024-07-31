import React, { useEffect, useContext } from 'react';
import '../css/cart.css';
import Helmet from '../elements/Helmet';
import { Link, useNavigate } from 'react-router-dom';
import CommonSection from '../elements/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { Icon } from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add';
import { shopping_cart_delete } from 'react-icons-kit/ikons/shopping_cart_delete';
import { CartContext } from '../global/CartContext';
import { auth } from '../config/Config';

function Cart({ user }) {
   // Obține datele din contextul coșului de cumpărături
  const { shoppingCart, dispatch, totalPrice } = useContext(CartContext);
  // Hook pentru redirecționare
  const navigate = useNavigate();

  // Efect pentru a verifica dacă utilizatorul este autentificat, altfel redirecționează la pagina de login
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (!user) {
        navigate('/login');
      }
    });
  }, [navigate]);

  // Efect pentru a face scroll în sus la încărcarea componentei
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Helmet title='Cart'>
      <CommonSection title='Shopping Cart' />
      <section>
        <Container>
          <Row>
            <Col lg='9'>
              <table className='table bordered mt-5'>
                <thead>
                  <tr>
                    <th>Imagine</th>
                    <th>Nume</th>
                    <th>Preț</th>
                    <th>Dimensiune (W x H)</th>
                    <th>Qty</th>
                    <th>Șterge</th>
                  </tr>
                </thead>

                <tbody>
                  {shoppingCart.length === 0 && (
                    <tr>
                      <td colSpan="6">No items in your cart or slow internet causing trouble (Refresh the page) or you are not logged in</td>
                    </tr>
                  )}
                  {shoppingCart && shoppingCart.map(cart => (
                    <tr key={cart.ProductID}>
                      <td><img src={cart.ProductImg} alt='not found' /></td>
                      <td>{cart.ProductName}</td>
                      <td>{Number(cart.ProductPrice).toFixed(2)} RON</td>
                      <td>{cart.Width} mm x {cart.Height} mm</td>
                      <td>
                        <div className='d-flex align-items-center'>
                          <span className='quantity mx-2'>{cart.qty}</span>
                          <span className='inc' onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}><Icon icon={ic_add} size={24} /></span>
                        </div>
                      </td>
                      <td>
                        <span onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
                          <Icon icon={shopping_cart_delete} size={24} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>

            <Col lg='3'>
              {shoppingCart.length > 0 && (
                <div className='cart-summaryy'>
                  <h6 className='cart-summaryy-heading d-flex align-items-center justify-content-between mt-5'>
                    Subtotal
                    <span className='fs-4 fw-bold'>{totalPrice ? totalPrice.toFixed(2) : 0} RON</span>
                  </h6>
                  <p className='fs-6 mt-2'>taxele și transportul se vor calcula la checkout</p>
                  <div className='btn-buy'>
                    <Link to='/cashout' className='buy_btn'>Checkout</Link>
                    <Link to='/shop' className='buy_btn'>Continuă Cumpărăturile</Link>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Cart;
