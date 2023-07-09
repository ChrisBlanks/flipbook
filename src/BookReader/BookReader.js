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

    //To-Do: Even pages not displaying properly. Need fix
    //To-Do: Pages seem to be out of order when flipping throught them? Need fix
    updateBookReaderUI(){
        const bookTitle = this.loadedBook.getTitle();
        document.getElementById('bookTitle').innerHTML = bookTitle;

        const pageContainer = document.getElementById('flipbook');
        let counter = 1;
        for(const chapter of this.loadedBook.chapters){
            let div = document.createElement('div');
            //div.id= "Page" + counter;

            let chapterTitle= document.createElement('h1');
            //chapterTitle.id= "ChapterTitle" + counter;
            chapterTitle.innerHTML = "Chapter " + chapter.number + " : " + chapter.name;
            
            let chapterText = document.createElement('p');
            chapterText.className='text';
            //chapterText.id= "PageText" + counter;

            //To-Do: Can't click buttons?
            let choice1Button = document.createElement('button');
            let choice2Button = document.createElement('button');
            choice1Button.type='button';
            choice2Button.type='button';
            choice1Button.innerHTML='Go to chapter X';
            choice2Button.innerHTML='Go to chapter Y';

            choice1Button.addEventListener('click',()=> {
                $("#flipbook").turn("previous");
            });
    
            choice2Button.addEventListener('click',()=> {
                $("#flipbook").turn("next");
            });

            let pageNumberDiv = document.createElement('div');
            let pageNumberText = document.createElement('span');
            pageNumberText.className='page-number';
            pageNumberText.innerHTML = "" + counter;

            //To-Do: Need to figure out how to fit text on each page (wrapping option?)
            // Does using "addPage" option in .turn make a difference in displaying?
            chapterText.innerHTML= chapter.text; 

            div.appendChild(chapterTitle);
            div.appendChild(chapterText);
            div.appendChild(choice1Button);
            div.appendChild(choice2Button);
            pageNumberDiv.appendChild(pageNumberText)
            div.appendChild(pageNumberDiv);
            //var jqueryEl = $(div);
            //$('#flipbook').turn("addPage",jqueryEl);
            pageContainer.appendChild(div);
            counter += 1;
        }

        //<div class="hard"></div>
        let bookEndDiv = document.createElement('div');
        bookEndDiv.id= "bookEndDiv";
        let bookEndSpan = document.createElement('span');
        bookEndSpan.className='hard';
        //var el = $(bookEndDiv);
        bookEndDiv.appendChild(bookEndSpan);
        //$('#flipbook').turn("addPage",el);
        pageContainer.appendChild(bookEndDiv);
    }

    initializeBookUI(){
        $('#flipbook').turn({
            //width: window.innerWidth,
            width: 400,
            height: 300,
            autocenter: true,
            display: "single",
            page: 1
        });

        $("#flipbook").bind("turning", function(event, page, view) {
            console.log("Turning the page to: "+page);
          });

        $("#flipbook").bind("end", function(event, pageObject, turned){
            console.log("turn.end:" +pageObject.page);
          });
        
        const turnLeftButton = document.getElementById('turnLeft');
        const turnRightButton = document.getElementById('turnRight');

        turnLeftButton.addEventListener('click',()=> {
            $("#flipbook").turn("previous");
        });

        turnRightButton.addEventListener('click',()=> {
            $("#flipbook").turn("next");
        });

        /*
        window.addEventListener("resize", () => {
            $("#flipbook").turn("size", window.innerWidth, 300);
        })
        */
    }

    async printUrlContent(url){
        let data = this.loadBook(url);
        data.then((text)=> {
            console.log(text);
        })
    }

}

export {BookReader};