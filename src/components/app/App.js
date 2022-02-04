import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";



import ComicsPage from "../pages/ComicsPage";
import MainPage from "../pages/MainPage";
import ErrorPage from "../pages/ErrorPage";
import SingleComicPage from "../pages/SingleComicPage";

const App = () => {
        return (
            <Router>
                    <div className="app">
                        <AppHeader/>
                        <main>
                            <Routes>
                                <Route path='/comics' element={<ComicsPage/>}/> 
                                <Route path='/' element={<MainPage/>}/> 
                                <Route path='*' element={<ErrorPage/>}/>
                                <Route path='/comics/:comicId' element={<SingleComicPage/>}></Route>
                            </Routes>
                        </main>
                    </div>
            </Router>
        )
    }

export default App;