import {useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBounder from '../errorBounder/ErrorBounder';

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedChar, setSelectedChar] = useState(null);


    const onCharSelected = (id) => {
        setSelectedChar(id);
    }

    return(
        <>
            <ErrorBounder> 
                <RandomChar/>
            </ErrorBounder> 
            <div className="char__content">
                <ErrorBounder> 
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBounder>

                <ErrorBounder>
                    <CharInfo charId={selectedChar}/>
                </ErrorBounder>  
            </div>  
                <img className="bg-decoration" src={decoration} alt="vision"/> 
        </>
    )
}

export default MainPage;