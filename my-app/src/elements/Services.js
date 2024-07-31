import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Icon } from 'react-icons-kit'
import {truck} from 'react-icons-kit/feather/truck'
import {refreshCcw} from 'react-icons-kit/feather/refreshCcw'
import {shield} from 'react-icons-kit/feather/shield'
import {dollarSign} from 'react-icons-kit/feather/dollarSign'
import {motion} from 'framer-motion'
import '../css/Services.css'

const Services = () => {
  return <section className='services'>
    <Container>
        <Row>
            <Col lg='3' md='4' >
                <motion.div whileHover={{scale: 1.1}} className='service_item'>
                    <span><Icon icon={truck}/></span>
                    <div>
                        <h3>Transport Gratuit</h3>
                        <p>transport gratuit la comenzile de peste 5000 RON.</p>
                    </div>
                </motion.div>
            </Col>
            <Col lg='3' md='4' >
                <motion.div whileHover={{scale: 1.1}} className='service_item sv_item2'>
                    <span><Icon icon={refreshCcw}/></span>
                    <div>
                        <h3>Retururi Ușoare</h3>
                        <p>retur pentru comenzile care au probleme.</p>
                    </div>
                </motion.div>
            </Col>
            <Col lg='3' md='4' >
                <motion.div whileHover={{scale: 1.1}} className='service_item sv_item3'>
                    <span><Icon icon={shield}/></span>
                    <div>
                        <h3>Plată Securizată</h3>
                        <p>puteți plăti cu cardul și la livrare</p>
                    </div>
                </motion.div>
            </Col>
            <Col lg='3' md='4' >
                <motion.div whileHover={{scale: 1.1}} className='service_item sv_item4'>
                    <span><Icon icon={dollarSign}/></span>
                    <div>
                        <h3>Garanție Înapoi</h3>
                        <p>oferim o garanție de 2 ani pentru produse.</p>
                    </div>
                </motion.div>
            </Col>
        </Row>
    </Container>
    
  </section>
}

export default Services
