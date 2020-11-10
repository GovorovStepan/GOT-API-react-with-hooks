export default class GotService {
    constructor(){
        this._apiBase = 'https://anapioficeandfire.com/api';
    }

    getRecource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if(!res.ok){
            throw new Error(`Could not fetch ${url} recived ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getRecource('/characters?page=5&pageSize=10');
        return  res.map(this._transformCharacter)
    }
    getCharacter = async (id) => {
        const character = await this.getRecource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getAllHouses = async () => {
        const res = await this.getRecource('/houses')
        return res.map(this._transformHouse)
    }
    getHouse = async (id) => {
        const house = await this.getRecource(`/houses/${id}`);
        return this._transformHouse(house);
    }

    getAllBooks = async () => {
        const res = await this.getRecource('/books')
        return res.map(this._transformBook)
    }
    getBook = async (id) => {
        const book = await this.getRecource(`/books/${id}`);
        return this._transformBook(book);
    }

    isSet(data) {
        if (data) {
            return data
        } else {
            return 'no data'
        }
    }    
    
    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        console.log(item.url.match(idRegExp)[1])
        return item.url.match(idRegExp)[1];
    }

    _transformCharacter = (char) => {
        return {
            id: this._extractId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died), 
            culture: this.isSet(char.culture)
        };
    }

    _transformHouse = (house) => {
        return {
            id: this._extractId(house),
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles),
            ancestralWeapons: this.isSet(house.ancestralWeapons)
        };
    }
    
    _transformBook = (book) => {
        return {
            id: this._extractId(book),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publisher: this.isSet(book.publisher),
            released: this.isSet(book.released)
        };
    }
}
