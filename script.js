$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: 'http://localhost/apicko/api',
    data: 'value',
    dataType: 'json',
    success: function (data) {
      $.each(data, function(i, author) {
        $('body').append($('<div>', {
          text: author.name
        }));
      });
    }
  });
});



function getJsonAuthor()
{
  $.getJSON("http://localhost/apicko/api.php?action=get_author", displayAuthor);
};

function getJsonSong()
{
  $.getJSON("http://localhost/apicko/api.php?action=get_author_songs", displayAllSongs);
};

function displayAuthor(data)
{
    $(data).each(function (i, author)
    {
        var a = document.createElement("a");
        a.setAttribute("href", "#");
        a.setAttribute("real_name", autor.name);

        a.setAttribute("span", autor.real_name);
        a.innerHTML = "<span>" + autor.real_name + "</span>";

    });


    $("a").click(function (a) {
        console.log(a.target.real_name);
        $.getJSON("http://localhost/apicko/api.php?action=get_author_songs", { "author": a.target.real_name }, displayAllSongs)
    });


}
function displayAllSongs(data)
{
  $(data).each(function(i, song)
  {
    var a = document.createElement("a");
    a.setAttribute("href","#");
    a.setAttribute("real_name",song.name);
    a.setAttribute("span", song.real_name);
    a.innerHTML = "<span>" + song.real_name + "</span>";

  });

  $("a").click(function (a) {
      console.log(a.target.real_name);
      $.getJSON("http://localhost/apicko/api.php?action=get_author_songs", { "author": a.target.real_name }, displayAllSongs)
  });
