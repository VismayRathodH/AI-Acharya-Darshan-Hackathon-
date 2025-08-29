const startBtn = document.getElementById('start-record-btn');
const userSpeech = document.getElementById('user-speech');
const aiResponse = document.getElementById('ai-response');
const langSelect = document.getElementById('language-select');
const inputLangSelect = document.getElementById('input-language');

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

startBtn.addEventListener('click', () => {
  recognition.lang = inputLangSelect.value;
  recognition.start();
});

recognition.onresult = async (event) => {
  const transcript = event.results[0][0].transcript;
  userSpeech.textContent = `You said: ${transcript}`;
  const selectedLang = langSelect.value;

  // Simulated AI Response (Replace with actual API if needed)
  const englishResponse = await mockAIResponse(transcript);

  // Simulated Translation (Replace with real translation API if needed)
  const translatedResponse = await mockTranslate(englishResponse, selectedLang);
  aiResponse.textContent = `AI says (${selectedLang}): ${translatedResponse}`;

  // Speak the translated text
  speakText(translatedResponse, selectedLang);
};

async function mockAIResponse(inputText) {
  // Simulate AI reply (replace this with your real AI integration)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Sure! I can help you learn languages.");
    }, 800);
  });
}

async function mockTranslate(text, langCode) {
  // Simulate translation (replace with real translation service if needed)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`[${langCode}] ${text}`);
    }, 1000);
  });
}

function speakText(text, langCode) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langCode;
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(voice => voice.lang.startsWith(langCode));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }
  window.speechSynthesis.speak(utterance);
}

// Preload voices
window.speechSynthesis.onvoiceschanged = () => {
  window.speechSynthesis.getVoices();
};
