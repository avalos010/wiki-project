$(document).ready(function() {
  $(".fa-times-circle-o").hide();
  $(".search-input").keypress(function(event) {
    if (event.keyCode === 13) {
      $(".fa-search").click();
    }
  });
  var $data = $(".data");

  $(".fa-search").on("click", function() {
    //gets search input
    var searchTerm = $("#search-term").val();
    //api url with search
    $(".search-input").css("margin-top", "-200px");
    var url =
      "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
      searchTerm +
      "&format=json&callback=wikiCallback";
    $(".fa-times-circle-o").show();
    $.ajax({
      url: url,
      dataType: "jsonp",
      success: function(data) {
        $(".data .wiki-data").remove();
        var title = data[1];
        var article = data[2];
        var link = data[3];
        for (var i = 0; i < title.length; i++) {
          $data.append(
            '<div class="wiki-data"><h3><a href="' +
              link[i] +
              '"target="_blank">' +
              title[i] +
              "</h3></a><p>" +
              article[i] +
              "</p></div>"
          );
        }
      }
    });
  });
  //on click close the wiki-data div;
  $(".fa-times-circle-o").on("click", function() {
    $(".wiki-data").remove();
    $(".search-input").css("margin-top", "200px");
    $(this).hide();
  });
});