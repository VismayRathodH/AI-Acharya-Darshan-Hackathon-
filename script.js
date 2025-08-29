
// --- Web Speech API for Voice Recognition ---
const micButton = document.getElementById('micButton');
const voiceOutput = document.getElementById('voiceOutput');
const voiceLoading = document.getElementById('voiceLoading');
const voiceResponseLanguageSelect = document.getElementById('voiceResponseLanguage'); // Language selector
const aiRoleSelect = document.getElementById('aiRole'); // New Role selector
const aiVoiceResponseArea = document.getElementById('aiVoiceResponseArea'); // AI voice response display
const aiVoiceTextOutput = document.getElementById('aiVoiceTextOutput'); // Text output for AI voice
const speakAiVoiceBtn = document.getElementById('speakAiVoiceBtn'); // Speak button for AI voice
const stopAiVoiceBtn = document.getElementById('stopAiVoiceBtn'); // Stop button for AI voice
const deleteVoiceResponseBtn = document.getElementById('deleteVoiceResponseBtn'); // New delete button for voice

let isRecording = false;
let recognition;

// Check for browser compatibility
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false; // Only get one result per speech segment
    recognition.interimResults = false; // Only return final results
    recognition.lang = 'en-US'; // Default language for speech input

    recognition.onstart = () => {
        isRecording = true;
        micButton.classList.add('mic-pulse'); // Add pulse animation
        voiceOutput.textContent = 'Listening... Speak now.';
        voiceLoading.classList.remove('hidden');
        aiVoiceResponseArea.classList.add('hidden'); // Hide previous AI voice response
        aiVoiceTextOutput.textContent = ''; // Clear previous AI voice text
        speakAiVoiceBtn.disabled = true;
        stopAiVoiceBtn.disabled = true;
        deleteVoiceResponseBtn.disabled = true; // Disable delete button
        speechSynthesis.cancel(); // Stop any ongoing speech
    };

    recognition.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        voiceOutput.textContent = `You said: "${transcript}"`;

        voiceLoading.classList.remove('hidden'); // Show loading for AI response
        aiVoiceResponseArea.classList.remove('hidden'); // Show AI response area
        aiVoiceTextOutput.textContent = 'AI is thinking...';

        const selectedLanguage = voiceResponseLanguageSelect.value;
        // Corrected: Use voiceResponseLanguageSelect for language name
        const languageName = voiceResponseLanguageSelect.options[voiceResponseLanguageSelect.selectedIndex].text;
        const selectedRole = aiRoleSelect.value; // Get selected role

        try {
            // Prompt for the Gemini API to respond to the user's speech, incorporating the role
            const prompt = `You are acting as a ${selectedRole}. The user just said: "${transcript}". Please respond to this in ${selectedLanguage}. Your response should be helpful for a language learner, perhaps by asking a follow-up question, offering a simple correction, or acknowledging their input, all while maintaining your persona as a ${selectedRole}. Keep the response concise.`;

            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });

            const payload = { contents: chatHistory };
            const apiKey = "AIzaSyD_euCwMpYDh-BuuDrbR11XSDRuZTL0gZY"; // Canvas will automatically provide the API key
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const aiText = result.candidates[0].content.parts[0].text;
                aiVoiceTextOutput.innerHTML = aiText.replace(/\n/g, '<br>'); // Display AI's text response
                speakText(aiText, speakAiVoiceBtn, stopAiVoiceBtn, selectedLanguage); // Speak AI's response
                deleteVoiceResponseBtn.disabled = false; // Enable delete button
            } else {
                aiVoiceTextOutput.textContent = 'AI failed to generate a voice response.';
                console.error('Unexpected AI response structure:', result);
            }
        } catch (error) {
            console.error('Error calling Gemini API for voice response:', error);
            aiVoiceTextOutput.textContent = 'An error occurred while getting AI voice response.';
        } finally {
            voiceLoading.classList.add('hidden'); // Hide loading spinner
        }
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        voiceOutput.textContent = `Error: ${event.error}. Try again.`;
        voiceLoading.classList.add('hidden');
        aiVoiceResponseArea.classList.add('hidden');
    };

    recognition.onend = () => {
        isRecording = false;
        micButton.classList.remove('mic-pulse'); // Remove pulse animation
        // voiceLoading.classList.add('hidden'); // Keep loading if AI is still thinking
        if (voiceOutput.textContent === 'Listening... Speak now.') {
            voiceOutput.textContent = 'No speech detected. Click the microphone to try again.';
        }
    };

    micButton.addEventListener('click', () => {
        if (!isRecording) {
            recognition.start();
        } else {
            recognition.stop();
        }
    });
} else {
    voiceOutput.textContent = 'Speech Recognition not supported in this browser.';
    micButton.disabled = true;
    micButton.classList.add('opacity-50', 'cursor-not-allowed');
}

// --- Text-to-Speech (TTS) Utility Function ---
function speakText(text, speakButton, stopButton, lang = 'en-US') {
    if (!'speechSynthesis' in window) {
        console.warn('Text-to-Speech not supported in this browser.');
        return;
    }

    // If speech is already ongoing, stop it before starting new one
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang; // Set language for speech synthesis based on parameter

    // Optional: Find a suitable voice for the selected language
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => voice.lang === lang && (voice.name.includes('Google') || voice.default));
    if (preferredVoice) {
        utterance.voice = preferredVoice;
    } else {
        console.warn(`No preferred voice found for language: ${lang}. Using default.`);
    }

    utterance.onstart = () => {
        if (speakButton) {
            speakButton.textContent = 'Speaking...';
            speakButton.disabled = true;
        }
        if (stopButton) stopButton.disabled = false; // Enable stop button
    };
    utterance.onend = () => {
        if (speakButton) {
            speakButton.textContent = 'Speak Response';
            speakButton.disabled = false;
        }
        if (stopButton) stopButton.disabled = true; // Disable stop button
    };
    utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
        if (speakButton) {
            speakButton.textContent = 'Error Speaking';
            speakButton.disabled = false;
        }
        if (stopButton) stopButton.disabled = true; // Disable stop button
    };

    speechSynthesis.speak(utterance);
}

// --- Stop Speaking Utility Function ---
function stopSpeaking(speakButton, stopButton) {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
    if (speakButton) {
        speakButton.textContent = 'Speak Response';
        speakButton.disabled = false;
    }
    if (stopButton) stopButton.disabled = true;
}

// Event listener for the Delete Voice Response button
deleteVoiceResponseBtn.addEventListener('click', () => {
    voiceOutput.textContent = 'Click the microphone to start speaking...'; // Reset voice input text
    aiVoiceTextOutput.textContent = ''; // Clear AI's text response
    aiVoiceResponseArea.classList.add('hidden'); // Hide AI response area
    speakAiVoiceBtn.disabled = true;
    stopAiVoiceBtn.disabled = true;
    deleteVoiceResponseBtn.disabled = true;
    speechSynthesis.cancel(); // Stop any ongoing speech
});


// --- Tense Guide & Grammar Correction (Gemini API) ---
const grammarInput = document.getElementById('grammarInput');
const analyzeGrammarBtn = document.getElementById('analyzeGrammarBtn');
const grammarOutput = document.getElementById('grammarOutput');
const grammarLoading = document.getElementById('grammarLoading');
const speakGrammarBtn = document.getElementById('speakGrammarBtn');
const stopGrammarBtn = document.getElementById('stopGrammarBtn');
const deleteGrammarBtn = document.getElementById('deleteGrammarBtn'); // New delete button

analyzeGrammarBtn.addEventListener('click', async () => {
    const text = grammarInput.value.trim();
    if (!text) {
        grammarOutput.textContent = 'Please enter some text to analyze.';
        speakGrammarBtn.disabled = true;
        stopGrammarBtn.disabled = true;
        deleteGrammarBtn.disabled = true; // Disable delete button
        return;
    }

    grammarOutput.textContent = ''; // Clear previous output
    grammarLoading.classList.remove('hidden'); // Show loading spinner
    analyzeGrammarBtn.disabled = true; // Disable button during processing
    speakGrammarBtn.disabled = true; // Disable speak button during processing
    stopGrammarBtn.disabled = true; // Disable stop button during processing
    deleteGrammarBtn.disabled = true; // Disable delete button during processing

    // Stop any ongoing speech before starting new analysis
    speechSynthesis.cancel();

    try {
        // Prompt for the Gemini API
        const prompt = `As an expert English grammar and language tutor, please analyze the following sentence for any grammatical errors, spelling mistakes, and provide a clear explanation of the tenses used. If there are errors, suggest corrections. If the sentence is grammatically correct, state that and explain its tense.

                Sentence: "${text}"

                Format your response clearly, first stating corrections (if any), then explaining the tense(s) in simple terms.`;

        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });

        const payload = { contents: chatHistory };
        const apiKey = "AIzaSyD_euCwMpYDh-BuuDrbR11XSDRuZTL0gZY"; 
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const aiText = result.candidates[0].content.parts[0].text;
            grammarOutput.innerHTML = aiText.replace(/\n/g, '<br>'); // Display response, convert newlines to <br>
            speakGrammarBtn.disabled = false; // Enable speak button after response
            deleteGrammarBtn.disabled = false; // Enable delete button after response
        } else {
            grammarOutput.textContent = 'Failed to get a response from AI. Please try again.';
            console.error('Unexpected AI response structure:', result);
            speakGrammarBtn.disabled = true;
            deleteGrammarBtn.disabled = true;
        }
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        grammarOutput.textContent = 'An error occurred while analyzing. Please try again later.';
        speakGrammarBtn.disabled = true;
        deleteGrammarBtn.disabled = true;
    } finally {
        grammarLoading.classList.add('hidden'); // Hide loading spinner
        analyzeGrammarBtn.disabled = false; // Re-enable button
    }
});

// Event listener for the Speak Grammar button
speakGrammarBtn.addEventListener('click', () => {
    const textToSpeak = grammarOutput.textContent;
    if (textToSpeak && textToSpeak !== 'AI Response will appear here:') {
        // Use the language selected for voice response in the main section for grammar output
        const selectedLanguage = voiceResponseLanguageSelect.value;
        speakText(textToSpeak, speakGrammarBtn, stopGrammarBtn, selectedLanguage);
    }
});

// Event listener for the Stop Grammar button
stopGrammarBtn.addEventListener('click', () => {
    stopSpeaking(speakGrammarBtn, stopGrammarBtn);
});

// Event listener for the Delete Grammar button
deleteGrammarBtn.addEventListener('click', () => {
    grammarOutput.textContent = ''; // Clear the response
    speakGrammarBtn.disabled = true;
    stopGrammarBtn.disabled = true;
    deleteGrammarBtn.disabled = true;
    speechSynthesis.cancel(); // Stop any ongoing speech
});


// --- Image Understanding and Answering (Gemini API) ---
const imageUpload = document.getElementById('imageUpload');
const uploadedImage = document.getElementById('uploadedImage');
const imageQuestion = document.getElementById('imageQuestion');
const askImageQuestionBtn = document.getElementById('askImageQuestionBtn');
const imageAnswer = document.getElementById('imageAnswer');
const imageLoading = document.getElementById('imageLoading');
const speakImageBtn = document.getElementById('speakImageBtn');
const stopImageBtn = document.getElementById('stopImageBtn');
const deleteImageBtn = document.getElementById('deleteImageBtn'); // New delete button
// const uploadImageNav = document.getElementById('uploadImageNav'); // Removed: New nav item

let base64ImageData = ''; // To store the base64 representation of the image

// Removed: Event listener for the new navigation item
/*
uploadImageNav.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    imageUpload.click(); // Programmatically click the hidden file input
});
*/

imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImage.src = e.target.result;
            uploadedImage.classList.remove('hidden');
            // Extract base64 data without the data:image/png;base64, prefix
            base64ImageData = e.target.result.split(',')[1];
            imageAnswer.textContent = ''; // Clear previous answer
            speakImageBtn.disabled = true;
            stopImageBtn.disabled = true;
            deleteImageBtn.disabled = true; // Disable delete button
        };
        reader.readAsDataURL(file);
    } else {
        uploadedImage.src = '';
        uploadedImage.classList.add('hidden');
        base64ImageData = '';
        speakImageBtn.disabled = true;
        stopImageBtn.disabled = true;
        deleteImageBtn.disabled = true;
    }
});

askImageQuestionBtn.addEventListener('click', async () => {
    const question = imageQuestion.value.trim();
    if (!base64ImageData) {
        imageAnswer.textContent = 'Please upload an image first.';
        speakImageBtn.disabled = true;
        stopImageBtn.disabled = true;
        deleteImageBtn.disabled = true;
        return;
    }
    if (!question) {
        imageAnswer.textContent = 'Please ask a question about the image.';
        speakImageBtn.disabled = true;
        stopImageBtn.disabled = true;
        deleteImageBtn.disabled = true;
        return;
    }

    imageAnswer.textContent = ''; // Clear previous answer
    imageLoading.classList.remove('hidden'); // Show loading spinner
    askImageQuestionBtn.disabled = true; // Disable button during processing
    speakImageBtn.disabled = true; // Disable speak button during processing
    stopImageBtn.disabled = true; // Disable stop button during processing
    deleteImageBtn.disabled = true; // Disable delete button during processing

    // Stop any ongoing speech before starting new analysis
    speechSynthesis.cancel();

    try {
        let chatHistory = [];
        chatHistory.push({
            role: "user",
            parts: [
                { text: question },
                {
                    inlineData: {
                        mimeType: uploadedImage.src.split(';')[0].split(':')[1], // Get mime type from data URL
                        data: base64ImageData
                    }
                }
            ]
        });

        const payload = { contents: chatHistory };
        const apiKey = "AIzaSyD_euCwMpYDh-BuuDrbR11XSDRuZTL0gZY"; // Canvas will automatically provide the API key
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const aiText = result.candidates[0].content.parts[0].text;
            imageAnswer.innerHTML = aiText.replace(/\n/g, '<br>'); // Display response
            speakImageBtn.disabled = false; // Enable speak button after response
            deleteImageBtn.disabled = false; // Enable delete button after response
        } else {
            imageAnswer.textContent = 'Failed to get a response from AI. Please try again.';
            console.error('Unexpected AI response structure:', result);
            speakImageBtn.disabled = true;
            deleteImageBtn.disabled = true;
        }
    } catch (error) {
        console.error('Error calling Gemini API for image understanding:', error);
        imageAnswer.textContent = 'An error occurred while processing the image. Please try again later.';
        speakImageBtn.disabled = true;
        deleteImageBtn.disabled = true;
    } finally {
        imageLoading.classList.add('hidden'); // Hide loading spinner
        askImageQuestionBtn.disabled = false; // Re-enable button
    }
});

// Event listener for the Speak Image button
speakImageBtn.addEventListener('click', () => {
    const textToSpeak = imageAnswer.textContent;
    if (textToSpeak && textToSpeak !== "AI's Answer will appear here:") {
        // Use the language selected for voice response in the main section for image output
        const selectedLanguage = voiceResponseLanguageSelect.value;
        speakText(textToSpeak, speakImageBtn, stopImageBtn, selectedLanguage);
    }
});

// Event listener for the Stop Image button
stopImageBtn.addEventListener('click', () => {
    stopSpeaking(speakImageBtn, stopImageBtn);
});

// Event listener for the Delete Image button
deleteImageBtn.addEventListener('click', () => {
    imageAnswer.textContent = ''; // Clear the response
    uploadedImage.src = ''; // Clear image preview
    uploadedImage.classList.add('hidden'); // Hide image preview
    imageUpload.value = ''; // Clear file input
    base64ImageData = ''; // Clear base64 data
    imageQuestion.value = ''; // Clear question
    speakImageBtn.disabled = true;
    stopImageBtn.disabled = true;
    deleteImageBtn.disabled = true;
    speechSynthesis.cancel(); // Stop any ongoing speech
});


// --- Conversational Chat Feature (Gemini API) ---
const chatDisplay = document.getElementById('chatDisplay');
const chatInput = document.getElementById('chatInput');
const sendChatBtn = document.getElementById('sendChatBtn');
const chatLoading = document.getElementById('chatLoading');
const clearChatBtn = document.getElementById('clearChatBtn'); // New clear chat button

// Maintain chat history for conversational context
let chatHistory = [{ role: "model", parts: [{ text: "Hello! How can I help you with your language learning today?" }] }];

// Function to add a message to the chat display with typing animation for AI
async function addChatMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender);
    chatDisplay.appendChild(messageDiv);
    chatDisplay.scrollTop = chatDisplay.scrollHeight; // Auto-scroll to bottom

    if (sender === 'ai') {
        // Simulate typing effect for AI messages
        let i = 0;
        while (i < text.length) {
            messageDiv.textContent += text.charAt(i);
            i++;
            chatDisplay.scrollTop = chatDisplay.scrollHeight; // Keep scrolling
            await new Promise(resolve => setTimeout(resolve, 20)); // Adjust typing speed here (milliseconds per character)
        }
    } else {
        messageDiv.textContent = text;
    }
    chatDisplay.scrollTop = chatDisplay.scrollHeight; // Final scroll to bottom
}

// Initialize chat display with initial greeting
function initializeChat() {
    chatDisplay.innerHTML = ''; // Clear all existing messages
    chatHistory = [{ role: "model", parts: [{ text: "Hello! How can I help you with your language learning today?" }] }];
    addChatMessage(chatHistory[0].parts[0].text, 'ai');
}

// Call initializeChat on load to set up the initial message
document.addEventListener('DOMContentLoaded', initializeChat);


sendChatBtn.addEventListener('click', async () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    addChatMessage(userMessage, 'user');
    chatInput.value = ''; // Clear input field
    chatInput.disabled = true;
    sendChatBtn.disabled = true;
    chatLoading.classList.remove('hidden');

    // Add user message to chat history
    chatHistory.push({ role: "user", parts: [{ text: userMessage }] });

    try {
        const payload = { contents: chatHistory };
        const apiKey = "AIzaSyD_euCwMpYDh-BuuDrbR11XSDRuZTL0gZY"; // Canvas will automatically provide the API key
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const aiText = result.candidates[0].content.parts[0].text;
            await addChatMessage(aiText, 'ai'); // Use await for typing animation
            // Add AI response to chat history
            chatHistory.push({ role: "model", parts: [{ text: aiText }] });
        } else {
            addChatMessage('AI failed to respond. Please try again.', 'ai');
            console.error('Unexpected AI chat response structure:', result);
        }
    } catch (error) {
        console.error('Error calling Gemini API for chat:', error);
        addChatMessage('An error occurred during chat. Please try again later.', 'ai');
    } finally {
        chatInput.disabled = false;
        sendChatBtn.disabled = false;
        chatLoading.classList.add('hidden');
        chatInput.focus(); // Focus back on input
    }
});

// Allow sending message with Enter key
chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) { // Allow Shift+Enter for new line
        event.preventDefault(); // Prevent default Enter behavior (e.g., new line)
        sendChatBtn.click(); // Trigger button click
    }
});

// Event listener for the Clear Chat button
clearChatBtn.addEventListener('click', () => {
    initializeChat(); // Reset chat
});