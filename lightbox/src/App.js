import { useState } from 'react';
import './App.css';
import Modal from './Modal';

const images = [
  {
    image_url:
      "https://img.freepik.com/free-photo/young-female-jacket-shorts-presenting-comparing-something-looking-confident-front-view_176474-37521.jpg?w=1800&t=st=1693037944~exp=1693038544~hmac=97e967909706f9b73b4b47d521acf54806f4b9b3efab6196bc8a69f07efff554",
    caption: "Image 1"
  },
  {
    image_url:
      "https://img.freepik.com/free-photo/girl-grey-shirt-showing-something-her-hand_144627-51099.jpg?t=st=1693037931~exp=1693038531~hmac=63713e5a5cf2d23f53ca82b9996ad224ac6e92d0275a53b6debbe6523d7df020",
    caption: "Image 2"
  },
  {
    image_url:
      "https://img.freepik.com/free-photo/young-lady-shirt-jacket-making-scales-gesture-looking-cheerful-front-view_176474-85195.jpg?t=st=1693037931~exp=1693038531~hmac=2f83b6689538e4056912c96f448163e9ef10998f48f671b7e50279f81611fbe6",
    caption: "Image 3"
  },
  {
    image_url:
      "https://img.freepik.com/free-photo/girl-wide-opening-hands-giving-explanation-high-quality-photo_144627-60466.jpg?w=1800&t=st=1693038021~exp=1693038621~hmac=d4520cd86b2aea3e5dda765ede05bb53d70e18a574756d0f41a6806fe325d26d",
    caption: "Image 4"
  },
  {
    image_url:
      "https://img.freepik.com/free-photo/young-lady-shirt-jacket-making-scales-gesture-looking-cheerful-front-view_176474-85195.jpg?t=st=1693037931~exp=1693038531~hmac=2f83b6689538e4056912c96f448163e9ef10998f48f671b7e50279f81611fbe6",
    caption: "Image 5"
  },
  {
    image_url:
      "https://img.freepik.com/free-photo/girl-wide-opening-hands-giving-explanation-high-quality-photo_144627-60466.jpg?w=1800&t=st=1693038021~exp=1693038621~hmac=d4520cd86b2aea3e5dda765ede05bb53d70e18a574756d0f41a6806fe325d26d",
    caption: "Image 6"
  }
];
function App() {
  const [active,setActive] = useState(0);
  const [show, setShow] = useState(false);
  
  
const handleClick = (i)=>{
  setActive(i);
  setShow(true);
}

const onModalClose = ()=>{
  setShow(false);
}

const handleNext = ()=>{
if(active<images.length-1) setActive(active+1);
}
const handlePrev = ()=>{
if(active>0) setActive(active-1);
}

  return (
    <div className="App">
      <div className='image-listing'>
        {images.map((e,i)=>{
         return (<div key={e.caption} className={`${i===active?"active":""}`} onClick={()=>handleClick(i)}>
            <img alt={e.caption} src={e.image_url} />
          </div>);
        })}
      </div>
      <Modal title="Lightbox" show={show} onClose={onModalClose}>
        <ImageSlider active={active} onNext={handleNext} onPrev={handlePrev}/>
      </Modal>
      </div>
  );
}

export default App;

const ImageSlider = ({active,onNext,onPrev})=>{
  return <div className='image-slider-wrapper'>
    <div className='image-slides'>
      {images.map((e,i)=>{
        return <Slides {...e} key={e.caption} active={i===active} />
      })}
    </div>
    <div className='image-slider-nagivation'>
      <span className='image-navigation next' onClick={onNext}>&gt;</span>
      <span className='image-navigation prev' onClick={onPrev}>&lt;</span>
    </div>
  </div>
}

const Slides = ({image_url,caption,active})=>{
  return (
    <div className='image-slide'>
      <img src={image_url} alt={caption} className={active?"active":""} />
    </div>
  )
}
