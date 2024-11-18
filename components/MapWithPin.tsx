import 'leaflet/dist/leaflet.css';
// eslint-disable-next-line import/order
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import L from 'leaflet';

// Fix for default marker icon issue with Webpack
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import React from 'react';

const icon = L.icon({ iconUrl: '/images/marker-icon.png' });

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

interface MapWithPinProps {
  center: { lat: number; lng: number };
}

const MapWithPin: React.FC<MapWithPinProps> = ({ center }) => {
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      center={center}
      zoom={20}
      mapContainerStyle={{
        height: '100%',
        width: '100%',
        borderRadius: '10px'
      }}
      // zoomControl={false}
    >
      <Marker position={center} icon={icon} />
      <InfoWindow onLoad={onLoad} onUnmount={onUnmount} position={center}>
        <div>
          <h1>Address</h1>
          <p>1234, Street Name</p>
        </div>
      </InfoWindow>

      {/* <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Marker position={position} icon={icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
    </GoogleMap>
  );
};

export default MapWithPin;
