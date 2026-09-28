// Real-time Voice Announcer using Web Speech API Synthesis

export const speakVoiceAnnouncement = (text: string, onEnd?: () => void) => {
  try {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    // Cancel any previous pending utterances to avoid queue overlaps
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Pick an appropriate natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      v =>
        (v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en-US')) &&
        (v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('david'))
    ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    if (onEnd) {
      utterance.onend = () => {
        onEnd();
      };
      utterance.onerror = () => {
        onEnd();
      };
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis playback note:', err);
    if (onEnd) onEnd();
  }
};

export const announceIrisVerified = (onEnd?: () => void) => {
  speakVoiceAnnouncement("Iris biometric verified. Proceeding to face verification.", onEnd);
};

export const announceGlassesObstruction = (onEnd?: () => void) => {
  speakVoiceAnnouncement("Optical scan halted. Please remove your glasses or spectacles to expose bare iris templates.", onEnd);
};

export const announceNoGlassesDetected = (onEnd?: () => void) => {
  speakVoiceAnnouncement("Glasses removed. Bare eyes acquired. Scanning iris templates.", onEnd);
};

export const announceFaceVerified = (onEnd?: () => void) => {
  speakVoiceAnnouncement("Face verified. Proceeding to voice authentication.", onEnd);
};

export const announceFakePerson = (onEnd?: () => void) => {
  speakVoiceAnnouncement("Doll or fake person detected. Access denied.", onEnd);
};

export const announceDollDetected = (onEnd?: () => void) => {
  speakVoiceAnnouncement("Doll detected. Access denied.", onEnd);
};

export const announceAccessDenied = (onEnd?: () => void) => {
  speakVoiceAnnouncement("Access denied.", onEnd);
};

export const announceVoiceVerifiedAndProceed = (onEnd?: () => void) => {
  speakVoiceAnnouncement("Your voice has been detected successfully, proceeding to dashboard page.", onEnd);
};
