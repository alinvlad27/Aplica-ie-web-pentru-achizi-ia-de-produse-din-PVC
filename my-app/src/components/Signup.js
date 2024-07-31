import React, { useState } from 'react';
import { auth, db } from '../config/Config';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from 'reactstrap';
import '../css/Signup.css';
import Helmet from '../elements/Helmet';

const Signup = ({ user }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Funcția pentru gestionarea procesului de înregistrare
    const handleSignup = (e) => { 
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password).then((cred) => {
            db.collection('SignedUpUsersData').doc(cred.user.uid).set({
                Name: name,
                Email: email,
                Password: password,
                isAdmin: false  // Setează implicit rolul de utilizator non-admin
            }).then(() => {
                setName('');
                setEmail('');
                setPassword('');
                setError('');
                navigate('/login');
            }).catch(err => setError(err.message));
        }).catch(err => setError(err.message));
    }

    return (
        <div>
            <Helmet title='Sign Up'>
                {/* <Navbar user={user} /> */}
                <div className='signup-container'>
                    <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '70vh' }}>
                        <div className='w-100' style={{ maxWidth: '400px' }}>
                            <div className='container2'>
                                <br />
                                <h2 className='sign text-center'>Sign Up</h2>
                                <hr />
                                <form autoComplete='off' className='form-group' onSubmit={handleSignup}>
                                    <br />
                                    <input type='text' className='form-control' required onChange={(e) => setName(e.target.value)} value={name} placeholder='Enter your name' />
                                    <br />
                                    <br />
                                    <input type='email' className='form-control' required onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter your email' />
                                    <br />
                                    <br />
                                    <input type='password' className='form-control' required onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter your password' />
                                    <br />
                                    <button type='submit' className='btn btn-success btn-md mybtn'>REGISTER</button>
                                </form>
                                {error && <div className='error-msg'>{error}</div>}
                                <br />
                                <span className='register'>Already have an account? Login&nbsp;
                                    <Link to='/login'>Here</Link>
                                </span>
                            </div>
                        </div>
                    </Container>
                </div>
            </Helmet>
        </div>
    );
}

export default Signup;
