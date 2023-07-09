import { BookReader } from './BookReader/BookReader';

import './main.css';
import $ from "jquery";

function importAll(r){
    return r.keys().map(r);
}

function main(){

    const books = importAll(require.context("../assets/books",false, /\.(txt)$/));

    const reader = new BookReader();
    const bookText = setupBookUploader(reader);
    //reader.loadBook("/assets/books/book.txt");
}

main();


function setupBookUploader(bookReader){
    $(uploadBookForm).on("submit", function(e){
        e.preventDefault();

        const bookUploadInput = document.getElementById("bookUpload");
        const bookFile = bookUploadInput.files[0];
        if(bookFile){
            const bookFileName = bookUploadInput.value.split("\\").pop();
            console.log(bookFileName);
            const bookText = bookFile.text();
            bookText.then((text) => {
                console.log(text);
                bookReader.createBookFromString(text);
            });
        } 

    });
}