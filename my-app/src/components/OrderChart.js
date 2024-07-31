import React from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';

const OrderChart = () => {
  // Opțiunile pentru graficul de comenzi
  const options = {
    animationEnabled: true, // Activează animațiile
    title: {
      text: "Comenzi în ultima lună" // Titlul graficului
    },
    axisX: {
      valueFormatString: "DD MMM" // Formatul valorilor pe axa X (zi și lună)
    },
    axisY: {
      title: "Număr de comenzi", // Titlul axei Y
      scaleBreaks: {
        autoCalculate: true  // Auto-calcularea întreruperilor de scală pentru axa Y
      }
    },
    data: [{
      type: "line", // Tipul graficului (linie)
      xValueFormatString: "DD MMM", // Formatul valorilor pe axa X
      color: "#F08080", // Culoarea liniei graficului
      dataPoints: [ // Punctele de date pentru grafic
        { x: new Date(2024, 6, 1), y: 22 }, // Data și numărul de comenzi
        { x: new Date(2024, 6, 2), y: 18 },
        { x: new Date(2024, 6, 7), y: 14 },
        { x: new Date(2024, 6, 9), y: 5 },
        { x: new Date(2024, 6, 14), y: 8 },
      ]
    }]
  };

  return (
    <div>
      <CanvasJSChart options={options} /> {/* Renderizează graficul cu opțiunile specificate */}
    </div>
  );
}

export default OrderChart;
