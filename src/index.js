import { BookReader } from './BookReader/BookReader';

import './main.css';

function importAll(r){
    return r.keys().map(r);
}

function main(){

    const books = importAll(require.context("../assets/books",false, /\.(txt)$/));

    const reader = new BookReader();
    reader.loadBook("/assets/books/book.txt");
}

main();