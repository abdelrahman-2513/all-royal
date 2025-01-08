import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const MyGallery = ({ urls }: any) => {
  const dummyImageUrl =
    "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  const images =
    urls.length > 0
      ? urls.map((url: string) => ({
          original: url,
          thumbnail: url,
        }))
      : [
          {
            original: dummyImageUrl,
            thumbnail: dummyImageUrl,
          },
        ];

  return <ImageGallery lazyLoad={true} items={images} />;
};

export default MyGallery;
