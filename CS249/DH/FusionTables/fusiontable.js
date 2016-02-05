var marker; 
var map;

function initialize() {


  var mapOptions = {
    center: { lat: 42.066667, lng: -71.293056},
    zoom: 3,
  };
  map = new google.maps.Map(document.querySelector("#map-canvas"),
      mapOptions);
    
var layer = new google.maps.FusionTablesLayer({
    query: {
      select: '\'Geocodable address\'',
      from: '1jkJ_o93J9iYhOdMzW06FJrkW596IWQ69KXoutYSS'
        
    }
//    ,heatmap: {
//        enabled: true
//    }
    
  });
  layer.setMap(map);
}
google.maps.event.addDomListener(window, 'load', initialize);


