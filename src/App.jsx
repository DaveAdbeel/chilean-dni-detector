import { useState } from 'react';
import { accessibleSpeech } from './utils/speechUtils';
import { analyzeImage } from './utils/imageAnalysis';
import StartScreen from './components/StartScreen';
import CameraCapture from './components/CameraCapture';
import ResultScreen from './components/ResultScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('start');
  const [capturedImage, setCapturedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleStartCapture = async () => {
    await accessibleSpeech.guideDocumentCapture();
    setCurrentScreen('capture');
  };

  const handleImageCapture = async (image) => {
    try {
      const result = await analyzeImage(image);
      
      if (result.documentDetected) {
        await accessibleSpeech.announceSuccess();
        setCapturedImage(image);
        setAnalysisResult(result);
        setCurrentScreen('result');
      } else {
        await accessibleSpeech.announceNeedsReposition();
      }
    } catch (error) {
      await accessibleSpeech.announceError(error);
    }
  };

  const handleReturnToStart = () => {
    setCurrentScreen('start');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col 
      text-2xl leading-relaxed tracking-wider 
      selection:bg-blue-200 
      focus:outline-blue-500">
      <header className="bg-blue-600 text-white py-6 shadow-lg">
        <h1 className="text-center font-bold 
          text-4xl tracking-widest 
          focus:outline-yellow-400">
          Detector de Carnet Chileno
        </h1>
      </header>

      <main className="flex-grow container mx-auto mt-12 
        p-8 bg-white rounded-2xl shadow-2xl 
        border-4 border-blue-300">
        {currentScreen === 'start' && (
          <StartScreen onStart={handleStartCapture} />
        )}
        {currentScreen === 'capture' && (
          <CameraCapture onImageCapture={handleImageCapture} />
        )}
        {currentScreen === 'result' && (
          <ResultScreen 
            capturedImage={capturedImage} 
            analysisResult={analysisResult} 
            onReturn={handleReturnToStart} 
          />
        )}
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <p className="text-center text-xl 
          tracking-wide 
          focus:outline-yellow-400">
          Desarrollado para accesibilidad - © 2024
        </p>
      </footer>
    </div>
  );
}

export default App;