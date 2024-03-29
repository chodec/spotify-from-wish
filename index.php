<?php
session_start();
if(!isset($_SESSION["email"]))
{
   header("location:login.php");
}
?>
<!DOCTYPE html>
<html lang="cs">
<head>
  <title>prehravac</title>
  <!--<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> potřebuju jen u zubronetu-->
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="../apicko/style.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.4/howler.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>

  <nav class="navbar navbar-expand-lg navbar-dark">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse col-xl-12" id="navbarTogglerDemo01">
      <a class="navbar-brand" href="#"><span class="navbar-brand fa fa-home col-xl-1"></span></a>
       <div class="offset-xl-4 col-xl-3">
      <input id="whisp" placeholder="Hledej ...">
      <label for="whisp"><span class="navbar-brand fa fa-search"></span></label>
      </div>
       <h4 class="session"> <?php echo $_SESSION["email"] ?> </h4>
    </div>
    <div class="messageBoxInfo"></div>
  </nav>

  <div id="mySidenav" class="sidenav">
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <a href="javascript:;">Fronta</a>
  <div class="playlistClass"></div>
  </div>

  <div class="jumbotron">
    <div class="intro-heading text-uppercase" id="takeMeBack"> Přehrávač </div>
    <hr>
  </div>
  <span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776;</span>

    <div class="container" id="display">
      <div class="displayMenu">
        <div class="row">
          <div class="col-md" id="h3author">
            <h4 class="service-heading text-center"><span class="fa fa-users" style="font-size:65px"></span></h4>
            <h2 class="section-heading" >Interpreti</h2>
          </div>
          <div class="col-md">
            <h4 class="service-heading text-center" id="h3album"><span class="fa fa-headphones" style="font-size:65px"></span></h4>
            <h2 class="section-heading" >Alba</h2>
          </div>
            <div class="col-md">
              <h4 class="service-heading text-center" id="h3song"><span class="fa fa-music" style="font-size:65px"></span></h4>
              <h2 class="section-heading" >Skladby</h2>
            </div>
        </div>
      </div>
    </div>

      <div class="footer">
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <span class="songName offset-xl-4 offset-lg-4 offset-md-2 offset-sm-0 col-lg-1 col-md-1 col-sm-12 col-12"></span>
            <br>
            <span class="songAuthor offset-xl-4 offset-lg-4 offset-md-2 offset-sm-0 col-lg-1 col-md-1 col-sm-12 col-12"></span>
            <br>
            <div class="playStop offset-xl-5 offset-lg-5 offset-md-3 offset-sm-1 col-xl-6 col-lg-8 col-md-5 col-sm-12 col-12">
            <i id="leftBtn" class="fa fa-angle-double-left col-lg-1 col-md-1 col-sm-1 col-3" aria-hidden="true"></i>
            <i id="pauseBtn" class="fa fa-pause col-lg-1 col-md-1 col-sm-1 col-3" style="display: none" aria-hidden="true"></i>
            <i id="playBtn" class="fa fa-play col-lg-1 col-md-1 col-sm-1 col-3" style="display: inline-block" aria-hidden="true"></i>
            <i id="rightBtn" class="fa  fa-angle-double-right col-lg-1 col-md-1 col-sm-1 col-3" aria-hidden="true"></i>
            </div>
            <div class="everythingAboutSlider offset-xl-4 offset-lg-4 offset-md-2 offset-sm-0 col-xl-6 col-lg-8 col-md-12 col-sm-12 col-12">
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
