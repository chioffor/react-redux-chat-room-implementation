import React, { useState } from 'react'

export const ChatInput = ({ roomId, emitMessage, username }) => {
    
    const [chatMessage, setChatMessage] = useState('');

    const handleChange = (e) => {
        setChatMessage(e.target.value);       
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (chatMessage) {            
            emitMessage(chatMessage, roomId, username)
            setChatMessage('');
        };
        
    };

    return (
        <div>
            <div className="text-muted mt-2 ms-2 fs-6 mb-0">say something...</div>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        className='chat-input form-control border-0 bg-light'
                        type='text'
                        value={chatMessage}
                        placeholder='...'
                        onChange={handleChange}
                    />
                    <input 
                        className="chat-input-button btn text-muted"
                        type="submit"
                        value="Send"
                        onClick={handleSubmit}
                    />
                </div>
            </form>
            <hr />
        </div>
    );
}