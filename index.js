let masterPlay = document.getElementById("masterPlay");
let audioElement = new Audio("1.mp3");
const gif = document.getElementById("gif");
const bar = document.getElementById("myProgressBar");
let songIndex = 0;
const songName = document.getElementById("name");
const timeStamp = document.getElementsByClassName("timestamp");
let songs = [
  { songName: "Legion", filePath: "1.mp3", coverPath: "1.jpg" },
  { songName: "Trap", filePath: "2.mp3", coverPath: "2.jpg" },
  { songName: "They Mad", filePath: "3.mp3", coverPath: "3.jpg" },
  { songName: "Plug Walk", filePath: "4.mp3", coverPath: "4.jpg" },
  { songName: "Name", filePath: "5.mp3", coverPath: "5.jpg" },
  { songName: "Safety Dance", filePath: "6.mp3", coverPath: "6.jpg" },
];

songs.forEach((element, i) => {
  let tempAudio = new Audio(`${i + 1}.mp3`);

  tempAudio.addEventListener("loadedmetadata", () => {
    let duration = tempAudio.duration;
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60).toString().padStart(2, "0");
    let timeStamp = document.getElementById(`time${i}`);
    
    if (timeStamp) {
      timeStamp.innerText = `${minutes}:${seconds}`;
    }

    console.log(`Song ${i + 1} duration: ${minutes}:${seconds}`);
  });
});


masterPlay.addEventListener("click", () => {
  console.log("Master play button clicked");
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    songName.innerText = songs[songIndex].songName;
  } else {
    audioElement.pause();
    gif.style.opacity = 0;
    masterPlay.classList.add("fa-circle-play");
    masterPlay.classList.remove("fa-circle-pause");
    songName.innerText = "";
    makeAllPlays();
  }
});

audioElement.addEventListener("timeupdate", () => {
  console.log("Time update event triggered");
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  bar.value = progress;
});

bar.addEventListener("change", () => {
  audioElement.currentTime = (bar.value * audioElement.duration) / 100;
});

const songInfo = document.getElementById("songInfo");
const Gif = document.getElementById("gif");

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
  element.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-circle-play")) {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
      Gif.style.opacity = 1;
      audioElement.src = `${songIndex + 1}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      songName.innerText = songs[songIndex].songName;
    } else {
      e.target.classList.remove("fa-circle-pause");
      e.target.classList.add("fa-circle-play");
      masterPlay.classList.add("fa-circle-play");
      masterPlay.classList.remove("fa-circle-pause");
      Gif.style.opacity = 0;
      audioElement.pause();
      songName.innerText = "";
    }
  });
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
  });
};


//NEXT and PREVIOUS functionality
document.getElementById("prev").addEventListener("click",()=>{
  if(songIndex <= 0){
    songIndex = 0;
    audioElement.src = `${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    songName.innerText = songs[songIndex].songName;
  }
  else{
    songIndex -= 1;
    audioElement.src = `${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    songName.innerText = songs[songIndex].songName;
  }
})

document.getElementById("next").addEventListener("click",()=>{
  if(songIndex >= 5){
    songIndex = 0;
    audioElement.src = `${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    songName.innerText = songs[songIndex].songName;
  }
  else{
    songIndex += 1;
    audioElement.src = `${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    songName.innerText = songs[songIndex].songName;
  }
})

