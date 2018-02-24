var urlBasic = "http://localhost/apicko/";
var urlAuthor = urlBasic + "api.php?action=get_author";
var urlAuthorSongs = urlBasic + "api.php?action=get_author_songs&author=";
var urlSongInfo = urlBasic + "api.php?action=get_song_info&song=";
var urlAllSongs = urlBasic + "api.php?action=get_all_songs";
var urlAlbum = urlBasic + "api.php?action=get_album";
var urlAlbumSongs = urlBasic + "api.php?action=get_album_songs&album=";
var urlAuthorAlbums = urlBasic + "api.php?action=get_author_albums&author=";
var tmpUrlAuthor = "";
var tmpUrlAuthorSongs = "";
var tmpUrlSongInfo = "";
var tmpUrlAllSongs = "";
var tmpUrlAlbum = "";
var tmpUrlAlbumSongs = "";
var tmpUrlAuthorAlbums = "";

var warning = 0;
var soundIndex = 0;
var currentIndex = 0;

var playlist = [];

var name = "";
var path = "";
var appendClass = "";
var currentSong = "";
var currentAuthor = "";
var currentImg = "";

var songProgress = {
  formatTime: function (secs) {
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = (secs - minutes * 60) || 0;
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  },
  updateTimeTracker: function () {
    var self = this;
    var seek = window[name].seek() || 0;
    var currentTime = songProgress.formatTime(Math.round(seek));

    $('#timer').text(currentTime);
    $( '#myRange' ).val(window[name].seek());

    if (self.playing()) {
      requestAnimationFrame(songProgress.updateTimeTracker.bind(self));
    }
  }
};

$(document).ready(function(){
  $( ".footer" ).hide();
  displayFunction();
  $( "#takeMeBack" ).click(function(){
    takeMeBack();
  });
  $(".fa-home").click(function(){
      takeMeBack();
  });
  addToQueue(path);
});

function displayAuthor()
{
  $( "#h3author" ).click(function(){
    $( "#display" ).empty();
    $( "#display" ).append('<div class="displayAuthor row">');
    $.getJSON(urlAuthor,function(json){
      $.each(json, function(i, item){
        $( ".displayAuthor" ).append('<div class="col-md"> <span  class="authorClass" id="' + json[i].name + '">' + json[i].real_name + '</span> </div>');
      });
      $( ".authorClass" ).click(function(){
        tmpUrlAuthorSongs += $(this).attr( "id" );
        tmpUrlAuthorAlbums += $(this).attr( "id" );
        displayAuthorSongsAndAlbums();
      });
    });
  });
}

function displayAuthorSongsAndAlbums(){
  $( "#display" ).empty();
  $( "#display" ).append('<div class="displayAuthorSongsAndAlbums row">');
  $( ".displayAuthorSongsAndAlbums" ).append('<div class="col-md-6 albumRowClass">');
  $( ".displayAuthorSongsAndAlbums" ).append('<div class="col-md-6 songRowClass">');
  $( ".albumRowClass" ).append('<h3> Albumy </h3> ');
  $( ".songRowClass" ).append('<h3> Písničky </h3> ');

  $.getJSON(urlAuthorAlbums + tmpUrlAuthorAlbums,function(json){
    tmpUrlAuthorAlbums = "";
    $.each(json, function(i, item){
      $( ".albumRowClass" ).append('<span class="albumClass" id="' + json[i].name + '">' + json[i].real_name + '</span>');
      $( ".albumRowClass" ).append( "<br>" );
    });
    $( ".albumClass" ).click(function(){
      tmpUrlAlbumSongs += $(this).attr( "id" );
      displayAlbumSongs();
    });
  });

  $.getJSON(urlAuthorSongs + tmpUrlAuthorSongs,function(json){
    tmpUrlAuthorSongs = "";
    $.each(json, function(i, item){
      $( ".songRowClass" ).append('<span class="authorSongClass" id="' + json[i].name + '">' + json[i].real_name + '</span>');
      $( ".songRowClass" ).append( "<br>" );
    });
    $( ".authorSongClass").click(function(){
      tmpUrlSongInfo += $(this).attr( "id" );
      displaySong();
    });
  });
}

function displaySong()
{
  $( "#display" ).empty();
  $( "#display" ).append('<div class="setCenter">');
  $( ".setCenter" ).append('<img src="../apicko/img/photo.png" class="img-responsive">');
  $.getJSON(urlSongInfo + tmpUrlSongInfo,function(json){
    $.each(json, function(i, item){
      tmpUrlSongInfo = "";
      path = "";
      path = json[i].name + '.mp3';
      currentSong = json[i].real_name;
      currentAuthor = json[i].real_author;
      $( ".setCenter" ).append('<div><span class="songClassic" id="' + json[i].name + '">' +
      json[i].real_name + '</span><br><span>' +  json[i].real_author + '</span></div>');
    });
    displayFooter();
    $( ".songClassic" ).click(function(){
      addToQueue(path)
      playSong();
    });
  });
}

function displayAlbum()
{
  $( "#h3album" ).click(function(){
    $( "#display" ).empty();
    $( "#display" ).append('<div class="displayAlbum row">');
    $.getJSON(urlAlbum,function(json){
      $.each(json, function(i, item){
        $( ".displayAlbum" ).append('<div class="col-md"><span  class="albumClass" id="' + json[i].name + '">' +
        json[i].real_name + '</span> <br> by <span  class="authorClass" >' + json[i].real_author + '</span> </div>');
      });
      $( ".authorClass" ).click(function(){
        tmpUrlAuthorSongs += $(this).attr( "id" );
        tmpUrlAuthorAlbums += $(this).attr( "id" );
        displayAuthorSongsAndAlbums();
      });
      $( ".albumClass" ).click(function(){
        tmpUrlAlbumSongs += $(this).attr( "id" );
        displayAlbumSongs();
      });
    });
  });
}

function displayAlbumSongs()
{
  $( "#display" ).empty();
  $.getJSON(urlAlbumSongs + tmpUrlAlbumSongs,function(json){
    tmpUrlAlbumSongs = "";
    $("#display").append('<ul class="list-unstyled">')
    $.each(json, function(i, item){
      $(".list-unstyled").append('<li><span class="songClass" id="' + json[i].name + '">' + [i+1] +". " + json[i].real_name + '</span></li>' + '<br>');
    });

    $( ".songClass" ).click(function(){
      tmpUrlSongInfo = $(this).attr( "id" );
      displaySong();
    });

  });
}

function displaySongs()
{
  $( "#h3song" ).click(function(){
    $( "#display" ).empty();
    $( "#display" ).append('<div class="displaySongs row">');
    $(".displaySongs").append('<ul class="list-unstyled col-lg-12">');
    $.getJSON(urlAllSongs,function(json){
      $.each(json,function(i, item){
        $( ".list-unstyled" ).append('<li><span class="songClass" id="' + json[i].name + '">'
          + [i+1] + '. ' + json[i].real_name + '</span> <br> <span class="authorDescription">by: '
            + json[i].real_author + '<div class="dropdown" id="' + json[i].name + '"></div> </li> </span>');
      });

      $( ".songClass" ).click(function(){
        tmpUrlSongInfo = $(this).attr( "id" );
        displaySong();
      });

    });
  });
}

function takeMeBack()
{
  $( "#display" ).empty();
  $( "#display" ).append('<div class="displayMenu row">');
  $( ".displayMenu" ).append('<div class="col-md first">');
  $( ".first" ).append('<span id="h3author"> Interpreti </span>');
  $( ".displayMenu" ).append('<div class="col-md second">');
  $( ".second" ).append('<span id="h3album"> Alba </span>');
  $( ".displayMenu" ).append('<div class="col-md third">');
  $( ".third" ).append('<span id="h3song"> Písničky </span>');

  displayFunction();
}
function displayFooter(){
  $( ".songClassic" ).click(function(){
    $( ".footer" ).fadeIn(3000);
    $( ".songName" ).text(currentSong);
    $( ".songAuthor" ).text('by ' + currentAuthor);
  });
}

function playSong()
{

  for (var i = 0; i < playlist.length; i++) {
    console.log(playlist[i]);
  }

  $( ".fa-play" ).click(function(){
      if(!window[name].playing())
      {
          window[name].play();
      }
    });

  $( ".sliderPos" ).mousedown(function(){
    window[name].pause();
  });

  $( ".sliderPos" ).mouseup(function(){
    window[name].seek(getSliderPosVal());
    window[name].play();
  });

  $( ".sliderVol" ).mousedown(function(){
    window[name].volume(getSliderVolVal()/100);
  });

  $( ".sliderVol" ).mouseup(function(){
    window[name].volume(getSliderVolVal()/100);
  });

  $( ".fa-pause" ).click(function(){
    window[name].pause();
  $( ".fa-play" ).click(function(){
      if(!window[name].playing())
      {
          window[name].play();
      }
    });
  });
}

function getSliderPosVal()
{
  return $( '#myRange' ).val();
}

function getSliderVolVal()
{
  return $( '#myRange2' ).val();
}

function createDropdownMenu(id)
{
  $(".dropdown").append('<button type="button" class="btn btn-secondary dropdown-toggle-split" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">');
  $( ".btn-secondary" ).append("&#9776;");
  $( ".dropdown" ).append('<div class="dropdown-menu" aria-labelledby="dropdownMenu">');
  $( ".dropdown-menu" ).append('<a class="dropdown-item" href="#">Přidat do fronty</a>');
  $( ".dropdown-menu" ).append('<a class="dropdown-item" href="#">Přidat do playlistu</a>');
}

function messageBox(warning)
{
  switch (warning) {
    case 1:
        $(".messageBoxInfo").append('<div class="alert alert-success">');
        $(".alert-success").append('<strong>Úspěch!</strong> Objekt byl úspěšně přidán do fronty!');
      break;
    case 2:
        $(".messageBoxInfo").append('<div class="alert alert-warning">');
        $(".alert-success").append('<strong>Ups!</strong> Něco se stalo špatně.');
      break;
      case 3:
          $(".messageBoxInfo").append('<div class="alert alert-warning">');
          $(".alert-success").append('<strong>Ups!</strong> Tvůj playlist právě dohrál.');
        break;
    default:

  }
}

function addToQueue(path)
{
  soundIndex++;
  playlist.push(soundIndex);

  name = "sound" + soundIndex;

    window[name] = new Howl({
    src: ['../apicko/music/' + path],
    onplay: function(){
      var time = Math.round(window[name].duration());
      $( '#myRange' ).attr({max:window[name].duration()});
      $( '#duration' ).html(songProgress.formatTime(time));
      $( '#myRange' ).val(window[name].seek());
      requestAnimationFrame(songProgress.updateTimeTracker.bind(this));
      playBtn.style.display = 'inline-block';
      pauseBtn.style.display = 'none';
    },
    onpause: function(){
      playBtn.style.display = 'none';
      pauseBtn.style.display = 'inline-block';
    },
    onload: function(){
      $(".messageBoxInfo").hide();
      $(".messageBoxInfo").fadeIn(1500, messageBox(1));
      $(".messageBoxInfo").fadeOut(2000, function(){
        $(".messageBoxInfo").empty();
      });
    },
    onvolume: function(){
      if(getSliderVolVal() > 65)
      {
        lowSound.style.display = 'none';
        noSound.style.display = 'none';
        highSound.style.display = 'inline-block';
      }
      else if(getSliderVolVal() === 0)
      {
        lowSound.style.display = 'none';
        noSound.style.display = 'inline-block';
        highSound.style.display = 'none';
      }
      else if(getSliderVolVal() > 0 && getSliderVolVal() < 65)
      {
        lowSound.style.display = 'inline-block';
        noSound.style.display = 'none';
        highSound.style.display = 'none';
      }
    }
  });
}

function displayFunction()
{
  displayAuthor();
  displayAlbum();
  displaySongs();
}
