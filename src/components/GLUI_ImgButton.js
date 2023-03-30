import Image from 'react-bootstrap/Image';


export default function GLUI_ImgButton({image, onClick}){
    return (
      <Image fluid={true} className="rounded GLUI_ImgButton " src={image} alt="Description" onClick={onClick}></Image>
    );
}