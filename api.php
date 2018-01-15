<?php
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
      $array = array("id"=>0, "name"=>"Autor neexistuje");
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

function get_album()
{
  if(isset($_GET["album"]))
  {
    global $conn;
    $album = $_GET["album"];
    $myQuery = "SELECT * FROM albums WHERE name = '$album'";
    $result = mysqli_query($conn,$myQuery);
    if(mysqli_num_rows($result) == 0)
    {
      $array = array("id"=>0, "name"=>"Autor zatim nic nepridal");
    }
    else
    {
      $array = mysqli_fetch_all($result,MYSQLI_ASSOC);
    }
  }
  else
  {
    global $conn;
    $myQuery = "SELECT * FROM albums";
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
      $array = array("id"=>0, "name"=>"Autor zatim nic nepridal");
    }
    else
    {
      $array = mysqli_fetch_all($result,MYSQLI_ASSOC);
    }
    return $array;
  }
}
function get_album_songs()
{
  if(isset($_GET["album"]))
  {
    global $conn;
    $album = $_GET["album"];
    $myQuery = "SELECT * FROM songs WHERE album = '$album'";
    $result = mysqli_query($conn,$myQuery);
    if(mysqli_num_rows($result) == 0)
    {
      $array = array("id"=>0, "name"=>"Autor zatim nic nepridal");
    }
    else
    {
      $array = mysqli_fetch_all($result,MYSQLI_ASSOC);
    }
  }
  return $array;
}
function get_author_albums()
{
  if(isset($_GET["author"]))
  {
    global $conn;
    $author = $_GET["author"];
    $myQuery = "SELECT * FROM albums WHERE author = '$author'";
    $result = mysqli_query($conn,$myQuery);
    if(mysqli_num_rows($result) == 0)
    {
      $array = array("id"=>0, "name"=>"Autor zatim nic nepridal");
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
    $array = array("id"=>0, "name"=>"Autor zatim nic nepridal");
  }
  else
  {
    $array = mysqli_fetch_all($result,MYSQLI_ASSOC);
  }
  return $array;
}

$url = array("get_all_songs", "get_author", "get_author_songs", "get_song_info", "get_album", "get_album_songs", "get_author_albums");

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

    case "get_album":
    $value = get_album();
    break;

    case "get_album_songs":
    $value = get_album_songs();
    break;

    case "get_author_albums":
    $value = get_author_albums();
    break;
  }

}

exit(json_encode($value));


class VideoStream
{
    private $path = "";
    private $stream = "";
    private $buffer = 102400;
    private $start  = -1;
    private $end    = -1;
    private $size   = 0;

    function __construct($filePath)
    {
        $this->path = $filePath;
    }

    /**
     * Open stream
     */
    private function open()
    {
        if (!($this->stream = fopen($this->path, 'rb'))) {
            die('Could not open stream for reading');
        }

    }

    /**
     * Set proper header to serve the video content
     */
    private function setHeader()
    {
        ob_get_clean();
        header("Content-Type: video/mp4");
        header("Cache-Control: max-age=2592000, public");
        header("Expires: ".gmdate('D, d M Y H:i:s', time()+2592000) . ' GMT');
        header("Last-Modified: ".gmdate('D, d M Y H:i:s', @filemtime($this->path)) . ' GMT' );
        $this->start = 0;
        $this->size  = filesize($this->path);
        $this->end   = $this->size - 1;
        header("Accept-Ranges: 0-".$this->end);

        if (isset($_SERVER['HTTP_RANGE'])) {

            $c_start = $this->start;
            $c_end = $this->end;

            list(, $range) = explode('=', $_SERVER['HTTP_RANGE'], 2);
            if (strpos($range, ',') !== false) {
                header('HTTP/1.1 416 Requested Range Not Satisfiable');
                header("Content-Range: bytes $this->start-$this->end/$this->size");
                exit;
            }
            if ($range == '-') {
                $c_start = $this->size - substr($range, 1);
            }else{
                $range = explode('-', $range);
                $c_start = $range[0];

                $c_end = (isset($range[1]) && is_numeric($range[1])) ? $range[1] : $c_end;
            }
            $c_end = ($c_end > $this->end) ? $this->end : $c_end;
            if ($c_start > $c_end || $c_start > $this->size - 1 || $c_end >= $this->size) {
                header('HTTP/1.1 416 Requested Range Not Satisfiable');
                header("Content-Range: bytes $this->start-$this->end/$this->size");
                exit;
            }
            $this->start = $c_start;
            $this->end = $c_end;
            $length = $this->end - $this->start + 1;
            fseek($this->stream, $this->start);
            header('HTTP/1.1 206 Partial Content');
            header("Content-Length: ".$length);
            header("Content-Range: bytes $this->start-$this->end/".$this->size);
        }
        else
        {
            header("Content-Length: ".$this->size);
        }

    }

    /**
     * close curretly opened stream
     */
    private function end()
    {
        fclose($this->stream);
        exit;
    }

    /**
     * perform the streaming of calculated range
     */
    private function stream()
    {
        $i = $this->start;
        set_time_limit(0);
        while(!feof($this->stream) && $i <= $this->end) {
            $bytesToRead = $this->buffer;
            if(($i+$bytesToRead) > $this->end) {
                $bytesToRead = $this->end - $i + 1;
            }
            $data = fread($this->stream, $bytesToRead);
            echo $data;
            flush();
            $i += $bytesToRead;
        }
    }

    /**
     * Start streaming video content
     */
    function start()
    {
        $this->open();
        $this->setHeader();
        $this->stream();
        $this->end();
    }
}
?>
