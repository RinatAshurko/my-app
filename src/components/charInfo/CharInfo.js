import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './charInfo.scss';

import useMarvelService from '../../services/MarvelService';
import setContent from '../utils/setContent';


const CharInfo = (props) => {

    const [char, setCharList] = useState(null);

    const {getCharacter, clearError, setProcess, process} = useMarvelService();


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
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setCharList(char);
    }

    useEffect(() =>  {
        updateChar();
    }, []);

     

        return (
            <div className="char__info">
                {setContent(process,View, char)}
            </div>
        )
    }

const View = ({data}) => {
    const {name, descr, thumbnail, wiki, homepage, comics, available} = data;

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
                            <li  src={item.id} key ={i} className="char__comics-item" available={available} >
                                <Link to={`/characters/${data.id}/comics`}>
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