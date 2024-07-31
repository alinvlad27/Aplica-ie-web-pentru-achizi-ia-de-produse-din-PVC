import React, { useState } from 'react';
import { auth, db } from '../config/Config'; 
import { useNavigate } from 'react-router-dom';
import CommonSection from '../elements/CommonSection';
import Helmet from '../elements/Helmet';
import '../css/profile.css'; 
import firebase from 'firebase/compat/app'; 

const Profile = () => {
  const [currentSection, setCurrentSection] = useState('bord'); // Stare pentru secțiunea curentă
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

   // Funcție pentru reautentificare cu parola curentă
  const reauthenticate = async (currentPassword) => {
    try {
      const user = auth.currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await user.reauthenticateWithCredential(credential);
    } catch (error) {
      console.error('Reauthentication error:', error);
      throw new Error('Parola actuală este incorectă.');
    }
  };

  // Funcție pentru schimbarea parolei
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Parolele nu se potrivesc!');
      return;
    }

    try {
      await reauthenticate(currentPassword); // Reautentificare cu parola curentă
      const user = auth.currentUser;
      await user.updatePassword(newPassword); // Actualizare parolă

      // Actualizare parola în Firestore
      const userRef = db.collection('SignedUpUsersData').doc(user.uid);
      await userRef.update({
        Password: newPassword
      });

      setSuccessMsg('Parola a fost schimbată cu succes!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');

    } catch (error) {
      console.error('Password change error:', error);
      setError('Parola actuală este incorectă sau a apărut o eroare la schimbarea parolei.');
    }
  };

   // Funcție pentru deconectare
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login');
    });
  };

  return (
    <Helmet title='Profil'>
      <CommonSection title='Profil' />
      <div className='profile-container mt-5'>
        <div className='profile-sidebar'>
          <ul>
            <li className={currentSection === 'bord' ? 'active' : ''} onClick={() => setCurrentSection('bord')}>Bord</li>
            <li className={currentSection === 'schimbare-parola' ? 'active' : ''} onClick={() => setCurrentSection('schimbare-parola')}>Schimbare Parola</li>
            <li onClick={handleLogout}>Deconectare</li>
          </ul>
        </div>
        <div className='profile-content'>
          {currentSection === 'bord' && (
            <div className='bord-section'>
              <h2 className='bord_profil'>Bord</h2>
              <p className='bord_profil'>Bun venit în contul dvs! Din tabloul de bord al contului dvs. puteți schimba parola dacă aveți nevoie.</p>
              <p className='bord_profil'>
                Ai nevoie de ajutor? <a href="/contact">Click aici</a>
              </p>
              <p className='bord_profil'>
                Vrei să vezi toate produsele noastre? <a href="/shop">Click aici</a>
              </p>
            </div>
          )}
          {currentSection === 'schimbare-parola' && (
            <div className='password-change-section'>
              
              {error && <div className='error-msg'>{error}</div>}
              {successMsg && <div className='success-msg'>{successMsg}</div>}
              <form onSubmit={handlePasswordChange}>
                <div className='form-group'>
                  <label>Parola actuală</label>
                  <input type='password' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                </div>
                <div className='form-group'>
                  <label>Parola nouă</label>
                  <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                </div>
                <div className='form-group'>
                  <label>Confirmare Parola</label>
                  <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <button type='submit' className='btn-primary'>Schimbă Parola</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </Helmet>
  );
};

export default Profile;
