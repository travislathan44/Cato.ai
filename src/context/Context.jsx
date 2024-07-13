import { createContext, useState } from "react"; 
import runChat from "../config/cato"; 

// Create a new context
export const Context = createContext(); 

const ContextProvider = (props) => { 
    // Define state variables using useState hook
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState(""); 

    // Function to delay displaying each word of the result
    const delayPara = (index, nextWord) => {
        setTimeout(function (){
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    }

    // Function to start a new chat
    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    // Function to handle sending a prompt
    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;

        // Check if a prompt is provided or use the input state
        if (prompt !== undefined) {
            response = await runChat(prompt);
            setRecentPrompt(prompt);
        } else {
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await runChat(input);
        }

        // Process the response to format bold text and line breaks
        let responseArray = response.split("**");
        let newResponse = "" ;
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }

        setLoading(false);
        setInput("");
    }

    // Define the context value to be provided to children components
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    // Return the Context.Provider with the defined context value
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;
