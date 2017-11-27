<html>
 <body>
<?php
if (isset($_GET["action"]) && isset($_GET["author"]) && $_GET["action"] == "get_author_songs")
{
  $song = file_get_contents('http://localhost/apicko/api.php?action=get_author_songs&author=' . $_GET["author"]);
  $song = json_decode($song, true);

   foreach ($song as $everysong){ ?>
     song: <?php echo $everysong["name"];

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
      <a href=<?php echo "http://localhost/apicko/index.php?action=get_author_songs&author=" . $author["name"] ?> ><?php echo $author["name"]?></a><br><br>
    <?php } ?>
    </ul>
  <?php } ?>
 </body>
</html>
