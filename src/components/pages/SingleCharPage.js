import { useParams, Link } from 'react-router-dom';
import {useState, useEffect} from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from '../spinner/Spiner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import './singleItemPage.scss';

const SingleCharPage = () => {
  const { charId } = useParams();
  const [ char, setChar ] = useState(null);
  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar()
  }, [charId]);

  const updateChar = () => {
    clearError();
    getCharacter(charId)
    .then(onCharLoaded)
  }

  const onCharLoaded = (char) => {
    setChar(char)
  }

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}

const View = ({ char }) => {
  console.log(char);
  const { id, description, name, thumbnail } = char;
  return (
    <div className="single-item">
      <img src={thumbnail} alt={name} className="single-item__img" />
      <div className="single-item__info">
        <h2 className="single-item__name">{name}</h2>
        <p className="single-item__descr">{description}</p>
      </div>
      <Link to="/" className="single-item__back">Back to all</Link>
    </div>
  )
}

export default SingleCharPage;