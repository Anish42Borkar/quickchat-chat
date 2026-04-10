import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useUserDetails } from '../store/userDetailStore';
import type { MessageT } from '../types';

type CallbackT = (message: MessageT) => void;

export function useSocket(callback?: CallbackT) {
  const { userDetail } = useUserDetails();

  const [isConnected, setIsConnected] = useState(false);
  const url = import.meta.env.VITE_API_URL;

  const socket = useRef<Socket | null>(null);

  function onConnect() {
    setIsConnected(true);
  }

  function onDisconnect() {
    setIsConnected(false);
  }

  function onMsgReceive(msg: MessageT) {
    console.log(msg, ' from socket');
    if (callback) callback(msg);
  }

  function sendMessage(receiverId: number, content: string) {
    socket.current?.emit('send_message', {
      senderId: userDetail?.userId,
      receiverId,
      content,
    });
  }

  useEffect(() => {
    if (!userDetail?.token) return;

    socket.current = io(url, {
      auth: {
        token: userDetail?.token,
      },
    });

    socket.current?.on('connect', onConnect);
    socket.current?.on('disconnect', onDisconnect);
    socket.current?.on('receive_message', onMsgReceive);

    return () => {
      socket.current?.off('connect', onConnect);
      socket.current?.off('disconnect', onDisconnect);
      socket.current?.off('receive_message', onMsgReceive);
      socket.current?.disconnect();
    };
  }, [userDetail?.token]);

  return { isConnected, sendMessage };
}
