var urlBasic = "http://localhost/apicko/";
var urlAuthor = urlBasic + "api.php?action=get_author";
var urlAuthorSongs = urlBasic + "api.php?action=get_author_songs&author=";
var urlSongInfo = urlBasic + "api.php?action=get_song_info&song=";
var urlAllSongs = urlBasic + "api.php?action=get_all_songs";
var urlAlbum = urlBasic + "api.php?action=get_album";
var urlAlbumSongs = urlBasic + "api.php?action=get_album_songs&album=";
var urlAuthorAlbums = urlBasic + "api.php?action=get_author_albums&author=";
var urlWhisperer = urlBasic + "api.php?action=whisperer";
var tmpUrlAuthor = "";
var tmpUrlAuthorSongs = "";
var tmpUrlSongInfo = "";
var tmpUrlAllSongs = "";
var tmpUrlAlbum = "";
var tmpUrlAlbumSongs = "";
var tmpUrlAuthorAlbums = "";
var tmpUrlWhisperer = "";

var warning = 0;
var soundIndex = -1;
var currentIndex = 0;

var playlist = [];

var id = "";
var name = "";
var path = "";
var displayName = "";
var appendClass = "";
var currentSong = "";
var currentAuthor = "";
var currentDisplay = "";

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
  playSong();
});


function whisper()
{
  var tmp = "";
  $('#whisp').on('input',function(){
    tmp = $("#whisp").val();
  });

  $( function() {
     $.widget( "custom.catcomplete", $.ui.autocomplete, {
       _create: function() {
         this._super();
         this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
       },
       _renderMenu: function( ul, items ) {
         var that = this,
         currentCategory = "";
         $.each( items, function( index, item ) {
           var li;
           if ( item.category != currentCategory ) {
             ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
             currentCategory = item.category;
           }
           li = that._renderItemData( ul, item );
           if ( item.category ) {
             li.attr( "aria-label", item.category + " : " + item.label );
           }
         });
       }
     });
    });

  $('#whisp').autocomplete({
    source: urlWhisperer + tmp,
    minLength: 1
  });

  $(".fa-search").click(function(){
    $("#display").empty();
    var tmpFind = "&term=";
    tmpFind += $("#whisp").val();
    tmpFind = tmpFind.toString().toLowerCase();
    tmpFind = tmpFind.replace(/ /g, '_');
    var tmpAuthor = "";
    var tmpSong = "";
    var tmpAlbum = "";
    var tmpAuthorC = 0;
    var tmpSongC = 0;
    var tmpAlbumC = 0;
    $("#display").append('<div class="whispRow row">')
    $(".whispRow ").append('<div class="authorWhisp col-xl-4"><h2>Autoři</h2></div>');
    $(".whispRow ").append('<div class="albumWhisp col-xl-4"><h2>Alba</h2></div>');
    $(".whispRow ").append('<div class="songWhisp col-xl-4"><h2>Písničky</h2></div>');
    $.getJSON(urlWhisperer + tmpFind,function(json){
      $.each(json, function(i, item){
        if(json[i].product === 'autor')
        {
          tmpAuthorC++;
          var tmpAuthor = "";
          tmpAuthor = json[i].label;
          tmpAuthor = json[i].label.toString().toLowerCase();
          tmpAuthor = json[i].label.replace(/ /g, '_');
          $(".authorWhisp").append('<span class="col-xl-12 authorClass" id="' + tmpAuthor + '">'+ json[i].label +'</span');
        }
        if(json[i].product === 'album')
        {
          tmpAlbumC++;
          var tmpAlbum = "";
          tmpAlbum = json[i].label;
          tmpAlbum= json[i].label.toString().toLowerCase();
          tmpAlbum= json[i].label.replace(/ /g, '_');
          $(".albumWhisp").append('<span class="col-xl-12 albumClass" id="' + tmpAlbum + '">'+ json[i].label+'</span');
        }
        if(json[i].product === 'song')
        {
          tmpSongC++;
          var tmpSong = "";
          tmpSong = json[i].label;
          tmpSong = json[i].label.toString().toLowerCase();
          tmpSong = json[i].label.replace(/ /g, '_');
          $(".songWhisp").append('<span class="col-xl-12 songClass" id="' + tmpSong + '">'+ json[i].label +'</span');
        }
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

      $( ".songClass" ).click(function(){
        tmpUrlSongInfo = $(this).attr( "id" );
        displaySong();
      });
    });
  });
}
function displayAuthor()
{
  $( "#h3author" ).click(function(){
    $( "#display" ).empty();
    $( "#display" ).append('<div class="displayAuthor row">');
    $.getJSON(urlAuthor,function(json){
      $.each(json, function(i, item){
        $( ".displayAuthor" ).append('<div class="col-lg-4 authorClass" id="' + json[i].name + '"> <span>' + json[i].real_name +
          '</span> <div class="bandLogo"> <img class="img-responsive" src="../apicko/img/bands/'+ json[i].name +'.jpg"></div> </div>');
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
  var tmpAuthorImg = "";
  var tmpAuthorName = "";
  $( "#display" ).empty();
  $( "#display" ).append('<div class="displayAuthorSongsAndAlbums row">');
  $( ".displayAuthorSongsAndAlbums" ).append('<div class="col-lg-12 authorRowClass row">');
  $( ".displayAuthorSongsAndAlbums" ).append('<div class="col-lg-6 albumRowClass">');
  $( ".displayAuthorSongsAndAlbums" ).append('<div class="col-lg-6 songRowClass">');
  $( ".albumRowClass" ).append('<h3> Albumy </h3> ');
  $( ".songRowClass" ).append('<h3> Písničky </h3> ');

  $.getJSON(urlAuthorAlbums + tmpUrlAuthorAlbums,function(json){
    tmpUrlAuthorAlbums = "";
    $.each(json, function(i, item){
      tmpAuthorImg = json[i].author;
      tmpAuthorName = json[i].real_author;
      $( ".albumRowClass" ).append('<span class="albumClass" id="' + json[i].name + '">' + json[i].real_name + '</span>');
      $( ".albumRowClass" ).append( "<br>" );
    });
    $( ".authorRowClass" ).append('<div class="col-lg-4 bandLogo"> <img class="img-responsive" src="../apicko/img/bands/'+
      tmpAuthorImg +'.jpg"></div> <div class="col-lg-4 description"> <span>' + tmpAuthorName + '</span> <br> </div>');
    $(".description").append("<span>blablabla some info ...</span>");
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
  $( ".setCenter" ).append('<div class="row imgDisplay">');
  $.getJSON(urlSongInfo + tmpUrlSongInfo,function(json){
    $.each(json, function(i, item){
      $( ".imgDisplay" ).append('<div class="col-lg-4"><img src="../apicko/img/albums/' + json[i].album + '.jpg" class="img-responsive"></div>');
      tmpUrlSongInfo = "";
      path = "";
      path = json[i].name + '.mp3';
      displayName = "";
      displayName = json[i].real_name;
      currentSong = json[i].real_name;
      currentAuthor = json[i].real_author;
      $( ".imgDisplay" ).append('<div class="col-lg-4>"><span class="songClassic" id="' + json[i].name + '">' +
      json[i].real_name + '</span><br><span class="authorDescription"> by: ' +  json[i].real_author + '</span></div>');
    });
    $( ".songClassic" ).click(function(){
      displayFooter();
      addToQueue(path, displayName);
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
        $( ".displayAlbum" ).append('<div class="col-lg-4"><span  class="albumClass" id="' + json[i].name + '">' +
          json[i].real_name + '</span> <br><span  class="authorDescription" >by: ' + json[i].real_author +
            '</span><div class="bandLogo"> <img class="img-responsive" src="../apicko/img/albums/'+ json[i].name +'.jpg"></div></div>');
      });
      $( ".authorDescription" ).click(function(){
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
  var tmpAlbumImg= "";
  var tmpAuthorName = "";
  $( "#display" ).empty();
  $( "#display" ).append('<div class="displayAlbum row">');
  $( ".displayAlbum" ).append('<div class="col-lg-12 albumRowClass row">');
  $.getJSON(urlAlbumSongs + tmpUrlAlbumSongs,function(json){
    $("#display").append('<ul class="list-unstyled">')
    $.each(json, function(i, item){
      id = "";
      tmpAlbumImg = json[i].album;
      tmpAuthorName = json[i].real_author;
      tmpUrlAlbumSongs = "";
      $(".list-unstyled").append('<li><span class="songClass" id="' + json[i].name + '">' + [i+1] +". " + json[i].real_name +
        '</span>  <div class="dropdown" id="' + json[i].name + '"></div></li>' + '<br>');
      id = json[i].name;
      createDropdownMenu(id);
    });
    $( ".albumRowClass" ).append('<div class="col-lg-4 bandLogo"> <img class="img-responsive" src="../apicko/img/albums/'+
      tmpAlbumImg +'.jpg"></div> <div class="col-lg-4 description"> <span>' + tmpAuthorName + '</span> <br> </div>');

    $( ".songClass" ).click(function(){
      tmpUrlSongInfo = $(this).attr( "id" );
      displaySong();
    });
    $(".addToQueueClass").click(function(){
      displayName = "";
      path = "";
      var tmpCurrentSong = $(this).attr( "id" );
      $.getJSON(urlSongInfo + tmpCurrentSong,function(json){
        $.each(json, function(i, item){
          currentSong = json[i].real_name;
          currentAuthor = json[i].real_author;
          path = json[i].name + '.mp3';
          displayName = currentSong;
        });
      addToQueue(path,displayName);
      displayFooter();
      });
    });
    $( ".playClass" ).click(function(){
      displayName = "";
      path = "";
      var tmpCurrentSong = $(this).attr( "id" );
      $.getJSON(urlSongInfo + tmpCurrentSong,function(json){
        $.each(json, function(i, item){
          currentSong = json[i].real_name;
          currentAuthor = json[i].real_author;
          path = json[i].name + '.mp3';
          displayName = currentSong;
        });
        addToQueue(path,displayName);
        displayFooter();
      });
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
        id = "";
        $( ".list-unstyled" ).append('<li><span class="songClass" id="' + json[i].name + '">'
        + [i+1] + '. ' + json[i].real_name + '</span> <div class="dropdown" id="' + json[i].name + '"></div> <br> <span class="authorDescription">by: '
        + json[i].real_author + '</span></li>');
        id = json[i].name;
        createDropdownMenu(id);
      });

      $( ".songClass" ).click(function(){
        tmpUrlSongInfo = $(this).attr( "id" );
        displaySong();
      });

      $(".addToQueueClass").click(function(){
        displayName = "";
        path = "";
        var tmpCurrentSong = $(this).attr( "id" );
        $.getJSON(urlSongInfo + tmpCurrentSong,function(json){
          $.each(json, function(i, item){
            currentSong = json[i].real_name;
            currentAuthor = json[i].real_author;
            path = json[i].name + '.mp3';
            displayName = currentSong;
          });
        addToQueue(path,displayName);
        displayFooter();
        });
      });
      $( ".playClass" ).click(function(){
        displayName = "";
        path = "";
        var tmpCurrentSong = $(this).attr( "id" );
        $.getJSON(urlSongInfo + tmpCurrentSong,function(json){
          $.each(json, function(i, item){
            currentSong = json[i].real_name;
            currentAuthor = json[i].real_author;
            path = json[i].name + '.mp3';
            displayName = currentSong;
          });
          addToQueue(path,displayName);
          displayFooter();
        });
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
  $( ".footer" ).fadeIn(3000);
  if($(".songName").text() == '' && $(".songAuthor").text() == '')
  {
    $( ".songName" ).text(currentSong);
    $( ".songAuthor" ).text('by ' + currentAuthor);
  }
}

function playSong()
{
  $(".fa-play").click(function(){
    if(!window[name])
    {
      var tmpIndex = $(playlist).first();
      console.log(tmpIndex);
      currentIndex = tmpIndex[0][0];
      createSoundObj(currentIndex);
    }
    if(!window[name].playing())
    {
      window[name].play();
    }
    $(".fa-pause").click(function(){
      window[name].pause();
      $(".fa-play").click(function(){
        if(!window[name].playing())
        {
          window[name].play();
        }
      });
    });
  });

  $(".sliderPos").mousedown(function(){
    window[name].pause();
  });

  $(".sliderPos").mouseup(function(){
    window[name].seek(getSliderPosVal());
    window[name].play();
  });

  $(".sliderVol").mousedown(function(){
    window[name].volume(getSliderVolVal()/100);
  });

  $(".sliderVol").mouseup(function(){
    window[name].volume(getSliderVolVal()/100);
  });

  $(".fa-angle-double-right").click(function(){
    var tmpEnd = $(playlist).get(-1);
    var tmpStart = $(playlist).first();
    currentIndex++;
    if(window[name].playing())
    {
      window[name].stop();
    }
    if(tmpEnd[0] < currentIndex)
    {
      messageBox(3);
      currentIndex = tmpStart[0][0];
      currentDisplay = tmpStart[0][1];
      setCurrentSongString(currentDisplay);
      window[name].stop();
      destroySoundObj();
      createSoundObj(currentIndex);
      playBtn.style.display = 'inline-block';
      pauseBtn.style.display = 'none';
    }
    else
    {
      window[name].stop();
      destroySoundObj();
      createSoundObj(currentIndex);
      currentDisplay = playlist[currentIndex][1];
      setCurrentSongString(currentDisplay);
      window[name].play();
    }
  });

  $(".fa-angle-double-left").click(function(){
    var tmpStart = $(playlist).first();
    currentIndex--;
    if(window[name].playing())
    {
      window[name].stop();
    }
    if(tmpStart[0][0] > currentIndex)
    {
      messageBox(6);
      currentIndex = tmpStart[0][0];
      window[name].stop();
      destroySoundObj();
      createSoundObj(currentIndex);
      currentDisplay = playlist[currentIndex][1];
      setCurrentSongString(currentDisplay);
      playBtn.style.display = 'inline-block';
      pauseBtn.style.display = 'none';
    }
    else
    {
      window[name].stop();
      destroySoundObj();
      createSoundObj(currentIndex);
      currentDisplay = playlist[currentIndex][1];
      setCurrentSongString(currentDisplay);
      window[name].play();
    }
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
  $( 'div#'+id ).append('<button type="button" class="btn btn-secondary dropdown-toggle-split ' +
    id +'" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">');
  $( 'button.'+id ).append("&#9776;");
  $( 'div#'+id ).append('<div class="dropdown-menu ' + id +'" aria-labelledby="dropdownMenu">');
  $( 'div.'+id ).append('<span class="dropdown-item addToQueueClass" id=' + id +'>Přidat do fronty</span>');
  $( 'div.'+id ).append('<span class="dropdown-item" id=' + id +'>Přidat do playlistu</span>');
  $( 'div.'+id ).append('<span class="dropdown-item playClass" id=' + id +'>Přehrát!</span>');
}

function messageBox(warning)
{
  $(".messageBoxInfo").empty();
  switch (warning) {
    case 1:
    $(".messageBoxInfo").append('<div class="alert alert-success">');
    $(".alert-success").append('<strong>Úspěch!</strong> Písnička byla úspěšně přidána do fronty!');
    break;
    case 2:
    $(".messageBoxInfo").append('<div class="alert alert-warning">');
    $(".alert-warning").append('<strong>Ups!</strong> Něco se stalo špatně.');
    break;
    case 3:
    $(".messageBoxInfo").append('<div class="alert alert-warning">');
    $(".alert-warning").append('<strong>Ups!</strong> Tvůj playlist právě dohrál.');
    break;
    case 4:
    $(".messageBoxInfo").append('<div class="alert alert-warning">');
    $(".alert-warning").append('<strong>Ups!</strong> Tato písnička již je ve frontě.');
    break;
    case 5:
    $(".messageBoxInfo").append('<div class="alert alert-success">');
    $(".alert-success").append('<strong>Úspěch!</strong> Písnička je nazačátku fronty!');
    break;
    case 6:
    $(".messageBoxInfo").append('<div class="alert alert-warning">');
    $(".alert-warning").append('<strong>Ups!</strong> Přeskočil jsi začátek.');
    break;
    default:
  }
  $(".messageBoxInfo").fadeIn(1000);
  $(".messageBoxInfo").fadeOut(1500, function(){
    $(".messageBoxInfo").empty();
  });
}

function addToQueue(path, displayName)
{
  var tmpCheck = true;
  for (var i = 0; i < playlist.length; i++) {
    if(playlist[i][1] === path)
    {
      tmpCheck = false;
      messageBox(4);
    }
  }
  if(tmpCheck === true)
  {
    soundIndex === 0 ? messageBox(1) : messageBox(5);
    $(".playlistClass").append('<span>' + displayName + '<span><br>');
    soundIndex++;
    playlist.push([soundIndex,path,displayName]);
  }
}

function createSoundObj(currentIndex)
{
  name = "sound" + currentIndex;
  window[name] = new Howl({
    src: ['../apicko/music/' + playlist[currentIndex][1]],
    onplay: function(){
      var time = Math.round(window[name].duration());
      $( '#myRange' ).attr({max:window[name].duration()});
      $( '#duration' ).html(songProgress.formatTime(time));
      $( '#myRange' ).val(window[name].seek());
      requestAnimationFrame(songProgress.updateTimeTracker.bind(this));
      playBtn.style.display = 'none';
      pauseBtn.style.display = 'inline-block';
    },
    onpause: function(){
      playBtn.style.display = 'inline-block';
      pauseBtn.style.display = 'none';
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
    },
    onend: function(){

      var tmpEnd = $(playlist).get(-1);
      currentIndex++;
      if(tmpEnd[0] < currentIndex)
      {
        messageBox(3);
        currentIndex = tmpStart[0][0];
        currentDisplay = tmpStart[0][1];
        setCurrentSongString(currentDisplay);
        window[name].stop();
        destroySoundObj();
        createSoundObj(currentIndex);
        playBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
      }
      else
      {
        window[name].stop();
        destroySoundObj();
        createSoundObj(currentIndex);
        currentDisplay = playlist[currentIndex][1];
        setCurrentSongString(currentDisplay);
        window[name].play();
      }
    }
  });
}

function setCurrentSongString(currentDisplay)
{
  var name = currentDisplay.split(".")[0];
  var tmpCurrentSong = name;
  $.getJSON(urlSongInfo + tmpCurrentSong,function(json){
    $.each(json, function(i, item){
      currentSong = json[i].real_name;
      currentAuthor = json[i].real_author;
    });
    $( ".songName" ).empty();
    $( ".songAuthor" ).empty();
    $( ".songName" ).text(currentSong);
    $( ".songAuthor" ).text('by ' + currentAuthor);
  });
}

function destroySoundObj()
{
  window[name] = null;
}

function displayFunction()
{
  whisper();
  displayAuthor();
  displayAlbum();
  displaySongs();
}
