import { View, Text } from "react-native";
import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
  Time,
} from "react-native-gifted-chat";
import axios from "axios";
import { UserType } from "../UserContext";
import { API_URL } from "@env";

const ChatScreen = () => {
  const { user } = useContext(UserType);
  const [messages, setMessages] = useState([]);
  console.log("user fetch" , user._id)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${process.env.API_URL}/api/chat/${user._id}`);
        console.log(response.data)
        const fetchedMessages = response.data.map(msg => ({
          _id: msg._id,
          text: msg.text,
          createdAt: new Date(msg.createdAt),
          user: {
            _id: msg.userId._id,
            name: msg.userId.name,
            avatar: msg.userId.avatar || "https://static.vecteezy.com/system/resources/previews/020/429/953/non_2x/admin-icon-vector.jpg",
          },
        }));
        // fetchedMessages.sort((a, b) => a.createdAt - b.createdAt);
        console.log("Fetched messages:", fetchedMessages);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [user._id]);

  // const onSend = useCallback((messages = []) => {
  //   setMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, messages)
  //   );
  // }, []);

  const onSend = useCallback(async (newMessages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    const newMessage = newMessages[0];
    try {
      await axios.post(`${API_URL}/api/chat`, {
        userId: user._id,
        text: newMessage.text,
        createdAt: new Date(),
        recipientId: 2, // Adjust this as needed
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }, [user._id]);

  const renderTime = (props) => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: {
            color: "#3c3c434d",
            fontSize: 10,
            textAlign: "right", // or position: 'right'
          },
          right: { color: "#3c3c434d", fontSize: 10 },
        }}
        containerStyle={{ left: { alignSelf: "flex-end", flex: 1 } }}
      />
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user._id, 
      }}
      scrollToBottom={true}
      inverted={false}
      // alignTop={false}
      messagesContainerStyle={{
        backgroundColor: "#FFFFFF",
      }}
      renderTime={renderTime}
      renderBubble={(props) => {
        return (
          <Bubble
            {...props}
            textStyle={{
              right: {
                color: "#1C261E",
              },
            }}
            wrapperStyle={{
              right: {
                backgroundColor: "#A2F8B1",
                // marginBottom: "20px",
                marginTop: 15,


              },
              left: {
                marginTop: 15,
                // marginBottom: "20px",
              },
            }}
          />
        );
      }}
    />
  );
};

export default ChatScreen;
