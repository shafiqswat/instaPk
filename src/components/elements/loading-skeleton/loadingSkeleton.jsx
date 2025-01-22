/** @format */

import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = ({
  comments,
  count,
  className,
  homePage,
  loading,
  suggestion,
}) => {
  return (
    <>
      {/*<<<<<<<<<<<---------------------  Comments and user suggestion Loading  ------------------------->>>>>>>>>>>>> */}

      {comments ? (
        <div className='flex items-center space-x-4  p-4 '>
          <Skeleton
            className={`h-8 w-8 rounded-full ${suggestion && "w-10 h-10"}`}
          />
          <div className='space-y-2'>
            <Skeleton
              className={`h-2 w-[250px] ${suggestion && "h-3 w-[150px]"}`}
            />
            <Skeleton
              className={`h-2 w-[200px] ${suggestion && "h-3 w-[150px]"}`}
            />
          </div>
        </div>
      ) : (
        <>
          {Array.from({ length: count }, (_, i) =>
            !homePage ? (
              /*<<<<<<<<<<<---------------------  Explore Page loading and Profile page ------------------------->>>>>>>>>>>>> */

              <div
                key={i}
                className='flex flex-col space-y-3'>
                <Skeleton className={`h-[350px] rounded-xl  ${className}`} />
              </div>
            ) : (
              /*<<<<<<<<<<<---------------------   Home page  ------------------------->>>>>>>>>>>>> */

              <div
                className='flex flex-col space-y-3'
                key={i}>
                <Skeleton className='sm:h-[500px] h-[400px] w-full  sm:w-[468px] rounded-xl' />
                <div className='space-y-2'>
                  <Skeleton className='h-4 sm:w-[468px] w-full' />
                  <Skeleton className='h-4 sm:w-[468px] w-full' />
                </div>
              </div>
            )
          )}
        </>
      )}
      {/*<<<<<<<<<<<---------------------  Hover Card loading  ------------------------->>>>>>>>>>>>> */}

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
  );
};
export default LoadingSkeleton;
