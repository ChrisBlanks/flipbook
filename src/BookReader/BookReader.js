import { Book } from "./Book/Book";

import $ from "jquery";
import '@ksedline/turnjs';

class BookReader {
    constructor(){
        this.bookText = null;
        this.loadedBook = null;
    }

    async loadBook(url){
        try{
            const response = await fetch(url);
            const data = await response.text();
            this.bookText = data;
            
            this.loadedBook = new Book(this.bookText);
            this.loadedBook.printBookInfo();

            this.updateBookReaderUI();
            this.initializeBookUI();
            return data;
        } catch(err){
            console.error(err);
        }
    }

    updateBookReaderUI(){
        const bookTitle = this.loadedBook.getTitle();
        document.getElementById('bookTitle').innerHTML = bookTitle;

        const pageContainer = document.getElementById('flipbook');
        let counter = 1;
        for(const chapter of this.loadedBook.chapters){
            //<div> <span class="text">Page 1</span> </div>
            let div = document.createElement('div');
            div.id= "Page" + counter;
            let span = document.createElement('span');
            span.className='text';
            span.id= "PageText" + counter;
            span.innerHTML= "Chapter " + chapter.number + " : " + chapter.name + "<br>" + chapter.text; 

            div.appendChild(span);
            pageContainer.appendChild(div);
            counter += 1;
        }

        //<div class="hard"></div>
        let bookEndDiv = document.createElement('div');
        bookEndDiv.id= "bookEndDiv";
        let bookEndSpan = document.createElement('span');
        bookEndSpan.className='hard';

        bookEndDiv.appendChild(bookEndSpan);
        pageContainer.appendChild(bookEndDiv);
    }

    initializeBookUI(){
        $('#flipbook').turn({
            width: 800,
            height: 600,
            autocenter: true
        });
    }

    async printUrlContent(url){
        let data = this.loadBook(url);
        data.then((text)=> {
            console.log(text);
        })
    }

}

export {BookReader};