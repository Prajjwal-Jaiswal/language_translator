const selectTag = document.querySelectorAll("select"); //selects all tag with name select
const fromText = document.querySelector(".from-text"); //selects all tag with class .from-text
const toText = document.querySelector(".to-text"); //selects all tag with class .to-text
exchangeIcon = document.querySelector(".exchange"); //selects all tag with class .exchange
translateBtn = document.querySelector("button");
icons=document.querySelectorAll(".row i");

// selectTag.forEach(tag =>{
//     console.log(tag); //prints in console section all those tags whose name is "select"
// });

selectTag.forEach((tag, id) => {  //foreach loop for all select tag
  for (const country_code in countries) //traverses all country_code in object countries(languages)
  {
    //   console.log(countries[country_code]); //prints languages

    //selecting English by default as FROM lang and Hindi as TO lang
    let selected;
    if (id == 0 && country_code == "en-GB")
      selected = "selected";
    else if (id == 1 && country_code == "hi-IN")
      selected = "selected";
     //adding list of options like hindi,english,bengali.....
    let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option); //adding options tag inside select tag
  }
});

exchangeIcon.addEventListener("click",()=>{
   //exchanging text area and select tag values
  
  let tempText=fromText.value;
    fromText.value=toText.value;
    toText.value=tempText;
    
    //selectTag[0]=select options in FROM(deafult-english)
    //selectTag[1]=select options in TO(default-hindi)
    
    tempLang =selectTag[0].value;
    selectTag[0].value=selectTag[1].value;
    selectTag[1].value=tempLang;
});

translateBtn.addEventListener("click", () => {
  let text = fromText.value,
    translateFrom = selectTag[0].value; //getting fromSelect tag value
  translateTo = selectTag[1].value; // getting toSelect tag value
  if(!text) {//if no text ,return
    toText.setAttribute("placeholder","Please Enter text");
    return;} 
  toText.setAttribute("placeholder","Translating..."); // changing textarea placeholder to translating before fetching data
  
  //translating text from one lang to another
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  //fetching api response and returning it with parsing into js object
  //and in another then method receiving that object
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      toText.value=data.responseData.translatedText;
      toText.setAttribute("placeholder","Translation"); //once data fetched changing textarea placeholder to translation
    });
});

icons.forEach(icon=>{
  icon.addEventListener("click",({target})=>{
    if(target.classList.contains("fa-copy")){
       //if clicked icon has from id ,copy the fromTextarea value else copy the to Textarea value
      if(target.id == "from")
      navigator.clipboard.writeText(fromText.value); //copy to clipboard
      else
      navigator.clipboard.writeText(toText.value);//copy to clipboard
    }
    else
    {
      let utterance;
      //if clicked icon has from id ,speak the fromTextarea value else speak the to Textarea value
      if(target.id == "from")
      {
        utterance=new SpeechSynthesisUtterance(fromText.value);
        utterance.lang=selectTag[0].value; //setting utterance language to fromSelect tag value
      }
      else
      {
        utterance=new SpeechSynthesisUtterance(toText.value);
        utterance.lang=selectTag[1].value; //setting utterance language to toSelect tag value
      }
        speechSynthesis.speak(utterance); // speak the passed utterance
    }
  });
});