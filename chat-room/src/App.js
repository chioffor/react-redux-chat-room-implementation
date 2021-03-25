import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './App.css';

import { io } from 'socket.io-client'

import { nanoid } from '@reduxjs/toolkit';

import { RoomHeader } from './features/rooms/RoomHeader'
import { RoomsList } from './features/rooms/RoomsList'
import { RoomFooter } from './features/rooms/RoomFooter'

import { ChatHeader } from './features/chats/ChatHeader'
import { ChatMessages } from './features/chats/ChatMessages'
import { ChatInput } from './features/chats/ChatInput'

import { newChatMessage } from './features/rooms/roomsSlice'

let socket;
const endpoint = 'http://localhost:3001'

const App = () => {
  
  const [clicked, setClicked] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

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
      }));
      // alert(data.username)
    });   
   
  }, [dispatch]);

  const handleClick = (e, roomId) => {
    setClicked(true)
    setRoomId(roomId)
  }

  const handleUsername = (username) => {
    setUsername(username)
  }

  const emitMessage = (text, roomId, username) => {
    if (text) {
      socket.emit('chat message', { text, roomId, username })
    }
  }


  const renderedRooms = rooms.map(room => (
      <tr key={room.id}>
        <td>
          <div className="d-flex">
            <div className="btn" onClick={e => handleClick(e, room.id)}>{room.name}</div>
          </div>
          
        </td>
      </tr>
  ));
  
  return (
    <div className="container w-50 mt-3">
    {username ? 
      clicked ?
        <ChatDisplay
          roomId={roomId}
          emitMessage={emitMessage}
          handleClick={handleClick}
          username={username}
        /> :
        <RoomDisplay 
          renderedRooms={renderedRooms}
          username={username}
        />
      :
      <UserEntry handleUsername={handleUsername}/>
    }
    </div>   

    // <div className="container w-50 mt-5">
    //   { clicked ?
    //     <ChatDisplay 
    //       roomId={roomId}
    //       emitMessage={emitMessage}
    //       handleClick={handleClick}
    //     /> :
    //     <RoomDisplay renderedRooms={renderedRooms} />
    //   }
    // </div>
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

function ChatDisplay({ roomId, emitMessage, handleClick, username }) {   
  return (
    <div className="card">
      <div className="card-body">
        <ChatHeader roomId={roomId} handleClick={handleClick} />
        <ChatMessages 
          roomId={roomId}
          username={username}          
        />
        <ChatInput 
          roomId={roomId}
          emitMessage={emitMessage}
          username={username}            
        />
      </div>
    </div>
  );
};

function RoomDisplay({ renderedRooms, username }) {
  return (
    <div className="card">
      <div className="card-body">
        <RoomHeader 
          username={username}
        />
        <RoomsList renderedRooms={renderedRooms}/>
        <RoomFooter />
      </div>
    </div>
  )
}

export default App;