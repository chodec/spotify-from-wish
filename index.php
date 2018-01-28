<!DOCTYPE html>
<html>
<head>
  <title>Audio streamer</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script type="text/javascript" src="script.js"></script>
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
          <div class="col-lg-4">
            <span class="songName col-lg-1"></span>
            <br>
            <span class="songAuthor col-lg-3"></span>
            <br>
            <span class="fa fa-pause col-lg-1" aria-hidden="true"></span>
            <span class="fa fa-play col-lg-1" aria-hidden="true"></span>
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="width: 5%; height: 1px;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <span id="time"> pozice </span>
          </div>
        </div>
      </div>

</body>
</html>
