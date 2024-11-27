// Speech utility with enhanced accessibility features
export class AccessibleSpeech {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    
    // Prioritize Spanish (Chile) voices
    this.loadVoices();
    this.synth.onvoiceschanged = this.loadVoices.bind(this);
  }

  loadVoices() {
    this.voices = this.synth.getVoices()
      .filter(voice => 
        voice.lang === 'es-CL' || 
        voice.lang.startsWith('es-')
      );
  }

  speak(message, options = {}) {
    // Accessibility-focused speech configuration
    const utterance = new SpeechSynthesisUtterance(message);
    
    // Prioritize Chilean Spanish voice
    const chileVoice = this.voices.find(voice => voice.lang === 'es-CL');
    if (chileVoice) {
      utterance.voice = chileVoice;
    }

    // Configurable speech parameters for better comprehension
    utterance.rate = options.rate || 0.8;  // Slower speech for clarity
    utterance.pitch = options.pitch || 1;  // Natural pitch
    utterance.volume = options.volume || 1;  // Full volume

    // Provide clear, descriptive messages
    this.synth.speak(utterance);

    return new Promise((resolve) => {
      utterance.onend = resolve;
    });
  }

  // Specific messages for document detection process
  guideDocumentCapture() {
    return this.speak(
      "Por favor, acerque su documento de identidad. Colóquelo en el centro de la pantalla. Manténgalo quieto hasta que sea detectado."
    );
  }

  announceSuccess() {
    return this.speak(
      "¡Documento detectado con éxito! Su identificación ha sido capturada correctamente."
    );
  }

  announceNeedsReposition() {
    return this.speak(
      "El documento no está bien centrado. Por favor, ajuste la posición de su documento."
    );
  }

  announceError(error) {
    return this.speak(
    `Ha ocurrido un error: ${error} Por favor, inténtelo nuevamente.`
    );
  }
}

// Create a singleton instance
export const accessibleSpeech = new AccessibleSpeech();