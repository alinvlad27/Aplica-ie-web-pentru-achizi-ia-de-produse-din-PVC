import React, { useState, useEffect } from 'react';

const Clock = ({ onTimerEnd = () => {} }) => {
   // Definirea stărilor pentru zile, ore, minute și secunde
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  useEffect(() => {
    // Funcția de numărătoare inversă
    const countDown = () => {
      // Setează data destinației pentru numărătoarea inversă
      const destination = new Date('July 20, 2024').getTime();

      // Setează un interval care va rula la fiecare secundă
      const interval = setInterval(() => {
        // Obține timpul curent
        const now = new Date().getTime();
        // Calculează diferența dintre timpul destinației și timpul curent
        const difference = destination - now;
        // Calculează zilele, orele, minutele și secundele rămase
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Dacă diferența este mai mică de 0, oprește intervalul și apelează onTimerEnd
        if (difference < 0) {
          clearInterval(interval);
          onTimerEnd();
        } else {
          // Actualizează stările cu valorile calculate
          setDays(days);
          setHours(hours);
          setMinutes(minutes);
          setSeconds(seconds);
        }
      }, 1000);
    };

    // Apelează funcția de numărătoare inversă
    countDown();
  }, [onTimerEnd]); // Rulează efectul atunci când onTimerEnd se schimbă

  return (
    <div className='clock_wrapper d-flex align-items-center gap-3'>
      <div className='clock_data d-flex align-items-center gap-3'>
        <div className='text-center'>
          <h1 className='text-white fs-3 mb-2'>{days} </h1>
          <h5 className='text-white fs-6'>Zile</h5>
        </div>
        <span className='text-white fs-3'>:</span>
      </div>

      <div className='clock_data d-flex align-items-center gap-3'>
        <div className='text-center'>
          <h1 className='text-white fs-3 mb-2'>{hours} </h1>
          <h5 className='text-white fs-6'>Ore</h5>
        </div>
        <span className='text-white fs-3'>:</span>
      </div>

      <div className='clock_data d-flex align-items-center gap-3'>
        <div className='text-center'>
          <h1 className='text-white fs-3 mb-2'>{minutes} </h1>
          <h5 className='text-white fs-6'>Minute</h5>
        </div>
        <span className='text-white fs-3'>:</span>
      </div>

      <div className='clock_data d-flex align-items-center gap-3'>
        <div className='text-center'>
          <h1 className='text-white fs-3 mb-2'>{seconds} </h1>
          <h5 className='text-white fs-6'>Secunde</h5>
        </div>
      </div>
    </div>
  );
};

export default Clock;
