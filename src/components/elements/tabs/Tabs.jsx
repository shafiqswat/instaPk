/** @format */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FavoriteIcon, ReelsIcon } from "@/constants/SvgIcon";
import { Grid } from "lucide-react";
import Save from "@/app/(auth)/[slug]/save/page";
import MyPosts from "@/app/(auth)/[slug]/page";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const TabsCustom = ({ isCurrentUser, searchUser }) => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;
  return (
    <Tabs
      defaultValue='posts'
      className='w-full mt-10 border-t'>
      <TabsList className='flex gap-5'>
        <TabsTrigger
          value='posts'
          className=''
          onClick={() => router.push(`${slug}`)}>
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
        <MyPosts
          isCurrentUser={isCurrentUser}
          searchUser={searchUser}
        />
      </TabsContent>
      <TabsContent value='reels'></TabsContent>
      <TabsContent value='saved'>
        <Save selectedUser={searchUser} />
      </TabsContent>
      <TabsContent value='tagged'></TabsContent>
    </Tabs>
  );
};
export default TabsCustom;
