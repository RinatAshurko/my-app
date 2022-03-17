import {useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBounder from '../errorBounder/ErrorBounder';
import CharFinder from "../charFinder/CharFinder";
import {Helmet} from "react-helmet";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedChar, setSelectedChar] = useState(null);


    const onCharSelected = (id) => {
        setSelectedChar(id);
    }

    return(
        <>
            <Helmet>
                <meta
                    name='description'
                    content='Characters Page'
                />
                <title>
                    {'Characters Page'}
                </title>
            </Helmet>
            <ErrorBounder> 
                <RandomChar/>
            </ErrorBounder> 
            <div className="char__content">
                <ErrorBounder> 
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBounder>
                <div>
                <ErrorBounder>
                    <CharInfo charId={selectedChar}/>
                </ErrorBounder>  
                <ErrorBounder>
                    <CharFinder/>
                </ErrorBounder>
                </div>

            </div>  
                <img className="bg-decoration" src={decoration} alt="vision"/> 
        </>

        
    )
}

export default MainPage;