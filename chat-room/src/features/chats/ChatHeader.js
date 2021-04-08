import React from 'react'
import { useSelector } from 'react-redux'

export function ChatHeader({ roomId, handleClick, handleBackToRoomDisplay }) {
    const rooms = useSelector(state => state.rooms.rooms)

    const room = rooms.find(room => room.id === roomId)
    const roomList = rooms.filter(room => room.id !== roomId)

    const onHandleClick = (e, roomId) => {
        handleClick(e, roomId)
    }    
    
    const goBack = () => {
        handleBackToRoomDisplay()
    }

    const renderedRoomList = roomList.map(room => (
        <div
            key={room.id}
            className="dropdown-item"
            onClick={e => onHandleClick(e, room.id)}
        >
            {room.name}
        </div>
    ))

    return (
        <div className="fw-bold">
            <div className="d-flex">
                <div className="flex-grow-1">
                    <span 
                        className="btn fw-bold"
                        title="back"
                        onClick={goBack}
                    >
                        <i className="bi bi-chevron-left"></i>
                    </span>
                    <span># - {room.name}</span>
                </div>
                <div className="dropdown">
                    <i className="bi bi-three-dots-vertical" id="dropdownMenu" data-bs-toggle="dropdown" aria-expanded="false"></i>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu">
                        <div className="dropdown-item text-muted">Rooms</div>
                        {renderedRoomList}
                    </div>
                </div>
            </div>
        </div>
    )
}