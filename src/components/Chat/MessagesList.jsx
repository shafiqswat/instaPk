/** @format */
import React from "react";
import Message from "./Message";

const MessagesList = ({
  messages,
  currentUser,
  otherUserProfilePic,
  onDeleteMessage,
}) => {
  return (
    <div className='flex-1 overflow-y-auto border  p-10 space-y-4'>
      {messages.map((msg, index) => (
        <React.Fragment key={msg._id}>
          {index === 0 ||
          new Date(messages[index - 1]?.timestamp).toDateString() !==
            new Date(msg.timestamp).toDateString() ? (
            <div className='text-center text-gray-500 font-semibold text-xs my-2'>
              {new Date(msg.timestamp).toDateString()}
            </div>
          ) : null}
          <Message
            message={msg}
            isCurrentUser={msg.sender === currentUser._id}
            otherUserProfilePic={otherUserProfilePic}
            onDeleteMessage={onDeleteMessage}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default MessagesList;
