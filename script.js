var urlAuthor = "http://localhost/apicko/api.php?action=get_author";
var urlAuthorSongs = "http://localhost/apicko/api.php?action=get_author_songs&author=";
var urlSongInfo = "http://localhost/apicko/api.php?action=get_song_info&song=";
var urlGetAllSongs = "http://localhost/apicko/api.php?action=get_all_songs";

$(document).ready(function(){
  displayFunction();
});

function displayFunction()
{
  $( "#neco" ).click(function(){
    $.getJSON(urlAuthor,function(json){
      $( "#display" ).empty();
      $.each(json, function(i, item){
        $( "#display" ).append('<span  class="authorClass" id="' + json[i].name + '">' + json[i].real_name + '</span>');
        $( "#display" ).append( "<br>" );
      });
      $( ".authorClass" ).click(function(){
        urlAuthorSongs += $(this).attr( "id" );
        displayAuthorSongs();
      });
    });
  });
}

function displayAuthorSongs(){
  $( "#display" ).empty();
  $.getJSON(urlAuthorSongs,function(json){
    $.each(json, function(i, item){
      $( "#display" ).append('<span class="authorSongClass" id="' + json[i].name + '">' + json[i].real_name + '</a>');
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
      $( "#display" ).append('<span class="songClass" id="' + json[i].name + '">' + json[i].real_name + '<br>' +  json[i].real_author + '</a>');
    });
  });
}
