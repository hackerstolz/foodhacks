jQuery(document).ready(function($) {
    $(".scroll").click(function(event) {
    event.preventDefault();
    $('html,body').animate( { scrollTop:$(this.hash).offset().top } , 1000);
    } );

  mapboxgl.accessToken = 'pk.eyJ1IjoiZGljZTg5IiwiYSI6ImFyTDk5ZTAifQ.9ChQbhtYF400G5V68uVL3g';
  var map = new mapboxgl.Map({
    container: 'mapbox', // container id
    style: 'mapbox://styles/mapbox/dark-v8', //stylesheet location
    center: [13.391,52.505],///rting position
    zoom: 13.4 // starting zoom
  });
// TODO
map.on('style.load', function () {
    // Add marker data as a new GeoJSON source.
    map.addSource("markers", {
        "type": "geojson",
        "data": {"type": "FeatureCollection",
    "features":
        [{
          "type": "Feature",
          "properties": {
            "description": "test",
            "marker-symbol": "music"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [13.391,52.505]
          }
        }]}
    });

    // Add a layer showing the markers.
    map.addLayer({
        "id": "markers",
        "interactive": false,
        "type": "symbol",
        "source": "markers",
        "layout": {
            "icon-image": "{marker-symbol}-15"
        }
    });
  });

  } );


$(window).scroll(function() {
if ($(this).scrollTop() > 100){  
    $('header').addClass("sticky");
  }
  else{
    $('header').removeClass("sticky");
  }
});

//mapbox
