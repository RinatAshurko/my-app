import { useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import setContent from '../utils/setContent';
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {getComic, getCharacter, clearError, setProcess, process} = useMarvelService();

    useEffect(() => {
        updateComic()
    }, [id])

    const updateComic = () => {
        clearError();

        switch(dataType) {
            case 'comic': 
                getComic(id).then(onLoaded).then(() => setProcess('confirmed'));
            break;
            case 'character':
                getCharacter(id).then(onLoaded).then(() => setProcess('confirmed'));
       
    }
}

    const onLoaded = (data) => {
        setData(data);
    }


    return (
        <>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>
    )
}

export default SinglePage;