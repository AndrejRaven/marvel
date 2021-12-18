import {Component} from "react";
import './charList.scss';
import MarvelService from "../../services/MarvelService";
import Spinner from '../spinner/Spiner'
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
	state = {
		charList: [],
		loading: true,
		error: false,
		newItemLoading: false,
		offset: 210,
		charEnded: false
	}

	marvelService = new MarvelService();

	componentDidMount() {
		this.onRequest();
	}

	onRequest = (offset) => {
		this.onCharListLoading();
		this.marvelService
			.getAllCharacters(offset)
			.then(this.onCharListLoaded)
			.catch(this.onError)
	}

	onCharListLoaded = (newCharList) => {
		let ended = false
		if(newCharList.length < 9) {
			ended = true;
		}

		this.setState(({charList, offset}) => ({
			charList: [...charList, ...newCharList],
			loading: false,
			newItemLoading: false,
			offset: offset + 9,
			charEnded: ended
		}))
	}


	onCharListLoading = () => {
		this.setState({
			newItemLoading: true
		})
	}

	onError = () => {
		this.setState({
			loading: false,
			error: true
		})
	}


	render() {
		const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;
		const errorMessage = error ? <ErrorMessage/> : null;
		const spinner = loading ? <Spinner/> : null;
		const content = !(loading || error) ? charList.map((char) => {
			return (
				<li className="char__item" key={char.id} onClick={() => this.props.onCharSelected(char.id)}>
					{char.thumbnail.includes('image_not_available') ?
						<img src={char.thumbnail} alt="abyss" style={{objectFit: 'contain'}}/>
						:
						<img src={char.thumbnail} alt="abyss"/>
					}
					<div className="char__name">{char.name}</div>
				</li>
			)
		}) : null;
		return (
			<div className="char__list">
				<ul className="char__grid">
					{errorMessage}
					{spinner}
					{content}
				</ul>
				<button
					className="button button__main button__long"
					disabled={newItemLoading}
					style={{'display': charEnded? 'none' : 'block'}}
					onClick={() => this.onRequest(offset)}
				>
					<div className="inner">load more</div>
				</button>
			</div>
		)
	}
}


export default CharList;