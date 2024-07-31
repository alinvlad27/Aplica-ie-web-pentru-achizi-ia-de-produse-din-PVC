import React from 'react'
import '../css/Footer.css'
import { Container, Row, Col, ListGroup, ListGroupItem} from 'reactstrap'
import { Link } from 'react-router-dom'
import { Icon } from 'react-icons-kit'
import {mapPin} from 'react-icons-kit/feather/mapPin'
import {phone} from 'react-icons-kit/feather/phone'
import {mail} from 'react-icons-kit/feather/mail'

const Footer = () => {
  // Obține anul curent pentru a fi afișat în footer
  const year = new Date().getFullYear() 

  return <footer className='footer'>
    <Container>
      <Row>
        <Col lg="5">
          <div>
            <h2 className='text-white'>Vlad PVC</h2>
          </div>
          <br></br>
          <p className='footer_text'> Bine ai venit pe Vlad-PVC! Suntem destinația ta online pentru 
                  produse de înaltă calitate din PVC, specializându-ne în ferestre și uși 
                  termopan. Cu o gamă variată de opțiuni și stiluri, suntem aici pentru a-ți 
                  oferi soluții durabile și estetice pentru casa ta sau proiectul tău de construcție. </p>
        </Col>
        <Col lg="2">
          <div className='footer_quick_links'>
            <h4 className='quick_links_title'>Top Categories</h4>
            <ListGroup className='links_none' >
              <ListGroupItem className='ps-0 border-0'>
                <Link to='/usa-personalizata'>Usă Personalizată</Link>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0'>
                <Link to='/fereastra-personalizata'>Fereastră Personalizată</Link>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0'>
                <Link to='#'></Link>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0'>
                <Link to='/contact'>Contact</Link>
              </ListGroupItem>
            </ListGroup>
          </div>
        </Col>

        <Col lg="2">
        <div className='footer_quick_links'>
            <h4 className='quick_links_title'>Useful Links</h4>
            <ListGroup >
              <ListGroupItem className='ps-0 border-0 '>
                <Link to='/shop'>Shop</Link>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0'>
                <Link to='/cartproducts'>Cart</Link>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0'>
                <Link to='/login'>Login</Link>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0'>
                <Link to='/signup'>Sign Up</Link>
              </ListGroupItem>
            </ListGroup>
          </div>
        </Col>

        <Col lg="3">
        <div className='footer_quick_links'>
            <h4 className='quick_links_title'>Contact</h4>
            <ListGroup className='footer_contact'>
              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
              <span><Icon icon={mapPin}/></span>
              <p>Pucheni, Dambovita, Str. Siliste</p>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
              <span><Icon icon={phone}/></span>
              <p>+(04) 0732736404</p>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
              <span><Icon icon={mail}/></span>
              <p>alinvlad38@yahoo.com</p>
              </ListGroupItem>
            </ListGroup>
          </div>
        </Col>

        <Col lg='12'>
          <p className='footer_copyright'>Copyright {year} developed by Vlad Alin. All rights reserved.
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
}

export default Footer
