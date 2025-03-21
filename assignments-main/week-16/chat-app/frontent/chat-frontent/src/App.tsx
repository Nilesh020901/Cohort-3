import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  // State to store chat messages with initial "Hello from server!" message 
  const [messages, setMessages] = useState(["Hello from server!"])

  // Refs to store WebSocket connection and input element
  const wsRef = useRef(); // WebSocket connection reference
  const inputRef = useRef<HTMLInputElement>(null); // Input field reference         Edited this line

  useEffect(() => {
    // Create new WebSocket connection to local server
    const ws = new WebSocket("ws://localhost:8080");

    // Handle incoming messages from server
    ws.onmessage = (e) => {
      setMessages(m => [...m, e.data]) //Add new message to messages array
    }

   // Store WebSocket connection in ref for later use
   //@ts-ignore
    wsRef.current = ws;

    // When connection opens, send join room message
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red" // Join room with ID "red"
        }
      }))
    }
    // Cleanup: close WebSocket when component unmounts
    return() => {
      ws.close()
    }
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className='h-screen bg-black'>
      <br /><br /><br />
      <div className='h-[85vh'>
        {/* Display all messages */}
        {messages.map((message: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined) => <div className='m-8'>
          <span className='bg-white text-black rounded p-4'>
            {message}
          </span>
        </div>)}
      </div>
      {/* Message input and send button */}
      <div className='w-full bg-white flex'>
        <input ref={inputRef} id="message" className='flex-1 p-4' />
        <button onClick={() => {
          const message = inputRef.current?.value;
          // Send chat message through WebSocket
          // @ts-ignore
          wsRef.current.send(JSON.stringify({
            type: "chat",
            payload: {
              message: message
            }
          }))
        }} className='bg-purple-600 text-white p-4'>
          Send Message
        </button>
      </div>
    </div>
  )
}

export default App
