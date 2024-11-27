
function StartScreen({onStart}) {

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        Detección de Carnet Chileno
      </h2>
      <p className="mb-8 text-gray-700">
        Presione el botón para comenzar la detección de su documento
      </p>
      <button 
        onClick={onStart}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
      >
        Comenzar Detección
      </button>
    </div>
  );
}

export default StartScreen;