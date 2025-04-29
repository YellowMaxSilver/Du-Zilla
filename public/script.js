var playButton;

var runing;
var loaded = true;
var videoView

var mouseOnVideo, videoPlay = false;

var mouseClick = false;
var mouseClickVolume = false;
var operation;

var lastPositionScroll =0 ;

var mouseOnVideo = false;
var hover = true;
var hoverElement = false;
function showPropriety(){
    let section = document.getElementById("proprietyBox");

    section.addEventListener('mouseenter',function(){hoverElement = true;});
    section.addEventListener('mouseleave',function(){hoverElement = false;})
    
    // document.getElementById('videoView').addEventListener('mousemove',function(){
    //     section.style = "animation-name: show;animation-duration: 0.2s;animation-fill-mode: forwards;display:flex;";
    //     hover = false
    // })


        // setInterval(function(){if(!hover){hover = true}else{
    //     if(hover && !hoverElement){
    //         section.style = "animation-name: hidden;animation-duration: 0.2s;animation-fill-mode: forwards;";
    //     }
    // }},2000)
    

    // section.style = "animation-name: show;animation-duration: 0.5s;animation-fill-mode: forwards;";
    section.style = "animation-name: show;animation-duration: 0.2s;animation-fill-mode: forwards;display:flex;";
    mouseOnVideo = true;
}

function hiddenPropriety(){
    let section = document.getElementById("proprietyBox");
    mouseOnVideo = false;
    setTimeout(endTime, 600)
    function endTime(){
        if(mouseOnVideo ==  false){
            section.style = "animation-name: hidden;animation-duration: 0.2s;animation-fill-mode: forwards;";
        }
    }
   
}



function startVideo(){
    videoView = document.getElementById('videoView');
    if(loaded == true){
        videoView.play();
        runing = true;
        console.log(runing)
        loaded = false;
        videoTimeText = document.getElementById('videoTime');
        let button = document.getElementById('playButton');
        button.style = "background-image: url('./images/icons/video_player/pause_button.png');";
    }
    setInterval(updateTime, 100)
    setInterval(verifReady, 1000)

    videoView.addEventListener('click',playButtonPress)

    var videoProgressBar = document.getElementById('videoProgressBar');

    videoProgressBar.addEventListener('click',seekerByClick);
    // videoProgressBar.addEventListener('click',function(){operation = 'byClick'});

    videoProgressBar.addEventListener('mousedown',function(){mouseClick = true;console.log("hello"+mouseClick)});
    document.addEventListener('mouseup',function(){if(mouseClick == true){mouseClick = false;console.log("bye"+ mouseClick)}});

    videoProgressBar.addEventListener('mousemove',seeker);
    

    videoProgressBar.addEventListener('mousemove',showTimeVideo)
    videoProgressBar.addEventListener('mouseleave',hiddenTimeVideo)

    var volumeBar = document.getElementById('volumeBar');
    volumeBar.addEventListener('click',volumeSelect)
    volumeBar.addEventListener('mousedown',function(){mouseClickVolume = true;});
    document.addEventListener('mouseup',function(){if(mouseClickVolume == true){mouseClickVolume = false;}});
    volumeBar.addEventListener('mousemove',volumeSelectByMove)


    // document.getElementById('video_watch').addEventListener('mouseenter',function(){scrollVolume();console.log("inside");mouseOnVideo = true})
    // document.getElementById('video_watch').addEventListener('mouseleave',function(){document.body.style = "overflow-y: auto;";mouseOnVideo = false})
    


}


function fullScreen(){
    let videoBox = document.getElementById('video_watch');
    videoBox.classList.toggle('videoWatchFullScreen');
    //videoBox.style = 'width:100vw;height:100vh;position:absolute;left:0;top:0;z-index:5';
    var element = document.documentElement;

//   if (element.requestFullscreen) {
//     element.requestFullscreen();
//   } else if (element.mozRequestFullScreen) {
//     element.mozRequestFullScreen();
//   } else if (element.webkitRequestFullscreen) {
//     element.webkitRequestFullscreen();
//   } else if (element.msRequestFullscreen) {
//     element.msRequestFullscreen();
//   }
    
}


function seeker(){
    // if(operation == 'byClick'){
    //     let divDistance = this.getBoundingClientRect();
    //     let pctbar = ((event.clientX-divDistance.left) / videoProgressBar.clientWidth) * 100;
    //     videoView.currentTime = ((videoView.duration * pctbar) /100);
    // }

    if(mouseClick == true){
        let divDistance = this.getBoundingClientRect();
        let pctbar = ((event.clientX-divDistance.left) / videoProgressBar.clientWidth) * 100;
        videoView.currentTime = ((videoView.duration * pctbar) /100);
    }
    
    //32
//    alert(event.clientX+" | "+videoProgressBar.clientWidth+" | "+pctbar) 5.294 (videoView.duration / 5.2)
    // alert(videoProgressBar.clientWidth+'|'+ rect.left)//(event.clientX-100)
//(videoView.duration / 5.625)
}

function seekerByClick(){
    let divDistance = this.getBoundingClientRect();
    let pctbar = ((event.clientX-divDistance.left) / videoProgressBar.clientWidth) * 100;
    videoView.currentTime = ((videoView.duration * pctbar) /100);
}


function volumeSelect(){
    let divDistance = this.getBoundingClientRect();
    let pctbar = ((event.clientX-divDistance.left) / volumeBar.clientWidth)* 100;
    videoView.volume = (1 * pctbar) / 100;
    let progressVolume = document.getElementById('progressVolume');
    progressVolume.style = "width: "+((((videoView.volume * 100)/1)*volumeBar.clientWidth)/100)+"px;";
}

function volumeSelectByMove(){
    if(mouseClickVolume == true){
        let divDistance = this.getBoundingClientRect();
        let pctbar = ((event.clientX-divDistance.left) / volumeBar.clientWidth)* 100;
        videoView.volume = (1 * pctbar) / 100;
        let progressVolume = document.getElementById('progressVolume');
        progressVolume.style = "width: "+((((videoView.volume * 100)/1)*volumeBar.clientWidth)/100)+"px;";
    }
}

function showTimeVideo(){
    let point = document.getElementById('timePoint');
    let timeBox = document.getElementById('timeBox');
    let textTimeBox = document.getElementById('textTimeBox');

    let bar = document.getElementById('videoProgressBar');

    let divDistance = this.getBoundingClientRect();

    if((event.clientX-divDistance.left)>= 0){
        point.style = 'margin-left:'+((event.clientX-divDistance.left)-2)+'px;display:flex';
        timeBox.style = 'margin-left:'+((event.clientX-divDistance.left)-10)+'px;display:flex';
        bar.style = "height:10px;margin-top:-2.5px;";
        let pctbar = ((event.clientX-divDistance.left) / videoProgressBar.clientWidth) * 100;
        textTimeBox.innerHTML = convertValue(((videoView.duration * pctbar) /100));
    }else{
        point.style = "display:none;";
        timeBox.style = "display:none;";
    }
}

function hiddenTimeVideo(){
    let point = document.getElementById('timePoint');
    let timeBox = document.getElementById('timeBox');
    let bar = document.getElementById('videoProgressBar');
    point.style.display = "none";
    timeBox.style.display = "none";
    bar.style = "height:5px";
}

function playButtonPress(){
    // let videoView = document.getElementById('videoView');
    //adssad
    let button = document.getElementById('playButton');

    if(runing == true){
        videoView.pause();
        runing = false;
    }else if (runing == false){
        videoView.play();
        runing = true;
    }

    if(runing == true){
        button.style = "background-image: url('./images/icons/video_player/pause_button.png');";
    }
    if(runing == false){
        button.style = "background-image: url('./images/icons/video_player/play_button.png');";
    }
}

function verifReady(){
    if(videoView.readyState === 0 || videoView.readyState === 1){
        document.getElementById('loader').style = "display: flex";
    }else{
        document.getElementById('loader').style = "display: none";
    }
    // console.log(videoView.readyState);
}

function updateTime(){

    let videopow = document.getElementById("videoLoader")

    bufferedEnd = videoView.buffered.end(videoView.buffered.length -1);

    videopow.style.width = String((bufferedEnd / videoView.duration) * 100)+ "%";

    let progress = document.getElementById('videoProgress');
    let pctSeek = (videoView.currentTime / videoView.duration) * 100;

    progress.style.width = String(pctSeek)+'%';
    

    videoTimeText.innerHTML =  convertValue(videoView.currentTime) + "/" + convertValue(videoView.duration);
}



function convertValue(potion1){
    let value
    seconds = Math.floor(((potion1 / 60) %1) *60)
    minutes = Math.floor(potion1 / 60)

    if(seconds < 10){
        finalSeconds = "0"+seconds;
    }else if(seconds >= 10){
        finalSeconds = seconds;
    }

    if(minutes < 10){
        finalMinutes = "0"+minutes;
    }else if(minutes >= 10){
        finalMinutes = minutes;
    }
    

    return finalMinutes+":"+finalSeconds;
}