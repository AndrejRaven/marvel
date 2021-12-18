import {Component} from "react";
import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import MarvelService from "../../services/MarvelService";
import Spinner from '../spinner/Spiner'
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
    state = {
        characters: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.getCharacters();
    }
    onCharactersLoaded = (characters) => {
        this.setState({characters, loading: false})
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    getCharacters = () => {
        this.marvelService
          .getAllCharacters()
          .then(this.onCharactersLoaded)
          .catch(this.onError)
    }


    render() {
        const {characters, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? characters.map((char) => {
            return <View char={char} />;
        }) : null;
        return (
          <div className="char__list">
              <ul className="char__grid">
                        {errorMessage}
                        {spinner}
                        {content}

                  {/*<li className="char__item">*/}
                  {/*    <img src={abyss} alt="abyss"/>*/}
                  {/*    <div className="char__name">Abyss</div>*/}
                  {/*</li>*/}
                  {/*<li className="char__item char__item_selected">*/}
                  {/*    <img src={abyss} alt="abyss"/>*/}
                  {/*    <div className="char__name">Abyss</div>*/}
                  {/*</li>*/}
                  {/*<li className="char__item">*/}
                  {/*    <img src={abyss} alt="abyss"/>*/}
                  {/*    <div className="char__name">Abyss</div>*/}
                  {/*</li>*/}
                  {/*<li className="char__item">*/}
                  {/*    <img src={abyss} alt="abyss"/>*/}
                  {/*    <div className="char__name">Abyss</div>*/}
                  {/*</li>*/}
                  {/*<li className="char__item">*/}
                  {/*    <img src={abyss} alt="abyss"/>*/}
                  {/*    <div className="char__name">Abyss</div>*/}
                  {/*</li>*/}
                  {/*<li className="char__item">*/}
                  {/*    <img src={abyss} alt="abyss"/>*/}
                  {/*    <div className="char__name">Abyss</div>*/}
                  {/*</li>*/}
                  {/*<li className="char__item">*/}
                  {/*    <img src={abyss} alt="abyss"/>*/}
                  {/*    <div className="char__name">Abyss</div>*/}
                  {/*</li>*/}
                  {/*<li className="char__item">*/}
                  {/*    <img src={abyss} alt="abyss"/>*/}
                  {/*    <div className="char__name">Abyss</div>*/}
                  {/*</li>*/}
                  {/*<li className="char__item">*/}
                  {/*    <img src={abyss} alt="abyss"/>*/}
                  {/*    <div className="char__name">Abyss</div>*/}
                  {/*</li>*/}
              </ul>
              <button className="button button__main button__long">
                  <div className="inner">load more</div>
              </button>
          </div>
        )
    }
}

const View = ({char}) => {
    return (
      <li key={char.name} className="char__item">
          { char.thumbnail.includes('image_not_available')?
            <img src={char.thumbnail} alt="abyss" style={{ objectFit: 'contain' }}/>
            :
            <img src={char.thumbnail} alt="abyss"/>
          }
          <div className="char__name">{char.name}</div>
      </li>
    )
}


export default CharList;