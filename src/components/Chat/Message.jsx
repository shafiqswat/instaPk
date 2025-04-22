/** @format */
import { MoreHorizontal } from "lucide-react";
import useCompactTimeFormat from "../hooks/useCompactTimeFormat";
import PopoverCustom from "../elements/popover/Popover";
import Image from "next/image";

const Message = ({
  message,
  isCurrentUser,
  otherUserProfilePic,
  onDeleteMessage,
}) => {
  const handleDelete = () => {
    onDeleteMessage(message._id);
  };

  const formattedTime = useCompactTimeFormat(new Date(message.timestamp));

  if (message.deletedForSender && isCurrentUser) {
    return (
      <div className='flex items-start gap-2 flex-row-reverse'>
        <div className='relative group'>
          <div className='rounded-lg p-3 max-w-[70%] bg-gray-100 text-gray-500 italic'>
            <p className='text-sm'>This message was deleted</p>
            <span className='text-xs opacity-70 mt-1 block'>
              {formattedTime}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-start gap-2 ${
        isCurrentUser ? "flex-row-reverse" : "flex-row"
      }`}>
      {!isCurrentUser && (
        <Image
          src={otherUserProfilePic}
          alt='Profile'
          width={32}
          height={32}
          className='w-8 h-8 rounded-full object-cover'
        />
      )}
      <div className='relative group max-w-[85%] pb-5'>
        <div
          className={`rounded-lg px-3 py-2 shadow-sm ${
            isCurrentUser
              ? "bg-blue-600 text-white rounded-tr-none"
              : "bg-gray-100 text-gray-900 rounded-tl-none"
          }`}>
          {message.imageUrl && (
            <Image
              width={250}
              height={250}
              src={message.imageUrl}
              alt='Message'
              className='rounded-lg mb-2 max-w-full h-auto'
            />
          )}
          <p className='text-sm break-words'>
            {message.text.split(/(\s+)/).map((part, index) =>
              /^https?:\/\/[^\s]+$/.test(part) ? (
                <a
                  key={index}
                  href={part}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`underline break-all ${
                    isCurrentUser ? "text-blue-200" : "text-blue-500"
                  }`}>
                  {part}
                </a>
              ) : (
                part
              )
            )}
          </p>
          <div className='flex items-center justify-end mt-1'>
            <span className='text-xs opacity-70'>{formattedTime}</span>
          </div>
        </div>
        {isCurrentUser && !message.deletedForSender && (
          <PopoverCustom onDelete={handleDelete}>
            <button className='absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 rounded-full p-1'>
              <MoreHorizontal className='w-4 h-4 text-gray-500' />
            </button>
          </PopoverCustom>
        )}
      </div>
    </div>
  );
};

export default Message;
