// Încarcă variabilele de mediu din fișierul .env
require('dotenv').config();

// Import modulele necesare
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware pentru parsarea JSON-ului din cereri
app.use(express.json());

// Middleware pentru gestionarea cererilor CORS
app.use(cors({
    origin: 'http://localhost:3000', // Permite cereri doar de la această origine
}));

// Inițializare Stripe cu cheia secretă din variabilele de mediu
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

// Endpoint pentru crearea unei sesiuni de checkout
app.post('/create-checkout-session', async (req, res) => {
    try {
        // Obține articolele din corpul cererii
        const items = req.body.items;

        // Verifică dacă există articole pentru checkout
        if (!items || items.length === 0) {
            throw new Error('No items provided for checkout');
        }

        // Creează o sesiune de checkout Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'], // Metodele de plată acceptate
            mode: 'payment', // Mod de plată unic
            line_items: items.map(item => {
                // Verifică dacă datele articolului sunt valide
                if (!item.name || !item.price || !item.quantity) {
                    throw new Error('Invalid item data');
                }
                // Returnează datele de preț și cantitate pentru fiecare articol
                return {
                    price_data: {
                        currency: 'ron', // Moneda utilizată
                        product_data: {
                            name: item.name, // Numele produsului
                        },
                        unit_amount: item.price, // Stripe așteaptă suma în cea mai mică unitate a monedei
                    },
                    quantity: item.quantity, // Cantitatea de articole
                };
            }),
            success_url: `${process.env.CLIENT_URL}/succes`, // URL de redirecționare în caz de succes
            cancel_url: `${process.env.CLIENT_URL}/cancel`, // URL de redirecționare în caz de anulare
        });
        // Răspunde cu URL-ul sesiunii de checkout
        res.json({ url: session.url });
    } catch (e) {
        // Gestionează erorile și răspunde cu un mesaj de eroare
        console.error("Error creating checkout session:", e.message);
        res.status(500).json({ error: e.message });
    }
});

// Pornirea serverului pe portul 3001
app.listen(3001, () => console.log('Server is running on port 3001'));
