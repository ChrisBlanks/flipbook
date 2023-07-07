class Book {
    constructor(bookText){
        //set default values in case book text not provided
        this.title="";
        this.numberOfPages = 0;
        this.numberOfChapters=0;
        this.currentChapterNumber=0;
        this.currentPageNumber=0;
        this.chapters=null;
        
        if(bookText != null && bookText != undefined){
            this.parseText(bookText);
        }
    }

    parseText(textOfBook){
        //To-Do: Parse book text and extract metainfo
        //To-Do: Build up data structure for book text based on chapters and decisions
        //To-Do: Calculate number of pages based on how much text can fit in size of book page
        // Or based on number of pages defined in book text

        let textSeparated = textOfBook.split(/\r?\n|\r|\n/g);

        //format= 'Title: Title name here'
        let titleText = textSeparated[0].split(':')[1];
        let bookContentArray = textSeparated.slice(1);

        let bookChapters = [];
        let chapterName;
        let chapterNumber;
        let chapterText;
        for(const line of bookContentArray){
            
            if(line.startsWith("Chapter")){ //if line begins with 'Chapter'
                if(chapterText){
                    //build chapter object before processing next chapter
                    bookChapters.push( {name: chapterName, number: chapterNumber, text: chapterText});
                }

                //format= 'Chapter #: Chapter name'
                chapterName = line.split(':')[1];
                chapterNumber = line.split(':')[0].split(' ')[1];
                chapterText = '';
            } else if(line){ //if line
                chapterText += line;
            }
        }

        //set values after parsing book
        this.title=titleText;
        this.numberOfPages = bookChapters.length;
        this.numberOfChapters= bookChapters.length;
        this.currentChapterNumber=1;
        this.currentPageNumber=0; //title page is page 0
        this.chapters = bookChapters;
    }

    getTitle(){
        return this.title;
    }

    getNumberOfPages(){
        return this.numberOfPages;
    }

    getNumberOfChapters(){
        return this.numberOfChapters;
    }

    getCurrentPageNumber(){
        return this.currentPageNumber;
    }

    setCurrentPageNumber(pageNumber){
        if(pageNumber <= this.numberOfPages){
            this.currentPageNumber=pageNumber;
        }
    }


    getCurrentChapterNumber(){
        return this.currentChapterNumber;
    }

    setCurrentChapterNumber(chapterNumber){
        if(chapterNumber <= this.numberOfChapters){
            this.currentChapterNumber = chapterNumber;
        }
    }


    getChapterText(chapterNumber){
        if(chapterNumber <= this.numberOfChapters){
            const chapter = this.chapters[chapterNumber];
            return chapter.text;
        } else {
            return '';
        }
    }

    getCurrentChapterText(){
        return this.getChapterText(this.currentChapterNumber);
    }

    printBookInfo(){
        console.log("Title: " + this.title);
        console.log("Number of pages: " + this.numberOfPages);
        console.log("Number of chapters: " + this.numberOfChapters);
    }
}

export {Book};