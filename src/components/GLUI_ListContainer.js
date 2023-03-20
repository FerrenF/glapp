
import GLUI_ContentContainer from './GLUI_ContentContainer';
import GLUI_ImgButton from "./GLUI_ImgButton";

export default function GLUI_ListContainer(props){

    const topHalf = () => {
        return (<div>
            <GLUI_ImgButton image={require("../assets/icon.png")}></GLUI_ImgButton>
            <p>What're ya sellin?!</p></div>);
    }
    const bottomHalf = () => {
        return (<p>What're ya buyin?!</p>);
    }
    return(
      <GLUI_ContentContainer top={topHalf()} bottom={bottomHalf()}/>
    );
}