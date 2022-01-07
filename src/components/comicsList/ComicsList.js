import {useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import useMarvelService from "../../services/MarvelService";
import './comicsList.scss';
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spiner";

const ComicsList = () => {
	const [comicsList, setComicsList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(0);
	const [comicsEnded, setComicsEnded] = useState(false);

	const {loading, error, getAllComics} = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
	}, [])

	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true)
		getAllComics(offset)
			.then(onComicsListLoaded)
	}

	const onComicsListLoaded = (newComicsList) => {
		let ended = false
		if (newComicsList.length < 5) {
			ended = true;
		}
		setComicsList( comicsList => [...comicsList, ...newComicsList])
		setNewItemLoading(false)
		setOffset(offset => offset + 8)
		setComicsEnded(comicsEnded => ended)
	}

	const items = comicsList.map((comics, i) => {

		return (
			<li className="comics__item" key={i}>
				<Link to={`/comics/${comics.id}`} >
					<img src={comics.thumbnail} alt="ultimate war" className="comics__item-img"/>
					<div className="comics__item-name">{comics.title}</div>
					<div className="comics__item-price">{comics.price}</div>
				</Link>
			</li>
		)
	})
	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading && !newItemLoading ? <Spinner/> : null;


	return (
		<div className="comics__list">
			<ul className="comics__grid">
				{errorMessage}
				{spinner}
				{items}
			</ul>
			<button className="button button__main button__long"
			        disabled={newItemLoading}
			        style={{'display': comicsEnded ? 'none' : 'block'}}
			        onClick={() => onRequest(offset)}>
				<div className="inner">load more</div>
			</button>
		</div>
	)
}

export default ComicsList;