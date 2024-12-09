import React, { useState, useEffect } from 'react';
import { db } from '@/util/firebase';
import {
  collection,
  where,
  getDocs,
  orderBy,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { useAuth } from '@/util/auth/context';

const Sidebar = ({ chats }) => {
  return (
    <div className='flex flex-col w-64 bg-gray-100 p-4'>
      <h2 className='text-xl font-bold mb-4'>Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id} className='mb-2'>
            <div className='flex items-center'>
              <img
                src={chat.user.photoURL}
                alt={chat.user.name}
                className='w-8 h-8 rounded-full mr-2'
              />
              <span>{chat.user.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ChatArea = ({ chats }) => {
  const [selectedChat, setSelectedChat] = React.useState(null);
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    if (selectedChat) {
      const q = query(
        collection(db, 'messages'),
        where('chatId', '==', selectedChat.id),
        orderBy('timestamp')
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messagesData);
      });

      return unsubscribe;
    }
  }, [selectedChat]);

  return (
    <div className='flex-1 p-4'>
      <div className='flex justify-between mb-4'>
        <h2 className='text-xl font-bold'>
          {selectedChat ? selectedChat.user.name : 'Select a chat'}
        </h2>
        {/* Add chat actions here */}
      </div>

      <div className='flex flex-col h-96 overflow-y-scroll'>
        {messages.map((message) => (
          <div key={message.id} className='flex items-start mb-2'>
            <img
              src={message.user.photoURL}
              alt={message.user.name}
              className='w-8 h-8 rounded-full mr-2'
            />
            <div>
              <span>{message.user.name}</span>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <form className='flex items-center mt-4'>
        <input
          type='text'
          className='flex-1 px-2 py-1 rounded-l'
          placeholder='Type your message...'
        />
        <button className='px-2 py-1 rounded-r bg-blue-500 text-white'>
          Send
        </button>
      </form>
    </div>
  );
};

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState([]);

  const auth = useAuth();

  useEffect(() => {
    const { currentUser } = useAuth();
    setUser(currentUser);
  }, [auth]);

  useEffect(() => {
    const q = query(
      collection(db, 'chats'),
      where('userIds', 'contains', currentUser.uid),
      orderBy('timestamp')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chats);
    });

    return unsubscribe;
  }, []);

  return (
    <div className='flex h-screen'>
      <Sidebar chats={chats} />
      <ChatArea chats={chats} />
    </div>
  );
};

export default ChatPage;
