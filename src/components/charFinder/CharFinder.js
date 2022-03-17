import {Link} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useState} from 'react';

import useMarvelService from '../../services/MarvelService'; 
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charFinder.scss';

const CharFinder = () => {

  const [char, setChar] = useState(null);
  const {clearError, getCharacterByName, process, setProcess} = useMarvelService();
  
  const charLoaded = (char) => {
    setChar(char);
  }

  const charUpdate = (name) => {
    clearError();

      getCharacterByName(name)
        .then(charLoaded)
        .then(() => setProcess('confirmed'));
 }

 const errorMessage =  process === 'error' ? <div className='char__search-critical-error'> <ErrorMessage/> </div> : null;
 const results = !char ? null : char.length > 0 ? 
        <div className='char__search-wrapper'>
          <div className='char__search-success'>There is! Visit {char[0].name} page?</div>
            <Link to={`/characters/${char[0].id}`} className='button button__secondary'>
              <div className='inner'>To page</div>
            </Link>  
        </div> : 
        <div className='char__search-error'>
          The character not find! Check the name and try again
        </div>

  return (
    <div className='char__search-form'>
      <Formik
        initialValues={{
          charName: ''
        }}
        validationSchema={Yup.object({
          charName: Yup.string().required('This field is required')
        })}
        onSubmit={({charName}) => {
          charUpdate(charName);
        }}
      >
        <Form>
          <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
          <div className="char__search-wrapper">
              <Field 
                  id="charName" 
                  name='charName' 
                  type='text' 
                  placeholder="Enter name"/>
              <button 
                  type='submit' 
                  className="button button__main"
                  disabled={process === 'loading'}>
                  <div className="inner">find</div>
              </button>
          </div>
          <FormikErrorMessage component="div" className="char__search-error" name="charName" />
      </Form>
      </Formik>
      {results}
      {errorMessage}
    </div>
  )
}
export default CharFinder;
