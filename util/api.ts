const getWordFile = async(wordType:string)=>{
    
    const response = await fetch(process.env.NODE_ENV === 'production'? 
            "<http:wordfetch.vercel.app/db/>" : "<http://localhost:3000/db/>" + wordType
        );

    const data = await response.json();    
    return data;
}

const getRandomWord = (contents:string):string =>{
    contents = contents.replace(/[\\r]/g, "");
    const words = contents.split("\\n");
    words.pop(); //last content is black, hence removed
    const i:number = Math.floor(Math.random()*words.length)
    return words[i];   
}

async function phraseGenerator(words:string[]){
   let phrase = "";
   const allWordTypes = ["adjective", "adverb", "animal", "bodyPart", "gerund", "noun", "pluralNoun", "verb"];
   for(let i=0;i<allWordTypes.length;i++)
   {
    const word = words[i];
    // if(word === "" || (word === "a" && i===0)) continue;
    if(word.slice(0,1) === "$") {
        if(!allWordTypes.includes(word.slice(1))) throw Error("word type not found");
        else{
            const filePath = words[i] + "s.txt";
            phrase += getRandomWord(await getWordFile(filePath)) + " ";
        }
    }
   }

   return phrase.slice(0,-1);
}

function vowelTester(phrase:string):boolean{
    return new RegExp(/[aeiou]/gi).test(phrase[0]);
}

export async function phraeResolver(query:string){
    const words:string[]  = query.split(' ');
    let phrase = await phraseGenerator(words)
    if(words[0] === 'a') 
        phrase = (vowelTester(phrase)?"an ":"a ") + phrase;
    return phrase;
}

