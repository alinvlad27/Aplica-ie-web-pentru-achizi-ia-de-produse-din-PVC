import React, { useState, useEffect } from 'react';
import Helmet from '../elements/Helmet';
import '../css/contact.css'
import CommonSection from '../elements/CommonSection';
import { Icon } from 'react-icons-kit'
import {facebook_1} from 'react-icons-kit/ikons/facebook_1'
import {mapPin} from 'react-icons-kit/feather/mapPin'
import { db } from '../config/Config'; 

function Contact({ user }) {
  // Definirea stărilor pentru nume, email, mesaj, mesaje de succes și eroare și indexul activ pentru FAQ
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);

  // Funcție pentru trimiterea mesajului la Firebase
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne comportamentul implicit al formularului
    try {
      await db.collection('contacts').add({
        name,
        email,
        message,
        createdAt: new Date()
      });
      setSuccessMessage('Mesajul a fost trimis cu succes!'); // Setează mesajul de succes
      setName(''); // Resetează câmpul de nume
      setEmail('');
      setMessage('');
    } catch (error) {
      setErrorMessage('A apărut o eroare la trimiterea mesajului. Vă rugăm să încercați din nou.');
    }
  };

  // Funcție pentru comutarea vizibilității FAQ
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Hook pentru a face scroll în partea de sus a paginii când componenta se montează
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Helmet title='Contact'>
        <CommonSection title='Contact' />
        <div className="contact-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="contact-info">
                  <div className="info-item">
                    <h4>Produse și Comandă</h4>
                    <p>(+04) 0732736404 disponibil 24/7</p>
                  </div>
                  <div className="info-item">
                    <h4>Informații & Întrebări</h4>
                    <p>(+04) 0732736404 disponibil 24/7</p>
                  </div>
                  <div className="info-item">
                <h4>Locația magazinului</h4>
                <div className="info-content">
                    <span className='map_contact'><Icon icon={mapPin} /></span>
                    <p>Pucheni, Dambovita, Str. Siliste, nr.194</p>
                </div>
                </div>
                    <h4>Păstrăm legătura</h4>
                    <p>
                      <a href="https://www.facebook.com/profile.php?id=100071326236510&locale=ro_RO"><i className="fa fa-facebook"><Icon icon={facebook_1}/></i></a>
                    </p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <form onSubmit={handleSubmit} className="contact-form">
                  <div>
                    <label htmlFor="name">Nume *</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">E-mail *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="message">Comentariu sau Mesaj *</label>
                    <textarea
                      id="message"
                      rows="4"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>
                  <button type="submit">Trimite Mesajul</button>
                  {successMessage && <p className="success-message">{successMessage}</p>}
                  {errorMessage && <p className="error-message">{errorMessage}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="faq-section">
          <div className="container">
            <h2 className="section-title">Întrebări Frecvente</h2>
            <div className="faq-content">
              <table>
                <tbody>
                  {faqData.map((faq, index) => (
                    <React.Fragment key={index}>
                      <tr className="faq-question" onClick={() => toggleFAQ(index)}>
                        <td>{faq.question}</td>
                        <td className="faq-arrow">{activeIndex === index ? '▲' : '▼'}</td>
                      </tr>
                      {activeIndex === index && (
                        <tr className="faq-answer">
                          <td colSpan="2">{faq.answer}</td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Helmet>
    </>
  );
}

const faqData = [
    {
      question: 'Ce tipuri de ferestre oferiți?',
      answer: 'Oferim o gamă largă de stiluri de ferestre, inclusiv ferestre batante, batante, copertine, glisante, batante și arc. Echipa noastră vă poate ajuta să alegeți cel mai bun stil pentru nevoile și bugetul dumneavoastră.'
    },
    {
      question: 'Din ce materiale sunt făcute ferestrele tale?',
      answer: 'Ferestrele noastre sunt realizate din materiale de înaltă calitate precum fibra de sticlă și aluminiu, asigurând durabilitate și eficiență energetică.'
    },
    {
      question: 'Oferiți dimensiuni de ferestre personalizate?',
      answer: 'Da, oferim ferestre personalizate pentru a se potrivi perfect spațiului și preferințelor dvs. estetice.'
    },
    {
      question: 'Care este garanția ferestrelor tale?',
      answer: 'Ferestrele noastre vin cu o garanție de 2 ani, asigurându-vă calitate și performanță pe termen lung.'
    },
    {
      question: 'Oferiți servicii de instalare?',
      answer: 'Da, oferim servicii profesionale de montaj pentru toate ferestrele si usile achizitionate de la noi, asigurand o instalare corecta si eficienta.'
    }
  ];


export default Contact;