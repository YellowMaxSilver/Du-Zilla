var num_like = 0;
var num_deslike = 0;
var info_user_confirm = true;
var login_user = true;

function videoBoxOptions(pressed){
  if(pressed == "report"){
    notification(icon='report/blue',message="you reported this publication");
  }
  if(pressed == "save"){
    notification(icon='save/blue',message="you saved this publication");
  }
}

function send_comment(){
 input = document.getElementById('input_comment')
 chat = input.value;

 var place = document.getElementById('others_comments');
 var ruan = document.createElement("p");
 ruan.innerHTML = `<div class="ao_user_comment">
                <img src='./images/icons/user_icon.png' class='user_img_box'>
                <div>
                <h5 class='name_channel'>Your user</h5>  
                <h6 class='text_comment'>`+chat+`</h6>
                </div></div>`
 place.append(ruan);
 input.value = '';             
}

function like_function(){
 if (login_user == true) {   
 likes = document.getElementById('likes')
 if (info_user_confirm == true){
    num_like ++;
    info_user_confirm = false;  
    likes.innerHTML = num_like+' likes';
 }else{
  window.alert('voja já curtiu o video')  
 } 
 }else{
  window.alert('você não tem uma conta logada');  
 }
}

function deslike_function(){
    if (login_user == true) {   
    deslikes = document.getElementById('deslikes')
    if (info_user_confirm == true){
       num_deslike ++;
       info_user_confirm = false;  
       deslikes.innerHTML = num_deslike+' deslikes';
    }else{
     window.alert('voja já curtiu o video')  
    } 
    }else{
    window.alert('você não tem uma conta logada');  
   }
}

var user_bar
var show = false;

function publish(){
  show_notification_box(icon="",message="publicado");
}

function notification(icon,message){
  let section = document.getElementById('notification_section');

  let number = Math.random();
  let linkIcon;

  if(icon == "comment"){
    linkIcon = "./images/icons/comment_icon.png";
  }else if(icon == "save/blue"){
    linkIcon = "./images/icons/see_later_icon.png";

  }else{
    linkIcon = "./images/icons/user_icon.png";
  }

  let box = `<box class="notification_box" id='`+number+`'>
                <div class="close_notification_box" onclick="close_notification_box('`+number+`')"></div>
                <div class="notification_icon" style="background-image:url('`+linkIcon+`')"></div>
                <div class="notification_text">
                  <h4 class="normal_text">
                    `+message+`
                  </h4>
                </div>
              </box>`;

  let elemento = document.createElement("div");
  elemento.innerHTML = box;

  section.append(elemento);
  setTimeout(function(){close_notification_box(number)}, 5000)
}

function close_notification_box(self){
  let box = document.getElementById(self);
  box.style = `animation-name: hidden_box_notification;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;`;
}

function showUserBar(method){ 
  let user_bar = document.getElementById('userBar');
  let mouseHover = true;
  if(method == 'byHover'){
    user_bar.addEventListener('mouseleave',function(){mouseHover = false})
    setTimeout(function(){
    if(mouseHover){
      action()
    }
  },800)}
  else{action()}

  function action(){
  user_bar.style = ` animation-name: show_user_bar;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;`;
  user_bar.addEventListener('mouseenter',function(){show=false});
  user_bar.addEventListener('mouseleave',function(){show=true});
  document.addEventListener('click',function(){if(show){console.log("faca");hiddenUserBar()}})
  }
  // user_bar.addEventListener('mouseleave',function(){document.addEventListener('click',function(){
  //        hiddenUserBar();             
  // })});
}

function hiddenUserBar(){

      let user_bar = document.getElementById('userBar');
      user_bar.style = ` animation-name: hidden_user_bar;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;`;
      show = false;
      
    
}


function show_more(elem){ 
  let click = false;
  let number = 0;
  let bar = elem.querySelector('#show_more'); 
  let button = elem.querySelector('.diverse_button');


  bar.style = `animation-name: show_s  upport_box;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;display: block;`;
  visible = true;
 
  // button.addEventListener('click',function(){
  //   if(!click){
  //     let faca = document.querySelector('.show_more');
  //     faca.style = 'border:2px solid green;';
  //   }
  // });


  document.addEventListener('click',function(event){
    if(!bar.contains(event.target) && !elem.contains(event.target)){
      bar.style = 'border:2px solid green;';
      visible = false;
    }
  })


} 

function show_hidden(elem){

  if(!possible){
    console.log('faca '+possible);
     elem.style = `border:2px solid green;`;
    possible = true;
  }
  
}

// function show_info(){
//  box = document.querySelector('.info_box');
//  box.style.opacity = "60%";
// }

// function hidden_info(){
//   box = document.querySelector('.info_box');
//   box.style.opacity = "0%";
//  }








//video_player
var player_video,view, timer;

var btn_play;

var hour, min, seg, current_hour, current_min, current_seg;

var interval_timer;

var bar_progress, videoLoader, progress;

var pctSeek;

function prepare(elem){
 if(player_video != elem){
   player_video = elem;

   view = player_video.querySelector('.video_view')
   timer = player_video.querySelector('.video_time')

   bar_progress = player_video.querySelector('video_progress_bar');
   videoLoader = player_video.querySelector('video_loader');
   progress = player_video.querySelector('video_progress');

   interval_timer = setInterval(update_time, 100);
   btn_play = player_video.querySelector('.video_play');
   btn_play.addEventListener('click',play);


 } 

}

function play(){
 if(view.played.length != 0 && !view.paused){

  if(view.played.start(0)==0) {view.pause();btn_play.style.backgroundImage = "url('./images/icons/video_player/play_button.png')"}

 }else{  
 view.play();btn_play.style.backgroundImage = "url('./images/icons/video_player/pause_button.png')"; 
 }
}

function update_time(){
 
  bufferedEnd = view.buffered.end(view.buffered.length -1);

  videoLoader.style.width = String((bufferedEnd / view.duration) * 100)+ "%";

  pctSeek = (view.currentTime / view.duration) * 100;

  progress.style.width = String(pctSeek)+'%';


   //video duration
   hour = Math.floor(view.duration / 3600);
   min = Math.floor(view.duration / 60);
   seg = Math.floor(((view.duration / 60) %1) * 60);

  //current time
  current_hour = Math.floor(view.currentTime / 3600);
  current_min = Math.floor(view.currentTime / 60);
  current_seg = Math.floor(((view.currentTime / 60) %1) * 60);

  timer.innerHTML = converte_time(current_hour, current_min, current_seg) + ' | ' + converte_time(hour,min,seg);
}



function converte_time(horas,minutos,segundos){
 if(horas <10 && horas>0){
  horas = '0' + String(horas) + ':';
 }else{
   horas = '';
 }
 if(minutos<10){
   minutos = '0' + String(minutos);
 }else if(minutos > 59){
   minutos = minutos - (Math.floor(minutos / 60) * 60);
 }

 if(segundos < 10){
  segundos = '0' + String(segundos); 
 }
 return String(horas) + String(minutos) + ':' + String(segundos);
}