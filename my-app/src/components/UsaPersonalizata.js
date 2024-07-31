import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Container, Row, Col, Input, Button, FormFeedback, FormGroup } from 'reactstrap';
import Helmet from '../elements/Helmet';
import CommonSection from '../elements/CommonSection';
import { CartContext } from '../global/CartContext';
import { auth } from '../config/Config';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import image1 from '../images/usa-pers-1.jpg';
import image2 from '../images/usa-pers-2.jpg';
import image3 from '../images/usa-pers-3.png';
import profile1 from '../images/profil-70mm.png';
import profile2 from '../images/profil-120mm.png';
import handle1 from '../images/clanta1.png';
import handle2 from '../images/clanta2.png';
import handle3 from '../images/clanta3.png';
import '../css/customize.css';

const UsaPersonalizata = ({ user }) => {
  const [model, setModel] = useState(0); // Stare pentru modelul selectat
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [color, setColor] = useState('');
  const [profile, setProfile] = useState('');
  const [handleColor, setHandleColor] = useState('');
  const [glassType, setGlassType] = useState('');
  const [openingType, setOpeningType] = useState('');
  const [specialLocks, setSpecialLocks] = useState(false);

  const [price, setPrice] = useState(0);
  const pricePerSquareMeter = 400; // Prețul pe metru pătrat
  const { dispatch, shoppingCart } = useContext(CartContext); // Obține contextul coșului de cumpărături

  // Imagini pentru modele
  const images = [
    { src: image1, label: 'Model 1' },
    { src: image2, label: 'Model 2' },
    { src: image3, label: 'Model 3' }
  ];

  // Funcție pentru calcularea prețului total
  const calculatePrice = useCallback(() => {
    let total = (width / 1000) * (height / 1000) * pricePerSquareMeter;
    if (color === 'alb') total += 200;
    if (color === 'maro') total += 350;
    if (color === 'gri') total += 450;
    if (glassType === 'simpla') total += 300;
    if (glassType === 'dublu') total += 450;
    if (glassType === 'triplu') total += 600;
    if (glassType === 'reflectorizanta') total += 600;
    if (glassType === 'mata') total += 700;
    if (openingType === 'balama') total += 200;
    if (openingType === 'glisant') total += 300;
    if (openingType === 'rabatabil') total += 400;
    if (specialLocks) total += 50;
    if (profile === '70mm') total += 400;
    if (profile === '120mm') total += 600;
    if (handleColor === 'white') total += 100;
    if (handleColor === 'beige') total += 150;
    if (handleColor === 'gray') total += 200;

    setPrice(total);
  }, [width, height, color, glassType, openingType, specialLocks, profile, handleColor]);

  useEffect(() => {
    calculatePrice();
  }, [width, height, color, glassType, openingType, specialLocks, profile, handleColor, calculatePrice]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

   // Funcție pentru adăugarea produsului în coș
  const addToCart = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert('Trebuie să fii autentificat pentru a adăuga produse în coș');
    } else {
      const productWithTotal = {
        ProductID: `usa-${model}-${width}-${height}`,
        ProductName: `Usa personalizata ${shoppingCart.length + 1}`,
        ProductPrice: price,
        Width: width || '',
        Height: height || '',
        Color: color || '',
        GlassType: glassType || '',
        OpeningType: openingType || '',
        SpecialLocks: specialLocks || false,
        Profile: profile || '',
        HandleColor: handleColor || '',
        qty: 1,
        TotalProductPrice: price,
        ProductImg: images[model].src
      };
  
      dispatch({ type: 'ADAUGA_IN_COS', id: `usa-${model}-${width}-${height}`, product: productWithTotal });
      toast.success('Usa personalizată a fost adăugată în coș', {
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

  return (
    <>
      <Helmet title='Usa Personalizata'>
        <CommonSection title='Usa Personalizata' />
        <Container>
          <Row>
            <Col lg='6'>
              <div className="image-slider">
                <img src={images[model].src} alt={`Model ${model + 1}`} className="w-100 custom-img" />
                <div className="slider-controls d-flex justify-content-between mt-3">
                  <Button className='btn_pre' onClick={() => setModel((prevModel) => (prevModel === 0 ? images.length - 1 : prevModel - 1))}>Previous</Button>
                  <Button className='btn_next' onClick={() => setModel((prevModel) => (prevModel === images.length - 1 ? 0 : prevModel + 1))}>Next</Button>
                </div>
              </div>
            </Col>
            <Col lg='6'>
              <div className="customization-form bg-light p-4 rounded mt-5">
                <h2>Customizează-ți usa</h2>
                <FormGroup>
                  <label>Model</label>
                  <Input
                    type="select"
                    value={model}
                    onChange={(e) => setModel(parseInt(e.target.value))}
                    className="mb-3"
                  >
                    {images.map((image, index) => (
                      <option key={index} value={index}>{image.label}</option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <label>Lățime (mm)</label>
                  <Input
                    type="number"
                    placeholder="Lățime (mm)"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="mb-3"
                    invalid={!width}
                  />
                  <FormFeedback>Lățimea este obligatorie și trebuie să fie mai mare de 0</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <label>Înălțime (mm)</label>
                  <Input
                    type="number"
                    placeholder="Înălțime (mm)"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="mb-3"
                    invalid={!height}
                  />
                  <FormFeedback>Înălțimea este obligatorie și trebuie să fie mai mare de 0</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <label>Profil</label>
                  <div className="d-flex">
                    <div className={`profile-option ${profile === '70mm' ? 'selected' : ''}`} onClick={() => setProfile('70mm')}>
                      <img src={profile1} alt="70mm" />
                      <p>70mm</p>
                    </div>
                    <div className={`profile-option ${profile === '120mm' ? 'selected' : ''}`} onClick={() => setProfile('120mm')}>
                      <img src={profile2} alt="120mm" />
                      <p>120mm</p>
                    </div>
                  </div>
                </FormGroup>
                <FormGroup>
                  <label>Culoare</label>
                  <Input type="select" value={color} onChange={(e) => setColor(e.target.value)} className="mb-3">
                    <option value="">Alegeți culoarea</option>
                    <option value="alb">Alb</option>
                    <option value="maro">Maro</option>
                    <option value="gri">Gri Antracit</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <label>Tipul de sticlă</label>
                  <Input type="select" value={glassType} onChange={(e) => setGlassType(e.target.value)} className="mb-3">
                    <option value="">Alegeți tipul de sticlă</option>
                    <option value="simpla">Sticlă simplă</option>
                    <option value="dublu">Sticlă dublu stratificat</option>
                    <option value="triplu">Sticlă triplu stratificat</option>
                    <option value="reflectorizanta">Sticlă reflectorizantă</option>
                    <option value="mata">Sticlă mată</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <label>Tipul de deschidere</label>
                  <Input type="select" value={openingType} onChange={(e) => setOpeningType(e.target.value)} className="mb-3">
                    <option value="">Alegeți tipul de deschidere</option>
                    <option value="balama">Balama</option>
                    <option value="glisant">Glisant</option>
                    <option value="rabatabil">Rabatabil</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <label>Culoare mâner</label>
                  <div className="d-flex">
                    <div className={`handle-option ${handleColor === 'white' ? 'selected' : ''}`} onClick={() => setHandleColor('white')}>
                      <img src={handle1} alt="white" />
                     
                    </div>
                    <div className={`handle-option ${handleColor === 'beige' ? 'selected' : ''}`} onClick={() => setHandleColor('beige')}>
                      <img src={handle2} alt="beige" />
                      
                    </div>
                    <div className={`handle-option ${handleColor === 'gray' ? 'selected' : ''}`} onClick={() => setHandleColor('gray')}>
                      <img src={handle3} alt="gray" />
                      
                    </div>
                  </div>
                </FormGroup>
                <FormGroup check>
                  <label check>
                    <Input type="checkbox" checked={specialLocks} onChange={(e) => setSpecialLocks(e.target.checked)} />
                    <span>Incuietori speciale (+50 RON)</span>
                  </label>
                </FormGroup>
                <h4 className='mt-3'>Preț total: {price.toFixed(2)} RON</h4>
                <Button className='add_personalizare mt-3' onClick={addToCart}>Adaugă în coș</Button>
                <Button tag={Link} to="/contact" className="contact_personalizare mt-3">Contact pentru ajutor</Button>
              </div>
            </Col>
          </Row>
          </Container>
          <section className='info_pers'>
          <Container>
          <Row>
            <Col lg='12'>
              <h2 className='text-center mt-5'>De ce să alegeți personalizarea produselor noastre?</h2>
              <p className='text-center mt-3'>Produsele noastre sunt realizate din materiale de cea mai înaltă calitate, asigurând durabilitate, funcționalitate și eficiență energetică. Ferestrele și ușile noastre sunt proiectate pentru a rezista la condiții meteorologice extreme, oferind în același timp protecție maximă. Alegeți VLAD-PVC pentru nevoile dvs. de ferestre și uși personalizate.</p>
            <Col/>
                  <div className="info-box ">
                    <h3>01.</h3>
                    <h4>Latimea si Inaltimea</h4>
                    <p>Se calculeaza pe metru patrat, in care un metru patrat este 400 RON</p>
                  </div>
                  <div className="info-box">
                    <h3>02.</h3>
                    <h4>Pretul Personalizarii</h4>
                    <p>Pretul difera pentru fiecare optiune in parte. Pentru culori avem: alb(+200), maro(+350), gri(+450), pentru tipul de sticla: avem simplu(+300), triplu stratificat(+450), sticla reflectorizanta(+600), sticla mata(+700), pentru tipul de deschidere avem: balama(+200), glisant(+300), rabatabil(+400).</p>
                  </div>
                  <div className="info-box">
                    <h3>03.</h3>
                    <h4>Accesorii Personalizabile</h4>
                    <p>Accesoriile noastre adaugă funcționalitate și frumusețe ferestrelor și ușilor dvs. Oferim o gamă largă de opțiuni personalizabile pentru a satisface nevoile dvs. specifice.</p>
                  </div>
                  <div className="info-box">
                    <h3>04.</h3>
                    <h4>Montaj de înaltă calitate</h4>
                    <p>Oferim servicii de montaj de înaltă calitate pentru a asigura o instalare corectă și durabilă a produselor noastre.</p>
                  </div>
            </Col>
          </Row>
        </Container>
        </section>
      </Helmet>
    </>
  );
}

export default UsaPersonalizata;
