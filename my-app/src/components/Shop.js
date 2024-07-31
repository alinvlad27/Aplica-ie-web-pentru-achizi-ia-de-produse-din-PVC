import React, { useState, useEffect, useContext } from 'react';
import CommonSection from '../elements/CommonSection';
import Helmet from '../elements/Helmet';
import { Container, Row, Col } from 'reactstrap';
import { Icon } from 'react-icons-kit';
import { search } from 'react-icons-kit/feather/search';
import '../css/Shop.css';
import ProductsList from './ProductsList';
import { ProductsContext } from '../global/ProductsContext';

const Shop = ({ user }) => {
  // Obține produsele din contextul global
  const { products } = useContext(ProductsContext);
  // Stare pentru produsele afișate
  const [productsData, setProductsData] = useState(products);

  useEffect(() => {
    setProductsData(products); // Actualizează produsele afișate atunci când se schimbă produsele din context
  }, [products]);

  // Funcție pentru normalizarea stringurilor (elimină diacriticele și convertește în litere mici)
  const normalizeString = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  };

  // Funcție pentru filtrarea produselor după categorie
  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === 'Ușă') {
      const filteredProducts = products.filter(item => item.category === 'Ușă' || item.category === 'Trending');
      setProductsData(filteredProducts);
    }

    if (filterValue === 'Fereastră') {
      const filteredProducts = products.filter(item => item.category === 'Fereastră');
      setProductsData(filteredProducts);
    }
  }

  // Funcție pentru căutarea produselor
  const handleSearch = e => {
    const searchTerm = normalizeString(e.target.value);
    const searchedProducts = products.filter(item => normalizeString(item.productName).includes(searchTerm));
    setProductsData(searchedProducts);
  }

  // Funcție pentru sortarea produselor după preț
  const handleSort = (e) => {
    const sortValue = e.target.value;
    let sortedProducts = [...productsData];

    if (sortValue === 'ascending') {
      sortedProducts.sort((a, b) => a.price - b.price);
    }

    if (sortValue === 'descending') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setProductsData(sortedProducts);
  };

  // Scroll la începutul paginii la montare
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* <Navbar user={user} /> */}
      <Helmet title='Shop'>
        <CommonSection title='Shop - Produse' />
        <br></br><br></br>
        <section>
          <Container>
            <Row>
              <Col lg='3' md='3'>
                <div className='filter_widget'>
                  <select onChange={handleFilter}>
                    <option>Filtrează după Categorie</option>
                    <option value='Ușă'>Ușă</option>
                    <option value='Fereastră'>Fereastră</option>
                  </select>
                </div>
              </Col>
              <Col lg='3' md='3'>
                <div className='filter_widget'>
                  <select onChange={handleSort}>
                    <option>Sortează după</option>
                    <option value='ascending'>Crescător</option>
                    <option value='descending'>Descrescător</option>
                  </select>
                </div>
              </Col>
              <Col lg='6' md='6'>
                <div className='search_box'>
                  <input type='text' placeholder='Caută.....' onChange={handleSearch} />
                  <span><Icon icon={search} /></span>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <br></br><br></br>
        <section>
          <Container>
            <Row>
              {productsData.length === 0 ? (
                <h1 className='text-center fs-4'>No products are found!</h1>
              ) : (
                <ProductsList data={productsData} />
              )}
            </Row>
          </Container>
        </section>
      </Helmet>
    </>
  );
};

export default Shop;
