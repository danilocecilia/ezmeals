import 'leaflet/dist/leaflet.css';
// eslint-disable-next-line import/order
import L from 'leaflet';

// Fix for default marker icon issue with Webpack
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const icon = L.icon({ iconUrl: '/images/marker-icon.png' });

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

interface MapWithPinProps {
  position: [number, number];
}

const MapWithPin: React.FC<MapWithPinProps> = ({ position }) => {
  return (
    <MapContainer
      center={position}
      zoom={20}
      style={{ height: '100%', width: '100%', borderRadius: '10px' }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Marker position={position} icon={icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapWithPin;
