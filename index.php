<!DOCTYPE html>
<html>
<head>
  <title>Audio streamer</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.4/howler.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>

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
          <div class="col-lg-6">
            <span class="songName col-lg-1"></span>
            <br>
            <span class="songAuthor col-lg-3"></span>
            <br>
            <div class="playStop col-lg-1">
            <span id="playBtn" class="fa fa-pause" style="display: block" aria-hidden="true"></span>
            <span id="pauseBtn" class="fa fa-play" style="display: none" aria-hidden="true"></span>
            </div>
            <div class="everythingAboutSlider col-lg-12">
                <span id="min">0</span>
                <span id="colon">:</span>
                <span id="sec">00</span>
              <input type="range" min="1" max="100" value="50" class="slider col-lg-10" id="myRange">
            </div>
          </div>
        </div>
      </div>

      <script type="text/javascript" src="script.js"></script>
</body>
</html>
