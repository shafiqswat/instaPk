/** @format */
import { useAuth } from "@/context/auth.context";
import { EditIcon } from "lucide-react";
import React, { useState } from "react";
import { useChat } from "@/context/chat.context";
import ChatModal from "../modals/chat/chatModal";
import { useRouter } from "next/navigation";

const ConversationList = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { conversations, setActiveThread } = useChat();
  const router = useRouter();

  const { user } = useAuth();
  const tabs = ["Primary"];
  return (
    <div className='lg:w-[395px] md:w-[250px] w-full border-r  h-screen'>
      <div className='flex items-center justify-between gap-2 p-5 mt-5'>
        <h2 className='md:text-xl md:font-bold  font-semibold text-lg'>
          {user?.userName}
        </h2>
        <EditIcon
          className='cursor-pointer'
          onClick={() => setIsChatOpen(true)}
        />
      </div>
      <div className='flex items-center justify-between p-5 border-b'>
        {tabs.map((text, i) => (
          <p
            key={i}
            className={`font-semibold text-sm cursor-pointer ${
              text === "Primary" ? "text-black" : "text-gray-600"
            }`}>
            {text}
          </p>
        ))}
      </div>
      <div>
        {conversations?.map((convo) => (
          <div
            key={convo._id}
            className='p-2 flex gap-2 hover:bg-gray-100 cursor-pointer'
            onClick={() => {
              setActiveThread(convo);
              router.push(`/message?threadId=${convo._id}`);
            }}>
            <img
              className='w-12 h-12 rounded-full'
              src={convo.otherUser.profilePic}
              alt='profilePic'
            />
            <div>
              <h3>{convo.otherUser.userName}</h3>
              <p className='text-xs text-gray-500'>{convo.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
      <ChatModal
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
      />
    </div>
  );
};

export default ConversationList;
