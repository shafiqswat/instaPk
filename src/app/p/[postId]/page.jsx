/** @format */
"use client";

import LoadingSkeleton from "@/components/elements/loading-skeleton/loadingSkeleton";
import Comment from "@/components/modals/comment/Comment";
import { usePost } from "@/context/post.context";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PostPage = () => {
  const { postId } = useParams();
  const [postLoading, setPostLoading] = useState(false);
  const { singlePost, loading, myPosts, myPostsData } = usePost();
  const [postData, setPostData] = useState(null);
  const router = useRouter();

  const fetchPost = async () => {
    setPostLoading(true);
    try {
      const response = await singlePost(postId);
      setPostData(response);
    } catch (err) {
      console.error("Error fetching post:", err);
    } finally {
      setPostLoading(false);
    }
  };

  useEffect(() => {
    if (postId) fetchPost();
  }, [postId]);

  useEffect(() => {
    if (postData?.user?._id) {
      myPosts(postData.user._id);
    }
  }, [postData]);

  return (
    <div>
      {postLoading ? (
        <div className='md:grid md:grid-cols-2 gap-0 w-[80%] mx-auto  border my-5 bg-gray-200  animate-pulse h-[90vh]'></div>
      ) : (
        postData && (
          <div>
            <Comment
              postData={postData}
              selectedUser={postData?.user}
              postPage={true}
            />

            <section className='px-10 sm:px-16'>
              <hr className='my-10' />
              <p className='font-semibold text-sm text-gray-600'>
                More posts from{" "}
                <strong className='text-black font-semibold'>
                  {postData?.user?.userName}
                </strong>
              </p>

              <div className='grid grid-cols-3 gap-4 my-4'>
                {loading ? (
                  <LoadingSkeleton count={6} />
                ) : (
                  myPostsData.map((item, i) => (
                    <div
                      className='col-span-1'
                      key={i}>
                      <Image
                        src={item?.imageUrls[0]}
                        alt='Post'
                        width={0}
                        height={0}
                        sizes='100vw'
                        className='w-full lg:h-[400px] md:h-[250px] h-[150px] object-cover border cursor-pointer shadow-sm bg-red'
                        onClick={() => router.push(`/p/${item?.id}`)}
                      />
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        )
      )}
    </div>
  );
};

export default PostPage;
