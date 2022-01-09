/*eslint-disable*/

export const displayMap = (locations) => {
  mapboxgl.accessToken =
  'pk.eyJ1IjoidGNza2lyYW4iLCJhIjoiY2t4c2VxZGhnMGEzOTJ2cGhpOHVvanR0diJ9.2d0AZeo_vKqai4pQzEf1pw';
  
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/tcskiran/ckxsfbazw0qtf14oe3cyittxc',
    scrollZoom: false
  });
  
  const bounds = new mapboxgl.LngLatBounds();
  
  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';
    
    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
    .setLngLat(loc.coordinates)
    .addTo(map);
    
    // Adding popup
    new mapboxgl.Popup({
      offset: 30
    })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);
    // Extends map bounds to include current location
    bounds.extend(loc.coordinates);
  });
  
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  }); 
}