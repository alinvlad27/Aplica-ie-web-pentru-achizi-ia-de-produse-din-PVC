import React, { useState, useEffect, useCallback } from 'react';
import { db, auth, storage } from '../config/Config';
import Helmet from '../elements/Helmet';
import { toast } from 'react-toastify';
import OrderChart from './OrderChart';
import { Table, Button } from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import '../css/admin.css';
import { useNavigate } from 'react-router-dom';

const Admin = ({ user }) => {
    const [productName, setProductName] = useState(''); // Stare pentru numele produsului
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate(); // Hook pentru redirecționare

    // Funcție pentru a aduce utilizatorii din baza de date
    const fetchUsers = useCallback(async () => {
        const usersCollection = await db.collection('SignedUpUsersData').get();
        const usersList = usersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
    }, []);

    // Funcție pentru a verifica dacă utilizatorul curent este admin
    const checkAdminStatus = useCallback(async () => {
        const userDoc = await db.collection('SignedUpUsersData').doc(auth.currentUser.uid).get();
        if (userDoc.exists && userDoc.data().isAdmin) {
            setIsAdmin(true);
            fetchUsers();
        } else {
            setIsAdmin(false);
        }
    }, [fetchUsers]);

    // Efect pentru a verifica statutul de admin la încărcarea componentei
    useEffect(() => {
        checkAdminStatus();
    }, [checkAdminStatus]);

    // Funcție pentru deconectare
    const handleLogout = () => {
        auth.signOut().then(() => {
            navigate('/login');
        });
    };

    // Funcție pentru a gestiona schimbarea imaginii
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        } else {
            setImage(null);
        }
    };

    // Funcție pentru a adăuga un produs nou
    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!image) {
            setError('Imaginea este obligatorie.');
            return;
        }
    
        const uploadTask = storage.ref(`product-images/${image.name}`).put(image);
    
        uploadTask.on(
            'state_changed',
            (snapshot) => {},
            (error) => {
                setError(error.message);
            },
            async () => {
                const url = await storage.ref('product-images').child(image.name).getDownloadURL();
                const newProductRef = db.collection('products').doc(); // Creează un nou document și primește un id unic
                const newProduct = {
                    id: newProductRef.id, // Setează id-ul unic generat de Firestore
                    productName,
                    category,
                    price: Number(price),
                    description,
                    shortDesc: 'Bucură-te de confort și siguranță cu ferestrele și ușile noastre din PVC, proiectate pentru izolare termică și fonică superioară. Personalizabile în diverse dimensiuni și culori, acestea oferă durabilitate și un design modern, completând perfect orice stil arhitectural.',
                    imgUrl: url,
                    reviews: [],
                    avgRating: 0,
                };
                newProductRef.set(newProduct).then(() => {
                    setProductName('');
                    setCategory('');
                    setPrice('');
                    setDescription('');
                    setImage(null);
                    setError('');
                    toast.success('Produsul a fost adăugat cu succes!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                    });
                }).catch(err => setError(err.message));
            }
        );
    };

    // Funcție pentru a șterge un utilizator
    const handleDeleteUser = async (userId) => {
        try {
            await db.collection('SignedUpUsersData').doc(userId).delete();
            toast.success('Utilizatorul a fost șters cu succes!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
            fetchUsers(); // refresh listei de useri
        } catch (err) {
            toast.error('Eroare la ștergerea utilizatorului!', {
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

    // Funcție pentru a edita numele unui utilizator
    const handleEditUserName = async (userId, newName) => {
        try {
            await db.collection('SignedUpUsersData').doc(userId).update({ Name: newName });
            toast.success('Numele a fost schimbat cu succes!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
            fetchUsers(); // refresh listei de utilizatori
        } catch (err) {
            toast.error('Eroare la schimbarea numelui!', {
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
        <Helmet title='Admin'>
            {isAdmin ? (  // Afișează conținutul doar dacă utilizatorul este admin
                <>
                    <div className="admin-navbar">
                        <Button color="secondary" onClick={handleLogout}>Logout</Button>
                    </div>
                    <div className='admin-container mt-5'>
                        <form onSubmit={handleAddProduct}>
                            <h2>Adaugă Produs Nou</h2>
                            <div className='form-group mt-3'>
                                <input type='text' placeholder='Nume Produs' required value={productName} onChange={(e) => setProductName(e.target.value)} />
                            </div>
                            <div className='form-group'>
                                <input type='text' placeholder='Categorie' required value={category} onChange={(e) => setCategory(e.target.value)} />
                            </div>
                            <div className='form-group'>
                                <input type='number' placeholder='Preț' required value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className='form-group'>
                                <textarea placeholder='Descriere' required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                            <div className='form-group'>
                                <label className='img'>Imagine</label>
                                <input className='img_src' type='file' onChange={handleImageChange} />
                            </div>
                            <button type='submit' className='btna btn-primary'>Adaugă Produs</button>
                        </form>
                        {error && <span className='error-msg'>{error}</span>}
                    </div>
                    <div className='user-list mt-5'>
                        <h2>Lista Utilizatorilor</h2>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nume</th>
                                    <th>Email</th>
                                    <th>Acțiuni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{user.Name}</td>
                                        <td>{user.Email}</td>
                                        <td>
                                            <Button color="danger" onClick={() => handleDeleteUser(user.id)}>Șterge</Button>{' '}
                                            <Button color="warning" onClick={() => {
                                                const newName = prompt('Introduceți noul nume:');
                                                if (newName) {
                                                    handleEditUserName(user.id, newName);
                                                }
                                            }}>Editează Nume</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </>
            ) : (
                <p>Nu aveți permisiunea de a accesa această pagină.</p>
            )}
            <div className='mt-5'>
                <OrderChart/>
            </div>
        </Helmet>
    );
};

export default Admin;
