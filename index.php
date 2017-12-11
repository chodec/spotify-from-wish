<!DOCTYPE html>
<html>
<head>
  <title>Audio streamer</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
  <div class="jumbotron">
    <h1>"audio streamer"<h1>
    </div>
    <div class="container">
      <?php
      if (isset($_GET["action"]) && isset($_GET["author"]) && $_GET["action"] == "get_author_songs")
      {
        $song = file_get_contents('http://localhost/apicko/api.php?action=get_author_songs&author=' . $_GET["author"]);
        $song = json_decode($song, true);
        ?>

        <ul>
          <?php foreach ($song as $everysong){ ?>
            song: <a href=<?php echo "http://localhost/apicko/index.php?action=get_song_info&song=" . $everysong["name"] ?>><?php echo $everysong["real_name"]?></a><br>
          <?php } ?>
        </ul>
        <br>
        <a href="http://localhost/apicko/index.php?action=get_author">Main page</a>

      <?php }
      elseif (isset($_GET["action"]) && isset($_GET["song"]) && $_GET["action"] == "get_song_info")
      {
        $song = file_get_contents('http://localhost/apicko/api.php?action=get_song_info&song=' . $_GET["song"]);
        $song = json_decode($song, true);
        ?>
        <div class="song_box">
        <?php
        foreach ($song as $songinfo)
        { ?>
            song: <?php echo $songinfo["real_name"];?><br>
            band: <?php echo $songinfo["real_author"];?><br>
          <?php
        } ?>
      </div>
        <br>
        <a href="http://localhost/apicko/index.php?action=get_author">Main page</a>

      <?php }
      else
      {
        $everyauthor = file_get_contents('http://localhost/apicko/api.php?action=get_author');
        $everyauthor = json_decode($everyauthor, true);
        ?>
        <ul>
          <?php foreach ($everyauthor as $author){ ?>
            <a href=<?php echo "http://localhost/apicko/index.php?action=get_author_songs&author=" . $author["name"] ?> ><?php echo $author["real_name"]?></a><br><br>
          <?php } ?>
        </ul>
      <?php } ?>
    </div>
  </body>
  </html>
