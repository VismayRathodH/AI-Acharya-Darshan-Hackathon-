import React from 'react';

// Main App component
function App() {
    return (
        <div className="app-container">
            {/* Removed 'jsx' attribute from style tag to resolve React warning */}
            <style>{`
        body {
          font-family: 'Inter', sans-serif;
          background-color: #000000; /* Dark background */
          color: #E0E0E0; /* Light text color */
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
          padding: 1rem;
          box-sizing: border-box;
          overflow: hidden; /* Prevent scroll from background glow */
        }

        .phone-mockup {
          width: 100%;
          max-width: 375px; /* Typical mobile width */
          height: 812px; /* Typical mobile height */
          background-color: #1a1a1a; /* Inner phone background */
          border-radius: 40px;
          box-shadow: 0 0 0 8px #333, 0 0 0 10px #555, 0 20px 60px rgba(0, 0, 0, 0.8);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          box-sizing: border-box;
        }

        .status-bar {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 15px;
          color: #FFFFFF;
          font-size: 0.8rem;
          margin-bottom: 20px;
        }

        .status-bar .time {
          font-weight: 600;
        }

        .status-bar .icons {
          display: flex;
          gap: 5px;
        }

        .login-container {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 0 20px;
          text-align: center;
          position: relative;
          z-index: 2; /* Ensure content is above glow */
        }

        .login-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #FFFFFF;
        }

        .input-group {
          width: 100%;
          margin-bottom: 1.2rem;
          text-align: left;
        }

        .input-group label {
          display: block;
          font-size: 0.9rem;
          color: #BBBBBB;
          margin-bottom: 0.4rem;
        }

        .input-field {
          width: 100%;
          padding: 0.8rem 1rem;
          background-color: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          color: #FFFFFF;
          font-size: 1rem;
          box-sizing: border-box;
          transition: border-color 0.3s ease, background-color 0.3s ease;
        }

        .input-field:focus {
          outline: none;
          border-color: #a955f7;
          background-color: rgba(255, 255, 255, 0.15);
        }

        .input-field::placeholder {
          color: #888888;
        }

        .button-group {
          width: 100%;
          margin-top: 2rem;
        }

        .action-button {
          width: 100%;
          padding: 1rem;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          margin-bottom: 0.8rem;
        }

        .sign-up-button {
          background: linear-gradient(145deg, #a955f7, #7a3bda);
          color: #FFFFFF;
          box-shadow: 0 5px 15px rgba(169, 85, 247, 0.4);
        }

        .sign-up-button:hover {
          background: linear-gradient(145deg, #7a3bda, #a955f7);
          box-shadow: 0 8px 20px rgba(169, 85, 247, 0.6);
        }

        .sign-in-button {
          background-color: rgba(255, 255, 255, 0.08);
          color: #a955f7;
          border: 1px solid #a955f7;
        }

        .sign-in-button:hover {
          background-color: rgba(169, 85, 247, 0.15);
          color: #FFFFFF;
        }

        /* Background glow effect */
        .background-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(169, 85, 247, 0.3), rgba(169, 85, 247, 0) 70%);
          filter: blur(80px);
          border-radius: 50%;
          z-index: 1;
          animation: glow-pulse 4s infinite alternate;
        }

        @keyframes glow-pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>
            <div className="phone-mockup">
                <div className="status-bar">
                    <span className="time">9:41</span>
                    <span className="icons">
                        {/* Placeholder for network/wifi/battery icons */}
                        �🔋
                    </span>
                </div>

                <div className="login-container">
                    <div className="background-glow"></div>
                    <h1 className="login-title">Login page</h1>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" className="input-field" placeholder="Enter your email" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" className="input-field" placeholder="Enter your password" />
                    </div>
                    <div className="button-group">
                        <button className="action-button sign-up-button">Sign In</button>
                        <button className="action-button sign-in-button">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
�