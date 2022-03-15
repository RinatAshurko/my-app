import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {lazy, Suspense} from 'react'

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";


const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const ComicPage = lazy(() => import("../pages/SinglePages/Comic"));
const ListPage = lazy(() => import("../pages/ListPage"));
const SinglePage = lazy(() => import("../pages/SinglePage"));
const CharacterPage = lazy(() => import("../pages/SinglePages/Character"));

const App = () => {
        return (
            <Router>
                    <div className="app">
                        <AppHeader/>
                        <main>
                        <Suspense fallback={<Spinner/>}>
                            <Routes>
                                <Route exact path='/' element={<MainPage/>}/> 
                                <Route exact path ='/characters/:comicId/comics' element={<ListPage/>}/>
                                <Route exact path='*' element={<ErrorPage/>}/>
                                <Route exact path='/comics' element={<ComicsPage/>}/> 
                                <Route exact path='/comics/:id' element={<SinglePage Component={ComicPage} dataType='comic'/>}/>
                                <Route exact path='/characters/:id' element={<SinglePage Component={CharacterPage} dataType='character'/>}/>
                            </Routes>
                        </Suspense>
                        </main>
                    </div>
            </Router>
        )
    }

export default App;