import {useRef, useState, useEffect} from "react";
import './charList.scss';
import useMarvelService from "../../services/MarvelService";
import Spinner from '../spinner/Spiner'
import ErrorMessage from "../errorMessage/ErrorMessage";
import PropTypes from 'prop-types'

const CharList = (props) => {
	const [charList, setCharList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [charEnded, setCharEnded] = useState(false);
	const {loading, error, getAllCharacters } = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
	}, [])


	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true)
		getAllCharacters(offset)
			.then(onCharListLoaded)
	}

	const onCharListLoaded = (newCharList) => {
		let ended = false
		if (newCharList.length < 9) {
			ended = true;
		}
		setCharList(charList => [...charList, ...newCharList])
		setNewItemLoading(false)
		setOffset(offset => offset + 9)
		setCharEnded(charEnded => ended)
	}

	const itemRefs = useRef([]);

	const focusOnItem = (id) => {
		itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
		itemRefs.current[id].classList.add('char__item_selected');
		itemRefs.current[id].focus();
	}

	const items = charList.map((char, i) => {
		return (
			<li className="char__item"
			    key={char.id}
			    ref={el => itemRefs.current[i] = el}
			    onClick={() => {
				    props.onCharSelected(char.id);
				    focusOnItem(i)
			    }}>
				{char.thumbnail.includes('image_not_available') ?
					<img src={char.thumbnail} alt="abyss" style={{objectFit: 'contain'}}/>
					:
					<img src={char.thumbnail} alt="abyss"/>
				}
				<div className="char__name">{char.name}</div>
			</li>
		)
	})
	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading && !newItemLoading ? <Spinner/> : null;

	return (
		<div className="char__list">
			<ul className="char__grid">
				{errorMessage}
				{spinner}
				{items}
			</ul>
			<button
				className="button button__main button__long"
				disabled={newItemLoading}
				style={{'display': charEnded ? 'none' : 'block'}}
				onClick={() => onRequest(offset)}
			>
				<div className="inner">load more</div>
			</button>
		</div>
	)
}

CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired
}

export default CharList;