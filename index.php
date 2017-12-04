<html>
<body>
  <?php
  if (isset($_GET["action"]) && isset($_GET["author"]) && $_GET["action"] == "get_author_songs")
  {
    $song = file_get_contents('http://localhost/apicko/api.php?action=get_author_songs&author=' . $_GET["author"]);
    $song = json_decode($song, true);
    ?><ul>

      <?php foreach ($song as $everysong){ ?>

        song: <a href=<?php echo "http://localhost/apicko/index.php?action=get_song_info&song=" . $everysong["name"] ?>><?php echo $everysong["real_name"]?></a><br>

      <?php } ?>
    </ul>
    <br>
    <a href="http://localhost/apicko/index.php?action=get_author">Main page</a>
  <?php
  }
  elseif (isset($_GET["action"]) && isset($_GET["song"]) && $_GET["action"] == "get_song_info")
  {
    $song = file_get_contents('http://localhost/apicko/api.php?action=get_song_info&song=' . $_GET["song"]);
    $song = json_decode($song, true);
    foreach ($song as $songinfo) {
      ?>
      song name: <?php echo $songinfo["real_name"];?><br>
      band name: <?php echo $songinfo["real_author"];?><br>
      song id: <?php echo $songinfo["id_song"];
    }
    ?>
    <br>
    <a href="http://localhost/apicko/index.php?action=get_author">Main page</a>
    <?php
  }
  else
  {
    $everyauthor = file_get_contents('http://localhost/apicko/api.php?action=get_author');
    $everyauthor = json_decode($everyauthor, true);
    ?>
    <h1>"apíčko"<h1>
      <ul>
        <?php foreach ($everyauthor as $author){ ?>
          <a href=<?php echo "http://localhost/apicko/index.php?action=get_author_songs&author=" . $author["name"] ?> ><?php echo $author["real_name"]?></a><br><br>
        <?php } ?>
      </ul>
    <?php } ?>
  </body>
  </html>
