import Helmet from "react-helmet";

import Comics from "../marvelComics/marvelComics";
import AppBanner from "../appBanner/AppBanner";


const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name='description'
                    content='Comics Page'
                />
                <title>
                    {'Comics Page'}
                </title>
            </Helmet>
            <AppBanner/>
            <Comics/> 
        </>

    )
}

export default ComicsPage;