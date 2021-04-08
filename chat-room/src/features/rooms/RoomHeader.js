import React from 'react'

export function RoomHeader({ username }) {
    const titleCase = (username) => {
        
        return username[0].toUpperCase() + username.slice(1)
    }

    return (
        <div className="">
            <div>
                <span className="welcome me-2">Welcome</span> 
                <span className="fw-bold">{titleCase(username)}</span>
            </div>
            <hr />
        </div>
    )
}