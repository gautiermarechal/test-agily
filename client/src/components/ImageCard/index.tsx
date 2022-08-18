import "./index.scss";

interface ImageCardProps {
  url: string;
}

function ImageCard(props: ImageCardProps): JSX.Element {
  const { url } = props;
  return <img className="main" alt="City" src={url} />;
}

export default ImageCard;
