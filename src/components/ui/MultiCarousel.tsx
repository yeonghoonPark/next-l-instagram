"use client";

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 576 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 4,
  },
};

export default function MultiCarousel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Carousel
      responsive={responsive}
      // draggable={false}
      // infinite={true}
      containerClass='w-full flex gap-2'
    >
      {children}
    </Carousel>
  );
}
