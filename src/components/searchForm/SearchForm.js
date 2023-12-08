import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from 'yup';
import useMarvelService from "../../services/MarvelService";
import "./SearchForm.scss"

const SearchForm = () => {
  const [char, setChar] = useState('');
  const { getCharacterByName } = useMarvelService();


  const onRequest = name => {
    getCharacterByName(name).then(onCharLoaded)
  }

  const onCharLoaded = (char) => {
    if (char !== 0) {
      setChar(char)
    } else if (char === 0) {
      setChar(0)
    } else {
      setChar(null)
    }
  }

  return (
    <Formik
      initialValues={{
        text: ''
      }}
      validationSchema={Yup.object({
        text: Yup.string()
          .min(2, "Min 2 symbols")
          .required("Required field"),
      })}
      onSubmit={values => onRequest(values.text)}
    >
      <div className="search-form">
        <div className="search-form-name">Or find a character by name:</div>
        <Form className="form">
          <div className="search-form-input">
            <Field id="text" name="text" type="text" onFocus={() => setChar('')} />
            <ErrorMessage className='search-form-message' name="text" component="div" />
            {char ?
              <div className='search-form-message green'>There is! Visit {char.name} page?</div> : null}
          </div>
          <div className="search-form__btns">
            <button type="submit" className="button button__main">
              <div className="inner">find</div>
            </button>
            {char ?
              <Link to={`/characters/${char.id}`} className="button button__secondary">
                <div className="inner">to page</div>
              </Link> : null}
          </div>
        </Form>
        {char === 0 ?
          <div className='search-form-message'>The character was not found. Check the name and try again</div> : null}
      </div>
    </Formik>
  )
}

export default SearchForm;