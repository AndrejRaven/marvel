import { useParams, Link } from 'react-router-dom';
import {useState, useEffect} from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from '../spinner/Spiner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import './singleItemPage.scss';

const SingleItemPage = ({ getItem, linkToMain }) => {
  const { id } =  useParams();
  const [ item, setItem ] = useState(null);
  const { loading, error, clearError } = useMarvelService();


  useEffect(() => {
    updateItem()
  }, [id]);

  const updateItem = () => {
    clearError();
    getItem(id)
    .then(onItemLoaded)
  }

  const onItemLoaded = (item) => {
    setItem(item)
  }

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !item) ? <View item={item} linkToMain={linkToMain} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}

const View = ({ item, linkToMain }) => {
  const { title, description, pageCount, thumbnail, language, price } = item;
  return (
    <div className="single-item">
      <img src={thumbnail} alt={title} className="single-item__img" />
      <div className="single-item__info">
        <h2 className="single-item__name">{title}</h2>
        <p className="single-item__descr">{description}</p>
        {item.pageCount ? <p className="single-item__descr">{pageCount}</p> : null}
        {item.language ? <p className="single-item__descr">Language: {language}</p> : null}
        {item.price ? <div className="single-item__price">{price}</div> : null} 
      </div>
      <Link to={linkToMain} className="single-item__back">Back to all</Link>
    </div>
  )
}

export default SingleItemPage;