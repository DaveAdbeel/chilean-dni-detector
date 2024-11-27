const API_KEY = "qPojdkLNHGoBNIzGg4Hh";
const MODEL_URL = "https://detect.roboflow.com/documents-scan/1";

export async function analyzeImage(imageData) {
  try {
    const base64Image = imageData.replace(/^data:image\/jpeg;base64,/, "");
    const response = await fetch(`${MODEL_URL}?api_key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: base64Image,
    });

    const data = await response.json();
    
    // Enhanced analysis with more descriptive information
    const analysis = {
      documentDetected: false,
      confidence: 0,
      position: null,
      additionalInfo: ""
    };

    const dniPrediction = data.predictions.find(
      (prediction) =>
        prediction.class.toLowerCase().includes("idetect") &&
        prediction.confidence > 0.95
    );

    if (dniPrediction) {
      const imgCenterX = data.image.width / 2;
      const imgCenterY = data.image.height / 2;

      const distanceX = Math.abs(dniPrediction.x - imgCenterX);
      const distanceY = Math.abs(dniPrediction.y - imgCenterY);
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      const proximity = Math.max(0, 1 - distance / Math.max(data.image.width, data.image.height));
      
      analysis.documentDetected = true;
      analysis.confidence = dniPrediction.confidence;
      analysis.position = {
        x: dniPrediction.x,
        y: dniPrediction.y,
        width: dniPrediction.width,
        height: dniPrediction.height
      };
      
      // More descriptive positioning information
      if (proximity > 0.8) {
        analysis.additionalInfo = "Documento centrado perfectamente";
      } else if (proximity > 0.5) {
        analysis.additionalInfo = "Documento casi en el centro";
      } else {
        analysis.additionalInfo = "Documento necesita ser reposicionado";
      }
    }

    return analysis;
  } catch (error) {
    console.error("Error en el análisis:", error);
    return {
      documentDetected: false,
      error: "Error en el análisis de imagen"
    };
  }
}

export function calculateProximity(prediction, imageWidth, imageHeight) {
  const imgCenterX = imageWidth / 2;
  const imgCenterY = imageHeight / 2;

  const distanceX = Math.abs(prediction.x - imgCenterX);
  const distanceY = Math.abs(prediction.y - imgCenterY);
  const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

  return Math.max(0, 1 - distance / Math.max(imageWidth, imageHeight));
}