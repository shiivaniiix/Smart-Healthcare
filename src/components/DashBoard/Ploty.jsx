import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import TemperatureCard from './TemperatureCard';
import HeartRateCard from './HeartRate';
import OxygenCard from './OxygenCard';
import GroupCard from './GroupCard';
import TemperatureLineChart from './Graphs/TemperatureLineGraph';
import TemperaturePieChart from './Graphs/TemperaturePieChart';
import SpO2LineChart from './Graphs/OxygenLineGraph'; // Ensure this is the correct import
import SpO2PieChart from './Graphs/OxygenPieGraph'; // Ensure this is the correct import
import HeartRatePlot from './Graphs/HeartRateLineGraph';
import HeartRatePieChart from './Graphs/HeartRatePieChart';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import PdfReport from './PdfReport';

function Ploty({ userName }) {
  const reportRef = useRef(null); // Create a ref for PdfReport component
  const [temperatureData, setTemperatureData] = useState([]);
  const [spo2Data, setSpo2Data] = useState([]);
  const [heartRateData, setHeartRateData] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [predictedHealthStatus, setPredictedHealthStatus] = useState('');

  // Update your handlePredictHealthStatus function:
  const handlePredictHealthStatus = async () => {
    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        temperature: avgTemperature,
        spo2: avgSpO2,
        heart_rate: avgHeartRate,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setPredictedHealthStatus(data.predicted_health_status);
    } else {
      console.error('Error predicting health status:', response.statusText);
    }
  };

  const downloadPdf = () => {
    const input = reportRef.current;
  
    // Create a new PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
  
    // Capture the entire report as a single image
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      // Calculate how many pages are needed
      let heightLeft = imgHeight;
      let position = 0;
  
      // Add the image to the PDF
      while (heightLeft >= 0) {
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
        position -= pdf.internal.pageSize.getHeight();
        
        // Add a new page if there's more content
        if (heightLeft >= 0) {
          pdf.addPage();
        }
      }
  
      pdf.save('report.pdf'); // Save the PDF
    }).catch((error) => {
      console.error('Error generating PDF:', error);
    });
  };

  const generateRandomValues = () => {
    const randomTemp = (Math.random() * (39 - 35) + 35).toFixed(2);
    const randomSpo2 = Math.floor(Math.random() * (99 - 85) + 85);
    const randomHeartRate = Math.floor(Math.random() * (130 - 50) + 50);
    return { randomTemp, randomSpo2, randomHeartRate };
  };

  useEffect(() => {
    const updateData = () => {
      const { randomTemp, randomSpo2, randomHeartRate } = generateRandomValues();
      const newTimestamp = new Date().toLocaleTimeString();

      setTemperatureData(prevData => [...prevData.slice(-50), randomTemp]);
      setSpo2Data(prevData => [...prevData.slice(-50), randomSpo2]);
      setHeartRateData(prevData => [...prevData.slice(-50), randomHeartRate]);
      setTimestamps(prevTimestamps => [...prevTimestamps.slice(-50), newTimestamp]);
      setLoading(false);
    };

    const interval = setInterval(updateData, 3000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="text-center text-lg">Loading data...</div>;

  // Define thresholds for SpO2
  const spo2WorstLow = 90;
  const spo2WorstHigh = 100;

  // Calculate threshold percentage for SpO2
  const calcThresholdPercentage = (data, low, high) => {
    const withinThreshold = data.filter(value => value >= low && value <= high).length;
    return ((withinThreshold / data.length) * 100).toFixed(2);
  };

  const spo2InThresholdPercentage = calcThresholdPercentage(spo2Data, spo2WorstLow, spo2WorstHigh);

  // Calculate averages
  const calculateAverage = (data) => {
    const sum = data.reduce((acc, val) => acc + Number(val), 0);
    return (sum / data.length).toFixed(2);
  };

  const avgTemperature = calculateAverage(temperatureData);
  const avgSpO2 = calculateAverage(spo2Data);
  const avgHeartRate = calculateAverage(heartRateData);

  return (
    <div className="p-4 space-y-12">
      {/* Display Average Values */}
      <div className="grid grid-cols-4 gap-8 pr-4">
        <TemperatureCard averageTemperature={avgTemperature} />
        <OxygenCard averageOxygen={avgSpO2} />
        <HeartRateCard averageHeartRate={avgHeartRate} />
        <GroupCard />
      </div>

      {/* Temperature Section */}
      <div className="chart-section mb-8 grid grid-cols-3 gap-4">
        {/* Temperature Line Chart taking 2 spaces */}
        <div className="col-span-2">
          <TemperatureLineChart
            timestamps={timestamps}
            temperatureData={temperatureData}
            tempWorstLow={30} // Example threshold for temperature
            tempWorstHigh={37}
          />
        </div>
        {/* Pie Chart for Temperature taking 1 space */}
        <div className="col-span-1">
          <TemperaturePieChart tempInThresholdPercentage={calcThresholdPercentage(temperatureData, 30, 37)} />
        </div>
      </div>

      {/* SpO2 Section */}
      <div className="chart-section mb-8 grid grid-cols-3 gap-4">
        {/* SpO2 Line Chart taking 2 spaces */}
        <div className="col-span-2">
          <SpO2LineChart
            spo2Data={spo2Data} 
            timestamps={timestamps} 
            spo2WorstLow={spo2WorstLow} 
          />
        </div>
        {/* Pie Chart for SpO2 taking 1 space */}
        <div className="col-span-1">
          <SpO2PieChart spo2InThresholdPercentage={spo2InThresholdPercentage} />
        </div>
      </div>

      {/* Heart Rate Section */}
      <div className="chart-section mb-8 grid grid-cols-3 gap-4">
        {/* Heart Rate Plot (occupying 2 columns) */}
        <div className="col-span-2">
          <HeartRatePlot 
            heartRateData={heartRateData} 
            timestamps={timestamps} 
            heartRateWorstLow={60} 
            heartRateWorstHigh={120} 
          />
        </div>
        {/* Pie Chart for Heart Rate (occupying 1 column) */}
        <div className="col-span-1">
          <HeartRatePieChart heartRateInThresholdPercentage={calcThresholdPercentage(heartRateData, 60, 120)} />
        </div>
      </div>

      <div ref={reportRef} style={{ position: 'absolute', left: '-9999px' }}>
      <PdfReport 
  avgTemperature={avgTemperature} 
  avgSpO2={avgSpO2} 
  avgHeartRate={avgHeartRate} 
  heartRateData={heartRateData} // Pass heartRateData
  timestamps={timestamps} // Pass timestamps
  temperatureData={temperatureData} // Pass temperature data for PDF report
  spo2Data={spo2Data} // Pass SpO2 data for PDF report
  predictedHealthStatus={predictedHealthStatus}
/>
      </div>

      {/* Button to download PdfReport as PDF */}
      <div className="flex space-x-4 mt-4">
  <button
    onClick={downloadPdf}
    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
  >
    Create Report
  </button>

  <button
    onClick={handlePredictHealthStatus}
    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
  >
    Predict Health Status
  </button>
</div>

{predictedHealthStatus && (
  <div>Predicted Health Status: {predictedHealthStatus}</div>
)}

    </div>
    
  );
}

// Define prop types for validation
Ploty.propTypes = {
  temperatureData: PropTypes.arrayOf(PropTypes.number),
  spo2Data: PropTypes.arrayOf(PropTypes.number),
  heartRateData: PropTypes.arrayOf(PropTypes.number),
  timestamps: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
};

export default Ploty;