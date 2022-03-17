import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import './marvelComics.scss';

const setContent = (process, Component, newItemLoading) => {
    switch(process){
        case 'waiting':
            return <Spinner/>
        break;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>
        break;
        case 'error':
            return <ErrorMessage/>
        break;
        case 'confirmed':
            return <Component />
        break;
        default: 
            throw new Error('Unexpected process state')
    }
}

const Comics =  () => {

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);




    const { getAllComics, setProcess, process} = useMarvelService();

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onComicsListLoaded = (newItemLoad) => {
        const  isEnded = newItemLoad.length < 8;

        setComicsList(comicsList => [...comicsList, ...newItemLoad]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(isEnded);
    }


    useEffect(() => {
        onRequest(offset, true);
    }, []);



    function renderComic(arr) {
        const items = arr.map((item, i) => {
            return(
                <li
                className="comics__item"
                key={i}
                >
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>  
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }


    return (
        <div 
        className="comics__list"
        >
            {setContent(process, () => renderComic(comicsList), newItemLoading)}
            <button className="button button__main button__long"
            onClick={() => {onRequest(offset)}} 
            style={{'display': comicsEnded ? 'none': 'block'}}
            disabled={newItemLoading}
            >
                <div className='inner'>load more</div>
            </button>
        </div>
    ) 



}

export default Comics;


