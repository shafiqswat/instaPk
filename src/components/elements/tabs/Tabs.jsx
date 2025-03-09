/** @format */

import SocialCard from "@/components/cards/social-card/SocialCard";
import Comment from "@/components/modals/comment/Comment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FavoriteIcon, ReelsIcon } from "@/constants/SvgIcon";
import { useAuth } from "@/context/AuthContext";
import { usePost } from "@/context/PostContext";
import { Contact, Grid } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingSkeleton from "../loading-skeleton/loadingSkeleton";
import Save from "@/app/save/page";

const TabsCustom = ({ isCurrentUser, searchUser }) => {
  const { myPosts, myPostsData, loading } = usePost();
  const [showComment, setShowComment] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    myPosts(searchUser?._id);
  }, []);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowComment(true);
  };
  const sortedPosts = myPostsData?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <Tabs
      defaultValue='posts'
      className='w-full mt-10 border-t'>
      <TabsList className='flex gap-5'>
        <TabsTrigger
          value='posts'
          className=''>
          <span>
            <Grid className='w-4 h-4 mr-1' />
          </span>
          POSTS
        </TabsTrigger>
        {/* <TabsTrigger value='reels'>
          <span>
            <ReelsIcon className='w-4 h-4 mr-1' />
          </span>
          REELS
        </TabsTrigger> */}
        <TabsTrigger value='saved'>
          <span>
            <FavoriteIcon className='w-4 h-4 mr-1' />
          </span>
          SAVED
        </TabsTrigger>
        {/* <TabsTrigger value='tagged'>
          <Contact className='w-4 h-4 mr-1' /> TAGGED
        </TabsTrigger> */}
      </TabsList>
      <TabsContent value='posts'>
        <div className='grid grid-cols-3 gap-3'>
          {loading ? (
            <LoadingSkeleton
              count={9}
              className='w-full h-[150px] sm:h-[300px] md:h-[350px]'
            />
          ) : (
            sortedPosts.map((items, i) => (
              <div key={i}>
                <SocialCard
                  handlePostClick={handlePostClick}
                  items={items}
                  index={i}
                />
              </div>
            ))
          )}
        </div>
      </TabsContent>
      <TabsContent value='reels'></TabsContent>
      <TabsContent value='saved'>
        <Save selectedUser={isCurrentUser ? user : searchUser} />
      </TabsContent>
      <TabsContent value='tagged'></TabsContent>
      <Comment
        showModal={showComment}
        setShowModal={setShowComment}
        postData={selectedPost}
        setSelectedPost={setSelectedPost}
        selectedUser={isCurrentUser ? user : searchUser}
        isCurrentUser={isCurrentUser}
      />
    </Tabs>
  );
};
export default TabsCustom;
