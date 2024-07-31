import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import { ProductsContextProvider } from './global/ProductsContext';
import { auth, db } from './config/Config';
import { CartContextProvider } from './global/CartContext';
import Cart from './components/Cart';
import Cashout from './components/Cashout';
import Shop from './components/Shop';
import ProductDetails from './components/ProductDetails';
import Footer from './elements/Footer';
import Contact from './components/Contact';
import UsaPersonalizata from './components/UsaPersonalizata';
import FereastraPersonalizata from './components/FereastraPersonalizata';
import Admin from './components/Admin';
import Navbar from './elements/Navbar';
import Profile from './components/Profile';
import CheckoutSuccess from './components/CheckoutSuccess';
import CheckoutCancel from './components/CheckoutCancel';
import ChatBotIcon from './components/ChatBotIcon';

export class App extends Component {

  state = {
    user: null,
    isAdmin: false,
    errorMsg: null
  }

  // Metoda de montare a componentelor
  componentDidMount() {
    // Verifică dacă utilizatorul este autentificat
    auth.onAuthStateChanged(user => {
      if (user) {
        // Obține datele utilizatorului din Firestore
        db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot => {
          const userData = snapshot.data();
          if (userData) {
            // Setează starea utilizatorului și rolul de admin
            this.setState({
              user: userData.Name,
              isAdmin: userData.isAdmin,
              errorMsg: null
            });
          } else {
            // Setează mesaj de eroare dacă contul nu există
            this.setState({
              user: null,
              isAdmin: false,
              errorMsg: 'Acest cont nu există'
            });
          }
        }).catch(error => {
          // Gestionează erorile la preluarea datelor utilizatorului
          console.error("Error fetching user data: ", error);
          this.setState({
            user: null,
            isAdmin: false,
            errorMsg: 'Eroare la preluarea datelor utilizatorului'
          });
        });
      } else {
        // Resetează starea dacă utilizatorul nu este autentificat
        this.setState({
          user: null,
          isAdmin: false,
          errorMsg: null
        });
      }
    });
  }

  render() {
    return (
      <ProductsContextProvider>
        <CartContextProvider>
          <BrowserRouter>
          {this.state.user && !this.state.isAdmin && <ChatBotIcon user={this.state.user} />}
            <div style={{ marginBottom: '50px' }}>
            {!this.state.isAdmin && <Navbar user={this.state.user} />}
            {this.state.errorMsg && <div className="error-message">{this.state.errorMsg}</div>}
              <Routes>
                <Route exact path='/' element={<Home user={this.state.user} />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/cartproducts' element={<Cart user={this.state.user} />} />
                <Route path='/cashout' element={<Cashout user={this.state.user} />} />
                <Route path='/contact' element={<Contact user={this.state.user} />} />
                <Route path='/profil' element={<Profile user={this.state.user} />} />
                <Route path='/succes' element={<CheckoutSuccess user={this.state.user} />} />
                <Route path='/cancel' element={<CheckoutCancel user={this.state.user} />} />
                <Route path='/usa-personalizata' element={<UsaPersonalizata user={this.state.user} />} />
                <Route path='/fereastra-personalizata' element={<FereastraPersonalizata user={this.state.user} />} />
                <Route path='/shop' element={<Shop user={this.state.user} />} />
                <Route path='/shop/:id' element={<ProductDetails user={this.state.user} />} />
                {this.state.isAdmin && <Route path='/admin' element={<Admin user={this.state.user} />} />}
                <Route path="*" element={<Navigate to={this.state.isAdmin ? "/admin" : "/"} />} />
              </Routes>
            </div>
            {!this.state.isAdmin}
            <Footer />
          </BrowserRouter>
        </CartContextProvider>
      </ProductsContextProvider>
    );
  }
}

export default App;
