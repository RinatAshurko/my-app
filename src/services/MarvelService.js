import { useHttp } from "../hooks/http.hooks";

const  useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase ='https://gateway.marvel.com:443/v1/public/';
    const _apiKey ='apikey=1b9815d5f8f6c4baeeb8507b0c1e2597';
    const _baseOffset = 210;


    const getAllCharacters = async (offset = _baseOffset) => {
       const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`); 
       return res.data.results.map(_transformCharacter);
    }    
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getComicsChars = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            descr: char.description ? `${char.description.slice(0, 210)}...` : `We dont have a more info about ${char.name}`, 
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
            available: char.comics.available
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }
    
    return{loading, error, getAllCharacters, getCharacter, clearError, getComicsChars}
}

export default useMarvelService;