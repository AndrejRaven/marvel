import { useParams, Link } from 'react-router-dom';
import {useState, useEffect} from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from '../spinner/Spiner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import './singleComicPage.scss';

const SingleComicPage = () => {
  const { comicId } = useParams();
  const [ comic, setComic ] = useState(null);
  const { loading, error, getComic, clearError } = useMarvelService();

  useEffect(() => {
    updateComic()
  }, [comicId]);

  const updateComic = () => {
    clearError();
    getComic(comicId)
    .then(onComicLoaded)
  }

  const onComicLoaded = (comic) => {
    setComic(comic)
  }

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}

const View = ({ comic }) => {
  const { title, description, pageCount, thumbnail, language, price } = comic;
  return (
    <div className="single-item">
      <img src={thumbnail} alt={title} className="single-item__img" />
      <div className="single-item__info">
        <h2 className="single-item__name">{title}</h2>
        <p className="single-item__descr">{description}</p>
        <p className="single-item__descr">{pageCount}</p>
        <p className="single-item__descr">Language: {language}</p>
        <div className="single-item__price">{price}</div>
      </div>
      <Link to="/comics" className="single-item__back">Back to all</Link>
    </div>
  )
}

export default SingleComicPage;