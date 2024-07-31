import React, { useState, useEffect, useContext } from 'react';
import { auth, db } from '../config/Config';
import { CartContext } from '../global/CartContext';
//import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Helmet from '../elements/Helmet';
import CommonSection from '../elements/CommonSection';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, FormFeedback} from 'reactstrap';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';
import '../css/cashout.css'

const Cashout = (props) => {
  const navigate = useNavigate(); // Hook pentru navigare
  // Obține datele din contextul coșului de cumpărături
  const { totalPrice, totalQty, dispatch, shoppingCart } = useContext(CartContext);
  // Stare pentru numele cumpărătorului
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cell, setCell] = useState('');
  const [address, setAddress] = useState('');
  const [postal, setPostal] = useState('');
  const [city, setCity] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');
  const [install, setInstall] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [additionalInfo, setAdditionalInfo] = useState('');

  // Stări pentru erorile câmpurilor obligatorii
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [cellError, setCellError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [postalError, setPostalError] = useState('');
  const [cityError, setCityError] = useState('');
  
  // Efect pentru a verifica dacă utilizatorul este autentificat, altfel redirecționează la pagina de login
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (!user) {
        navigate('/login');
      }
    });
  }, [navigate]);

  // Funcție pentru aplicarea cuponului de reducere de 5%
  const applyCoupon = () => {
    if (coupon === 'VLAD') {
      setDiscount(0.05);
      toast.success('Cupon aplicat cu succes!', { position: "top-right", autoClose: 2000 });
    } else {
      toast.error('Cupon invalid!', { position: "top-right", autoClose: 2000 });
    }
  };

  // Funcție pentru calcularea totalului comenzii
  const calculateTotal = () => {
    let total = totalPrice;
    if (install) total += 500; // Adaugă 500 RON dacă opțiunea de instalare este selectată
    if (total > 5000) {
      return (total * (1 - discount)).toFixed(2); // Aplică reducerea dacă totalul este peste 5000 RON
    } else {
      return ((total + 150) * (1 - discount)).toFixed(2);  // Adaugă taxa de transport de 150 RON dacă totalul este sub 5000 RON
    }
  };

// Funcție pentru validarea câmpurilor formularului
  const validateFields = () => {
    let valid = true;
    if (!name) {
      setNameError('Numele este obligatoriu!');
      valid = false;
    } else {
      setNameError('');
    }

    if (!email) {
      setEmailError('Email-ul este obligatoriu!');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!cell) {
      setCellError('Telefonul este obligatoriu!');
      valid = false;
    } else {
      setCellError('');
    }

    if (!address) {
      setAddressError('Adresa este obligatorie!');
      valid = false;
    } else {
      setAddressError('');
    }

    if (!postal) {
      setPostalError('Codul Poștal este obligatoriu!');
      valid = false;
    } else {
      setPostalError('');
    }

    if (!city) {
      setCityError('Orașul este obligatoriu!');
      valid = false;
    } else {
      setCityError('');
    }

    return valid;
  };

  // Funcție pentru trimiterea email-ului cu detaliile comenzii
  const sendEmail = (orderData) => {
    const templateParams = {
      to_name: orderData.BuyerName,
      to_email: orderData.BuyerEmail,
      name: orderData.BuyerName,
      email: orderData.BuyerEmail,
      address: `${orderData.BuyerAddress}, ${orderData.BuyerCity}, ${orderData.BuyerPostal}`,
      cell: orderData.BuyerCell,
      products: orderData.Products.map(product => `Produs: ${product.ProductName}, Cantitate: ${product.Quantity}, Preț Produs: ${product.TotalPrice.toFixed(2)} RON`).join("\n"),
      totalPayment: orderData.TotalPayment
    };
  
    emailjs.send('service_kd0yjxk', 'template_3e2xg3e', templateParams, 'Zs_ZVegL12OWoZ4e9')
      .then((response) => {
        console.log('Email sent successfully:', response.status, response.text);
      }, (error) => {
        console.error('Failed to send email:', error);
      });
  };

  // Funcție pentru trimiterea formularului de cashout
  const cashoutSubmit = (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    auth.onAuthStateChanged(user => {
      if (user) {
        console.log("User is authenticated:", user); // Adaugă acest log
        const date = new Date();
        const time = date.getTime();
        const totalPayment = Math.round(calculateTotal() * 100);
        const orderData = {
          BuyerName: name,
          BuyerEmail: email,
          BuyerCell: cell,
          BuyerAddress: address,
          BuyerPostal: postal,
          BuyerCity: city,
          BuyerQuantity: totalQty,
          AdditionalInfo: additionalInfo,
          InstallSelected: install,
          TotalPayment: totalPayment,
          OrderDate: date, 
          Products: shoppingCart.map(cartItem => ({
            ProductName: cartItem.ProductName,
            Width: cartItem.Width || '',
            Height: cartItem.Height || '',
            Color: cartItem.Color || '',
            GlassType: cartItem.GlassType || '',
            OpeningType: cartItem.OpeningType || '',
            InsectNet: cartItem.InsectNet ? 'Da' : 'Nu',
            WindowSill: cartItem.WindowSill ? 'Da' : 'Nu',
            SpecialLocks: cartItem.SpecialLocks ? 'Da' : 'Nu',
            Profile: cartItem.Profile || '',
            HandleColor: cartItem.HandleColor || '',
            Quantity: cartItem.qty,
            TotalPrice: cartItem.TotalProductPrice,
            ProductImg: cartItem.ProductImg 
          })),
        }

        console.log("Order Data:", orderData); // Log de debug

        db.collection('Buyer-info').doc(user.uid).collection('Orders').doc('_' + time).set(orderData)
        .then(() => {
          setCell('');
          setAddress('');
          setPostal('');
          setAdditionalInfo('');
          dispatch({ type: 'EMPTY' });
          setSuccessMsg('Comanda dvs. a fost plasată cu succes. Veți fi redirecționat către pagina de plata după 5 secunde.');
          sendEmail(orderData);
      
      
      //   const stripeItems = shoppingCart.map(cartItem => ({
      //     name: cartItem.ProductName,
      //     price: totalPayment * 100, 
      //     quantity: cartItem.qty,
      // }));
      const stripeItems = [{
        name: 'Total Order',
        price: totalPayment,
        quantity: 1,
      }];

      console.log("Stripe Items: ", stripeItems); // afiseaza in consola elmentele stripe

      fetch('http://localhost:3001/create-checkout-session', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              items: stripeItems,
          }),
      }).then(resp => {
          if (resp.ok) return resp.json();
          return resp.json().then(json => Promise.reject(json));
      }).then(({ url }) => {
          window.location = url;
      }).catch(e => {
          console.error(e.error);
      });
  }).catch(err => {
      console.error("Error writing document:", err); // Adaugă acest log
      setError(err.message);
    });
  } else {
    console.error("User is not authenticated"); // Adaugă acest log
    setError("Utilizatorul nu este autentificat.");
  }
    })
  }

  return (
    <>
      <Helmet title='Cashout'>
        <CommonSection title='Cashout' />
        <Container>
          <Row>
            <Col lg='9'>
              <div className='container mt-5'>
                <h2>Detalii Cashout</h2>
                {successMsg && <div className='success-msg'>{successMsg}</div>}
                {error && <span className='error-msg'>{error}</span>}
                <Form autoComplete="off" className='form-group mt-4' onSubmit={cashoutSubmit}>
                  <FormGroup>
                    <Input type="text" id="name" required onChange={(e) => setName(e.target.value)} value={name} placeholder='Numele dvs.' invalid={!!nameError} />
                    {nameError && <FormFeedback>{nameError}</FormFeedback>}
                  </FormGroup>
                  <FormGroup>
                    <Input type="email" id="email" required onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email-ul dvs.' invalid={!!emailError} />
                    {emailError && <FormFeedback>{emailError}</FormFeedback>}
                  </FormGroup>
                  <FormGroup>
                    <Input type="number" id="cell" required onChange={(e) => setCell(e.target.value)} value={cell} placeholder='Telefon (ex. 0713456789)' invalid={!!cellError} />
                    {cellError && <FormFeedback>{cellError}</FormFeedback>}
                  </FormGroup>
                  <FormGroup>
                    <Input type="text" id="address" required onChange={(e) => setAddress(e.target.value)} value={address} placeholder='Adresa de Livrare (ex. Str. Siliste, nr.194)' invalid={!!addressError} />
                    {addressError && <FormFeedback>{addressError}</FormFeedback>}
                  </FormGroup>
                  <FormGroup>
                    <Input type="number" id="postal" required onChange={(e) => setPostal(e.target.value)} value={postal} placeholder='Cod Poștal' invalid={!!postalError}/>
                    {postalError && <FormFeedback>{postalError}</FormFeedback>}
                  </FormGroup>
                  <FormGroup>
                    <Input type="text" id="city" required onChange={(e) => setCity(e.target.value)} value={city} placeholder='Oraș' invalid={!!cityError}/>
                    {cityError && <FormFeedback>{cityError}</FormFeedback>}
                  </FormGroup>
                  <div className="cashout-item"></div>
                  <FormGroup>
                    <p className='montaj_para'>Dacă doriți cu montare, bifați în căsuța de mai jos.</p>
                  <div className="d-flex align-items-center">
                  <Input type="checkbox" id="install" onChange={(e) => setInstall(e.target.checked)} style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                  <Label for="install" className="mb-0">Montare (+500 RON)</Label>
                  </div>
                  <div className="cashout-item mt-3"></div>
                  </FormGroup>
                  <FormGroup>
                    <Label for="additionalInfo">Informații Suplimentare</Label>
                    <Input type="textarea" id="additionalInfo" onChange={(e) => setAdditionalInfo(e.target.value)} value={additionalInfo} />
                  </FormGroup>
                  <Button type='submit' className='buy_btnn w-100 mt-3' onClick={cashoutSubmit}>Plasați comanda</Button>
                </Form>
              </div>
            </Col>
            <Col lg='3'>
              {totalPrice > 0 && (
                <div className='cashout-cart mt-5'>
                  <div className="cashout-item">
                  <h6 className='cart-summary-heading d-flex align-items-center justify-content-between mt-2'>
                    Subtotal
                    <span className='fs-6 fw-bold'>{totalPrice.toFixed(2)} RON</span>
                  </h6>
                  </div>
                  <div className="cashout-item">
                  <h6 className='cart-summary-heading d-flex align-items-center justify-content-between'>
                    Număr de produse
                    <span className='fs-6 fw-bold mt-3'>{totalQty}</span>
                  </h6>
                  </div>
                  <div className="cashout-item">
                  <h6 className='cart-summary-heading d-flex align-items-center justify-content-between mt-3'>
                    Transport
                    <span className='fs-6 fw-bold'>{totalPrice > 5000 ? 'Gratuit' : '150 RON'}</span>
                  </h6>
                  <p className='para_tab fs-6 mt-2'>transport gratuit doar la comenzile peste 5000 RON</p>
                  </div>
                  <div className="cashout-item">
                  <h6 className='cart-summary-heading d-flex align-items-center justify-content-between mt-4'>
                    Reducere
                    <span className='fs-6 fw-bold'>{(totalPrice * discount).toFixed(2)} RON</span>
                  </h6>
                  </div>
                  <div className="cashout-item">
                  <h6 className='cart-summary-heading d-flex align-items-center justify-content-between mt-3'>
                    Total
                    <span className='fs-6 fw-bold'>{calculateTotal()} RON</span>
                  </h6>
                  <p className='fs-6 mt-2'>Totalul este suma finală de plată.</p>
                  </div>
                  <FormGroup className='cuponr'>
                    <Label className='cuponre' for="coupon">Ai un cupon? Faceți clic aici pentru a introduce codul dvs. de cupon</Label>
                    <Input type="text" id="coupon" onChange={(e) => setCoupon(e.target.value)}  placeholder='CUPON'/>
                    <Button className='cupon-cash mt-2' type="button" onClick={applyCoupon}>Aplică cupon</Button>
                  </FormGroup>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </Helmet>
    </>
  );
};

export default Cashout;
