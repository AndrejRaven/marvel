import {useState} from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from '../comicsList/ComicsList'
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBanner from '../appBanner/AppBanner';


const App = () => {

	return (
		<Router>
			<div className="app">
				<AppHeader/>
				<main>
					<Switch>
						<Route exact path={"/"}>
							<ErrorBoundary>
								<RandomChar/>
							</ErrorBoundary>
							<div className="char__content">
								<ErrorBoundary>
									<CharList onCharSelected={onCharSelected}/>
								</ErrorBoundary>
								<ErrorBoundary>
									<CharInfo charId={selectedChar}/>
								</ErrorBoundary>
							</div>
							<img className="bg-decoration" src={decoration} alt="vision"/>
						</Route>
						<Route exact path="/comics">
							<ErrorBoundary>
								<AppBanner />
								<ComicsList />
							</ErrorBoundary>
						</Route>
					</Switch>
				</main>
			</div>
		</Router>
	)

}

export default App;