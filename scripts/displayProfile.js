import { getActiveObjectivesCount, getTotalObjectivesCount } from "./activitiesHandler.js";

const profileName = localStorage.getItem("USER_NAME")
const profileText = document.getElementById("profile-name-text");

profileText.innerHTML = `Profilul lui ${profileName}`

const activeObjectivesProgressBarCanvas = document.getElementById("active-objectives-progress-bar");
const activeObjectivesProgressBarText = document.getElementById("active-objectives-progress-text")

const finishedObjectivesProgressBarCanvas = document.getElementById("finished-objectives-progress-bar");
const finishedObjectivesProgressBarText = document.getElementById("finished-objectives-progress-text");

const activeObjectivesText = document.getElementById("active-objectives-text");
const finishedObjectivesText = document.getElementById("finished-objectives-text");

const totalObjectivesCount = getTotalObjectivesCount();
const activeObjectivesCount = getActiveObjectivesCount();
const finishedObjectivesCount = totalObjectivesCount - activeObjectivesCount;

activeObjectivesText.innerHTML = `${activeObjectivesCount} Obiective în curs`;
finishedObjectivesText.innerHTML = `${finishedObjectivesCount} Obiective finalizate`;

const activeObjectivesPercent = (activeObjectivesCount / totalObjectivesCount * 100).toFixed();
const finishedObjectivesPercent = 100 - activeObjectivesPercent;

const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
drawCircleProgressBar(activeObjectivesProgressBarCanvas, activeObjectivesProgressBarText, activeObjectivesPercent, 85, randomColor);
drawCircleProgressBar(finishedObjectivesProgressBarCanvas, finishedObjectivesProgressBarText, finishedObjectivesPercent, 85, randomColor);

function drawCircleProgressBar(can, spanProcent, percent, radius, color){
    let c = can.getContext('2d');
    
    let posX = can.width / 2,
        posY = can.height / 2,
        fps = 1000 / 200,
        oneProcent = 360 / 100,
        currentPercent = 0,
        result = oneProcent * percent;
    
    c.lineCap = 'round';
    
    arcMove();
    function arcMove(){
      var deegres = 0;
      var acrInterval = setInterval (function() {
        deegres += 1;
        c.clearRect( 0, 0, can.width, can.height );
  
        c.beginPath();
        c.arc( posX, posY, radius, (Math.PI/180) * 270, (Math.PI/180) * (270 + 360) );
        c.strokeStyle = '#b1b1b1';
        c.lineWidth = '15';
        c.stroke();

        currentPercent = deegres / oneProcent;
        spanProcent.innerHTML = currentPercent.toFixed();

        c.beginPath();
        c.strokeStyle = color;
        c.lineWidth = '15';
        c.arc( posX, posY, radius, (Math.PI/180) * 270, (Math.PI/180) * (270 + deegres) );
        c.stroke();
        if( deegres >= result ) clearInterval(acrInterval);

        currentPercent++;
      }, fps);
    }
}