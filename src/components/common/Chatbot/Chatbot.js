import React, { useState, useEffect } from "react";
import "./Chatbot.css";
import { FaMicrophone } from "react-icons/fa";
import axios from "axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // Initially hidden
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);
  const [recognition, setRecognition] = useState(null);

  // ✅ OpenAI API Key
  const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY";

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      setIsVoiceSupported(true);
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = "en-US";

      recog.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleSendMessage(transcript);
        setIsListening(false);
      };

      recog.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      setRecognition(recog);
    } else {
      console.warn("SpeechRecognition is not supported in this browser.");
    }
  }, []);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // ✅ Mood-Based Emotional Support
  const detectMood = (text) => {
    const sadKeywords = ["sad", "depressed", "lonely", "feeling low", "unhappy"];
    const happyKeywords = ["happy", "excited", "great", "awesome", "joyful"];

    if (sadKeywords.some((word) => text.toLowerCase().includes(word))) {
      return "I'm really sorry you're feeling this way. 💙 Do you want to talk about it? I'm here for you. If it helps, I can suggest a doctor or therapist.";
    }
    if (happyKeywords.some((word) => text.toLowerCase().includes(word))) {
      return "That's amazing to hear! 🎉 Keep smiling and enjoying the moment!";
    }
    return null;
  };

  // ✅ Health-Based Doctor Recommendations
  const recommendDoctor = (text) => {
    const healthConditions = {
      headache: "It sounds like you might be experiencing a headache. A neurologist or general physician can help!",
      "stomach pain": "It seems like you have stomach pain. You may want to consult a gastroenterologist.",
      anxiety: "I understand that anxiety can be tough. A therapist or mental health professional might be helpful. 💙",
      fever: "Fever can be a sign of infection. It's best to consult a general physician.",
      "skin rash": "For skin rashes, a dermatologist would be the right specialist to consult.",
    };

    for (let condition in healthConditions) {
      if (text.toLowerCase().includes(condition)) {
        return healthConditions[condition];
      }
    }
    return null;
  };

  const handleSendMessage = async (text = inputText) => {
    if (text.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: text, sender: "user" },
    ]);

    setInputText("");

    // ✅ Check for emotional support
    const moodResponse = detectMood(text);
    if (moodResponse) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: moodResponse, sender: "ai" },
      ]);
      return;
    }

    // ✅ Check for doctor recommendations
    const doctorResponse = recommendDoctor(text);
    if (doctorResponse) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: doctorResponse, sender: "ai" },
      ]);
      return;
    }

    // ✅ Call OpenAI API for general responses
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: text }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: aiResponse, sender: "ai" },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "I'm facing some technical issues. Please try again later. 🙏", sender: "ai" },
      ]);
    }
  };

  const startListening = () => {
    if (!isVoiceSupported || !recognition) {
      alert("Voice input is not supported in your browser.");
      return;
    }
    setIsListening(true);
    recognition.start();
  };

  return (
    <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
      <button className="chatbot-toggle" onClick={toggleChatbot}>
        {isOpen ? "✕" : "💬"}
      </button>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>AI Health Assistant</h3>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button onClick={() => handleSendMessage()}>Send</button>
            <button onClick={startListening} className="mic-button" disabled={isListening || !isVoiceSupported}>
              <FaMicrophone />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
