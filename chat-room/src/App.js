import moment from 'moment'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
import './App.css';

import { io } from 'socket.io-client'

import { nanoid } from '@reduxjs/toolkit';

import { RoomHeader } from './features/rooms/RoomHeader'
import { RoomsList } from './features/rooms/RoomsList'
import { RoomFooter } from './features/rooms/RoomFooter'

import { ChatHeader } from './features/chats/ChatHeader'
import { ChatMessages } from './features/chats/ChatMessages'
import { ChatInput } from './features/chats/ChatInput'

import { newChatMessage, newRoomCreated, userJoinedRoom } from './features/rooms/roomsSlice'

let socket;
const endpoint = 'http://localhost:3001'

const colorChoices = [
  'text-primary', 'text-success', 'text-secondary', 'text-danger',
  'text-warning', 'text-info', 'text-dark',
]

let getRandomInt = (min, max) => (
  Math.floor(Math.random() * (max - min) + min)
)

let randomInt = getRandomInt(0, colorChoices.length + 1)

const App = () => {
  
  const [clicked, setClicked] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [usernameColor, setUsernameColor] = useState('');

  const rooms = useSelector(state => state.rooms.rooms);
  const dispatch = useDispatch();  

  useEffect(() => {
    socket = io(endpoint);
    socket.on('chat message', function(data) {
      dispatch(newChatMessage({
        roomId: data.roomId,
        text: data.text,
        messageId: nanoid(),
        username: data.username,
        usernameColor: data.usernameColor
      }));
    });
    
    socket.on('new room created', function(data) {
      dispatch(newRoomCreated({
        roomId: data.roomId,
        roomName: data.roomName
      }));      
    })

    socket.on('user joined a room', function(data) {
      dispatch(userJoinedRoom({
        roomId: data.roomId,
        username: data.username,
        messageId: nanoid(),
      }));
    })
   
  }, [dispatch]);

  const handleClick = (e, roomId) => {
    // const x = moment()
    // alert(moment().from(x))
    // alert(moment().fromNow())
    setClicked(true)
    setRoomId(roomId)
    socket.emit('user joined a room', { username, roomId})
  }

  const handleUsername = (username) => {
    setUsername(username)
    const username_color = colorChoices[randomInt]
    setUsernameColor(username_color)
  }

  const emitMessage = (text, roomId, username, usernameColor) => {
    if (text) {
      socket.emit('chat message', { text, roomId, username, usernameColor })
    }
  }

  const handleBackToRoomDisplay = () => {
    setClicked(false)
  }

  const createNewRoom = (roomName, roomId, username) => {
    alert(roomName + ' ' + roomId)
    socket.emit('new room created', { roomName, roomId, username })
  }


  const renderedRooms = rooms.map(room => {

    const last_message = room.messages[room.messages.length -1]    
    
    return (
      <ListGroup.Item action onClick={e => handleClick(e, room.id)} key={room.id}>       
          <div className="p-2 fw-bold room-name">{room.name}</div>
          { last_message.username ?
            <div className="d-flex fst-italic fw-bold last-message">
              <div className="flex-grow-1">{last_message.username.name + ': ' + last_message.text}</div>
              <div className="">{moment().from(last_message.timestam)}</div>
            </div> :
            <div className="d-flex fst-italic fw-bold last-message">
              <div className="flex-grow-1">{last_message.text}</div>
              <div className="">{moment().from(last_message.timestamp)}</div>
            </div>
          }          
      </ListGroup.Item>
    )
  });
  
  return (
    <div className="container mt-3 mx-auto app-container">
    {username ? 
      clicked ?
        <ChatDisplay
          roomId={roomId}
          emitMessage={emitMessage}
          handleClick={handleClick}
          username={username}
          usernameColor={usernameColor}
          handleBackToRoomDisplay={handleBackToRoomDisplay}
        /> :
        <RoomDisplay 
          renderedRooms={renderedRooms}
          username={username}
          createNewRoom={createNewRoom}
        />
      :
      <UserEntry handleUsername={handleUsername}/>
    }
    </div>  
  )
}

function UserEntry({ handleUsername }) {
  const [username, setUsername] = useState('')

  const handleChange = (e) => {
    setUsername(e.target.value)    
  }
  const handleSubmit = () => {
    if (username) {
      handleUsername(username)
    }
  }

  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <div className="card text-white bg-dark mb-3">
        <div className="card-header">Enter a username</div>        
        <div className="card-body input-group">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input 
                className="form-control"
                type="text"
                value={username}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function ChatDisplay({ roomId, emitMessage, handleClick, username, handleBackToRoomDisplay, usernameColor }) {   
  return (
    <div className="card chat-display">
      <div className="card-body">
        <ChatHeader 
          roomId={roomId} 
          handleClick={handleClick}
          handleBackToRoomDisplay={handleBackToRoomDisplay}
        />
        <ChatMessages 
          roomId={roomId}
          username={username}
          usernameColor={usernameColor}          
        />
        <ChatInput 
          roomId={roomId}
          emitMessage={emitMessage}
          username={username}
          usernameColor={usernameColor}       
        />
      </div>
    </div>
  );
};

function RoomDisplay({ renderedRooms, username, createNewRoom }) {
  return (
    <div className="card">
      <div className="card-body">
        <RoomHeader 
          username={username}
        />
        <RoomsList          
          renderedRooms={renderedRooms} 
          createNewRoom={createNewRoom} 
          username={username}          
        />
        <RoomFooter />
      </div>
    </div>
  )
}

export default App;