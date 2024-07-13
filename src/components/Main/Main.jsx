import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

// Main functional component
const Main = () => {
    // Destructuring values from the Context
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

    // Handle Enter key press to trigger onSent function
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && input) {
            onSent();
        }
    };

    return (
        <div className='main'>
            <div className="nav">
                <p>Cato.ai</p>  
            </div>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, User.</span></p> 
                            <p>How can I help you today?</p>
                        </div>
                    </>
                ) : (
                    <div className='result'>
                        <div className="result-title user-message">
                            <img className="reply" src={assets.user_icon} alt="User Icon" />  
                            <p>{recentPrompt}</p>  
                        </div>
                        <div className="result-data">
                            <img className="reply2" src={assets.gemini_icon} alt="Gemini Icon" />  
                            {loading ? (
                                <div className='loader'>
                                    <hr />  
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                // Display the result from the API response
                                <p className='api-reply' dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            )}
                        </div>
                    </div>
                )}
                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            className='input-box'
                            onChange={(e) => setInput(e.target.value)}  // Update input state on change
                            value={input}
                            type="text"
                            placeholder='Enter a prompt here'
                            onKeyPress={handleKeyPress}  // Trigger onSent on Enter key press
                        />
                        <div>
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="Send Icon" /> : null}  
                        </div>
                    </div>
                    <p className='bottom-info'>
                        Cato.ai can make mistakes. Consider checking important information. 
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Main;
