import React from 'react'

export function RoomsList({ renderedRooms }) {
    return (
        <div className="rooms-list bg-light">
            <table className="table">
                <tbody>
                    {renderedRooms}
                </tbody>
            </table>
            
        </div>
    )
}