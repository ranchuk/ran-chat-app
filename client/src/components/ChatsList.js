import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import { useSelector, useDispatch } from "react-redux";

const ChatsList = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const [reciever, setReciever] = useState("");
  // const [isClientWriting, setIsClientWriting] = useState(false);

  const { chats: chatList, username, chatInView } = state;

  useEffect(() => {
    state.socket.on("clientNewMessage", data => {
      dispatch({ type: "AddMessage", payload: data });
    });

    state.socket.on("clientWriting", data => {
      dispatch({ type: "someoneWriting", payload: data });
    });
  }, []);

  return (
    <div className="col-md-6 offset-md-3 col-sm-12">
      <h1>Chats</h1>
      <div style={{ display: "flex" }}>
        <div
          className="form-control"
          style={{
            height: 500,
            width: 200
          }}
        >
          {chatList &&
            chatList.map((item, index) => {
              const reciever =
                item.username1 !== username ? item.username1 : item.username2;
              return (
                <div
                  className="chatItem"
                  style={{ cursor: "pointer" }}
                  key={index}
                  onClick={e => {
                    dispatch({ type: "ChatInView", payload: item });
                    setReciever(reciever);
                  }}
                >
                  <span>
                    {reciever}
                    's Room
                  </span>
                </div>
              );
            })}
        </div>
        <div
          className="form-control"
          style={{
            height: 500,
            width: 700
          }}
        >
          {Object.keys(chatInView).length > 0 ? (
            <Chat reciever={reciever} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ChatsList;