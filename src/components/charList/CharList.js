import './charList.scss';

import { Component } from 'react';
import React from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

class CharList extends Component {

    constructor(props) {
        super(props);
    }

    state= {
        charList: [],
        error: false,
        loading: true,
        newItemLoading: false,
        offset: 1538,
        charEnded: false
    }
    MarvelService = new MarvelService();

    chartItems = [];

    setRef = (ref) => {
        this.chartItems.push(ref);
    }

    onFocusItems(id){
        this.chartItems.forEach(item => item.classList.remove('char__item_selected'));
        this.chartItems[id].classList.add('char__item_selected');
    }




    onError = () => {
        this.setState({
            error: true,
            loading:false
        })
    }

    componentDidMount() {
        this.onRequest();
    }

    onRequest(offset) {
        this.onCharListLoading();
        this.MarvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = (i) => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;

        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }




    renderItems(arr) {
        const items = arr.map((item,i) => {
            let imgStyle = {'objectFit': 'cover'};
            if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'};
            }
            return (
                <li 
                    className="char__item" 
                    key={item.id}
                    ref={this.setRef}
                    onClick={() =>  {
                        this.props.onCharSelected(item.id);
                        this.onFocusItems(i);
                    }
                    }
                    onKeyPress={(e) => {
                        if(e.key === ' ' || e.key === 'Enter'){
                            this.props.onCharSelected(item.id);
                            this.onFocusItems(i);
                    }}
                }
                >
                    
                <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                <div className="char__name">{item.name}</div>
            </li>
            )          
        });

        return (
            <>
                <ul className='char__grid'>
                    {items}
                </ul>
            </>

        )
    }

    render() {
        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;

        const items = this.renderItems(charList);


        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const view = !(loading || error) ? items : null;
        return (
            <div className="char__list">
               {errorMessage}
               {spinner}
               {view}
               <button className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)} style={{'display': charEnded ? 'none':'block'}}>
                    <div className='inner'>load more</div>
               </button>
            </div>
        )
    }
}

export default CharList;