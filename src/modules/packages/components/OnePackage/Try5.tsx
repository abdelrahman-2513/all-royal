import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const MyGallery = () => {
  return (
    <Carousel>
      <div>
        <img src="https://picsum.photos/id/1018/1000/600/" alt="Image 1" />
        <p className="legend">Image 1</p>
      </div>
      <div>
        <img src="https://picsum.photos/id/1015/1000/600/" alt="Image 2" />
        <p className="legend">Image 2</p>
      </div>
      <div>
        <img src="https://picsum.photos/id/1019/1000/600/" alt="Image 3" />
        <p className="legend">Image 3</p>
      </div>
    </Carousel>
  );
};

export default MyGallery;