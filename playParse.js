console.log("It works2");

const answerDiv = document.querySelector('.answer');
const quizButtons = document.querySelector('.disapear');
const showButton = document.querySelector('#show')
const nextButton = document.querySelector('#next')
const submitScript = document.querySelector('#submitScript')
const pastedPlayScript = document.querySelector('#play-script')
const pastedCharactersText = document.querySelectorAll("input[type=text]")
const pastedCharactersCheckbox = document.querySelectorAll("input[type=checkbox]")
const pastedForm = document.querySelectorAll(`#paste-charater, #paste-script`)
let playScript = ``;
let playNames = [];
let myCharacter = [];
let playArray = [];
let charactorArrayIndexes = [];
let myCharactorIndexes = [];
let currentLocation = 0;

//SPLIT at line return 
// 1

function makeArray(text){
    i = text.split('\n');
    return i;
};

//Get indexes for on name
//2.5

function getAllIndexes(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}

//Get indexes for all names unsing getAllIndexes
//2

function returnAllIndexesMultiValue(arr, val) {
    var indexes2 = [];
    for(i = 0; i < arr.length; i++)
        indexes2 = indexes2.concat(getAllIndexes(arr, val[i]));
    indexes2 = indexes2.sort((a, b) => a - b);
    return indexes2;
};


//Create general Arrays

function createPlayArrays(x = playScript, y = playNames, z = myCharacter){
    playArray = makeArray(x);
    charactorArrayIndexes = returnAllIndexesMultiValue(playArray, y);
    myCharactorIndexes = returnAllIndexesMultiValue(playArray, z)
    readScript(playArray)

};

function hidePasteForm(){
    for(i=0;i<pastedForm.length;i++){
        console.log(i);
        pastedForm[i].classList.add('disapear')
    }
    createPlayArrays()                      //HAVE THIS SHOW A START BUTTON
}

//Function to create Varibles from pasted text

function pullInPaste(){
    playScript = pastedPlayScript.value;
    for(i=0;i<pastedCharactersText.length;i++){
        if (pastedCharactersText[i].value !== "" && pastedCharactersCheckbox[i].checked === true){
            playNames.push(pastedCharactersText[i].value)
            myCharacter.push(pastedCharactersText[i].value)
        }else if(pastedCharactersText[i].value !== "" && pastedCharactersCheckbox[i].checked === false){
            playNames.push(pastedCharactersText[i].value)
        }else{
            continue
        }
    }
    hidePasteForm()
}

// Funcstion to reset and continue

function revertAndContinue(){
    answerDiv.classList.add(`answer`)
    quizButtons.classList.add('disapear')
    readScript()
}
function showAnswer(){
    answerDiv.classList.remove(`answer`)
};
//Function to show Buttons

function showButtons(){
    quizButtons.classList.remove('disapear')

}

// Function to start quiz
function quiz(u){
    console.log(u);
    var html = `<h1>`
    for(i = 0; i < u.length;i++){
        console.log(u[i])
        html = html +u[i]
    }
    html.concat(`</h1>`)
    answerDiv.innerHTML = html;
    showButtons()
}

//pause for line function

function pauseForLine(c){
    let a = c+1; //line after character name
    let d = charactorArrayIndexes.findIndex(lines => lines === c)
    let b = charactorArrayIndexes[d+1] //finds the next indesx for the next charactor name
    currentLocation = b
    let linesToDisplay = []
    for (i=a; i <= b -1; i++){
        linesToDisplay.push(playArray[i])
    }
    quiz(linesToDisplay);
}

// Promise Function

function readScript(scriptArray = playArray, i = currentLocation) {
    play();
  
    async function play() {  
      for (;i < scriptArray.length; i++) {
          if (myCharactorIndexes.includes(i)){
              pauseForLine(i)
              break
          }else if (charactorArrayIndexes.includes(i)){
            continue
          }else{
            await getNextAudio(scriptArray[i]);
          }
      }
  
      async function getNextAudio(sentence) {
        console.log(sentence);
        let audio = new SpeechSynthesisUtterance(sentence);
        window.speechSynthesis.speak(audio);
  
        return new Promise(resolve => {
          audio.onend = resolve;
        });
      } 
    }
  }
  ;

//looping through Array for speach

function loopArrayForSpeach(l){
    var speakLine = new SpeechSynthesisUtterance()
    for(i = 0; i < l.length; i++){
        // console.log(l[i]);
        speakLine.text = l[i];
        console.log(speakLine.text);
        speechSynthesis.speak(speakLine);
    }
    return
};

//EVENT LISTENERS

showButton.addEventListener(`click`, showAnswer)
nextButton.addEventListener(`click`, revertAndContinue)
submitScript.addEventListener(`click`, pullInPaste)

//Speach stuff In relations to FORM

// const msg = new SpeechSynthesisUtterance();
// let voices = [];
// const voicesDropdown = document.querySelector('[name="voice"]');
// const options = document.querySelectorAll('[type="range"], [name="text"]');
// const speakButton = document.querySelector('#speak');
// const stopButton = document.querySelector('#stop');
// msg.text = document.querySelector('[name="text"]').value;

// function populateVoices() {
// voices = this.getVoices();
// voicesDropdown.innerHTML = voices
//     .filter(voice => voice.lang.includes('en'))
//     .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
//     .join('');
// }

// function setVoice() {
// msg.voice = voices.find(voice => voice.name === this.value);
// toggle();
// }

// function toggle(startOver = true) {
// speechSynthesis.cancel();
// if (startOver) {
//     speechSynthesis.speak(msg);
// }
// }

// function setOption() {
// console.log(this.name, this.value);
// msg[this.name] = this.value;
// toggle();
// }

// speechSynthesis.addEventListener('voiceschanged', populateVoices);
// voicesDropdown.addEventListener('change', setVoice);
// options.forEach(option => option.addEventListener('change', setOption));
// speakButton.addEventListener('click', toggle);
// stopButton.addEventListener('click', () => toggle(false));





//Back UPs

let x = `ANASTASIA
Is this the class for writing musicals?
CHRISTINE
What? No – this is the playwriting seminar.
ANASTASIA
That’s it.
CHRISTINE
Oh, I’m sorry, I thought you said musicals.
ANASTASIA
Didn’t you get the email?
(At this moment, the teacher, Perry, arrives, followed
immediately by Helen. Perry conducts the class standing –
he is very animated.)
PERRY
Hello, class. By way of introduction, I’d like to go around the room. Each of you should
introduce yourselves and give a short synopsis of the piece you are writing.
(He nods to Helen, who is still getting settled.)
PERRY
Me? Oh, okay. Well, I’m Helen. I’m an accountant. I took a course on accounting
ethics last year, and one of the case studies was just fascinating, I thought it would make
a great play. It’s about the use of stock options in CEO compensation.
(Perry nods to Christine next.)
CHRISTINE
I am Christine. I am a Professor of History at the University, where I specialize in the
History of Anthropology. My play is a one-woman show about an anthropologist who is
in her eighteenth month observing apes in the African jungle without any human contact.
It takes place entirely inside her tent, and mostly inside her head.
PERRY
Okay.`

let oldchar = ['ANASTASIA','CHRISTINE','PERRY'];
