const resultLink=document.getElementsByClassName("resultLink");
const resultDescription=document.getElementsByClassName("resultDescription");



function handledata(data){


  for(var i=0; i<5;i++){
    if(data[1][i]){
        resultLink[i].innerHTML=data[1][i];
        resultLink[i].href=data[3][i];
        resultLink[i].target="_blank";
        resultDescription[i].innerHTML=data[2][i];

    }//end of if
  }//end of loop


}//end of handledata





(function (){
  const $ = {
    cl : function(str,index){return document.getElementsByClassName(str)[index]},
    id : function(str){return document.getElementById(str)}
  };
  const logo=$.id("logoText");
  const inputField=$.id("queryField");
  // const form=$.id("inputBoxContainer");
  const randomQueryBtn=$.id("randomQueryBtn");
  const startingFormContainer=$.id("startingFormContainer");
  let tag="";


  function typeWriterEffect(obj,method){

    return obj[method]();

  }//end of typeWriterEffect


    let addChar= function(target,text,prop,timeInterval){


      let i=0,
          showLettersWithDelay=  setInterval(function(){

                if(typeof text[i]==="undefined"){

                    clearInterval(showLettersWithDelay);

                }
                else{


                  target[prop]+=text[i];
                  i++;

                }

              },timeInterval);

    }//end of AddChar

    let subtractChar= function(target,prop,timeInterval){

      // let target=this.target,
      //     text=this.text,
      //     prop=this.prop,
      //     timeInterval=this.timeInterval

      let i=(target[prop].length)-1,

          removeLettersWithDelay=  setInterval(function(){

                if(typeof target[prop][i]==="undefined"){

                    clearInterval(removeLettersWithDelay);

                }
                else{

                  if(i>0){

                    target[prop]=target[prop].substring(0,i);
                    i--;

                  }


                }

              },timeInterval);
    }//end of subtractChar

    const TypeWriterEffectParameters=function (target,text,prop,timeInterval){

     this.add= function(){
       return addChar(target,text,prop,timeInterval);
     } ;
     this.subtract= function  (){
       return subtractChar(target,prop,timeInterval);
     } ;


  }//end of TypeWriterEffectParameters

  const logoTypingEffect=new TypeWriterEffectParameters(logo,"ikiFinder","innerHTML",70);

  const placeholderTypingEffect= new TypeWriterEffectParameters(inputField,"What are you courious about?","placeholder",50);




  // inputField.addEventListener("focus",clearInputField);


  // window.addEventListener("load",addInputFieldPlaceholder,{once:true});


  // window.addEventListener("load",logoTransition);

  // const logo=document.getElementById("logoText");






  // function clearInputField(){
  //
  //   let target=event.target;
  //   target.placeholder="";
  //
  // }// end of clearInputField
  //
  // function showRandomQueryBtn(){
  //
  //   setTimeout(function(){
  //       document.getElementById("randomQueryBtn").style.opacity=1;
  //   },2500);
  //
  //
  //
  //
  // }


  window.addEventListener("load", homePageFormTransitionSequence);


  function setOpacity(el,val){
      el.style.opacity=val;
  }

  function homePageFormTransitionSequence(){

    setTimeout(function(){
      setOpacity(logo,1)}
      ,1000);

    setTimeout(function (){
      typeWriterEffect(logoTypingEffect,"add")}
      ,1900);

    setTimeout(function(){
      setOpacity(inputField,0.7);
      typeWriterEffect(logoTypingEffect,"subtract");
    },3000)

    setTimeout(function(){

      typeWriterEffect(placeholderTypingEffect,"add")


    },3800)

    setTimeout(function(){
      setOpacity(randomQueryBtn,0.7);
    },5500)


    setTimeout(function(){
      // startingFormContainer.style.marginTop=0;
      // transitionCompleted=true;
    },6300)


  }//end of homePageFormTransitionSequence




  $.id("queryField").addEventListener("keyup",getData);

  function getData(event){

     event=event || window.event;


     if(event.keyCode=="13"){
         event.preventDefault();
     }


    if(!event.keyCode.toString().match(/^(37|38|39|40|13|16|17|18|224)$/)){


    //prevent request if backspace is pressed and input field is empty
    if(event.keyCode==8 && $.id("queryField").value.length==0){
        return;
    }

    //clean up page from scrpt tags
  		if(tag!==''){ document.body.removeChild(tag);
      }

      //create script tag
  		tag = document.createElement('script');


      let URL={

        endpoint: "https://en.wikipedia.org/w/api.php?",
        action:"action=opensearch",
        limit:"limit=10",
        format:"format=json",
        callback: "callback=handledata",
        search:"search="+$.id('queryField').value

      }

  		tag.src = URL.endpoint+URL.action+"&"+URL.limit+"&"+URL.format+"&"+URL.callback+"&"+URL.search;


      document.body.appendChild(tag);

    }
  }//end of getData


  $.id("queryField").addEventListener("keydown",clearResults);

  function clearResults(event){

    event=event || window.event;

    if(event.keyCode=="13"){
        event.preventDefault();
    }

    if(event.keyCode=="8" && $.id("queryField").value.length==1){

      for(var i=0; i<5;i++){



            resultLink[i].innerHTML="";
            resultLink[i].href="";
            resultLink[i].target="";
            resultDescription[i].innerHTML="";


      }//end of loop


    }
    else{
        console.log(event.keyCode);

    }


  }//end of clearResults


  $.id("queryField").addEventListener("keypress",setOutputWidth)
  $.id("queryField").addEventListener("keypress",setOutputWidth)

  function setWidth(el,comparingElement){

    console.log("running");
    console.log(el);
    console.log(comparingElement);

    el.offsetWidth= comparingElement.offsetWidth;

    console.log(el.offsetWidth);
    console.log(comparingElement.offsetWidth);

  }


  function setOutputWidth(){

    setWidth($.id("queryOutput"),$.id("queryField"));

  }

  // $.cl("randomQueryAnchor",0).addEventListener("click",randomQuery);
  // $.id("randomQueryBtn").addEventListener("click",randomQuery);








})();//end of IIFE
