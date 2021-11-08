import io from 'socket.io-client';
import {useState, useEffect} from "react";

export default function useSocket(url) {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const socketIo = io(url, {withCredentials: true})

    setSocket(socketIo)

    function cleanup() {
      socketIo.disconnect()
    }

    return cleanup
  }, [])

  return socket
}