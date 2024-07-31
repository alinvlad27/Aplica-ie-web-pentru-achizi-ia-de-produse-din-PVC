import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'reactstrap';
import { FaRobot, FaUser, FaArrowLeft, FaTrash } from 'react-icons/fa';
import { auth, db } from '../config/Config';
import '../css/chatbot.css';

const ChatBotIcon = () => {
    // State management pentru a controla vizibilitatea ferestrei de chat și lista de conversații
  const [isOpen, setIsOpen] = useState(false);
  const [isConversationListOpen, setIsConversationListOpen] = useState(false);
  
  // State pentru a stoca conversațiile și conversația curentă
  const [conversations, setConversations] = useState({});
  const [currentConversation, setCurrentConversation] = useState([]);
  
  // State pentru a stoca inputul utilizatorului și ID-ul utilizatorului
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState(null);
  
  // State pentru a stoca ID-ul conversației curente
  const [currentConversationId, setCurrentConversationId] = useState(null);

  // Funcție pentru a încărca conversațiile utilizatorului din baza de date
  const loadConversations = useCallback(async (uid) => {
    const userConversationsRef = db.collection('chatbotConversations').doc(uid);
    const doc = await userConversationsRef.get();
    if (doc.exists) {
      const userConversations = doc.data().conversations || {};
      setConversations(userConversations);
      const firstConversationId = Object.keys(userConversations)[0];
      setCurrentConversationId(firstConversationId);
      setCurrentConversation(userConversations[firstConversationId] || []);
    } else {
      const newConversations = { 'conversation_1': [] };
      setConversations(newConversations);
      setCurrentConversation([]);
      setCurrentConversationId('conversation_1');
      await saveConversations(uid, newConversations);
    }
  }, []);

  // useEffect pentru a verifica starea autentificării utilizatorului
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        loadConversations(user.uid);
      } else {
        setUserId(null);
        setConversations({});
        setCurrentConversation([]);
        setCurrentConversationId(null);
      }
    });

    return () => unsubscribe();
  }, [loadConversations]);

  // Funcție pentru a salva conversațiile utilizatorului în baza de date
  const saveConversations = async (uid, newConversations) => {
    await db.collection('chatbotConversations').doc(uid).set({ conversations: newConversations });
  };

  // Funcție pentru a schimba starea vizibilității ferestrei de chat
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Funcție pentru a actualiza inputul utilizatorului
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Funcție pentru a trimite mesajul utilizatorului și a primi răspunsul botului
  const handleSendMessage = () => {
    if (input.trim() !== '') {
      const userMessage = { sender: 'user', text: input };
      const newMessages = [...currentConversation, userMessage];
      const updatedConversations = { ...conversations, [currentConversationId]: newMessages };

      setCurrentConversation(newMessages);
      setConversations(updatedConversations);
      setInput('');

      if (userId) {
        saveConversations(userId, updatedConversations);
      }

      setTimeout(() => {
        const botMessage = { sender: 'bot', text: getBotResponse(input) };
        const updatedMessages = [...newMessages, botMessage];
        const updatedConversationsAfterBotResponse = { ...updatedConversations, [currentConversationId]: updatedMessages };

        setCurrentConversation(updatedMessages);
        setConversations(updatedConversationsAfterBotResponse);

        if (userId) {
          saveConversations(userId, updatedConversationsAfterBotResponse);
        }
      }, 1000);
    }
  };

  // Funcție pentru a genera răspunsul botului
  const getBotResponse = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    const responses = [
      {
        keywords: ['fereastra', 'ferestre', 'ce fereastra imi recomandati', 'care este cea mai buna fereastra'],
        answers: [
          'Pentru a găsi fereastra ideală, consideră dimensiunea spațiului, necesitățile de izolație termică și fonică, și stilul dorit. Ferestrele din PVC cu sticlă dublu stratificată sunt durabile și izolează bine. Pentru o ventilație eficientă, optează pentru ferestre cu deschidere oscilobatantă.',
          'Pentru a alege fereastra potrivită, ia în considerare dimensiunea spațiului, izolația termică și fonică necesară, și stilul dorit. Ferestrele din PVC cu sticlă dublu stratificată oferă o bună izolare și sunt durabile. Dacă ai nevoie de ventilație eficientă, alege ferestre cu deschidere oscilobatantă.',
          'Când alegi o fereastră, este important să consideri dimensiunea spațiului, nivelul de izolație termică și fonică necesar, și stilul dorit. Ferestrele din PVC cu sticlă dublu stratificată sunt o opțiune durabilă și oferă o bună izolare. Pentru ventilație eficientă, alege ferestre cu deschidere oscilobatantă.',
          'Pentru a selecta fereastra ideală, ia în considerare dimensiunea camerei, cerințele de izolație termică și fonică, precum și stilul preferat. Ferestrele din PVC cu sticlă dublu stratificată sunt durabile și oferă o izolare excelentă. Dacă ai nevoie de o bună ventilație, optează pentru ferestre cu deschidere oscilobatantă.'
        ]
      },
      {
        keywords: ['usa', 'usi', 'ce usa imi recomandati', 'ma nevoie de o usa pentru intare', 'poti sa imi dai un sfat in legatura cu ce usa sa aleg', 'ușă', 'uși'],
        answers: [
          'Pentru a alege o ușă, trebuie să iei în considerare materialul, securitatea și designul. Ușile din PVC sunt durabile și oferă o bună izolare termică. Dacă dorești un plus de securitate, alege o ușă cu multiple puncte de închidere. Pentru un aspect modern, optează pentru un design cu sticlă securizată.',
          'Pentru a selecta o ușă, este important să consideri materialul, securitatea și designul. Ușile din PVC sunt rezistente și asigură o excelentă izolare termică. Dacă vrei mai multă siguranță, alege o ușă cu mai multe puncte de închidere. Pentru un look modern, optează pentru un model cu sticlă securizată.',
          'Atunci când selectezi o ușă, este esențial să iei în considerare materialul, securitatea și designul. Ușile din PVC sunt fiabile și oferă izolație termică excelentă. Pentru un plus de securitate, alege o ușă cu multiple puncte de închidere. Dacă preferi un aspect modern, optează pentru un design cu sticlă securizată.',
          'Când alegi o ușă, trebuie să iei în considerare materialul, securitatea și designul. Ușile din PVC sunt rezistente și asigură o bună izolare termică. Pentru o securitate suplimentară, alege o ușă cu multiple puncte de închidere. Dacă vrei un aspect modern, optează pentru un design cu sticlă securizată.'
        ]
      },
      {
        keywords: ['buna', 'hei', 'o zi minunata', 'salut', 'salutari', 'o zi buna', 'salutare', 'ce faci'],
        answers: [
            'Bună! Ce mai faci?',
            'Bună ziua! Cu ce ​​​​te pot ajuta?',
            'O zi bună! Ce pot face pentru tine astăzi?',
            'Salutări! Cum te pot asista?'
        ]
      },
      {
        keywords: ['profil', 'grosime', 'ce grosime ar trebui sa aiba profilul', 'profilul', 'ce profil recomandati'],
        answers: [
            'Alegerea ușii și ferestrei potrivite depinde de dimensiunea spațiului tău. Profilurile cu 3 camere (70mm grosime) sunt ideale pentru spații mici, în timp ce profilurile cu 4 camere (120mm grosime) se potrivesc spațiilor mai mari.',
            'Pentru a alege produsul potrivit, trebuie să te decizi mai intai la profilul produsului în funcție de numărul de camere. Pentru spații mai mici, poți opta pentru un profil cu 3 camere (70mm grosime), iar pentru spații mai mari, un profil cu 4 camere (120mm grosime) ar fi ideal.',
            'Când alegi o ușă sau fereastră, ia în considerare grosimea profilului. Un profil cu 3 camere și grosime de 70mm este perfect pentru dimensiuni mici, în timp ce un profil cu 4 camere și grosime de 120mm este recomandat pentru dimensiuni mai mari.',
            'Pentru a selecta ușa și fereastra potrivită, decide asupra numărului de camere ale profilului. Un profil cu 3 camere (70mm grosime) este adecvat pentru spații mai mici, iar unul cu 4 camere (120mm grosime) pentru spații mai mari.'
        ]
      },
      {
        keywords: ['instalare', 'montare', 'montarea', 'instalarea', 'oferiti montare', 'ce trebuie sa stiu despre montare, instalare'],
        answers: [
            'Montajul trebuie realizat de specialiști pentru a garanta o etanșeitate perfectă și performanță maximă. Este esențial să se măsoare corect deschiderile și să se monteze ferestrele la nivel. De asemenea, trebuie utilizată spumă izolatoare și benzi de etanșare pentru a preveni infiltrațiile de aer și apă.',
            'Pentru a asigura o etanșeitate perfectă și performanță optimă, instalarea trebuie efectuată de profesioniști. Este crucial să se măsoare corect deschiderile și să se monteze ferestrele la nivel. De asemenea, folosește spumă izolatoare și benzi de etanșare pentru a preveni infiltrațiile de aer și apă.',
            'Instalarea trebuie realizată de experți pentru a garanta etanșeitatea și performanța optimă. Este important să se măsoare corect deschiderile și să se monteze ferestrele în poziția corectă. De asemenea, asigură-te că se utilizează spumă izolatoare și benzi de etanșare pentru a evita infiltrațiile de aer și apă.'
        ]
      },
      {
        keywords: ['sticla', 'tip de sticla', 'ce tip de sticla recomandati, recomanzi', 'sticle', 'ce tipuri de sticle aveti'],
        answers: [
            'Când alegi sticla, ia în considerare nevoile tale specifice. Pentru securitate, optează pentru sticlă securizată. Dacă dorești să păstrezi intimitatea, alege sticla mată sau cu model. Pentru o vizibilitate clară și lumină naturală, sticla transparentă este cea mai potrivită.',
            'Pentru a alege tipul de sticlă potrivit, gândește-te la necesitățile tale. Dacă ai nevoie de securitate, optează pentru o sticlă securizată. Dacă dorești intimitate, alege o sticlă mată sau cu model. Pentru o vizibilitate clară, sticla transparentă este cea mai bună opțiune.',
            'Alegerea sticlei depinde de scopul tău. Pentru securitate maximă, îți recomand sticla securizată. Dacă vrei intimitate, sticla mată sau cu model este ideală. În schimb, dacă preferi o vizibilitate clară, alege sticla transparentă.',
            'Alegerea tipului de sticlă se face în funcție de necesitățile tale. Pentru securitate, optează pentru sticlă securizată. Dacă îți dorești intimitate, alege sticla mată sau decorativă. Pentru o claritate maximă, sticla transparentă este recomandată.',
            'Pentru a alege sticla potrivită, e important să te gândești la ce ai nevoie. Pentru securitate, sticla securizată este ideală. Dacă preferi intimitate, alege sticla mată sau cu model. Dacă dorești să ai o vizibilitate clară, optează pentru sticla transparentă.'
        ]
      },
      {
        keywords: ['ajutor', 'am nevoie de ajutor', 'ma poti ajuta cu ceva'],
        answers: [
            'Sunt aici să te ajut! Spune-mi ce ai nevoie.',
            'Cum te pot asista astăzi?',
            'Cum te pot ajuta? Spune-mi mai multe detalii.'
        ]
      },
      {
        keywords: ['culoare', 'ce culori aveti disponibile', 'culori', 'ce culoare recomandati'],
        answers: [
            'Avem disponibile culorile alb, maro și gri antracit. Alege în funcție de locul unde dorești să montezi produsul.',
            'Dispunem de o gamă variată de culori: alb, maro și gri antracit. Recomandăm să alegi culoarea în funcție de designul exterior al casei tale.',
            'Culorile disponibile sunt alb, maro și gri antracit. Alegerea culorii depinde de stilul și locația unde vei monta produsul.',
            'Oferim produse în culorile alb, maro și gri antracit. Alege alb pentru un aspect clasic, maro pentru un look rustic sau gri antracit pentru un stil modern.'
        ]
      },
      {
        keywords: ['pret', 'preț', 'ce prețuri aveți', 'care este cel mai mic preț'],
        answers: [
            'Prețul este de 600 RON pe metru pătrat, dar depinde de înălțimea și lățimea produsului dorit. Nu uitați că avem și reduceri disponibile!',
            'Costul este de 600 RON pe metru pătrat, în funcție de dimensiunile alese. De asemenea, oferim reduceri atractive!',
            'Prețul pentru produsele noastre este de 600 RON pe metru pătrat. Dimensiunile personalizate influențează costul final, iar noi oferim și reduceri speciale!'
        ]
      }
    ];

    for (const response of responses) {
      if (response.keywords.some(keyword => lowerCaseMessage.includes(keyword))) {
        const randomAnswer = response.answers[Math.floor(Math.random() * response.answers.length)];
        return randomAnswer;
      }
    }

    return 'Îmi pare rău, nu am înțeles asta. Poți reformula?';
  };

  // Funcție pentru a începe o conversație nouă
  const handleNewConversation = () => {
    const newConversationId = `conversation_${Object.keys(conversations).length + 1}`;
    const updatedConversations = { ...conversations, [newConversationId]: [] };

    setConversations(updatedConversations);
    setCurrentConversation([]);
    setCurrentConversationId(newConversationId);
    if (userId) {
      saveConversations(userId, updatedConversations);
    }
  };

  // Funcție pentru a selecta o conversație existentă din listă
  const handleConversationSelect = (conversationId) => {
    setCurrentConversation(conversations[conversationId]);
    setCurrentConversationId(conversationId);
    setIsConversationListOpen(false);
  };

  // Funcție pentru a șterge o conversație
  const handleDeleteConversation = async (conversationId) => {
    const updatedConversations = { ...conversations };
    delete updatedConversations[conversationId];

    if (Object.keys(updatedConversations).length === 0) {
      updatedConversations['conversation_1'] = [];
    }

    setConversations(updatedConversations);
    const firstConversationId = Object.keys(updatedConversations)[0];
    setCurrentConversationId(firstConversationId);
    setCurrentConversation(updatedConversations[firstConversationId]);

    if (userId) {
      await saveConversations(userId, updatedConversations);
    }
  };

  return (
    <div className='chatbot-container'>
        {/* Buton pentru a deschide fereastra de chat */}
      <Button className='chatbot-icon' onClick={toggleChat}>
        <FaRobot />
      </Button>
      {isOpen && (
        <div className='chatbot-window'>
          {!isConversationListOpen ? (
            <>
              <div className="chatbot-header">
                <Button onClick={() => setIsConversationListOpen(true)} className='back-btn'>
                  <FaArrowLeft />
                </Button>
                <h2>ChatBot</h2>
                <Button onClick={handleNewConversation} className='new-conversation-btn'>
                  New Conversation
                </Button>
              </div>
              <div className='chatbot-messages'>
                {currentConversation.map((msg, index) => (
                  <div key={index} className={`message ${msg.sender}`}>
                    <span className='icon'>{msg.sender === 'user' ? <FaUser /> : <FaRobot />}</span>
                    <span className='text'>{msg.text}</span>
                  </div>
                ))}
              </div>
              <div className='chatbot-input'>
                <input
                  type='text'
                  value={input}
                  onChange={handleInputChange}
                  placeholder='Type a message...'
                />
                <Button onClick={handleSendMessage}>Send</Button>
              </div>
            </>
          ) : (
            <div className="conversation-list">
              <div className="chatbot-header">
                <Button onClick={() => setIsConversationListOpen(false)} className='back-btn'>
                  <FaArrowLeft />
                </Button>
                <h2>All Conversations</h2>
              </div>
              <div className="conversation-items">
                {Object.keys(conversations).map((id) => (
                  <div key={id} className='conversation-item'>
                    <span onClick={() => handleConversationSelect(id)}>
                      {id.replace('conversation_', 'Conversation ')}
                    </span>
                    <Button className='delete-conversation-btn' onClick={() => handleDeleteConversation(id)}>
                      <FaTrash />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBotIcon;
