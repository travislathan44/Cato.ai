import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets' 
import { Context } from '../../context/Context'

// Sidebar functional component
const Sidebar = () => {
    // State to manage whether the sidebar is extended or not
    const [extended, setExtended] = useState(false)
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context)

    // Function to load a previous prompt and send it
    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

    return (
        <div className='sidebar'>
            <div className="top">
                {/* Toggle the sidebar extension */}
                <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="Menu Icon" />
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="Plus Icon" />
                    {extended ? <p>New Chat</p> : null}  {/* Show 'New Chat' text if sidebar is extended */}
                </div>
                {extended
                    ? <div className="recent">
                        <p className="recent-title">Recent</p>  {/* Title for recent prompts section */}
                        {prevPrompts.map((item, index) => {
                            return (
                                <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                                    <img src={assets.message_icon} alt="Message Icon" />
                                    <p>{item.slice(0, 18)} ...</p>  {/* Display a shortened version of the prompt */}
                                </div>
                            )
                        })}
                    </div>
                    : null
                }
            </div>
            <div className="bottom">
                {/* Link to the 'About' page */}
                <div className="bottom-item recent-entry">
                    <a href="/Redirects/About.html"><img src={assets.question_icon} alt="About Icon" /></a>
                    {extended ? <p>About</p> : null}  {/* Show 'About' text if sidebar is extended */}
                </div>
                {/* Link to the 'Settings' page */}
                <div className="bottom-item recent-entry">
                    <a href="/Redirects/Settings.html"><img src={assets.setting_icon} alt="Settings Icon" /></a>
                    {extended ? <p>Settings</p> : null}  {/* Show 'Settings' text if sidebar is extended */}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
