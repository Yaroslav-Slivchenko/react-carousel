import style from './Carousel.module.scss'
import type {FC} from "react";

interface CarouselPaginationProps {
  totalPerSlides: number,
  index: number,
  setIndex: (index: number) => void,
  enable: boolean,
}

export const CarouselPagination: FC<CarouselPaginationProps> = ({totalPerSlides, setIndex, index, enable}) => {

  return (
    <div className={style.carousel__pagination} style={{display: `${enable ? undefined : 'none'}`}}>
      {Array.from({length: totalPerSlides + 1}).map((_, i) => (
        <div key={`dot-${i}`} onClick={() => setIndex(i)} className={[style.carousel__paginationDot, `${index == i ? style.carousel__paginationDotCurrent : ''}`].join(' ')}></div>
      ))}
    </div>
  )

}

