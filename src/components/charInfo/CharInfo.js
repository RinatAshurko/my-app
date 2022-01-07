import { Component } from 'react';

import './charInfo.scss';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';

import thor from '../../resources/img/thor.jpeg';

class CharInfo extends Component  {
    constructor(props) {
        super(props);
    }

    state= {
        charList: null,
        error: false,
        loading: false
    }

    MarvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }
    
    updateChar() {
        const {charId} = this.props;

        if (!charId) {
            return;
        }

        this.onCharLoaded();

        this.MarvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoaded = (char) => {
        this.setState({char,loading: false});
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }


    onError = () => {
        this.setState({loading: false, error: true});
    }


    render() {

        const {char, loading, error} = this.state;
        

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
                        <li key ={i} className="char__comics-item" available={available}>
                            {item.name}
                        </li>
                        )
                    })
                }
            </ul>
    </>
    )
}

export default CharInfo;