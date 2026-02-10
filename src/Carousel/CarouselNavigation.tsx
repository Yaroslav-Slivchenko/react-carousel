import style from'./Carousel.module.scss'
import type {FC} from "react";

import arrow from '../assets/arrowUp.png'

interface CarouselNavigationProps {
  prevSlide: () => void
  nextSlide: () => void
  enable: boolean,
}

export const CarouselNavigation: FC<CarouselNavigationProps> = ({prevSlide, nextSlide, enable}) => {

  return (
    <div className={style.carousel__navigation} style={{display: `${enable ? undefined : 'none'}`}}>
      <button className={style.carousel__navigationPrev} onClick={prevSlide}><img src={arrow} alt=""/></button>
      <button className={style.carousel__navigationNext} onClick={nextSlide}><img src={arrow} alt=""/></button>
    </div>
  )

}

