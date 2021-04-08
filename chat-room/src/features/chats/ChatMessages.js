import React from 'react'
import { useSelector } from 'react-redux'

export function ChatMessages({ roomId, username, usernameColor }) {

    const rooms = useSelector(state => state.rooms.rooms)

    const room = rooms.find(room => room.id === roomId)
    const roomChatMessages = room.messages    
        
    const renderedMessages = roomChatMessages.map(message => {        
        if (message.username) {
            return (
                <div className="p-1 w-75 text-wrap text-break" key={message.id}>
                    {username === message.username.name ? 
                        <div className="fw-bold me-2">
                            {message.username.name}
                        </div> :
                        <div className={message.username.color + " fw-bold me-2"}>
                            {message.username.name}
                        </div>
                    }

                    <div className="text-muted ms-2">{message.text}</div>
                </div>
            )
        } else {
            return (
                <div className="text-muted fs-6 fw-bold fst-italic text-center" key={message.id}>{message.text}</div>
            )                
        }   
        
    })

    return (
        <div>
            <div className="mt-2 chat-messages bg-light">
                {renderedMessages}                
            </div>            
        </div>
    )
}