const startbtn = document.querySelector(".MYbutt button");
const quepage = document.querySelector(".quepage");
const quetext = document.querySelector(".quetext");
const myoption = document.querySelector(".myoption");
const nextbtn = document.querySelector(".nextbtn");
const lftext = document.querySelector(".lftext");
const timetext = document.querySelector(".time");
const tmlining = document.querySelector(".timeline");
const resultpage = document.querySelector(".resultpage");
const result = document.querySelector(".result");
const lastbtn = document.querySelector(".lastbtn");

lastbtn.onclick = () => {
    window.location.reload();
}



startbtn.onclick = () => {
quepage.classList.add("questionactive");
showQuestion(0);
timeShow(15);
timeLineShow(0);
}



function showQuestion(nong){
    let queTag = '<div>'+questions[nong].number+"."+questions[nong].question +'</div>';
   let optionTag =
                 '<div class="options"><span>'+questions[nong].options[0]+'</span></div>'+
                  '<div class="options"><span>'+questions[nong].options[1]+'</span></div>'+
                 '<div class="options"><span>'+questions[nong].options[2]+'</span></div>'+
                 '<div class="options"><span>'+questions[nong].options[3]+'</span></div>';

    myoption.innerHTML = optionTag;



    quetext.innerHTML = queTag;
   let lftextTag = '<p>'+questions[nong].number+' out of 6</p>';
   lftext.innerHTML = lftextTag;


                // mistake
   let option = myoption.querySelectorAll(".options");
   for(let i = 0; i< option.length; i++){
    option[i].setAttribute("onclick","optiionselected(this)");
   }
}

let tickIcon = '<div class="tick Icon"><i class="fas fa-check"></i></div>';
let crossIcon = ' <div class="cross Icon"><i class="fas fa-times"></i></div>';

let userScore = 0;
function optiionselected(answer){
    let userAns = answer.textContent;
    let corrAns = questions[queCount].answer;
    let alloption = myoption.children.length;
    clearInterval(timeCont);
    clearInterval(timeline);
    
   
    
    if(userAns == corrAns){
        userScore+=1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }else{
        answer.insertAdjacentHTML("beforeend",crossIcon);
        answer.classList.add("inCorrect");



                         // mistake
        for(let i = 0; i<alloption; i++){
            if(myoption.children[i].textContent == corrAns){
                clearInterval(timeCont);
                myoption.children[i].setAttribute("class","options correct");
                myoption.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
    
        }
    }
                   // msitake
     for(let a = 0; a< alloption ; a++){
        myoption.children[a].classList.add("disabled");

  

    }
              
    
                   
      
        nextbtn.style.display = 'block';
}




let queCount = 0;
let timeValue = 15;
let  tmlinevalue = 0;
nextbtn.onclick = () => {
    if(queCount<questions.length-1){
        queCount++;
        showQuestion(queCount);
        clearInterval(timeCont);
        timeShow(timeValue);
        clearInterval(timeline);
        timeLineShow(tmlinevalue);

    }else{
        quepage.classList.remove("questionactive");
        resultpage.classList.add("resultshow");
        resultShow();
        
    }
    nextbtn.style.display = 'none';

}


let timeCont;

function timeShow(tim){
    timeCont = setInterval(timer, 1000);
    function timer(){
        timetext.innerHTML = tim;
        tim--;
               
                        // mistake
        if(tim <9){
            let adZero = timetext.textContent;
            timetext.textContent = "0" + adZero; 
        }
        if(tim < 0){
            clearInterval(timeCont);
            timetext.textContent = "00";

            if(queCount<questions.length-1){
                queCount++;
                showQuestion(queCount);
                clearInterval(timeCont);
                timeShow(timeValue);
                clearInterval(timeline);
                timeLineShow(tmlinevalue);
        
            }else{
                quepage.classList.remove("questionactive");
                resultpage.classList.add("resultshow");
                resultShow();
                
            }
            nextbtn.style.display = 'none';
            
                
        
          
        
            
        }

        

    }
   
}

let timeline ;
function timeLineShow(time){
    timeline = setInterval (timel,50);
    function timel(){
        time+=1.4
        tmlining.style.width = time + "px";
    
    if(time>455){
    clearInterval(timeline);
        
    }
    }
}

function resultShow(){
    // let resTag ='<p> Congratulation you get '+userScore+' out of '+questions.length+' </p>';
    //     result.innerHTML = resTag;

    if(userScore>4){
        let rsTag ='<p> Congratulation you get '+userScore+' out of '+questions.length+' </p>';
        result.innerHTML = rsTag;
    }
    else if(userScore>2){
        let rsTag ='<p> Cary on you get '+userScore+' out of '+questions.length+' </p>';
        result.innerHTML = rsTag;
    }else{
        let rsTag ='<p> I am sorry you get '+userScore+' out of '+questions.length+' </p>';
        result.innerHTML = rsTag;
    }
}







