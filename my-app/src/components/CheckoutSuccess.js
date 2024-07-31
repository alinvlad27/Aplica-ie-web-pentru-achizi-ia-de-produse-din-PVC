import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
    // Hook pentru navigare
    const navigate = useNavigate();

    // Hook pentru efecte secundare
    useEffect(() => {
        // Setează un timer pentru a redirecționa utilizatorul după 5 secunde
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);

        // Curăță timer-ul la demontarea componentului
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="checkout-success">
            <h2>Comanda dvs. a fost plasată cu succes.</h2>
            <p>Veți fi redirecționat către pagina principală după 5 secunde.</p>
        </div>
    );
};

export default CheckoutSuccess;
