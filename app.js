class DrumKit {
  constructor() {
    this.playBtn = document.querySelector(".play");
    this.pads = document.querySelectorAll(".pad");
    this.kickSound = document.querySelector(".kick");
    this.snareSound = document.querySelector(".snare");
    this.hihatSound = document.querySelector(".hihat");
    this.bpm = 100;
    this.index = 0;
    this.isPlaying = null;
  }
  repeat() {
    const step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack alternate 0.3s 2`;
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickSound.currentTime = 0;
          this.kickSound.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareSound.currentTime = 0;
          this.snareSound.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatSound.currentTime = 0;
          this.hihatSound.play();
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    if (this.isPlaying) {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }
  activePad() {
    this.classList.toggle("active");
  }
  updatePlayBtn() {
    console.log(this.isPlaying);
    if (this.isPlaying) {
      this.playBtn.innerText = "Play";
    } else {
      this.playBtn.innerHTML = "Stop";
    }
  }
}

const drumKit = new DrumKit();
drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});
// drumKit.start();
drumKit.playBtn.addEventListener("click", () => {
  drumKit.updatePlayBtn();
  drumKit.start();
});
