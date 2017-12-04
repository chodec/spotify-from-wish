<?php

//soundmanager2 pro přehravani hudby http://www.schillmania.com/projects/soundmanager2/
//react pro front-end https://tutorialzine.com/2014/07/5-practical-examples-for-learning-facebooks-react-framework

$conn = mysqli_connect('localhost','root','root','api')  or die(mysql_error());

function get_all_songs()
{
  global $conn;
  $myQuery = "SELECT * FROM songs";
  $result = $conn->query($myQuery);
  $array = mysqli_fetch_all($result,MYSQLI_ASSOC);
  return $array;
}

function get_author()
{
  if(isset($_GET["author"]))
  {
    global $conn;
    $author = $_GET["author"];
    $myQuery = "SELECT * FROM author WHERE name = '$author'";

    $result = mysqli_query($conn,$myQuery);

    if(mysqli_num_rows($result) == 0)
    {
      $array = array("result"=>0, "msg"=>"Autor neexistuje");
    }
    else
    {
      $array = mysqli_fetch_all($result,MYSQLI_ASSOC);
    }
  }
  else
  {
    global $conn;
    $myQuery = "SELECT * FROM author";
    $result = $conn->query($myQuery);
    $array = mysqli_fetch_all($result,MYSQLI_ASSOC);
  }
  return $array;
}

function get_author_songs()
{
  if(isset($_GET["author"]))
  {
    global $conn;
    $author = $_GET["author"];
    $myQuery = "SELECT * FROM songs WHERE author = '$author'";
    $result = mysqli_query($conn,$myQuery);
    if(mysqli_num_rows($result) == 0)
    {
      $array = array("result"=>0, "msg"=>"Autor zatim nic nepridal");
    }
    else
    {
      $array = mysqli_fetch_all($result,MYSQLI_ASSOC);
    }
    return $array;
  }

}

function get_song_info()
{
  global $conn;
  $song = $_GET["song"];
  $myQuery ="SELECT * FROM  songs WHERE name = '$song'";
  $result = mysqli_query($conn,$myQuery);
  if(mysqli_num_rows($result) == 0)
  {
    $array = array("result"=>0, "msg"=>"Autor zatim nic nepridal");
  }
  else
  {
    $array = mysqli_fetch_all($result,MYSQLI_ASSOC);
  }
  return $array;
}

$url = array("get_all_songs", "get_author", "get_author_songs", "get_song_info");

$value = "default";

if (isset($_GET["action"]) && in_array($_GET["action"], $url))
{
  switch ($_GET["action"])
  {
    case "get_all_songs":
    $value = get_all_songs();
    break;

    case "get_author":
    $value = get_author();
    break;

    case "get_author_songs":
    $value = get_author_songs();
    break;

    case "get_song_info":
    $value = get_song_info();
    break;
  }
}

exit(json_encode($value));
?>
