/*components/messages/
    ConversationList.jsx
    ChatWindow.jsx
    MessageBubble.jsx
    ChatInput.jsx

pages/Messages/
    Messages.jsx

services/
    message.service.js

store/
    message.store.js

backend/
    message.routes.js
    
    React
     ↓
Axios + Socket.io
     ↓
Express Backend
     ↓
Prisma
     ↓
PostgreSQL
    */

import React from 'react'
import { Navbar } from '../../components/layout/Navbar'
import Sidebar from '../../components/quests/Sidebar'
const Messages = () => {
  return (
    <div className='min-h-screen' >
        <Navbar />
        <div className="flex" >
            <Sidebar/>
{/*main content*/}
            <main className='flex flex-1 h-[calc(100vh-64px)]' >
            
            {/*conversations*/}
            <div className="w-50 border-r p-4" >
            <h2 className="text-xl font-semibold mb-4">
                    Messages
                </h2>
                <div>
                    Conversation List
                </div>
            </div>

            {/*chat window*/}
            <div className="flex flex-1 flex-col">
                {/*conversation header*/}
                <div className="border-b p-4">
                    Select a conversation 
                </div>

                {/*messages*/}
                <div className="flex-1">
                    Messages will appear here.
                </div>
                
                {/*message input*/}
                <div className='border-t p-4'>
                    <div className='border rounded-lg p-2 flex'>
                        <input type="text" placeholder="Type a message..." />
                        <button>Send</button>
                    </div>
                </div>
            </div>

            </main>
        </div>
    </div>
  )
}

export default Messages