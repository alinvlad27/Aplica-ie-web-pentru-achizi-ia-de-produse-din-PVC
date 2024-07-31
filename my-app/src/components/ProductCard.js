import React, { useContext, useState } from 'react';
import { Icon } from 'react-icons-kit';
import { plus } from 'react-icons-kit/feather/plus';
import { motion } from 'framer-motion';
import '../css/product-card.css';
import { Col, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../global/CartContext';
import { auth } from '../config/Config';
import { toast } from 'react-toastify';

const ProductCard = ({ item, discountActive }) => {
  const { dispatch } = useContext(CartContext); // Folosește contextul pentru coșul de cumpărături
  const [modal, setModal] = useState(false);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [widthError, setWidthError] = useState('');
  const [heightError, setHeightError] = useState('');
  // Aplică reducerea de 20% la prețul pe metru pătrat
  const pricePerSquareMeter = discountActive ? 700 * 0.8 : 700;

  // Calculează prețul cu reducere și prețul original
  const discountedPrice = item.price ? (discountActive ? (item.price * 0.8).toFixed(2) : item.price.toFixed(2)) : 'N/A';
  const originalPrice = item.price ? item.price.toFixed(2) : 'N/A';

  // Funcție pentru a alterna vizibilitatea modalei
  const toggle = () => {
    setModal(!modal);
    setWidth('');
    setHeight('');
    setWidthError('');
    setHeightError('');
  };

   // Funcție pentru a valida câmpurile de intrare
  const validateFields = () => {
    let valid = true;
    if (!width || width <= 0) {
      setWidthError('Lățimea este obligatorie!');
      valid = false;
    } else {
      setWidthError('');
    }

    if (!height || height <= 0) {
      setHeightError('Înălțimea este obligatorie!');
      valid = false;
    } else {
      setHeightError('');
    }

    return valid;
  };

  // Funcție pentru a adăuga produsul în coș
  const addToCart = async (product) => {
    if (!validateFields()) {
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert('Trebuie să fii autentificat pentru a adăuga produse în coș');
    } else {
      const area = (width / 1000) * (height / 1000); // Calculează aria
      const totalPrice = area * pricePerSquareMeter; // Calculează prețul total
      const productWithTotal = {
        ProductID: product.id + width + height,
        ProductName: product.productName,
        ProductPrice: totalPrice,
        ProductImg: product.imgUrl,
        Width: width,
        Height: height,
        qty: 1,
        TotalProductPrice: totalPrice,
      };

      dispatch({ type: 'ADAUGA_IN_COS', id: product.id + width + height, product: productWithTotal });
      toast.success('a fost adăugat un produs', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });

      toggle(); // Închide modalul
    }
  };

  return (
    <Col lg='3' md='4' className='mb-2'>
      <div className='product_item'>
        <div className='products_img'>
          <Link to={`/shop/${item.id}`}><motion.img whileHover={{ scale: 0.9 }} src={item.imgUrl} alt='' /></Link>
        </div>
        <div className='p-2 product_info'>
          <h3 className='product_name'><Link to={`/shop/${item.id}`}>{item.productName}</Link></h3>
          <span>{item.category}</span>
        </div>
        <div className='product_card-bottom d-flex align-items-center justify-content-between p-2'>
          <div>
            <span className='price'>{discountedPrice} RON</span>
            {discountActive && (
              <>
                <span className='original-price'>{originalPrice} RON</span>
                <span className='discount-text'>20% redus</span>
              </>
            )}
          </div>
          <motion.span whileTap={{ scale: 1.2 }} onClick={toggle}><Icon icon={plus} /></motion.span>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Introduceți dimensiunile</ModalHeader>
        <ModalBody>
          <Input
            type="number"
            placeholder="Lățime (mm)"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            invalid={!!widthError}
          />
          {widthError && <FormFeedback>{widthError}</FormFeedback>}
          <Input
            type="number"
            placeholder="Înălțime (mm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="mt-3"
            invalid={!!heightError}
          />
          {heightError && <FormFeedback>{heightError}</FormFeedback>}
          <div className="help-links mt-3">
            <p>Ai nevoie de ajutor? <Link to="/contact" className='contacteaza'>Contactează-ne</Link></p>
          </div>
        </ModalBody>
        <div className='modal_dim'>
          <ModalFooter>
            <Button className='add_cos' onClick={() => addToCart(item)}>Adaugă în coș</Button>{' '}
            <Button className='add_cos' onClick={toggle}>Anulează</Button>
          </ModalFooter>
        </div>
      </Modal>
    </Col>
  );
};

export default ProductCard;
