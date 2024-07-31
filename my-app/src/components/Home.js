import React from 'react';
import '../css/Home.css'
import ProductsList from './ProductsList'
import { Link } from 'react-router-dom'
import Services from '../elements/Services';
import products from '../data/products'
import { Container, Row, Col } from 'reactstrap'
import heroImg from '../images/back.jpg'
import aboutImg from '../images/about-imgg.png'
import userImg from '../images/user.png'
import { Icon } from 'react-icons-kit'
import {star} from 'react-icons-kit/iconic/star'
import {starHalfOutline} from 'react-icons-kit/typicons/starHalfOutline'
import termopCount from '../images/usa-count2.png'
import Helmet from '../elements/Helmet'
import Clock from './Clock'
import { useEffect, useState } from 'react'

const Home = ({user}) => {
  // Definește stările pentru produsele trending și best sales
  const [trendingProducts, setTrendingProducts] = useState([])
  const [bestSalesProducts, setBestSalesProducts] = useState([])
  // Obține anul curent
  const year = new Date().getFullYear()

  // Filtrează produsele trending și best sales la montarea componentelor
  useEffect(()=>{
    const filteredTrendingProducts = products.filter(
      (item) => item.category === 'Trending');
    const filteredBestSalesProducts = products.filter(
      (item) => item.category === 'Fereastră')
      
    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
  },[]);

  // Face scroll în partea de sus a paginii la montarea componentelor
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);


  return (
    <>
    <Helmet title={"Home"}>
    <div className='wrapper'>
      <div className="hero_img">
        <img src={heroImg} alt='' />
        <div className="dark-overlay"></div>
      </div>
      <section className='hero_section'>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className='hero_content'>
                <p className='hero_subtitle mt-5'>Trending product in {year}</p>
                <h2 className='hero_title'>Alege Interiorul și Exteriorul <br></br> Casei Tale </h2>
                  <div>
                  <Link to='/shop' className='buy_btn_home mt-5'>DESCOPERĂ COLECȚIA</Link>
                  </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <div className='mt-5'></div>
      <Services/>
      
      <section className='trending_prodcuts mt-5'>
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2 className='section_title mt-4'>Trending Products</h2>
              
            </Col>
            <div className='mt-5'></div>
            <ProductsList data={trendingProducts}/>
          </Row>
        </Container>
      </section>
   
          <section className='about_section mt-5'>
            <Container>
              <Row>
                <Col lg='6' md='6'>
                  <img src={aboutImg} alt='about' className='about_img' />
                </Col>
                <Col lg='6' md='6'>
                  <div className='about_content'>
                    <h4>DESPRE NOI</h4>
                    <h2 className='about-title'>Experimentați ce este mai bun în ferestre și uși</h2>
                    <p className='about-para'>La VLAD-PVC, credem că fiecare casă merită ferestre și uși de înaltă calitate. Produsele noastre sunt concepute pentru a spori funcționalitatea, frumusețea și eficiența energetică a casei dumneavoastră. Ne angajăm să oferim clienților noștri cele mai bune servicii și produse, asigurându-ne că obțin cel mai bun raport calitate-preț.</p>
                    <Link to='/shop' className='read_more_btn'>DESCOPERĂ MAI MULT</Link>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          
          <section className='why_choose_us mt-5'>
            <Container>
              <Row>
                <Col lg='12' className='text-center'>
                  <h2 className='section_title'>De ce să ne alegeți produsele?</h2>
                  <p className='section_subtitle'>Produsele noastre sunt realizate din materiale de cea mai înaltă calitate, asigurând durabilitate, funcționalitate și eficiență energetică. Ferestrele noastre sunt construite pentru a rezista la condiții meteorologice extreme, în timp ce ușile noastre oferă protecție maximă. Alegeți VLAD-PVC pentru nevoile de ferestre și uși ale casei dvs.</p>
                </Col>
                <div className='why_choose_us_grid'>
                  <div className='why_choose_us_item'>
                    <h4>01.</h4>
                    <h5>Varietate de stiluri de ferestre</h5>
                    <p>Oferim o mare varietate de stiluri de ferestre, inclusiv ferestre dublu, batante, copertine și glisante. Ferestrele noastre sunt concepute pentru a satisface nevoile dumneavoastră specifice și preferințele de stil.</p>
                  </div>
                  <div className='why_choose_us_item'>
                    <h4>02.</h4>
                    <h5>Materiale durabile pentru ferestre</h5>
                    <p>Ferestrele noastre sunt realizate din materiale de înaltă calitate, cum ar fi fibra de sticlă, asigurând durabilitate și eficiență energetică. Materialele noastre sunt ușor de întreținut și vor rezista mulți ani.</p>
                  </div>
                  <div className='why_choose_us_item'>
                    <h4>03.</h4>
                    <h5>Accesorii personalizabile</h5>
                    <p>Accesoriile noastre pentru ferestre și uși adaugă funcționalitate și frumusețe ferestrelor dumneavoastră. De la grile la feronerie, oferim o gamă largă de opțiuni personalizabile pentru a satisface nevoile dumneavoastră specifice.</p>
                  </div>
                  <div className='why_choose_us_item'>
                    <h4>04.</h4>
                    <h5>Uși de înaltă calitates</h5>
                    <p>Ușile noastre sunt proiectate pentru a oferi protecție maximă, permițând în același timp aerului proaspăt să circule liber. Ușile noastre sunt realizate din materiale de înaltă calitate și sunt construite pentru a rezista.</p>
                  </div>
                </div>
              </Row>
            </Container>
          </section>

      <section className='best_sales mt-5'>
        <Container>
        <Row>
            <Col lg='12' className='text-center'>
              <h2 className='section_title'>Best Sales</h2>
            </Col>
            <div className='mt-5'></div>
            <ProductsList data={bestSalesProducts}/>
          </Row>
        </Container>
      </section>

      <section className='timer_count mt-5'>
        <Container>
          <br></br>
          <Row> 
            <Col lg='9' md='6'>
            <div className='clock_content'>
              <h4 className='text-white fs-6 mb-2'>Ofertă Limitată</h4>
              <h3 className='text-white fs-5 mb-3'>20% Reducere la toate produsele</h3>
            </div>
              <Clock/>
              <br></br>
              <button className='visit_st'><Link to='/shop'>Vizitează Shop-ul</Link></button>
            </Col>
            <Col lg='3' md='6' className='text-end'>
              <img src={termopCount} alt='' ></img>
            </Col>
          </Row>
        </Container>
      </section>

      <section className='customer_reviews mt-5'>
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2 className='section_title'>Clienții noștri vorbesc pentru noi</h2>
            </Col>
            <Col lg='4' md='6' className='mb-4'>
              <div className='review_card'>
                <p>"Ferestrele Vlad-Pvc sunt top. Au îmbunătățit eficiența energetică a casei noastre și arată grozav."</p>
                <div className='review_author'>
                  <img src={userImg} alt='review1' className='review_img'/>
                  <div>
                    <h5>Andrei Iulian</h5>
                    <div className='star-review'>
                    <span><Icon icon={star}/></span>
                  <span><Icon icon={star}/></span>
                  <span><Icon icon={star}/></span>
                  <span><Icon icon={star}/></span>
                  <span><Icon icon={star}/></span>
                  </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg='4' md='6' className='mb-4'>
              <div className='review_card'>
                <p>"Am fost impresionați de angajamentul Vlad-Pvc de a oferi cele mai bune servicii și produse. Suntem încântați de noile noastre ferestre."</p>
                <div className='review_author'>
                  <img src={userImg} alt='review2' className='review_img'/>
                  <div>
                    <h5>Luis Adrian</h5>
                    <div className='star-review'>
                    <span><Icon icon={star}/></span>
                  <span><Icon icon={star}/></span>
                  <span><Icon icon={star}/></span>
                  <span><Icon icon={star}/></span>
                  <span><Icon icon={starHalfOutline}/></span>
                  </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg='4' md='6' className='mb-4'>
              <div className='review_card'>
                <p>"Ușile pe care le-am achiziționat de la Vlad-Pvc sunt exact ceea ce aveam nevoie. Sunt durabile, funcționale și arată grozav."</p>
                <div className='review_author'>
                  <img src={userImg} alt='review3' className='review_img'/>
                  <div>
                    <h5>Maria Ana</h5>
                    <div className='star-review'>
                    <span><Icon icon={star}/></span>
                  <span><Icon icon={star}/></span>
                  <span><Icon icon={star}/></span>
                  <span><Icon icon={star}/></span>
                  <span><Icon icon={star}/></span>
                  </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className='average text-center'>
            <Col lg='12'>
            <p className='average-rating mt-4'>
                    Evaluare medie 4,8 
                    <span className='star-review'>
                      <Icon icon={star} size={16} />
                      <Icon icon={star} size={16} />
                      <Icon icon={star} size={16} />
                      <Icon icon={star} size={16} />
                      <Icon icon={starHalfOutline} size={16} />
                    </span>
                    din 323 recenzii
                  </p>
            </Col>
          </Row>
        </Container>
      </section>

          <section className='contact_section mt-5'>
            <Container>
              <Row>
                <Col lg='12' className='text-center'>
                  <h2 className='section_title'>Să luăm legătura</h2>
                  <p className='section_subtitle'>
                  Sunteți curios să aflați gama noastră diversă de soluții de design interior? Nu ezitați să ne contactați folosind multiplele opțiuni de contact pe care le oferim.
                  </p>
                  <Link to='/contact' className='contact_btn'>CONTACTAŢI-NE</Link>
                </Col>
              </Row>
            </Container>
          </section>
    </div>
    </Helmet>
    </>
  )
}

export default Home
