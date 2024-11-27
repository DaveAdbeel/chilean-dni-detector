import { useNavigate } from 'react-router-dom';

function ResultScreen({ capturedImage, analysisResult }) {
  const navigate = useNavigate();

  const returnToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="text-2xl font-bold mb-6 text-green-600">
        Carnet Detectado Exitosamente
      </h2>

      {capturedImage && (
        <div className="mb-6">
          <img 
            src={capturedImage} 
            alt="Captured Document" 
            className="max-w-md rounded-lg shadow-lg"
          />
        </div>
      )}

      {analysisResult && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h3 className="text-lg font-bold text-blue-600 mb-4">Resultados del Análisis</h3>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm font-mono overflow-auto max-h-64">
            {JSON.stringify(analysisResult, null, 2)}
          </pre>
        </div>
      )}

      <button 
        onClick={returnToHome}
        className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
      >
        Volver al Inicio
      </button>
    </div>
  );
}

export default ResultScreen;