export default class GotServices {
    constructor(){
        this._apiBase = 'https://anapioficeandfire.com/api';
    }

    async getRecource(url){
        const res = await fetch(`${this._apiBase}${url}`);

        if(!res.ok){
            throw new Error(`Could not fetch ${url} recived ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters(){
        return this.getRecource('/characters?page=8&pageSize=8');
    }
    getCharacter(id){
        return this.getRecource(`/characters/${id}`);
    }

    getAllHouses(){
        return this.getRecource('/houses?page=8&pageSize=8');
    }
    getHouse(id){
        return this.getRecource(`/houses/${id}`);
    }

    getAllBooks(){
        return this.getRecource('/books?page=8&pageSize=8');
    }
    getCBook(id){
        return this.getRecource(`/books/${id}`);
    }
}