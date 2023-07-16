import { Book } from "./Book/Book";

import $ from "jquery";
import '@ksedline/turnjs';

class BookReader {
    constructor(){
        this.bookText = null;
        this.loadedBook = null;

        const turnLeftButton = document.getElementById('turnLeft');
        const turnRightButton = document.getElementById('turnRight');

        turnLeftButton.addEventListener('click',()=> {
            if($("#flipbook").turn("is")){
                $("#flipbook").turn("previous");
            }

        });

        turnRightButton.addEventListener('click',()=> {
            if($("#flipbook").turn("is")){
                $("#flipbook").turn("next");
            }

        });
    }

    cleanBook(){
        //destory reader if it's already been initialized & recreate flipbook container
        if($("#flipbook").turn("is")){
            $('#flipbook').turn("destroy").remove();
            $( window ).unbind( 'keydown' );
            $(`
                <div id="flipbook">
                    <div id="pageContainer">
                        <div id="pageContent" class="d-flex justify-content-center align-items-center">
                            <h1 id="titleText" class="text-center">Title</h1>
                        </div>
                    </div> 
                </div>`
            ).insertAfter('#turnLeft');
        }
        
    }

    async loadBook(url){
        try{
            const response = await fetch(url);
            const data = await response.text();
            this.bookText = data;
            
            this.loadedBook = new Book(this.bookText);
            this.loadedBook.printBookInfo();

            this.cleanBook();

            this.updateBookReaderUI();
            this.initializeBookUI();
        } catch(err){
            console.error(err);
        }
    }

    createBookFromString(bookText){
        this.bookText = bookText;

        this.loadedBook = new Book(this.bookText);
        this.loadedBook.printBookInfo();
        
        this.cleanBook();

        this.updateBookReaderUI();
        this.initializeBookUI();

    }

    updateBookReaderUI(){
        const bookTitle = this.loadedBook.getTitle();
        document.getElementById('titleText').innerHTML = bookTitle;

        const pageContainer = document.getElementById('flipbook');
        let counter = 1;
        for(const chapter of this.loadedBook.chapters){
            let div = document.createElement('div');
            let flexDiv = document.createElement('div');
            flexDiv.className= "d-flex flex-column justify-content-center p-1";

            let chapterTitle= document.createElement('h3');
            chapterTitle.innerHTML = "Chapter " + chapter.number + " : " + chapter.name;
            chapterTitle.className='chapterTitle';

            let chapterText = document.createElement('p');
            chapterText.className='chapterText';
            chapterText.innerHTML= chapter.text; 

            const choiceButtons = [];
            for(const choice of chapter.choices){
                let choiceButton = document.createElement('button');
                choiceButton.type='button';
                choiceButton.innerHTML=choice.jumpText;
                choiceButton.className='btn btn-dark';
    
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

            let choicesText = document.createElement('p');
            choicesText.className='choicesText';
            choicesText.innerHTML= chapter.choicesText; 

            //let pageNumberDiv = document.createElement('div');
            //let pageNumberText = document.createElement('span');
            //pageNumberText.className='page-number';
            //pageNumberText.innerHTML = "" + counter;

            flexDiv.appendChild(chapterTitle);
            flexDiv.appendChild(chapterText);
            flexDiv.appendChild(choicesText);
            
            let buttonDiv = document.createElement('div');
            buttonDiv.className="btn-group";
            //buttonDiv.className="btn-group align-self-center";
            for(const button of choiceButtons){
                buttonDiv.appendChild(button);
            }
            flexDiv.appendChild(buttonDiv);
            
            //pageNumberDiv.appendChild(pageNumberText)
            //flexDiv.appendChild(pageNumberDiv);

            div.appendChild(flexDiv);
            pageContainer.appendChild(div);
            counter += 1;
        }

        //create hard cover for the ending page
        let bookEndDiv = document.createElement('div');
        bookEndDiv.id= "bookEndDiv";
        let bookEndSpan = document.createElement('h1');
        bookEndSpan.className='text-center';
        bookEndSpan.innerHTML="The End"

        bookEndDiv.appendChild(bookEndSpan);
        pageContainer.appendChild(bookEndDiv);
    }

    initializeBookUI(){
        $('#flipbook').turn({
            width: 4*window.screen.width/5,
            height: 4*window.screen.height/5,
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

        $(window).on('resize', () =>{
            $("#flipbook").turn("size", 4*window.screen.width/5, 4*window.screen.height/5);
        });

        //turn to page 1
        $("#flipbook").turn("page", 10);
        $("#flipbook").turn("page", 1);
    }

    async printUrlContent(url){
        let data = this.loadBook(url);
        data.then((text)=> {
            console.log(text);
        })
    }

}

export {BookReader};