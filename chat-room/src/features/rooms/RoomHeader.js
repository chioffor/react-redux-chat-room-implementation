import React from 'react'

export function RoomHeader({ username }) {
    return (
        <div className="fw-bold">
            <div>Welcome {username} </div>
            <div>Please enter a Room</div>            
        </div>
    )
}