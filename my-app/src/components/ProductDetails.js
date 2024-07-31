import React, { useState, useRef, useContext, useEffect } from 'react';
import { Container, Row, Col, Input, FormFeedback } from 'reactstrap';
import { useParams } from 'react-router-dom';
import products from '../data/products';
import Helmet from '../elements/Helmet';
import CommonSection from '../elements/CommonSection';
import { Icon } from 'react-icons-kit';
import { star } from 'react-icons-kit/iconic/star';
import { starHalfOutline } from 'react-icons-kit/typicons/starHalfOutline';
import '../css/product-details.css';
import { motion } from 'framer-motion';
import ProductsList from './ProductsList';
import { toast } from 'react-toastify';
import { CartContext } from '../global/CartContext';
import { auth, db } from '../config/Config';
import { Link } from 'react-router-dom';

const ProductDetails = ({ user }) => {
  const [tab, setTab] = useState('desc'); // Stare pentru tab-ul activ
  const reviewUser = useRef('');
  const reviewMsg = useRef('');
  const [rating, setRating] = useState(null);
  const { id } = useParams(); // Obține ID-ul produsului din URL
  const [product, setProduct] = useState(null);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [widthError, setWidthError] = useState('');
  const [heightError, setHeightError] = useState('');
  const { dispatch } = useContext(CartContext); // Folosește contextul pentru coșul de cumpărături

  useEffect(() => {
    const localProduct = products.find(item => item.id === id); // Găsește produsul în datele locale

    if (localProduct) {
      setProduct(localProduct); // Setează produsul local
    } else {
      const fetchProduct = async () => {
        const productDoc = await db.collection('products').doc(id).get(); // Fetch produsul din baza de date
        if (productDoc.exists) {
          setProduct({ id: productDoc.id, ...productDoc.data() }); // Setează produsul fetch-uit
        } 
      };
      fetchProduct();
    }
  }, [id]);

  // Derulează la începutul paginii la montare
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!product) {
    return <div>Loading...</div>; // Afișează mesajul de încărcare dacă produsul nu este încă disponibil
  }

  const { imgUrl, productName, price, avgRating, reviews, description, shortDesc, category } = product;
  const relatedProducts = products.filter(item => item.category === category); // Obține produsele similare

  const pricePerSquareMeter = 700; // Preț pe metru pătrat
  const discountActive = true; // Asumăm că discount-ul este activ. 
  const discountedPricePerSquareMeter = discountActive ? (pricePerSquareMeter * 0.8).toFixed(2) : pricePerSquareMeter.toFixed(2);
  const discountedPrice = discountActive ? (price * 0.8).toFixed(2) : price.toFixed(2);
  const originalPrice = price.toFixed(2);

  // Funcție pentru validarea câmpurilor de dimensiuni
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
      const area = (width / 1000) * (height / 1000);
      const totalPrice = Number((area * discountedPricePerSquareMeter).toFixed(2));
      const productWithTotal = {
        ProductID: product.id + width + height,
        ProductName: productName,
        ProductPrice: totalPrice,
        ProductImg: imgUrl,
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
    }
  };

  // Funcție pentru a trimite recenzia
  const submitHandler = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      toast.error('Trebuie să fii autentificat pentru a lăsa o recenzie.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      return;
    }

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;
    const reviewObj = {
      productId: id,
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
      userId: user.uid, 
      timestamp: new Date(),
    };
    
    // Salvează recenzia în Firebase
    try {
      console.log("Submitting review for product ID:", id); // Log pentru debug
      await db.collection('reviews').add(reviewObj);
      toast.success('Review submitted', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } catch (error) {
      toast.error('Error submitting review', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      console.error('Error adding review: ', error);
    }
  };

  return (
    <>
      <Helmet title={productName}>
        {/* <Navbar user={user} /> */}
        <CommonSection title={productName} />
        <section>
          <Container>
            <Row>
              <Col lg='6'>
                <div className='product_img'>
                  <img src={imgUrl} alt=''></img>
                </div>
              </Col>

              <Col lg='6'>
                <div className='product_details'>
                  <h2>{productName}</h2>
                  <div className='product_rating d-flex gap-3 mb-3'>
                    <div>
                      <span><Icon icon={star} /></span>
                      <span><Icon icon={star} /></span>
                      <span><Icon icon={star} /></span>
                      <span><Icon icon={star} /></span>
                      <span><Icon icon={starHalfOutline} /></span>
                    </div>

                    <p>(<span>{avgRating}</span> ratings)</p>
                  </div>

                  <div className='d-flex align-items-center gap-5'>
                    <span className='product_price'>{discountedPrice} RON</span>
                    {discountActive && (
                      <div>
                        <span className='original-price'>{originalPrice} RON</span>
                        <span className='discount-text'>20% redus</span>
                      </div>
                    )}
                    <span>Category: {category.toUpperCase()}</span>
                  </div>
                  <p className='mt-3'>{shortDesc}</p>

                  <div className='d-flex gap-3'>
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
                      invalid={!!heightError}
                    />
                    {heightError && <FormFeedback>{heightError}</FormFeedback>}
                  </div>
                  <div className="help-links mt-3">
                       <p>Ai nevoie de ajutor? <Link to="/contact" className='contacteaza'>Contactează-ne</Link></p>
                    </div>

                  <motion.button whileTap={{ scale: 1.2 }} className='buy_btn_details' onClick={() => addToCart(product)}>Add to Cart</motion.button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section>
          <Container>
            <Row>
              <Col lg='12'>
                <div className='tab_wrapper d-flex align-items-center gap-5 mt-5'>
                  <h6 className={`${tab === "desc" ? "active_tab" : ""}`} onClick={() => setTab('desc')}>Description</h6>
                  <h6 className={`${tab === "rev" ? "active_tab" : ""}`} onClick={() => setTab('rev')}>Reviews ({reviews.length})</h6>
                </div>

                {
                  tab === 'desc' ? (
                    <div className='tab_content mt-4'>
                      <p>{description}</p>
                    </div>
                  ) : (
                    <div className='product_review mt-4'>
                      <div className='review_wrapper'>
                        <ul>
                          {
                            reviews?.map((item, index) => (
                              <li key={index} className='mb-4'>
                                <h6>Alin Vlad</h6>
                                <span>{item.rating} ( rating)</span>
                                <p>{item.text}</p>
                              </li>
                            ))
                          }
                        </ul>

                        <div className='review_form'>
                          <h4>Leave your experience</h4>
                          <form action='' onSubmit={submitHandler}>
                            <div className='form_group'>
                              <input type='text' placeholder='Enter name' ref={reviewUser} required />
                            </div>

                            <div className='form_group d-flex align-items-center gap-5'>
                              <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(1)}>
                                1<Icon icon={star} />
                              </motion.span>
                              <span onClick={() => setRating(2)}>
                                2<Icon icon={star} />
                              </span>
                              <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(3)}>
                                3<Icon icon={star} />
                              </motion.span>
                              <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(4)}>
                                4<Icon icon={star} />
                              </motion.span>
                              <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(5)}>
                                5<Icon icon={star} />
                              </motion.span>
                            </div>

                            <div className='form_group'>
                              <textarea ref={reviewMsg} rows={4} type='text' placeholder='Review Message...' required />
                            </div>

                            <motion.button whileTap={{ scale: 1.2 }} type='submit' className='buy_btn'>Submit</motion.button>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}

              </Col>

              <Col lg='12' className='mt-5'>
                <h2 className='related_title'>Ți-ar putea plăcea și asta</h2>
              </Col>

              <ProductsList data={relatedProducts} />
            </Row>
          </Container>
        </section>
      </Helmet>
    </>
  )
}

export default ProductDetails;
