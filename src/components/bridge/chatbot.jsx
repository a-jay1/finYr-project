import React, { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [fileInput, setFileInput] = useState(null); // New state for file input

  const fileInputRef = useRef(null); // Ref for file input

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileInput(file);
    }
  };

  const sendMessage = async () => {
    if (input.trim() === '' && !fileInput) return;

    const userMessage = { sender: 'user', type: 'text', text: input };
    setMessages([...messages, userMessage]);
    setInput('');

    if (fileInput) {
      const fileMessage = { sender: 'user', type: 'file', file: fileInput };
      setMessages([...messages, fileMessage]);
      setFileInput(null);
    }

    try {
      // Send user message to API
      const response = await fetch('API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message to the server.');
      }

      // Parse and add bot response to chat window
      const responseData = await response.json();
      const botResponse = { sender: 'bot', type: responseData.type, ...responseData.data };
      setMessages([...messages, botResponse]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Check if the latest message is from the user
    const latestMessage = messages[messages.length - 1];
    if (latestMessage && latestMessage.sender === 'user') {
      // Send automatic reply after a delay
      setTimeout(() => {
        const replyMessage = {
          sender: 'bot',
          type: 'text',
          text: 'Thank you for your feedback!',
        };
        setMessages([...messages, replyMessage]);
      }, 1000); // Adjust the delay as needed
    }
  }, [messages]); // Run the effect whenever messages change

  const renderMessageContent = (message) => {
    // Render message content based on message type
    switch (message.type) {
      case 'text':
        return <div className="p-2 bg-blue-500 text-white rounded-lg">{message.text}</div>;
      case 'image':
        return <img src={URL.createObjectURL(message.file)} alt="Chatbot" className="w-40 h-auto rounded-lg" />;
      case 'video':
        return (
          <video controls className="w-40 h-auto rounded-lg">
            <source src={URL.createObjectURL(message.file)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case 'file':
        return <div className="p-2 bg-yellow-200 text-black rounded-lg">{message.file.name}</div>;
      default:
        return null;
    }
  };
  

  return (
    <div className="md:container md:mx-auto my-1 rounded-sm flex flex-col h-screen bg-black md:w-2/4">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`inline-block p-2 rounded-lg bg-blue-500${
                message.sender === 'user' ? '' : ' text-white'
              }`}
            >
              {renderMessageContent(message)}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center p-4">
        <input
          type="file"
          accept="image/*, video/*" // Allow selection of image and video files
          onChange={handleFileInputChange}
          className="hidden"
          ref={fileInputRef} // Assign ref to file input
        />
        <button
          onClick={() => fileInputRef.current.click()} // Programmatically trigger file input click
          className="px-4 py-2 bg-yellow-200 text-black rounded-lg focus:outline-none"
        >
          Add File
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 mr-4 p-2 border border-gray-300 rounded-lg focus:outline-none"
        />
        
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-yellow-200 text-black rounded-lg focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
