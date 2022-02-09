import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './charInfo.scss';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';


const CharInfo = (props) => {


    const [char, setCharList] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();


    useEffect(() => {
        updateChar();
    }, [props.charId]);
    
    const updateChar = () => {
        const {charId} = props;

        if (!charId) {
            return;
        }
        clearError();

        onCharLoaded();

        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setCharList(char);
    }

    useEffect(() =>  {
        updateChar();
    }, []);

     

        const skeleton = loading || error || char ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(error || loading || !char) ? <View char={char}/>: null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }

const View = ({char}) => {
    const {name, descr, thumbnail, wiki, homepage, comics, available} = char;

    const text = 'This hero doesnt have a some comics abnout him';

    let imgStyle = {'objectFit': 'cover'};

    if (thumbnail == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit': 'contain'};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {descr}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null: 'Cant found some comics with this persone...'}
                {
                    comics.map((item, i) => {
                        if (i > 10) return;
                        return (
                            <li  key ={i} className="char__comics-item" available={available} >
                                <Link to={`/characters/${char.id}/comics`}>
                                    {item.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
    </>
    )
}

export default CharInfo;