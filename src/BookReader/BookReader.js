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
            let div = document.createElement('div');
            //div.id= "Page" + counter;

            let chapterTitle= document.createElement('h1');
            //chapterTitle.id= "ChapterTitle" + counter;
            chapterTitle.innerHTML = "Chapter " + chapter.number + " : " + chapter.name;
            
            let chapterText = document.createElement('p');
            chapterText.className='text';
            //chapterText.id= "PageText" + counter;

            const choiceButtons = [];
            for(const choice of chapter.choices){
                let choiceButton = document.createElement('button');
                choiceButton.type='button';
                choiceButton.innerHTML=choice.jumpText;
    
                choiceButton.addEventListener('click',()=> {
                    const nextPageNum = parseInt(choice.jumpNumber)+1; //book cover counts as page
                    if ($("#flipbook").turn("hasPage", nextPageNum)) {
                        $("#flipbook").turn("page",nextPageNum); 
                    } else{
                        const page = nextPageNum - 1;
                        alert("Page "+ page +" is missing");
                    }
                    
                });

                choiceButtons.push(choiceButton);
            } 

            let pageNumberDiv = document.createElement('div');
            let pageNumberText = document.createElement('span');
            pageNumberText.className='page-number';
            pageNumberText.innerHTML = "" + counter;

            //To-Do: Need to figure out how to fit text on each page (wrapping option?)
            // Does using "addPage" option in .turn make a difference in displaying?
            chapterText.innerHTML= chapter.text; 

            div.appendChild(chapterTitle);
            div.appendChild(chapterText);
            for(const button of choiceButtons){
                div.appendChild(button);
            }
            
            pageNumberDiv.appendChild(pageNumberText)
            div.appendChild(pageNumberDiv);
            pageContainer.appendChild(div);
            counter += 1;
        }

        //<div class="hard"></div>
        let bookEndDiv = document.createElement('div');
        bookEndDiv.id= "bookEndDiv";
        let bookEndSpan = document.createElement('span');
        bookEndSpan.className='hard';
        bookEndSpan.innerHTML="The End"
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