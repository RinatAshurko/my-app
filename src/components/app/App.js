import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBounder from '../errorBounder/ErrorBounder';

import decoration from '../../resources/img/vision.png';

class App extends Component {
    
    state = {
        selectedChar: null
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBounder> 
                        <RandomChar/>
                    </ErrorBounder> 
                    <div className="char__content">
                       <ErrorBounder> 
                           <CharList onCharSelected={this.onCharSelected}/>
                       </ErrorBounder>
                        
                        <ErrorBounder>
                            <CharInfo charId={this.state.selectedChar}/>
                        </ErrorBounder>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;