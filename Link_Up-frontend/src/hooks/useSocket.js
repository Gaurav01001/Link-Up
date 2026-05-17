import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const useSocket = (userId) => {
    const socketRef = useRef(null);

    useEffect(() => {
        // Initialize socket connection
        socketRef.current = io("http://localhost:5000");

        // Example: listen to incoming messages
        socketRef.current.on("receive_message", (data) => {
            console.log("New realtime message:", data);
        });

        // Emit 'join' if a user ID is provided
        if (userId) {
            socketRef.current.emit("join", userId);
        }

        // Cleanup socket connection on component unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [userId]);

    // Function to send messages
    const sendMessage = (receiverId, content) => {
        if (socketRef.current) {
            socketRef.current.emit("send_message", {
                senderId: userId,
                receiverId,
                content
            });
        }
    };

    return { socket: socketRef.current, sendMessage };
};

export default useSocket;