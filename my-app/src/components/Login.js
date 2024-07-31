import React, { useState } from 'react';
import { auth, db } from '../config/Config';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from 'reactstrap';
import '../css/Login.css';
import Helmet from '../elements/Helmet';

const Login = (props) => {
    // Definește stările pentru email, parolă și erori
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Funcția de login
    const login = (e) => {
        e.preventDefault(); // Previne comportamentul implicit al formularului
        auth.signInWithEmailAndPassword(email, password).then((cred) => {
            db.collection('SignedUpUsersData').doc(cred.user.uid).get().then((snapshot) => {
                if (snapshot.data().isAdmin) {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            }).catch(err => setError(err.message));
        }).catch(err => setError(err.message));
    }

    return (
        <div>
            <Helmet title={"Login"}></Helmet>
            {/* <Navbar user={props.user}/> */}
            <div className='login-container'>
                <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '70vh' }}>
                    <div className='w-100' style={{ maxWidth: '400px' }}>
                        <div className='container2'>
                            <br />
                            <h2 className='login text-center'>Login</h2>
                            <hr/>
                            <form autoComplete="off" className='form-group' onSubmit={login}>
                                <input type="email" className='form-control' required onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter your email' />
                                <br />
                                <input type="password" className='form-control' required onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter your password' />
                                <br />
                                <button type="submit" className='btn btn-success btn-md mybtn'>LOGIN</button>
                            </form>
                            {error && <span className='error-msg'>{error}</span>}
                            <br/>
                            <span className='register'>Don't have an account? Register&nbsp;
                                <Link to="/signup">Here</Link>
                            </span>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Login;
