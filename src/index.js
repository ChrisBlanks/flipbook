import { BookReader, BookReader } from './BookReader/BookReader';

import './main.css';

function importAll(r){
    return r.keys().map(r);
}

function main(){
    const books = importAll(require.context("../assets/books",false, /\.(txt)$/));
    
    //To-Do: add book reader to DOM for displaying
    const reader = new BookReader();
    reader.show();
}

main();