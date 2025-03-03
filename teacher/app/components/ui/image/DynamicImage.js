import dynamic from "next/dynamic";

const getImageComponent = (image) => {
  if (!image) return null;
  return dynamic(() => import(`@/public/assets/images/${image}.svg`).then((mod) => mod.default));
};

export const DynamicImage = ({ image }) => {
  const ImageComponent = getImageComponent(image);
  if (!ImageComponent) return null;
  return <ImageComponent />;
};

export default DynamicImage;