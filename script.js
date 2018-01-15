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

$(document).ready(function(){
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
        $( ".row" ).append( '<div class="col-sm">');
        $( ".row" ).append('<span  class="authorClass" id="' + json[i].name + '">' + json[i].real_name + '</span>');
        $( ".row" ).append( '</div>');
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

  $.getJSON(urlAuthorAlbums + tmpUrlAuthorAlbums,function(json){
    $( "#display" ).append('<div class="row rowAlbum">');
    $( ".rowAlbum" ).append('<div class="col-sm albumRowClass">');
    $( ".albumRowClass" ).append('<h3> Albumy </h3> ');
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
    $( "#display" ).append('<div class="row rowSong">');
    $( ".rowSong" ).append('<div class="col-sm songRowClass">');
    $( ".songRowClass" ).append('<h3> Písničky </h3> ');
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
  $.getJSON(urlSongInfo + tmpUrlSongInfo,function(json){
    $.each(json, function(i, item){
      tmpUrlSongInfo = "";
      $( "#display" ).append('<span class="songClass" id="' + json[i].name + '">' + json[i].real_name + '<br>' +  json[i].real_author + '</span>');
    });
  });
}

function displayAlbum()
{
  $( "#h3album" ).click(function(){
    $.getJSON(urlAlbum,function(json){
      $( "#display" ).empty();
      $.each(json, function(i, item){
      $( "#display" ).append('<span  class="albumClass" id="' + json[i].name + '">' + json[i].real_name + '</span> <br>'+ "by: ");
      $( "#display" ).append('<span  class="authorClass" >' + json[i].real_author + '</span>' + '<br>');
      $( "#display" ).append( "<br>" );
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
      $("#display").empty();
      $.each(json,function(i, item){
        $("#display").append('<span class="songClass" id="'+ json[i].name + '">' + json[i].real_name + '</span>' + '<br>')
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
  $( "#display" ).append('<h3 id="h3author"> Interpreti </h3>');
  $( "#display" ).append('<h3 id="h3album"> Alba </h3>');
  $( "#display" ).append('<h3 id="h3song"> Písničky </h3>');
  displayFunction();
}

function displayFunction()
{
  displayAuthor();
  displayAlbum();
  displaySongs();
}
