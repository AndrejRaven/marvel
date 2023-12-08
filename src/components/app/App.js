import { lazy, Suspense } from 'react';
import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Spinner from '../spinner/Spiner';
import useMarvelService from "../../services/MarvelService";

const Page404 = lazy(() => import('../pages/404'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const MainPage = lazy(() => import('../pages/MainPage'));
const SingleItemPage = lazy(() => import('../pages/SingleItemPage'));



const App = () => {
  const { getComic, getCharacter } = useMarvelService();

	return (
		<Router basename='marvel'>
			<div className="app">
				<AppHeader />
				<main>
					<Suspense fallback={<Spinner />}>
						<Routes>
							<Route path="/home" element={<MainPage />} />
							<Route path="/comics" element={<ComicsPage />} />
							<Route path="/comics/:id" element={<SingleItemPage linkToMain="/comics" getItem={getComic} />} />
							<Route path="/characters/:id" element={<SingleItemPage linkToMain="/" getItem={getCharacter} />} />
							<Route path="*" element={<Page404 />} />
						</Routes>
					</Suspense>
				</main>
			</div>
		</Router>
	)

}

export default App;