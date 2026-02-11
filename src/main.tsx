import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Carousel } from "./Carousel/Carousel.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Carousel slidesPerView={3} gap={10} rows={3} navigation pagination>
      <div style={{backgroundColor: 'red', height: 300}}></div>
      <div style={{backgroundColor: 'green', height: 300}}></div>
      <div style={{backgroundColor: 'blue', height: 300}}></div>
      <div style={{backgroundColor: 'red', height: 300}}></div>
      <div style={{backgroundColor: 'green', height: 300}}></div>
      <div style={{backgroundColor: 'blue', height: 300}}></div>
      <div style={{backgroundColor: 'red', height: 300}}></div>
      <div style={{backgroundColor: 'green', height: 300}}></div>
      <div style={{backgroundColor: 'blue', height: 300}}></div>
    </Carousel>
  </StrictMode>,
)
