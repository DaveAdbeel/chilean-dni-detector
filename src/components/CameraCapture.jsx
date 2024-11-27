import { useEffect, useRef } from 'react';
import { accessibleSpeech } from '../utils/speechUtils';

function CameraCapture({ onImageCapture }) {
  const videoRef = useRef(null);
  
  useEffect(() => {
    startVideo();
    const intervalId = setInterval(captureAndAnalyzeFrame, 1000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  async function startVideo() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      videoRef.current.srcObject = stream;
    } catch (err) {
      await accessibleSpeech.announceError();
      console.error("Error de cámara: ", err);
    }
  }

  function captureImage() {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/jpeg");
  }

  async function captureAndAnalyzeFrame() {
    const imageData = captureImage();
    await onImageCapture(imageData);
  }

  return (
    <div 
      className="flex flex-col items-center 
      bg-blue-50 p-8 rounded-2xl 
      focus-within:outline focus-within:outline-blue-500"
      aria-live="polite"
    >
      <div className="relative w-full max-w-4xl 
        border-4 border-blue-300 rounded-2xl 
        overflow-hidden shadow-2xl">
        <video 
          ref={videoRef} 
          autoPlay 
          className="w-full h-auto 
          transform transition-all duration-300 
          focus:scale-105"
          aria-label="Vista de la cámara para capturar documento"
        />
      </div>
      <p 
        className="mt-6 text-2xl text-blue-700 
        font-bold text-center"
        aria-live="assertive"
      >
        Coloque su documento de identidad en el centro
      </p>
    </div>
  );
}

export default CameraCapture;