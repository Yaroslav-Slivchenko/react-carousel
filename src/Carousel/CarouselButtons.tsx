import './Carousel.module.scss'
import type {FC} from "react";
import style from "./Carousel.module.scss";

interface CarouselButtonsProps {
  prevSlide: () => void
  nextSlide: () => void
}

export const CarouselButtons: FC<CarouselButtonsProps> = ({prevSlide, nextSlide}) => {

  return (
    <div className={style.buttonControl}>
      <button className={style.button} onClick={prevSlide}>Prev</button>
      <button className={style.button} onClick={nextSlide}>Next</button>
    </div>
  )

}

