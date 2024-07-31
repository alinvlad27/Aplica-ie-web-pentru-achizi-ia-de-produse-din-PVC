import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CheckoutCancel = () => {
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
    }, [navigate]); // Execută efectul doar când navigate se schimbă

    return (
        <div className="checkout-cancel">
            <h2>Plata a fost refuzată.</h2>
            <p>Veți fi redirecționat către pagina de start după 5 secunde.</p>
        </div>
    );
};

export default CheckoutCancel;
