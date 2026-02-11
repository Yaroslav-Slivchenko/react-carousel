import style from './Carousel.module.scss'

import {Children, type FC, type ReactNode, useRef, useState} from "react";

import {CarouselPagination} from "./CarouselPagination.tsx";
import {CarouselNavigation} from "./CarouselNavigation.tsx";
import {CarouselButtons} from "./CarouselButtons.tsx";

interface CarouselProps {
  children: ReactNode,
  slidesPerView?: number,
  gap?: number,
  rowGap?: number,
  rows?: number,
  navigation?: boolean,
  pagination?: boolean,
}

export const Carousel: FC<CarouselProps> = ({children, slidesPerView = 1, rows = 1, gap = 0, rowGap = 0, navigation = false, pagination = false}) => {

  const [isDragging, setIsDragging] = useState(false)
  const [index, setIndex] = useState(0)
  const [offset, setOffset] = useState(0)

  const startX = useRef(0)
  const currentX = useRef(0)
  const deltaX = useRef(0)

  children = Children.toArray(children)

  const amountSlides = Math.trunc((Children.count(children) - slidesPerView) / rows)
  const widthSlides = 100 / slidesPerView

  // BUTTON and NAVIGATION LOGIC //
  const correctIndex = (i: number) =>
    Math.max(0, Math.min(amountSlides, i))
  const nextSlide = () =>
    setIndex(i => correctIndex(i + 1))
  const prevSlide = () =>
    setIndex(i => correctIndex(i - 1))

  // TOUCH LOGIC //
  function onTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    setIsDragging(true)

    startX.current = event.touches[0].clientX
  }

  function onTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    if (!isDragging) return

    currentX.current = event.touches[0].clientX
    deltaX.current = startX.current - currentX.current

    setOffset(deltaX.current)
  }

  function onTouchEnd() {
    setIsDragging(false)

    if (Math.abs(deltaX.current) > 60) {
      if (deltaX.current > 0) nextSlide()
      else prevSlide()
    }

    setOffset(0)
  }

  // ROWS SUPPORT //
  const groupedChildren = []
  for (let i = 0; i < children.length; i += rows) {
    groupedChildren.push(children.slice(i, i + rows))
  }

  return (
    <>
      <CarouselButtons prevSlide={prevSlide} nextSlide={nextSlide} />

      <div className={style.carousel}>

        <CarouselNavigation
          nextSlide={nextSlide}
          prevSlide={prevSlide}
          enable={navigation}
        />

        <CarouselPagination
          amountSlides={amountSlides}
          index={index}
          setIndex={setIndex}
          enable={pagination}
        />

        <div className={[style.carousel__track, `${isDragging ? style.carousel__trackDragging : ''}`].join(' ')}
             onTouchStart={onTouchStart}
             onTouchMove={onTouchMove}
             onTouchEnd={onTouchEnd}
             style={{
               transform: `translateX(calc(-${index * widthSlides}% - ${index * gap}px - ${offset}px))`,
               gap
             }}
        >
          {groupedChildren.map((item, index) => (
            <div key={`slide-${index}`} className={style.carousel__slide} style={{minWidth: `${widthSlides}%`, rowGap}}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

