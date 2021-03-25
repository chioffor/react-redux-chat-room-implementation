import { createSlice, nanoid } from '@reduxjs/toolkit'

const colorChoices = [
    'text-primary',
    'text-success',
    'text-secondary',
    'text-danger',
    'text-warning',
    'text-info',
    'text-dark',
]

let getRandomInt = (min, max) => (
    Math.floor(Math.random() * (max - min) + min)
)

let randomInt = getRandomInt(0, colorChoices.length + 1)
let randomColor = colorChoices[randomInt]

let textClass = randomColor + ' fw-bold me-2' 

const initialState = {
    rooms: [
        { id: "1", name: "IT", messages: [{ id: nanoid(), text: "Welcome to IT Room", username: 'admin', classString: randomColor + ' fw-bold me-2' }]},
        { id: "2", name: "Politics", messages: [{ id: nanoid(), text: "Welcome to Politics Room", username: 'admin', classString: randomColor + ' fw-bold me-2' }]},
        { id: "3", name: "Football", messages: [{ id: nanoid(), text: "Welcome to Football Room", username: 'admin', classString: randomColor + ' fw-bold me-2' }]}
    ],
    status: 'idle',
    error: null
}

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        newChatMessage(state, action) {
            const { roomId, text, messageId, username } = action.payload
            const currentRoom = state.rooms.find(room => room.id === roomId)
            if (currentRoom) {
                currentRoom.messages.push({
                    id: messageId,
                    text: text,
                    username: username,
                    classString: randomColor + ' fw-bold me-2',
                })
            }
        }
    }
})

export const { newChatMessage } = roomsSlice.actions

export default roomsSlice.reducer