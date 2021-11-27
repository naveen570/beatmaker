class DrumKit {
  constructor() {
    this.playBtn = document.querySelector(".play");
    this.pads = document.querySelectorAll(".pad");
    this.kickSound = document.querySelector(".kick");
    this.snareSound = document.querySelector(".snare");
    this.hihatSound = document.querySelector(".hihat");
    this.selectTracks = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
    this.bpm = 180;
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
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickSound.src = selectionValue;
        break;
      case "snare-select":
        this.snareSound.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatSound.src = selectionValue;
        break;
    }
  }
  muteSound(e) {
    const muteBtn = e.target;
    const muteIndex = muteBtn.dataset.track;
    muteBtn.classList.toggle("active");
    if (muteBtn.classList.contains("active")) {
      switch (muteIndex) {
        case "1":
          this.kickSound.volume = 0;
          break;
        case "2":
          this.snareSound.volume = 0;
          break;
        case "3":
          this.hihatSound.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "1":
          this.kickSound.volume = 1;
          break;
        case "2":
          this.snareSound.volume = 1;
          break;
        case "3":
          this.hihatSound.volume = 1;
          break;
      }
    }
  }
  updatePlayBtn() {
    if (this.isPlaying) {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    } else {
      this.playBtn.innerHTML = "Stop";
      this.playBtn.classList.add("active");
    }
  }
  changeTempo(e) {
    const tempoNr = document.querySelector(".tempo-nr");
    tempoNr.innerText = e.target.value;
    this.bpm = e.target.value;
  }
  updateTempo() {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    if (this.playBtn.classList.contains("active")) {
      this.start();
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
drumKit.playBtn.addEventListener("click", () => {
  drumKit.updatePlayBtn();
  drumKit.start();
});
drumKit.selectTracks.forEach((select) => {
  {
    select.addEventListener("change", function (e) {
      drumKit.changeSound(e);
    });
  }
});
drumKit.muteBtns.forEach((mute) => {
  mute.addEventListener("click", (e) => {
    drumKit.muteSound(e);
  });
});
drumKit.tempoSlider.addEventListener("input", (e) => {
  drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener("change", (e) => {
  drumKit.updateTempo();
});
