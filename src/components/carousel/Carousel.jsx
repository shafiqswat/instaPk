/** @format */
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CarouselCustom = ({ children, postData }) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}>
      <CarouselContent className='h-full pt-2'>{children}</CarouselContent>
      {postData?.imageUrls.length > 1 && (
        <>
          <CarouselPrevious className='left-2' />
          <CarouselNext className='right-2' />
        </>
      )}
    </Carousel>
  );
};
export default CarouselCustom;
