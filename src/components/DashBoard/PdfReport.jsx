import { useEffect, useRef } from 'react';
import TemperatureCard from './TemperatureCard';
import OxygenCard from './OxygenCard';
import HeartRateCard from './HeartRate';
import HeartRatePieChart from './Graphs/HeartRatePieChart';
import HeartRatePlot from './Graphs/HeartRateLineGraph';
import TemperatureLineChart from './Graphs/TemperatureLineGraph';
import TemperaturePieChart from './Graphs/TemperaturePieChart';
import SpO2LineChart from './Graphs/OxygenLineGraph'; // Import the SpO2 Line Chart
import SpO2PieChart from './Graphs/OxygenPieGraph'; // Import the SpO2 Pie Chart
import html2canvas from 'html2canvas';

const PdfReport = ({ 
  avgTemperature, 
  avgSpO2, 
  avgHeartRate, 
  heartRateData, 
  timestamps, 
  temperatureData, 
  spo2Data // Add spo2Data as a prop
}) => {
  const reportRef = useRef(null);

  // Capture the entire report as a single image
  useEffect(() => {
    const captureReport = async () => {
      // Wait for a short period to ensure all components are fully rendered
      await new Promise(resolve => setTimeout(resolve, 500));

      if (reportRef.current) {
        const reportCanvas = await html2canvas(reportRef.current);
        const reportImgData = reportCanvas.toDataURL('image/png');
        console.log('Report Image Data:', reportImgData);
        
        // Use the reportImgData in the main app or save it
        // e.g., save it as a PDF if required here or return it
      }
    };

    captureReport();
  }, [avgTemperature, avgSpO2, avgHeartRate, heartRateData, timestamps, temperatureData, spo2Data]);

  return (
    <div ref={reportRef} style={{ padding: '20px', background: '#f6f7fa' }}>
      <h1 className="text-center pt-3 mb-6 font-bold text-6xl">Health Report</h1>
      <div className="flex flex-col gap-4 mb-6">
        <TemperatureCard averageTemperature={avgTemperature} />
        <OxygenCard averageOxygen={avgSpO2} />
        <HeartRateCard averageHeartRate={avgHeartRate} />
      </div>

      {/* Heart Rate Section */}
      <div className="flex flex-col items-center mt-6">
        <HeartRatePlot 
          heartRateData={heartRateData} 
          timestamps={timestamps} 
          heartRateWorstLow={60} 
          heartRateWorstHigh={120} 
        />
      </div>
      
      <div className="flex flex-col items-center mb-6">
        <HeartRatePieChart 
          heartRateInThresholdPercentage={Math.max(0, Math.min(100, (avgHeartRate / 100) * 100))} 
        />
      </div>

      {/* Temperature Section */}
      <div className="flex flex-col items-center mt-6">
        <TemperatureLineChart 
          temperatureData={temperatureData} 
          timestamps={timestamps}
          tempWorstLow={30} 
          tempWorstHigh={37}
        />
      </div>
      
      <div className="flex flex-col items-center mb-6">
        <TemperaturePieChart 
          tempInThresholdPercentage={Math.max(0, Math.min(100, (avgTemperature / 37) * 100))} 
        />
      </div>

      {/* SpO2 Section */}
      <div className="flex flex-col items-center mt-6">
        <SpO2LineChart 
          spo2Data={spo2Data} 
          timestamps={timestamps} 
          spo2WorstLow={90} // Set your threshold values here
          spo2WorstHigh={100} 
        />
      </div>

      <div className="flex flex-col items-center mb-6">
        <SpO2PieChart 
          spo2InThresholdPercentage={Math.max(0, Math.min(100, (avgSpO2 / 100) * 100))} 
        />
      </div>
    </div>
  );
};

export default PdfReport;
