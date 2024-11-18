const SHORT_NAME_ADDRESS_COMPONENT_TYPES = new Set([
  'street_number',
  'administrative_area_level_1',
  'postal_code'
]);

const ADDRESS_COMPONENT_TYPES_IN_FORM = [
  'location',
  'locality',
  'administrative_area_level_1',
  'postal_code',
  'country'
];

export function fillInAddress(place: google.maps.places.PlaceResult) {
  const full_address = [];
  function getComponentName(componentType: string) {
    for (const component of place.address_components || []) {
      if (component.types[0] === componentType) {
        return SHORT_NAME_ADDRESS_COMPONENT_TYPES.has(componentType)
          ? component.short_name
          : component.long_name;
      }
    }
    return '';
  }

  function getComponentText(componentType: string) {
    return componentType === 'location'
      ? `${getComponentName('street_number')} ${getComponentName('route')}`
      : getComponentName(componentType);
  }

  for (const componentType of ADDRESS_COMPONENT_TYPES_IN_FORM) {
    full_address.push(getComponentText(componentType));
  }

  const addressString = full_address.join(', ');

  const coordinates = {
    lat: place.geometry?.location?.lat() || 0,
    lng: place.geometry?.location?.lng() || 0
  };

  return {
    address: addressString,
    coordinates
  };
}
