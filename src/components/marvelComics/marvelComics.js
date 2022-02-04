import { useEffect, useState } from "react";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import './marvelComics.scss';

const Comics =  () => {

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);




    const {loading, error, getComicsChars} = useMarvelService();

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getComicsChars(offset)
            .then(onComicsListLoaded);
    }

    const onComicsListLoaded = (newItemLoad) => {
        let ended = false;

        if (newItemLoad.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newItemLoad]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }


    useEffect(() => {
        onRequest(offset, true);
    }, []);



    function renderChar(arr) {
        const items = arr.map((item, i) => {
            return(
                <>
                <li
                className="comics__item"
                key={i}
                >
                    <a href="#">
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
                </>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderChar(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div 
        className="comics__list"
        >
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
            onClick={() => {onRequest(offset)}} style={{'display': comicsEnded ? 'none': 'block'}}
            >
                <div className='inner'>load more</div>
            </button>
        </div>
    ) 



}

export default Comics;

