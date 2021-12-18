class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/'
	_apiKey = 'apikey=2f540385d9fbeaed3c32069ab7767180';

	getResource = async (url) => {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	}
	getAllCharacters = async () => {
		const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
		console.log(res.data.results.map(this._transformCharacter));
		return res.data.results.map(this._transformCharacter);
	}

	getCharacter = async (id) => {
		const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
		return this._transformCharacter(res.data.results[0]);
	}


	_transformCharacter = (char) => {
		let desc = char.description;
		if (char.description.length > 200) {
			desc = char.description.slice(0, 250) + '...';
		}
		return {
			name: char.name,
			description: desc,
			thumbnail: char.thumbnail.path + `.`
				+ char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url
		}
	}
}

export default MarvelService;