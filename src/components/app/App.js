import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";



import ComicsPage from "../pages/ComicsPage";
import MainPage from "../pages/MainPage";
import ErrorPage from "../pages/ErrorPage";

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
                            </Routes>
                        </main>
                    </div>
            </Router>
        )
    }

export default App;