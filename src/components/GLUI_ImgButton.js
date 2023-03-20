import Image from 'react-bootstrap/Image';


export default function GLUI_ImgButton({image, onClick, onOver}){
    return (
      <Image className="rounded float-left" src={image} alt="Description" height="auto" fluid={true} rounded></Image>
    );
}