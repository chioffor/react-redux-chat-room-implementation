import { createSlice, nanoid } from '@reduxjs/toolkit'
import moment from 'moment'

const initialState = {
    rooms: [
        { 
            id: "1",
            name: "IT", 
            messages: [
                { 
                    id: nanoid(), 
                    text: "Welcome to IT Chat Room", 
                    username: { name: 'admin', color: '' },
                },
            ]
        },

        { 
            id: "2", 
            name: "Politics", 
            messages: [
                { 
                    id: nanoid(), 
                    text: "Welcome to Politics Chat Room", 
                    username: { name: 'admin', color: ''}
                },
            ]
        },

        { 
            id: "3",
            name: "Football", 
            messages: [
                { 
                    id: nanoid(), 
                    text: "Welcome to Football Chat Room",                    
                    username: { name: 'admin', color: '' }
                },
            ]
        }
    ],
    status: 'idle',
    error: null
}

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        newRoomCreated(state, action) {
            const { roomId, roomName } = action.payload
            state.rooms.push({
                id: roomId,
                name: roomName,
                messages: [
                    {
                        id: nanoid(),
                        text: `Welcome to ${roomName} Chat Room`,                        
                    }
                ]
            })
        },

        newChatMessage(state, action) {
            const { roomId, text, messageId, username, usernameColor } = action.payload
            const currentRoom = state.rooms.find(room => room.id === roomId)
            if (currentRoom) {
                currentRoom.messages.push({
                    id: messageId,
                    text: text,
                    timestamp: moment().format('h:mm:ss'),
                    username: {
                        name: username,
                        color: usernameColor,
                    }                    
                })
            }
        },

        userJoinedRoom(state, action) {
            const { roomId, username, messageId } = action.payload
            const currentRoom = state.rooms.find(room => room.id === roomId)
            if (currentRoom) {
                currentRoom.messages.push({
                    id: messageId,
                    text: `${username} has joined the room`,
                    info: {
                        username: username
                    }
                                 
                })
            }
        }
    }
})

export const { newChatMessage, newRoomCreated, userJoinedRoom } = roomsSlice.actions

export default roomsSlice.reducer