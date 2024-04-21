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

  const handleKeyPress = (e) => {
    // Check if the pressed key is Enter (key code 13)
    if (e.key === 'Enter') {
      // Prevent the default behavior of the Enter key (e.g., form submission)
      e.preventDefault();
      
      // Call the sendMessage function
      sendMessage();
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
          text: 'Backend is not deployed! :)',
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
        return <img src={URL.createObjectURL(message.file)} alt="Chatbot" className="w-auto h-auto rounded-lg" />;
      default:
        return null;
    }
  };
  

  return (
    <div className='h-screen'>
    <div className='font-bold text-5xl p-2'>
        Welcome !! 
    </div>
    <div className="md:container h-5/6 md:mx-auto my-1 rounded-md flex flex-col bg-black md:w-2/4">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`inline-block p-2 rounded-lg w-5/6 bg-blue-500${
                message.sender === 'user' ? '' : ' text-white'
              }`}
            >
              {renderMessageContent(message)}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center p-4 justify-between">
        <div className='flex gap-2'>
          <input
            type="file"
            accept="image/*, video/*" // Allow selection of image and video files
            onChange={handleFileInputChange}
            className="hidden"
            ref={fileInputRef} // Assign ref to file input
          />
          <button
            onClick={() => fileInputRef.current.click()} // Programmatically trigger file input click
            className="px-2 py-1 bg-yellow-200 text-black rounded-lg focus:outline-none"
          >
            File
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 mr-4 px-2 py-1 border max-w-5/6 md:max-w-full md:w-full border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div>
          <button
            onClick={sendMessage}
            className="px-4 py-1 bg-yellow-200 text-black rounded-lg focus:outline-none"
          >
            Send
          </button>
        </div>


      </div>
    </div>
    </div>
  );
};

export default Chatbot;
