"use client";

import React, { useCallback, useEffect, useRef } from "react";
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";

const TWEEN_FACTOR_BASE = 0.2;

type PropType = {
  images: string[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { images, options } = props;
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      dragFree: false,
      ...options,
    },
    [autoplay.current]
  );
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__parallax__layer") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenParallax = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";
      const selectedSlideIndex = emblaApi.selectedScrollSnap();

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
          const tweenNode = tweenNodes.current[slideIndex];
          const slideNode = emblaApi.slideNodes()[slideIndex];

          if (tweenNode) {
            tweenNode.style.transform = `translateX(${translate}%)`;
          }


          if (slideNode) {
            const isActive = slideIndex === selectedSlideIndex;
         slideNode.style.filter = isActive
           ? "brightness(100%)"
           : "brightness(50%)";
         slideNode.style.transition = "filter 0.4s ease-in-out";

          }
        });
      });
    },
    []
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenParallax(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenParallax)
      .on("scroll", tweenParallax)
      .on("slideFocus", tweenParallax);
  }, [emblaApi, tweenParallax]);

  return (
    <div className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom ">
          {images.map((src, index) => (
            <div
              className="transform-gpu flex-[0_0_auto] min-w-0 transition-opacity duration-300"
              key={index}
            >
              <div className="rounded-[1.8rem] h-80 w-[1000px] overflow-hidden mx-2">
                <div className="embla__parallax__layer relative h-full w-full flex justify-center">
                  <img
                    className="h-full w-full object-cover object-center"
                    src={src}
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-5 mt-7 max-w-3xl mx-auto px-4">
        <div className="grid grid-cols-2 gap-2.5 items-center">
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            className="appearance-none bg-transparent touch-manipulation no-underline cursor-pointer p-0 m-0 border-2 border-gray-300 w-14 h-14 z-10 rounded-full text-gray-600 flex items-center justify-center disabled:text-gray-400 hover:bg-gray-50 transition-colors"
          />
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            className="appearance-none bg-transparent touch-manipulation no-underline cursor-pointer p-0 m-0 border-2 border-gray-300 w-14 h-14 z-10 rounded-full text-gray-600 flex items-center justify-center disabled:text-gray-400 hover:bg-gray-50 transition-colors"
          />
        </div>

        {/* <div className="flex flex-wrap justify-end items-center -mr-3">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`appearance-none bg-transparent touch-manipulation no-underline cursor-pointer border-0 p-0 m-0 w-10 h-10 flex items-center justify-center rounded-full after:border-2 after:border-gray-300 after:w-5 after:h-5 after:rounded-full after:flex after:items-center after:content-[''] hover:after:border-gray-600 transition-all ${
                index === selectedIndex ? "after:border-gray-600" : ""
              }`}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default EmblaCarousel;
