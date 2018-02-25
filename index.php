<!DOCTYPE html>
<html>
<head>
  <title>prehravac</title>
  <!--<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> potřebuju jen u zubronetu-->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="../apicko/style.css">
  <script src="https://code.jquery.com/jquery-3.2.1.min.js" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.4/howler.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>

  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a class="navbar-brand" href="#"><span class="navbar-brand fa fa-home"></span></a>
    </div>
    <div class="messageBoxInfo"></div>
  </nav>

  <div id="mySidenav" class="sidenav">
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <a href="#">Fronta</a>
  </div>

  <div class="jumbotron">
    <h1 id="takeMeBack">"audio streamer"<h1>
  </div>
  <span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776;</span>
    <div class="container">
      <div id="display">
        <div class="displayMenu">
          <div class="row">
            <div class="col-md">
              <span id="h3author"> Interpreti </span>
            </div>
            <div class="col-md">
              <span  id="h3album"> Alba </span>
            </div>
            <div class="col-md">
              <span id="h3song"> Písničky </span>
            </div>
          </div>
        </div>
      </div>
    </div>

      <div class="footer">
        <div class="row">
          <div class="col-lg-10">
            <span class="songName offset-lg-4 col-lg-1"></span>
            <br>
            <span class="songAuthor offset-lg-4 col-lg-1"></span>
            <br>
            <div class="playStop offset-lg-5 col-lg-8 ">
            <i id="leftBtn" class="fa fa-angle-double-left col-lg-1" aria-hidden="true"></i>
            <i id="pauseBtn" class="fa fa-pause col-lg-1" style="display: none" aria-hidden="true"></i>
            <i id="playBtn" class="fa fa-play col-lg-1" style="display: inline-block" aria-hidden="true"></i>
            <i id="rightBtn" class="fa  fa-angle-double-right col-lg-1" aria-hidden="true"></i>
            </div>
            <div class="everythingAboutSlider offset-lg-4 col-lg-8">
              <span id="timer">0:00 </span>
              <input type="range" min="1" max="100" value="1" class="sliderPos" id="myRange">
              <span id="duration">0:00</span>
              <i id="noSound" class="fa fa-volume-off" style="display: none" aria-hidden="true"></i>
              <i id="lowSound" class="fa fa-volume-down" style="display: inline-block" aria-hidden="true"></i>
              <i id="highSound" class="fa fa-volume-up" style="display: none" aria-hidden="true"></i>
              <input type="range" min="0" max="100" value="25" class="sliderVol" id="myRange2">
            </div>
          </div>
        </div>
      </div>

      <script type="text/javascript" src="../apicko/script.js"></script>
</body>
<script>
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
</script>
</html>
