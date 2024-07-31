// UserChart.js
import React from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';

const UserChart = () => {
  const options = {
    animationEnabled: true,
    title: {
      text: "Utilizatori înregistrați pe luna aceasta"
    },
    axisX: {
      valueFormatString: "DD MMM",
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    axisY: {
      title: "Număr de utilizatori",
      valueFormatString: "#",
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    data: [{
      type: "area",
      xValueFormatString: "DD MMM",
      yValueFormatString: "#",
      dataPoints: [
        { x: new Date(2024, 4, 28), y: 3 },
        { x: new Date(2024, 4, 30), y: 1 },
        // ... adaugă alte date aici
      ]
    }]
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default UserChart;
