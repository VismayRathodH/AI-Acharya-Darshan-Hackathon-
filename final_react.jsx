// Changes  const apiKey = "Insert API key";


<>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI Aacharya - Language Companion</title>
    {/* Google Fonts: Inter */}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
    />
    <link rel="stylesheet" href="final_code_style.css" />
    <style
        dangerouslySetInnerHTML={{
            __html:
                "\n      /* CSS Variables for theming */\n:root {\n    --bg-color: #000000;\n    --text-color: #E0E0E0;\n    --header-nav-color: #9ca3af;\n    --header-nav-hover-color: #FFFFFF;\n    --card-bg: rgba(26, 18, 38, 0.4);\n    --card-border: rgba(255, 255, 255, 0.1);\n    --input-bg: rgba(255, 255, 255, 0.05);\n    --input-border: rgba(255, 255, 255, 0.1);\n    --input-placeholder-color: #9ca3af;\n    --ai-chat-bg: #374151;\n    --user-chat-bg: #4f46e5;\n}\n\n/* Light Mode Variables */\nbody.light-mode {\n    --bg-color: #F3F4F6;\n    /* Light gray */\n    --text-color: #1F2937;\n    /* Darker text */\n    --header-nav-color: #4B5563;\n    --header-nav-hover-color: #1F2937;\n    --card-bg: rgba(255, 255, 255, 0.8);\n    --card-border: rgba(0, 0, 0, 0.1);\n    --input-bg: rgba(255, 255, 255, 0.9);\n    --input-border: rgba(0, 0, 0, 0.15);\n    --input-placeholder-color: #6B7280;\n    --ai-chat-bg: #E5E7EB;\n    --user-chat-bg: #6366F1;\n    /* Indigo-500 */\n}\n\n/* Base styles */\nbody {\n    font-family: 'Inter', sans-serif;\n    background-color: var(--bg-color);\n    color: var(--text-color);\n    overflow-x: hidden;\n    /* Prevents horizontal scroll from glow effects */\n    margin: 0;\n    padding: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    min-height: 100vh;\n    box-sizing: border-box;\n    transition: background-color 0.5s ease, color 0.5s ease;\n}\n\n/* Main container */\n.main-container {\n    max-width: 56rem;\n    /* max-w-4xl */\n    margin-left: auto;\n    /* mx-auto */\n    margin-right: auto;\n    /* mx-auto */\n    padding-left: 1rem;\n    /* px-4 */\n    padding-right: 1rem;\n    /* px-4 */\n    padding-top: 2rem;\n    /* py-8 */\n    padding-bottom: 2rem;\n    /* py-8 */\n    position: relative;\n    /* relative */\n    min-height: 100vh;\n    overflow: hidden;\n    /* overflow-hidden */\n}\n\n/* Responsive padding for main container */\n@media (min-width: 640px) {\n\n    /* sm breakpoint */\n    .main-container {\n        padding-left: 1.5rem;\n        /* sm:px-6 */\n        padding-right: 1.5rem;\n        /* sm:px-6 */\n    }\n}\n\n@media (min-width: 1024px) {\n\n    /* lg breakpoint */\n    .main-container {\n        padding-left: 2rem;\n        /* lg:px-8 */\n        padding-right: 2rem;\n        /* lg:px-8 */\n    }\n}\n\n/* Header styles */\n.header {\n    display: flex;\n    /* flex */\n    justify-content: space-between;\n    /* justify-between */\n    align-items: center;\n    /* items-center */\n    margin-bottom: 3rem;\n    /* mb-12 */\n}\n\n.header-logo {\n    font-size: 1.5rem;\n    /* text-2xl */\n    font-weight: 700;\n    /* font-bold */\n    letter-spacing: 0.05em;\n    /* tracking-wider */\n}\n\n.header-logo .ai-text {\n    color: var(--text-color);\n    /* text-white */\n}\n\n.header-logo .leaning-tool-text {\n    color: #a78bfa;\n    /* text-purple-400 */\n}\n\n.header-nav {\n    display: none;\n    /* hidden */\n    gap: 2rem;\n    /* space-x-8 */\n    font-size: 0.875rem;\n    /* text-sm */\n    font-weight: 500;\n    /* font-medium */\n    color: var(--header-nav-color);\n    /* text-gray-400 */\n}\n\n.header-nav a {\n    transition: color 0.3s ease;\n    /* transition-colors */\n}\n\n.header-nav a:hover {\n    color: var(--header-nav-hover-color);\n    /* hover:text-white */\n}\n\n@media (min-width: 200px) {\n\n    /* md breakpoint */\n    .header-nav {\n        display: flex;\n        /* md:flex */\n    }\n    .header-nav{\n        gap: 0.1;\n        font-size: 0.0rem;\n        font-family: 'Courier New', Courier, monospace;\n        \n    }\n}\n\n/* Mode Toggle Button */\n.mode-toggle-button {\n    background: none;\n    border: 1px solid var(--header-nav-color);\n    color: var(--header-nav-color);\n    padding: 0.5rem 1rem;\n    border-radius: 0.5rem;\n    cursor: pointer;\n    font-size: 0.875rem;\n    font-weight: 500;\n    transition: all 0.3s ease;\n}\n\n.mode-toggle-button:hover {\n    background-color: var(--header-nav-color);\n    color: var(--bg-color);\n}\n\nbody.light-mode .mode-toggle-button {\n    border-color: var(--text-color);\n    color: var(--text-color);\n}\n\nbody.light-mode .mode-toggle-button:hover {\n    background-color: var(--text-color);\n    color: var(--bg-color);\n}\n\n\n/* Hero Section */\n.hero-section {\n    text-align: center;\n    /* text-center */\n    margin-top: 6rem;\n    /* my-24 */\n    margin-bottom: 6rem;\n    /* my-24 */\n    position: relative;\n    /* relative */\n}\n\n.hero-title {\n    font-size: 5rem;\n    /* text-5xl */\n    font-weight: 800;\n    /* font-extrabold */\n    letter-spacing: -0.05em;\n    /* tracking-tight */\n    margin-bottom: 2rem;\n    /* mb-8 */\n    line-height: 1.25;\n    /* leading-tight */\n    background-image: linear-gradient(to right, #e5e7eb, #9ca3af);\n    /* bg-gradient-to-r from-gray-200 to-gray-400 */\n    -webkit-background-clip: text;\n    /* bg-clip-text */\n    background-clip: text;\n    /* bg-clip-text */\n    color: transparent;\n    /* text-transparent */\n}\n@media(max-width:768px)\n{\n    .hero-title{\n        font-size: 3rem;\n        font-weight: 550;\n        letter-spacing: -0.03em;\n        margin-top: 4rem;\n    }\n}\n\n/* Language and Role Selectors */\n.select-wrapper {\n    margin-bottom: 1rem;\n    /* mb-4 */\n    max-width: 12rem;\n    /* max-w-xs */\n    margin-left: auto;\n    /* mx-auto */\n    margin-right: auto;\n    /* mx-auto */\n}\n\n.select-label {\n    display: block;\n    /* block */\n    color: var(--text-color);\n    /* text-gray-300 */\n    font-size: 0.875rem;\n    /* text-sm */\n    font-weight: 700;\n    /* font-bold */\n    margin-bottom: 0.5rem;\n    /* mb-2 */\n}\n\n/* Mic Button Container */\n.mic-button-container {\n    display: flex;\n    /* flex */\n    justify-content: center;\n    /* justify-center */\n    align-items: center;\n    /* items-center */\n    margin-top: 4rem;\n    /* my-16 */\n    margin-bottom: 4rem;\n    /* my-16 */\n}\n\n/* Voice Output Text */\n.voice-output-text {\n    font-size: 1.125rem;\n    /* text-lg */\n    color: var(--text-color);\n    /* text-gray-300 */\n    margin-top: 1rem;\n    /* mt-4 */\n    min-height: 30px;\n    /* min-h-[30px] */\n}\n\n/* Why Choose Section */\n.why-choose-section {\n    margin-top: 6rem;\n    /* my-24 */\n    margin-bottom: 6rem;\n    /* my-24 */\n    position: relative;\n    /* relative */\n    overflow: hidden;\n    /* overflow-hidden */\n    border-radius: 1rem;\n    /* rounded-2xl */\n}\n\n.why-choose-title {\n    font-size: 2.25rem;\n    /* text-4xl */\n    font-weight: 700;\n    /* font-bold */\n    text-align: center;\n    /* text-center */\n    margin-bottom: 3rem;\n    /* mb-12 */\n}\n\n.why-choose-grid {\n    display: grid;\n    /* grid */\n    grid-template-columns: 1fr;\n    /* grid-cols-1 */\n    gap: 1.5rem;\n    /* gap-6 */\n}\n\n@media (min-width: 768px) {\n\n    /* md breakpoint */\n    .why-choose-grid {\n        grid-template-columns: 1fr 1fr;\n        /* md:grid-cols-2 */\n    }\n}\n\n/* Tense Guide / Image Understanding / Conversational Chat Sections */\n.feature-section {\n    margin-top: 6rem;\n    /* my-24 */\n    margin-bottom: 6rem;\n    /* my-24 */\n    position: relative;\n    /* relative */\n    overflow: hidden;\n    /* overflow-hidden */\n    border-radius: 1rem;\n    /* rounded-2xl */\n}\n\n.feature-title {\n    font-size: 2.25rem;\n    /* text-4xl */\n    font-weight: 700;\n    /* font-bold */\n    text-align: center;\n    /* text-center */\n    margin-bottom: 3rem;\n    /* mb-12 */\n}\n\n.feature-content-wrapper {\n    display: flex;\n    /* flex */\n    flex-direction: column;\n    /* flex-col */\n    gap: 1.5rem;\n    /* space-y-6 */\n    max-width: 42rem;\n    /* max-w-2xl */\n    margin-left: auto;\n    /* mx-auto */\n    margin-right: auto;\n    /* mx-auto */\n}\n\n/* How it Works Section */\n.how-it-works-section {\n    margin-top: 6rem;\n    /* my-24 */\n    margin-bottom: 6rem;\n    /* my-24 */\n}\n\n.how-it-works-title {\n    font-size: 2.25rem;\n    /* text-4xl */\n    font-weight: 700;\n    /* font-bold */\n    text-align: center;\n    /* text-center */\n    margin-bottom: 3rem;\n    /* mb-12 */\n}\n\n.how-it-works-video-wrapper {\n    position: relative;\n    /* relative */\n    border-radius: 1rem;\n    /* rounded-2xl */\n    overflow: hidden;\n    /* overflow-hidden */\n    padding: 0.5rem;\n    /* p-2 */\n}\n\n.how-it-works-video-overlay {\n    position: absolute;\n    /* absolute */\n    inset: 0;\n    /* inset-0 */\n    display: flex;\n    /* flex */\n    align-items: center;\n    /* items-center */\n    justify-content: center;\n    /* justify-center */\n    background-color: rgba(0, 0, 0, 0.3);\n    /* bg-black bg-opacity-30 */\n}\n\n.play-button {\n    width: 5rem;\n    /* w-20 */\n    height: 5rem;\n    /* h-20 */\n    border-radius: 9999px;\n    /* rounded-full */\n    display: flex;\n    /* flex */\n    align-items: center;\n    /* items-center */\n    justify-content: center;\n    /* justify-center */\n    background-color: rgba(255, 255, 255, 0.2);\n    /* bg-white bg-opacity-20 */\n    backdrop-filter: blur(4px);\n    /* backdrop-blur-sm */\n    border: 1px solid rgba(255, 255, 255, 0.2);\n    /* border border-white/20 */\n    transition: background-color 0.3s ease;\n    /* transition-all */\n    cursor: pointer;\n}\n\n.play-button:hover {\n    background-color: rgba(255, 255, 255, 0.3);\n    /* hover:bg-opacity-30 */\n}\n\n.play-button svg {\n    height: 2.5rem;\n    /* h-10 */\n    width: 2.5rem;\n    /* w-10 */\n    color: #FFFFFF;\n    /* text-white */\n    margin-left: 0.25rem;\n    /* ml-1 */\n}\n\n/* Footer */\n.footer {\n    text-align: center;\n    /* text-center */\n    color: var(--header-nav-color);\n    /* text-gray-500 */\n    font-size: 0.875rem;\n    /* text-sm */\n    margin-top: 6rem;\n    /* mt-24 */\n    padding-bottom: 2rem;\n    /* pb-8 */\n}\n\n/* Custom styles for advanced effects (retained from original) */\n.glass-card {\n    background: var(--card-bg);\n    /* Semi-transparent purple-ish background */\n    backdrop-filter: blur(12px);\n    -webkit-backdrop-filter: blur(12px);\n    border: 1px solid var(--card-border);\n    border-radius: 1rem;\n    padding: 1.5rem;\n    /* p-6 */\n    transition: background-color 0.5s ease, border-color 0.5s ease;\n}\n\n.glass-card.feature-item {\n    display: flex;\n    /* flex */\n    justify-content: space-between;\n    /* justify-between */\n    align-items: center;\n    /* items-center */\n}\n\n.glass-card.feature-item h3 {\n    font-size: 1.25rem;\n    /* text-xl */\n    font-weight: 600;\n    /* font-semibold */\n}\n\n.mic-button {\n    position: relative;\n    z-index: 10;\n    background: linear-gradient(145deg, #a955f7, #7a3bda);\n    box-shadow: 0 0 15px #a955f7, 0 0 30px #a955f7, inset 0 0 5px rgba(255, 255, 255, 0.5);\n    width: 6rem;\n    /* w-24 */\n    height: 6rem;\n    /* h-24 */\n    border-radius: 9999px;\n    /* rounded-full */\n    display: flex;\n    /* flex */\n    align-items: center;\n    /* items-center */\n    justify-content: center;\n    /* justify-center */\n    cursor: pointer;\n}\n\n.mic-button svg {\n    height: 2.5rem;\n    /* h-10 */\n    width: 2.5rem;\n    /* w-10 */\n    color: #FFFFFF;\n    /* text-white */\n}\n\n.aurora-glow {\n    position: absolute;\n    left: 50%;\n    transform: translateX(-50%);\n    border-radius: 50%;\n    z-index: 1;\n    pointer-events: none;\n    /* Make it non-interactive */\n}\n\n.aurora-glow-1 {\n    top: -100px;\n    width: 500px;\n    height: 500px;\n    background: radial-gradient(circle, rgba(196, 99, 243, 0.3) 0%, rgba(196, 99, 243, 0) 60%);\n    filter: blur(50px);\n}\n\n.aurora-glow-2 {\n    top: -80px;\n    width: 400px;\n    height: 400px;\n    background: radial-gradient(circle, rgba(220, 50, 150, 0.2) 0%, rgba(220, 50, 150, 0) 70%);\n    filter: blur(30px);\n}\n\n/* Animation for the microphone pulse */\n@keyframes pulse {\n\n    0%,\n    100% {\n        transform: scale(1);\n        box-shadow: 0 0 15px #a955f7, 0 0 30px #a955f7;\n    }\n\n    50% {\n        transform: scale(1.05);\n        box-shadow: 0 0 25px #c88cff, 0 0 50px #c88cff;\n    }\n}\n\n.mic-pulse {\n    animation: pulse 2.5s infinite ease-in-out;\n}\n\n.feature-icon {\n    background-color: #a955f7;\n    box-shadow: 0 0 8px #a955f7;\n    width: 1rem;\n    /* w-4 */\n    height: 1rem;\n    /* h-4 */\n    border-radius: 9999px;\n    /* rounded-full */\n}\n\n.feature-icon.small {\n    width: 0.75rem;\n    /* w-3 */\n    height: 0.75rem;\n    /* h-3 */\n}\n\n.ai-response-area {\n    min-height: 100px;\n    background: var(--card-bg);\n    border: 1px solid var(--card-border);\n    border-radius: 0.75rem;\n    padding: 1rem;\n    text-align: left;\n    overflow-y: auto;\n    max-height: 300px;\n    transition: background-color 0.5s ease, border-color 0.5s ease;\n}\n\n.ai-response-area p.placeholder {\n    color: var(--input-placeholder-color);\n    /* text-gray-400 */\n}\n\n.ai-response-area p.content {\n    color: var(--text-color);\n    /* text-white */\n    margin-top: 0.5rem;\n    /* mt-2 */\n}\n\n.input-field {\n    width: 100%;\n    padding: 0.75rem;\n    /* p-3 */\n    border-radius: 0.75rem;\n    /* rounded-xl */\n    background-color: var(--input-bg);\n    border: 1px solid var(--input-border);\n    color: var(--text-color);\n    font-size: 1rem;\n    /* text-base */\n    box-sizing: border-box;\n    resize: vertical;\n    transition: background-color 0.5s ease, border-color 0.5s ease, color 0.5s ease;\n}\n\n.input-field::placeholder {\n    color: var(--input-placeholder-color);\n    /* gray-400 */\n}\n\n.loading-spinner {\n    border: 4px solid rgba(255, 255, 255, 0.3);\n    border-top: 4px solid #a955f7;\n    border-radius: 50%;\n    width: 24px;\n    height: 24px;\n    animation: spin 1s linear infinite;\n    display: inline-block;\n    vertical-align: middle;\n    margin-left: 0.5rem;\n}\n\n@keyframes spin {\n    0% {\n        transform: rotate(0deg);\n    }\n\n    100% {\n        transform: rotate(360deg);\n    }\n}\n\n.image-preview {\n    max-width: 100%;\n    max-height: 250px;\n    object-fit: contain;\n    border-radius: 0.75rem;\n    margin-top: 1rem;\n    border: 1px solid var(--card-border);\n}\n\n.action-buttons-group {\n    display: flex;\n    /* flex */\n    justify-content: flex-start;\n    /* justify-start */\n    margin-top: 1rem;\n    /* mt-4 */\n}\n\n.action-button {\n    background-color: #6d28d9;\n    /* violet-700 */\n    color: white;\n    padding: 0.5rem 1rem;\n    border-radius: 0.5rem;\n    font-size: 0.875rem;\n    cursor: pointer;\n    transition: background-color 0.3s ease, opacity 0.3s ease;\n    margin-right: 0.5rem;\n    /* Space between buttons */\n    border: none;\n    /* Remove default button border */\n}\n\n.action-button:hover {\n    background-color: #5b21b6;\n    /* violet-800 */\n}\n\n.stop-button {\n    background-color: #dc2626;\n    /* red-600 */\n}\n\n.stop-button:hover {\n    background-color: #b91c1c;\n    /* red-700 */\n}\n\n.delete-button {\n    background-color: #f59e0b;\n    /* amber-500 */\n}\n\n.delete-button:hover {\n    background-color: #d97706;\n    /* amber-600 */\n}\n\n.action-button:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n}\n\n/* Chat specific styles */\n.chat-container {\n    display: flex;\n    flex-direction: column;\n    gap: 0.75rem;\n    /* gap-3 */\n    padding: 1rem;\n    /* p-4 */\n    border-radius: 1rem;\n    /* rounded-xl */\n    background: var(--card-bg);\n    backdrop-filter: blur(12px);\n    -webkit-backdrop-filter: blur(12px);\n    border: 1px solid var(--card-border);\n    min-height: 300px;\n    max-height: 500px;\n    overflow-y: auto;\n    transition: background-color 0.5s ease, border-color 0.5s ease;\n}\n\n.chat-message {\n    padding: 0.75rem 1rem;\n    /* py-3 px-4 */\n    border-radius: 0.75rem;\n    /* rounded-xl */\n    max-width: 80%;\n    word-wrap: break-word;\n}\n\n.chat-message.user {\n    background-color: var(--user-chat-bg);\n    /* indigo-600 */\n    align-self: flex-end;\n    /* align-self-end */\n    margin-left: auto;\n    /* ml-auto */\n}\n\n.chat-message.ai {\n    background-color: var(--ai-chat-bg);\n    /* gray-700 */\n    align-self: flex-start;\n    /* align-self-start */\n    margin-right: auto;\n    /* mr-auto */\n}\n\n.chat-input-area {\n    display: flex;\n    /* flex */\n    gap: 0.5rem;\n    /* gap-2 */\n    margin-top: 1rem;\n    /* mt-4 */\n}\n\n.chat-input-area .input-field {\n    flex-grow: 1;\n    /* flex-grow */\n    margin-top: 0;\n    /* Override default margin */\n}\n\n.chat-send-button {\n    padding: 0.75rem 1.25rem;\n    /* py-3 px-5 */\n    border-radius: 0.75rem;\n    /* rounded-xl */\n    background-color: #4f46e5;\n    /* indigo-600 */\n    color: white;\n    /* text-white */\n    font-weight: 600;\n    /* font-semibold */\n    cursor: pointer;\n    transition: background-color 0.3s ease;\n    border: none;\n    /* Remove default button border */\n}\n\n.chat-send-button:hover {\n    background-color: #4338ca;\n    /* indigo-700 */\n}\n\n.chat-send-button:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n}\n\n.clear-chat-button {\n    background-color: #f59e0b;\n    /* amber-500 */\n    color: white;\n    padding: 0.5rem 1rem;\n    border-radius: 0.5rem;\n    font-size: 0.875rem;\n    cursor: pointer;\n    transition: background-color 0.3s ease;\n    margin-bottom: 1rem;\n    /* mb-4 */\n    border: none;\n    /* Remove default button border */\n}\n\n.clear-chat-button:hover {\n    background-color: #d97706;\n    /* amber-600 */\n}\n\n/* Background image for sections */\n.section-background-image {\n    position: absolute;\n    /* absolute */\n    top: 50%;\n    /* top-1/2 */\n    left: 50%;\n    /* left-1/2 */\n    transform: translate(-50%, -50%);\n    /* -translate-x-1/2 -translate-y-1/2 */\n    width: 100%;\n    /* w-full */\n    max-width: none;\n    /* max-w-none */\n    height: auto;\n    /* h-auto */\n    opacity: 0.2;\n    /* opacity-20 or opacity-25 */\n    filter: blur(48px);\n    /* blur-3xl */\n    pointer-events: none;\n    /* pointer-events-none */\n    z-index: 1;\n    /* z-10 */\n    transition: transform 0.1s linear;\n    /* Smooth movement for parallax */\n}\n\n.section-content-wrapper {\n    position: relative;\n    /* relative */\n    z-index: 2;\n    /* z-10 */\n    padding: 1rem;\n    /* p-4 */\n}\n\n/* New styles for scroll animation */\n.scroll-animate {\n    opacity: 0;\n    transform: translateY(20px);\n    /* Start slightly below */\n    transition: opacity 0.8s ease-out, transform 0.8s ease-out;\n}\n\n.scroll-animate.visible {\n    opacity: 1;\n    transform: translateY(0);\n}\nvideo{\n    width: 100%;\n    height: 100%;\n    padding: 0;\n    border-radius: 10px;\n}\n      "
        }}
    />
    <div className="main-container">
        {/* Header */}
        <header className="header">
            <div className="header-logo">
                <span className="ai-text">AI</span>
                <span className="leaning-tool-text">आचार्य</span>
            </div>
            <nav className="header-nav">
                <a href="#">Features</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
                <button id="modeToggleButton" className="mode-toggle-button">
                    Dark Mode
                </button>
            </nav>
        </header>
        {/* Hero Section (Voice Recognition) */}
        <section className="hero-section">
            {/* Background Glows */}
            <div className="aurora-glow aurora-glow-1" />
            <div className="aurora-glow aurora-glow-2" />
            <h1 className="hero-title">
                Speak and Learn <br /> Effortlessly
            </h1>
            {/* Language Selection for Voice Response */}
            <div className="select-wrapper">
                <label htmlFor="voiceResponseLanguage" className="select-label">
                    AI Voice Language:
                </label>
                <select id="voiceResponseLanguage" className="input-field">
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Spanish (Spain)</option>
                    <option value="fr-FR">French (France)</option>
                    <option value="de-DE">German (Germany)</option>
                    <option value="ja-JP">Japanese (Japan)</option>
                    <option value="zh-CN">Mandarin (China)</option>
                </select>
            </div>
            {/* Role Selection for Voice Response */}
            <div className="select-wrapper" style={{ marginBottom: "2rem" }}>
                {" "}
                {/* Adjusted for mb-8 */}
                <label htmlFor="aiRole" className="select-label">
                    AI Role:
                </label>
                <select id="aiRole" className="input-field">
                    <option value="friendly language learning companion">
                        Friendly Language Companion
                    </option>
                    <option value="strict grammar teacher">Strict Grammar Teacher</option>
                    <option value="casual conversation partner">
                        Casual Conversation Partner
                    </option>
                    <option value="travel guide for a new city">Travel Guide</option>
                    <option value="job interviewer">Job Interviewer</option>
                </select>
            </div>
            <div className="mic-button-container">
                
                <button id="micButton" className="mic-button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm5 10.5a.5.5 0 01.5.5v.5a.5.5 0 01-1 0v-.5a.5.5 0 01.5-.5zM10 18a.5.5 0 00.5-.5v-1.586l1.293 1.293a.5.5 0 00.707-.707L10.707 15H9.293l-1.793 1.793a.5.5 0 00.707.707L9.5 16.914V17.5a.5.5 0 00.5.5z"
                            clipRule="evenodd"
                        />
                        <path d="M5 8a5 5 0 004 4.9V15a1 1 0 102 0v-2.1A5 5 0 005 8zm-2 0a7 7 0 1114 0v1a1 1 0 11-2 0V8a5 5 0 00-5-5 5 5 0 00-5 5v1a1 1 0 11-2 0V8z" />
                    </svg>
                </button>
            </div>
            <p id="voiceOutput" className="voice-output-text">
                Click the microphone to start speaking...
            </p>
            <div
                id="voiceLoading"
                className="loading-spinner hidden"
                style={{ marginLeft: "auto", marginRight: "auto", marginTop: "1rem" }}
            />
            <div
                id="aiVoiceResponseArea"
                className="ai-response-area hidden"
                style={{ marginTop: "1rem", padding: "1rem" }}
            >
                <p className="placeholder">AI's Voice Response:</p>
                <p id="aiVoiceTextOutput" className="content" />
                <div className="action-buttons-group">
                    <button id="speakAiVoiceBtn" className="action-button" disabled="">
                        Speak Response
                    </button>
                    <button
                        id="stopAiVoiceBtn"
                        className="action-button stop-button"
                        disabled=""
                    >
                        Stop Speaking
                    </button>
                    <button
                        id="deleteVoiceResponseBtn"
                        className="action-button delete-button"
                        disabled=""
                    >
                        Delete Response
                    </button>
                </div>
            </div>
        </section>
        <section className="why-choose-section scroll-animate">
            {/* Background Image */}
            <img
                src="https://placehold.co/1200x800/6e44ff/000000.png?text=+"
                className="section-background-image"
                style={{ opacity: "0.2" }}
                alt="Abstract purple background wave"
            />
            <div className="section-content-wrapper">
                <h2 className="why-choose-title">Why choose AILeaning Tool?</h2>
                <div className="why-choose-grid">
                    <div className="glass-card feature-item">
                        <h3 className="text-xl font-semibold">Voice Interaction</h3>
                        <div className="feature-icon" />
                    </div>
                    <div className="glass-card feature-item">
                        <h3 className="text-xl font-semibold">Grammar &amp; Tense Guide</h3>
                        <div className="feature-icon" />
                    </div>
                    <div className="glass-card feature-item">
                        <h3 className="text-xl font-semibold">Image Understanding</h3>
                        <div className="feature-icon" />
                    </div>
                    <div className="glass-card feature-item">
                        <h3 className="text-xl font-semibold">Personalized Learning</h3>
                        <div className="feature-icon" />
                    </div>
                </div>
            </div>
        </section>
        {/* Tense Guide & Grammar Correction Section */}
        <section className="feature-section scroll-animate">
            {/* Background Image */}
            <img
                src="https://placehold.co/1200x800/a955f7/1a1226.png?text=+"
                className="section-background-image"
                style={{ opacity: "0.25" }}
                alt="Abstract purple and black background wave"
            />
            <div className="section-content-wrapper">
                <h2 className="feature-title">Tense Guide &amp; Grammar Correction</h2>
                <div className="feature-content-wrapper">
                    <textarea
                        id="grammarInput"
                        className="input-field"
                        rows={4}
                        placeholder="Type your sentence here for grammar correction or tense explanation..."
                        defaultValue={""}
                    />
                    <button
                        id="analyzeGrammarBtn"
                        className="mic-button"
                        style={{
                            width: "100%",
                            height: "auto",
                            padding: "0.75rem 1.5rem",
                            borderRadius: "0.75rem"
                        }}
                    >
                        Analyze Text
                        <span id="grammarLoading" className="loading-spinner hidden" />
                    </button>
                    <div
                        className="ai-response-area glass-card"
                        style={{ marginTop: "1rem", padding: "1rem" }}
                    >
                        <p className="placeholder">AI Response will appear here:</p>
                        <p id="grammarOutput" className="content" />
                        <div className="action-buttons-group">
                            <button
                                id="speakGrammarBtn"
                                className="action-button"
                                disabled=""
                            >
                                Speak Response
                            </button>
                            <button
                                id="stopGrammarBtn"
                                className="action-button stop-button"
                                disabled=""
                            >
                                Stop Speaking
                            </button>
                            <button
                                id="deleteGrammarBtn"
                                className="action-button delete-button"
                                disabled=""
                            >
                                Delete Response
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* Image Understanding and Answering Section */}
        <section className="feature-section scroll-animate">
            {/* Background Image */}
            <img
                src="https://placehold.co/1200x800/6e44ff/000000.png?text=+"
                className="section-background-image"
                style={{ opacity: "0.2" }}
                alt="Abstract purple background wave"
            />
            <div className="section-content-wrapper">
                <h2 className="feature-title">Image Understanding &amp; Answering</h2>
                <div className="feature-content-wrapper">
                    <label
                        htmlFor="imageUpload"
                        className="select-label"
                        style={{ textAlign: "left" }}
                    >
                        Upload an Image:
                    </label>
                    <input
                        type="file"
                        id="imageUpload"
                        className="input-field"
                        accept="image/*"
                        style={{ cursor: "pointer" }}
                    />
                    <img
                        id="uploadedImage"
                        className="image-preview hidden"
                        src=""
                        alt="Uploaded Image Preview"
                        style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: "1rem"
                        }}
                    />
                    <textarea
                        id="imageQuestion"
                        className="input-field"
                        rows={3}
                        placeholder="Ask a question about the image..."
                        style={{ marginTop: "1rem" }}
                        defaultValue={""}
                    />
                    <button
                        id="askImageQuestionBtn"
                        className="mic-button"
                        style={{
                            width: "100%",
                            height: "auto",
                            padding: "0.75rem 1.5rem",
                            borderRadius: "0.75rem"
                        }}
                    >
                        Ask AI about Image
                        <span id="imageLoading" className="loading-spinner hidden" />
                    </button>
                    <div
                        className="ai-response-area glass-card"
                        style={{ marginTop: "1rem", padding: "1rem" }}
                    >
                        <p className="placeholder">AI's Answer will appear here:</p>
                        <p id="imageAnswer" className="content" />
                        <div className="action-buttons-group">
                            <button id="speakImageBtn" className="action-button" disabled="">
                                Speak Response
                            </button>
                            <button
                                id="stopImageBtn"
                                className="action-button stop-button"
                                disabled=""
                            >
                                Stop Speaking
                            </button>
                            <button
                                id="deleteImageBtn"
                                className="action-button delete-button"
                                disabled=""
                            >
                                Delete Response
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* Conversational Chat Section */}
        <section className="feature-section scroll-animate">
            {/* Background Image */}
            <img
                src="https://placehold.co/1200x800/a955f7/1a1226.png?text=+"
                className="section-background-image"
                style={{ opacity: "0.25" }}
                alt="Abstract purple and black background wave"
            />
            <div className="section-content-wrapper">
                <h2 className="feature-title">Conversational Chat</h2>
                <div className="feature-content-wrapper">
                    <button id="clearChatBtn" className="clear-chat-button">
                        Clear Chat
                    </button>
                    <div id="chatDisplay" className="chat-container">
                        {/* Chat messages will be appended here */}
                        <div className="chat-message ai">
                            Hello! How can I help you with your language learning today?
                        </div>
                    </div>
                    <div className="chat-input-area">
                        <input
                            type="text"
                            id="chatInput"
                            className="input-field"
                            placeholder="Type your message here..."
                        />
                        <button id="sendChatBtn" className="chat-send-button">
                            Send
                        </button>
                    </div>
                    <div
                        id="chatLoading"
                        className="loading-spinner hidden"
                        style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: "1rem"
                        }}
                    />
                </div>
            </div>
        </section>
        {/* How AILeaning Tool Works Section (Adjusted) */}
        <section className="how-it-works-section scroll-animate">
            <h2 className="how-it-works-title">How AILeaning Tool works</h2>
            <div className="how-it-works-video-wrapper glass-card">
                <video
                    src="Screen Recording 2025-05-03 090153.mp4"
                    plays-inline=""
                    loop=""
                    muted=""
                    controls=""
                    type="video/mp4"
                ></video>
            </div>
        </section>
        {/* Footer */}
        <footer className="footer">
            <p>© 2024 AILeaning Tool. All rights reserved.</p>
        </footer>
    </div>
</>
