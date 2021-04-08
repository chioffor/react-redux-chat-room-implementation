import { nanoid } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { ListGroup } from 'react-bootstrap'

export function RoomsList({ renderedRooms, createNewRoom, username }) {
    const [clicked, setClicked] = useState(false)
    const [newRoomName, setNewRoomName] = useState('') 

    const handleClick = () => {
        setClicked(true)
    }

    const handleChange = (e) => {
        setNewRoomName(e.target.value);
    }

    const submitForm = (e) => {
        e.preventDefault();
        if (newRoomName) {
            const roomId = nanoid()
           
            createNewRoom(newRoomName, roomId, username);
        }
        setNewRoomName('')
    }

    const displayRoomInput = (
        <ListGroup.Item>
            <div className="">
                <form onSubmit={submitForm}>
                    <div className="input-group">
                        <input 
                            className="form-control" 
                            type="text" 
                            value={newRoomName}
                            placeholder="Choose a name ..."
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </div>
        </ListGroup.Item>        
    )
    
    const displayCreateRoomButton = (
        <ListGroup.Item>
            <div className="d-flex btn fw-bold" onClick={handleClick}>
                <div className="text-muted">Create a room</div>
                <div className="ms-2 fw-bold">
                    <i className="bi bi-plus"></i>
                </div>
            </div>          
        </ListGroup.Item>
    )

    return (
        <div className="rooms-list overflow-auto mt-2">
            <ListGroup className="bg-light" variant="flush">
                    {clicked ?
                        displayRoomInput :
                        displayCreateRoomButton
                    }
                    
                <ListGroup.Item>
                    <div className="fw-bold p-2 text-center">Active Rooms</div>  
                </ListGroup.Item>

                {renderedRooms}
                                    
                
            </ListGroup>            
        </div>
    )
}