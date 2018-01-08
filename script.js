var urlAuthor = "http://localhost/apicko/api.php?action=get_author";
var urlAuthorSongs = "http://localhost/apicko/api.php?action=get_author_songs&author=";
var urlSongInfo = "http://localhost/apicko/api.php?action=get_song_info&song=";
var urlAllSongs = "http://localhost/apicko/api.php?action=get_all_songs";
var urlAlbum = "http://localhost/apicko/api.php?action=get_album";
var urlAlbumSongs = "http://localhost/apicko/api.php?action=get_album_songs&album=";
var urlAuthorAlbums = "http://localhost/apicko/api.php?action=get_author_albums&author=";

$(document).ready(function(){
  displayFunction();
  displayAlbum();
  displaySongs();
  $( "#takeMeBack" ).click(function(){
    takeMeBack();
  });
});

function displayFunction()
{
  $( "#h3author" ).click(function(){
    $.getJSON(urlAuthor,function(json){
      $( "#display" ).empty();
      $.each(json, function(i, item){
        $( "#display" ).append('<span  class="authorClass" id="' + json[i].name + '">' + json[i].real_name + '</span>');
        $( "#display" ).append( "<br>" );
      });
      $( ".authorClass" ).click(function(){
        urlAuthorSongs += $(this).attr( "id" );
        urlAuthorAlbums += $(this).attr( "id" );
        displayAuthorSongsAndAlbums();
      });
    });
  });
}

function displayAuthorSongsAndAlbums(){
  $( "#display" ).empty();
  $.getJSON(urlAuthorAlbums,function(json){
    $( "#display" ).append('<h3> Albumy </h3> ');
    $.each(json, function(i, item){
      $( "#display" ).append('<span class="albumClass" id="' + json[i].name + '">' + json[i].real_name + '</span>');
      $( "#display" ).append( "<br>" );
    });
  });

  $.getJSON(urlAuthorSongs,function(json){
    $( "#display" ).append('<h3> Písničky </h3> ');
    $.each(json, function(i, item){
      $( "#display" ).append('<span class="authorSongClass" id="' + json[i].name + '">' + json[i].real_name + '</span>');
      $( "#display" ).append( "<br>" );
    });

    $( ".authorSongClass").click(function(){
      urlSongInfo += $(this).attr( "id" );
      displaySong();
    });
  });
}
function displaySong()
{
  $( "#display" ).empty();
  $.getJSON(urlSongInfo,function(json){
    $.each(json, function(i, item){
      $( "#display" ).append('<span class="songClass" id="' + json[i].name + '">' + json[i].real_name + '<br>' +  json[i].real_author + '</span>');
    });
  });
}

function takeMeBack()
{
  $( "#display" ).empty();
  $( "#display" ).append('<h3 id="h3author"> Interpreti </h3>');
  $( "#display" ).append('<h3 id="h3album"> Alba </h3>');
  $( "#display" ).append('<h3 id="h3song"> Písničky </h3>');
}

function displayAlbum()
{
  $( "#h3album" ).click(function(){
    $.getJSON(urlAlbum,function(json){
      $( "#display" ).empty();
      $.each(json, function(i, item){
      $( "#display" ).append('<span  class="albumClass" id="' + json[i].name + '">' + json[i].real_name + '</span> <br>'+ "by: ");
      $( "#display" ).append('<span  class="authorClass" id="' + json[i].author + '">' + json[i].real_author + '</span>' + '<br>');
      $( "#display" ).append( "<br>" );
      });
      $( ".authorClass" ).click(function(){
        urlAuthorSongs += $(this).attr( "id" );
        urlAuthorAlbums += $(this).attr( "id" );
        displayAuthorSongsAndAlbums();
      });
      $( ".albumClass" ).click(function(){
        urlAlbumSongs += $(this).attr( "id" );
        displayAlbumSongs();
      });
    });
  });
}

function displayAlbumSongs()
{
   $( "#display" ).empty();
   $.getJSON(urlAlbumSongs,function(json){
     $.each(json, function(i, item){
       $("#display").append('<span class="songClass" id="' + json[i].name + '">' + json[i].real_name + '</span>' + '<br>');
     });
   });
}

function displaySongs()
{
  $( "#h3song" ).click(function(){
    $.getJSON(urlAllSongs,function(json){
      $("#display").empty();
      $.each(json,function(i, item){
        $("#display").append('<span class="songClass" id"'+ json[i].name + '">' + json[i].real_name + '</span>' + '<br>')
      });
    });
  });
}
