import React from 'react'
import { useSelector } from 'react-redux'



export function ChatMessages({ roomId, username }) {

    const rooms = useSelector(state => state.rooms.rooms)

    const room = rooms.find(room => room.id === roomId)
    const roomChatMessages = room.messages

        
    const renderedMessages = roomChatMessages.map(message => (
        <div className="d-flex p-2 w-75 text-wrap text-break" key={message.id}>
            { username === message.username 
                ? 
                <div className="fw-bold me-2">                    
                    {message.username}
                </div> 
                :
                <div className={message.classString}>                    
                    {message.username}
                </div>
            }         
            
            <div className="text-muted">{message.text}</div>
        </div>
    ))

    return (
        <div>
            <div className="mt-2 chat-messages bg-light">
                {renderedMessages}                
            </div>            
        </div>
    )
}