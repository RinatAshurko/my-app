import './charList.scss';

import { useState, useEffect, useRef } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import React from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

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

const CharList  = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(1538);
    const [charEnded, setCharEnded] = useState(false);



    const {getAllCharacters, process, setProcess} = useMarvelService();

    const itemsRef = useRef([]);


    const onFocusItems = (id) => {
        itemsRef.current.forEach(item => item.classList.remove('char__item_selected'));
        itemsRef.current[id].classList.add('char__item_selected');
    }

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'));
    }


    const onCharListLoaded = (newCharList) => {
        let ended = false;

        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }


    function renderItems(arr) {
        const items = arr.map((item,i) => {
            let imgStyle = {'objectFit': 'cover'};
            if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'};
            }
            return (
                <CSSTransition 
                classNames='char__item'
                timeout={500}
                >
                    <li 
                            className="char__item" 
                            key={item.id}
                            ref={el => itemsRef.current[i] = el}
                            onClick={() =>  {
                                props.onCharSelected(item.id);
                                onFocusItems(i);
                            }
                            }
                            onKeyPress={(e) => {
                                if(e.key === ' ' || e.key === 'Enter'){
                                    props.onCharSelected(item.id);
                                    onFocusItems(i);
                            }}
                        }
                        >
                            
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
        )         
         
        });

        return (
            <>
                    <ul className='char__grid'>
                        <TransitionGroup component={null}>
                            {items}
                        </TransitionGroup>
                    </ul>
            </>

        )
    }


            return (
                <div className="char__list">
                    {setContent(process, () => renderItems(charList), newItemLoading)}
                <button className="button button__main button__long"
                        disabled={newItemLoading}
                        onClick={() => onRequest(offset)} style={{'display': charEnded ? 'none':'block'}}>
                        <div className='inner'>load more</div>
                </button>
                </div>
            )
    }

export default CharList;