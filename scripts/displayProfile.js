const profileName = localStorage.getItem("USER_NAME")
const profileText = document.getElementById("profile-name-text");

profileText.innerHTML = `Profilul lui ${profileName}`

const activeObjectivesProgressBarCanvas = document.getElementById("active-objectives-progress-bar");
const activeObjectivesProgressBarText = document.getElementById("active-objectives-progress-text")

drawCircleProgressBar(activeObjectivesProgressBarCanvas, activeObjectivesProgressBarText, 20, 80);

function drawCircleProgressBar(can, spanProcent, percent, radius){
    let c = can.getContext('2d');
    
    let posX = can.width / 2,
        posY = can.height / 2,
        fps = 1000 / 200,
        oneProcent = 360 / 100,
        result = oneProcent * percent;
    
    c.lineCap = 'round';
    spanProcent.innerHTML = percent;
    
    arcMove();
    function arcMove(){
      var deegres = 0;
      var acrInterval = setInterval (function() {
        deegres += 1;
        c.clearRect( 0, 0, can.width, can.height );
  
        c.beginPath();
        c.arc( posX, posY, radius, (Math.PI/180) * 270, (Math.PI/180) * (270 + 360) );
        c.strokeStyle = '#b1b1b1';
        c.lineWidth = '20';
        c.stroke();
  
        c.beginPath();
        c.strokeStyle = '#3949AB';
        c.lineWidth = '10';
        c.arc( posX, posY, radius, (Math.PI/180) * 270, (Math.PI/180) * (270 + deegres) );
        c.stroke();
        if( deegres >= result ) clearInterval(acrInterval);
      }, fps);
    }
}