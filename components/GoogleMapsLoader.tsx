import Script from 'next/script';

const GoogleMapsLoader = ({ onLoad }) => (
  <Script
    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
    strategy="lazyOnload"
    onLoad={() => {
      if (onLoad) onLoad();
    }}
  />
);

export default GoogleMapsLoader;
