import React, { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [fileInput, setFileInput] = useState(null); // New state for file input

  const fileInputRef = useRef(null); // Ref for file input

  const items = ['நான் ஒரு தமிழ் சித்த மருத்துவ பகுப்பாய்வாளர் என்ற வகையில், உங்கள் விவரிப்பின் அடிப்படையில், இது மாலேரியா நோயின் அறிகுறிகளைப் போன்றதாக தெரிகிறது.\n\nமாலேரியா ஒரு பிராணிக்கொல்லி நோய் ஆகும், இது ஆனோபிலிஸ் எனப்படும் ஒரு வகை எஸ்கெலிட்டோ எனப்படும் ஒரு வகை சிறிய பன்றிகளால் பரவுகிறது. இந்த பன்றிகள் நோயுற்ற நபரிடமிருந்து இரத்தத்தை உறிஞ்சும்போது, அவை பிளாஸ்மோடியம் எனப்படும் பாразைட்டுகளை கொண்டு செல்கின்றன. பின்னர் இந்த பாராசைட்டுகள் புதிய ஆளுக்கு பரவுகின்றன.\n\nமாலேரியாவை சித்த மருத்துவத்தின் மூலம் கட்டுப்படுத்த பின்வரும் சிகிச்சைகள் பரிந்துரைக்கப்படுகின்றன:\n\n1. நீரிழிவு மருந்துகள் - நாவல்பாரிசி, நெல்லிக்காய் சூரணம் போன்றவை உடலில் உள்ள விஷத்தை வெளியேற்றுவதற்கு உதவுகின்றன.\n\n2. குளிர்ச்சியூட்டும் மருந்துகள் - தாளிசபத்திரி குடிநீர், துத்துராஜ லேகியம் போன்றவை உடல் வெப்பநிலையை குறைக்க உதவுகின்றன.\n\n3. இரத்த சுத்திகரிப்புகள் - கொடிவேலி சூரணம், நவாச்சாரம் போன்றவை இரத்தத்தை சுத்தப்படுத்துவதோடு பாராசைட்டுகளையும் அழிக்கின்றன.\n\n4. ஆயுர்வேத மசாஜ் - இது உடலின் விசையாற்றலை மேம்படுத்துவதோடு நோயெதிர்ப்பு சக்தியையும் அதிகரிக்கிறது.\n\nசரியான சித்த சிகிச்சை மற்றும் ஆரோக்கியமான வாழ்க்கை முறையை பின்பற்றுவது மாலேரியாவை கட்டுப்படுத்த உதவும். எனினும், தீவிரமான நிலைமைகளில் மருத்துவ ஆலோசனையை நாடுவது அவசியம்.','cancer prediction true','i3'];

  const [msgCount, setMsgCount] = useState(0);

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
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          query: input
        },
      });

      console.log(response,'log res');

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
        const replyMessages = {
          sender: 'bot',
          type: 'text',
          text: items[msgCount],
        };
        setMsgCount(msgCount + 1);
        console.log('reply messages',msgCount);
        setMessages([...messages, replyMessages]);
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
