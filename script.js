var urlAuthor = "http://localhost/apicko/api.php?action=get_author";
var urlAuthorSongs = "http://localhost/apicko/api.php?action=get_author_songs&author=";
var urlSongInfo = "http://localhost/apicko/api.php?action=get_song_info&song=";
var urlGetAllSongs = "http://localhost/apicko/api.php?action=get_all_songs";

$(document).ready(function(){
  displayAuthorSongs();
  displayAuthor()
});

function displayAuthor(){
  $( "#neco" ).click(function( event ){
    event.preventDefault();
    $.getJSON(urlAuthor,function(json){
      $( "#neco" ).hide( "slow" );
      $.each(json, function(i, item){
        $( "#display" ).append('<a href="#" class="authorClass" id="' + json[i].name + '">' + json[i].real_name + '</a>');
        $( "#display" ).append( "<br>" );
      });
    });
  });
}

function displayAuthorSongs(){
  $( "#tfk" ).click(function( event ){
    event.preventDefault();
    $( "#tfk" ).hide( "slow" );
    urlAuthorSong += $(this).attr( "id" );
    $.getJSON(urlAuthorSong,function(json){
      $.each(json, function(i, item){
        $( "#display" ).append('<a href="#">' + json[i].real_name + '</a>');
        $( "#display" ).append( "<br>" );
      });
    });
  });
}
