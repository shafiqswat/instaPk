/** @format */

// "use client";
// import SocialCard from "@/components/cards/social-card/SocialCard";
// import LoadingSkeleton from "@/components/elements/loading-skeleton/loadingSkeleton";
// import Comment from "@/components/modals/comment/Comment";
// import { useAuth } from "@/context/AuthContext";
// import { usePost } from "@/context/PostContext";
// import React, { useEffect, useState } from "react";

// const Save = ({ selectedUser }) => {
//   const { fetchPosts, allPosts, loading } = usePost();
//   const [showComment, setShowComment] = useState(false);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const { user } = useAuth();
//   const handlePostClick = (post) => {
//     setSelectedPost(post);
//     setShowComment(true);
//   };

//   useEffect(() => {
//     fetchPosts(selectedUser?.favorites);
//   }, []);
//   return (
//     <div className='grid grid-cols-3 gap-3'>
//       {loading ? (
//         <LoadingSkeleton
//           count={9}
//           className='w-full h-[150px] sm:h-[300px] md:h-[350px]'
//         />
//       ) : (
//         allPosts.map((items, i) => (
//           <div key={i}>
//             <SocialCard
//               handlePostClick={handlePostClick}
//               items={items}
//               index={i}
//             />
//           </div>
//         ))
//       )}
//       <Comment
//         showModal={showComment}
//         setShowModal={setShowComment}
//         postData={selectedPost}
//         setSelectedPost={setSelectedPost}
//         selectedUser={isCurrentUser ? user : searchUser}
//         isCurrentUser={isCurrentUser}
//       />
//     </div>
//   );
// };

// export default Save;
import React from "react";

const page = () => {
  return <div>page</div>;
};

export default page;
