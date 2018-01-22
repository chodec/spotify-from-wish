var urlAuthor = "http://localhost/apicko/api.php?action=get_author";
var urlAuthorSongs = "http://localhost/apicko/api.php?action=get_author_songs&author=";
var urlSongInfo = "http://localhost/apicko/api.php?action=get_song_info&song=";
var urlAllSongs = "http://localhost/apicko/api.php?action=get_all_songs";
var urlAlbum = "http://localhost/apicko/api.php?action=get_album";
var urlAlbumSongs = "http://localhost/apicko/api.php?action=get_album_songs&album=";
var urlAuthorAlbums = "http://localhost/apicko/api.php?action=get_author_albums&author=";
var tmpUrlAuthor = "";
var tmpUrlAuthorSongs = "";
var tmpUrlSongInfo = "";
var tmpUrlAllSongs = "";
var tmpUrlAlbum = "";
var tmpUrlAlbumSongs = "";
var tmpUrlAuthorAlbums = "";

var playtime = "";
var currentSong = "";
var currentAuthor = "";
var currentImg = "";

$(document).ready(function(){
  $( ".footer" ).hide();
  displayFunction();
  $( "#takeMeBack" ).click(function(){
    takeMeBack();
  });
});

function displayAuthor()
{
  $( "#h3author" ).click(function(){
    $.getJSON(urlAuthor,function(json){
      $( "#display" ).empty();
      $( "#display" ).append('<div class="row">');
      $.each(json, function(i, item){
        $( ".row" ).append('<div class="col-md"> <span  class="authorClass" id="' + json[i].name + '">' + json[i].real_name + '</span> </div>');
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

  $( "#display" ).append('<div class="row">');
  $( ".row" ).append('<div class="col-md-6 albumRowClass">');
  $( ".row" ).append('<div class="col-md-6 songRowClass">');
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
  $( ".setCenter" ).append('<img src="../apicko/img/photo.png" class="imgClass"> <br>');

  $.getJSON(urlSongInfo + tmpUrlSongInfo,function(json){
    $.each(json, function(i, item){
      tmpUrlSongInfo = "";
      playtime = json[i].name + '.mp3';
      currentSong = json[i].real_name;
      currentAuthor = json[i].real_author;
      $( ".setCenter" ).append('<span class="songClassic" id="' + json[i].name + '">' +
      json[i].real_name + '<br>' +  json[i].real_author + '</span>');
    });

    var sound = new Howl({
      src: ['../apicko/music/' + playtime],
      volume: 0.1,
    });

      displayFooter();
      
      $( ".fa-pause" ).click(function(){
        sound.pause();
      });
      $( ".fa-play" ).click(function(){
        sound.play();
      });
  });
}

function displayAlbum()
{
  $( "#h3album" ).click(function(){
    $.getJSON(urlAlbum,function(json){
      $( "#display" ).empty();
      $( "#display" ).append('<div class="row">');
      $.each(json, function(i, item){
        $( ".row" ).append('<div class="col-md"><span  class="albumClass" id="' + json[i].name + '">' +
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
    $.each(json, function(i, item){
      $("#display").append('<span class="songClass" id="' + json[i].name + '">' + json[i].real_name + '</span>' + '<br>');
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
    $.getJSON(urlAllSongs,function(json){
      $( "#display" ).empty();
      $("#display").append('<div class="row">');
      $.each(json,function(i, item){
        $( ".row" ).append('<div class="col-md"><span class="songClass" id="'+ json[i].name + '">' + json[i].real_name + '</span> </div>')
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

  $( "#display" ).append('<div class="row">');
  $( ".row" ).append('<div class="col-md first">');
  $( ".first" ).append('<span id="h3author"> Interpreti </span>');
  $( ".row" ).append('<div class="col-md second">');
  $( ".second" ).append('<span id="h3album"> Alba </span>');
  $( ".row" ).append('<div class="col-md third">');
  $( ".third" ).append('<span id="h3song"> Písničky </span>');

  displayFunction();
}
function displayFooter(){
  $( ".songClassic" ).click(function(){
      $( ".footer" ).fadeIn(3000);
      $( ".col-md" ).remove();
      $( ".songName" ).text(currentSong);
      $( ".songAuthor" ).text('by ' + currentAuthor);
      });
}

function displayFunction()
{
  displayAuthor();
  displayAlbum();
  displaySongs();
}
