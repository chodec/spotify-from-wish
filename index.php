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
  </nav>

  <div class="messageBoxInfo">

  </div>

    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something else here</a>
    </div>
  </div>


  <div class="jumbotron">
    <h1 id="takeMeBack">"audio streamer"<h1>
  </div>
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
          <img  src="../apicko/img/photo.png" class="img-responsive col-lg-1">
          <div class="col-lg-11">
            <span class="songName col-lg-1"></span>
            <br>
            <span class="songAuthor col-lg-3"></span>
            <br>
            <div class="playStop col-lg-1">
            <i id="playBtn" class="fa fa-pause mr-1" style="display: block" aria-hidden="true"></i>
            <i id="pauseBtn" class="fa fa-play mr-1" style="display: none" aria-hidden="true"></i>
            </div>
            <div class="everythingAboutSlider col-lg-12">
              <span id="timer">0:00 </span>
              <input type="range" min="1" max="100" value="1" class="sliderPos" id="myRange">
              <span id="duration">0:00</span>
              <i id="noSound" class="fa fa-volume-off" style="display: none" aria-hidden="true"></i>
              <i id="lowSound" class="fa fa-volume-down" style="display: block" aria-hidden="true"></i>
              <i id="highSound" class="fa fa-volume-up" style="display: none" aria-hidden="true"></i>
              <input type="range" min="1" max="200" value="50" class="sliderVol" id="myRange2">
            </div>
          </div>
        </div>
      </div>

      <script type="text/javascript" src="../apicko/script.js"></script>
</body>
</html>
