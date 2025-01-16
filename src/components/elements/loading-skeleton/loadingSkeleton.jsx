/** @format */

import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = ({ comments, count, className, homePage, loading }) => {
  return (
    <>
      {comments ? (
        <div className='flex items-center space-x-4  p-4 '>
          <Skeleton className='h-8 w-8 rounded-full' />
          <div className='space-y-2'>
            <Skeleton className='h-2 w-[250px]' />
            <Skeleton className='h-2 w-[200px]' />
          </div>
        </div>
      ) : (
        <>
          {Array.from({ length: count }, (_, i) =>
            !homePage ? (
              <div
                key={i}
                className='flex flex-col space-y-3'>
                <Skeleton className={`h-[350px] rounded-xl  ${className}`} />
              </div>
            ) : (
              <div
                className='flex flex-col space-y-3'
                key={i}>
                <Skeleton className='h-[500px] w-[468px] rounded-xl' />
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-[468px]' />
                  <Skeleton className='h-4 w-[468px]' />
                </div>
              </div>
            )
          )}
        </>
      )}
      <>
        {loading && (
          <div>
            <div className='flex items-center space-x-2 p-3'>
              <Skeleton className='h-9 w-9 rounded-full' />
              <div className='space-y-1'>
                <Skeleton className='h-2 w-[100px]' />
                <Skeleton className='h-2 w-[50px]' />
              </div>
            </div>
            <div className='flex gap-3 justify-around'>
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  className='space-y-1 p-2'
                  key={i}>
                  <Skeleton className='h-2 w-[50px]' />
                  <Skeleton className='h-2 w-[50px]' />
                </div>
              ))}
            </div>
            <div className='flex justify-around mb-1'>
              {Array.from({ length: 3 }, (_, i) => (
                <Skeleton
                  className='h-32 w-[6.5rem] rounded-xl'
                  key={i}
                />
              ))}
            </div>
          </div>
        )}
      </>
    </>
  );
};
export default LoadingSkeleton;
