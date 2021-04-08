import React, { useState } from 'react'
import { OverlayTrigger, Popover, Button } from 'react-bootstrap'

import Picker from 'emoji-picker-react';

export const ChatInput = ({ roomId, emitMessage, username, usernameColor }) => {
    
    const [chatMessage, setChatMessage] = useState('');
    const [show, setShow] = useState(false);

    const handleChange = (e) => {
        setChatMessage(e.target.value);       
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (chatMessage) {            
            emitMessage(chatMessage, roomId, username, usernameColor)
            setChatMessage('');
        };
        
    };

    const handleEmojiClick = (e, emojiObject) => {
        setChatMessage(chatMessage + emojiObject.emoji)
    }

    const handleInputClick = (e) => {
        //alert('yo yo yo')
        setShow(false)
    }

    const handleButtonClick = (e) => {
        if (!show) {
            setShow(true)
        } else {
            setShow(false)
        }
    }
       
    const popover = (
        <Popover id="popover-emoji">
            <Picker onEmojiClick={handleEmojiClick} />
        </Popover>
    );

    return (
        <div>
            <div className="text-muted mt-2 ms-2 fs-6 mb-0">say something...</div>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <OverlayTrigger trigger="click" placement="top" overlay={popover} show={show}>
                        <Button onClick={handleButtonClick}>
                            <i className="bi bi-emoji-smile"></i>
                        </Button>
                    </OverlayTrigger>                    
                    <input
                        className="chat-input form-control border-0 "
                        type="text"
                        value={chatMessage}
                        placeholder=""
                        onChange={handleChange}
                        onClick={handleInputClick}
                        onInput={handleInputClick}
                    />
                    <button 
                        className="chat-input-button btn text-muted"
                        type="submit"
                        // value="Send"
                        onClick={handleSubmit}
                    >
                        <i className="bi bi-cursor-fill"></i>
                    </button>
                </div>
            </form>
            <hr />
        </div>
    );
}