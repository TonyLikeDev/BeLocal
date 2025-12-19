import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationMapProps {
  lat: number;
  lng: number;
  locationName: string;
}

const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ISLAND_LABELS = [
  {
    name: 'Hoàng Sa',
    // Approximate center of Hoàng Sa (Paracel Islands)
    position: [16.5, 112.0] as [number, number]
  },
  {
    name: 'Trường Sa',
    // Approximate center of Trường Sa (Spratly Islands)
    position: [10.0, 114.0] as [number, number]
  }
] as const;

const LocationMap = ({ lat, lng, locationName }: LocationMapProps) => {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={14}
      scrollWheelZoom={false}
      className="h-full w-full rounded-xl"
      style={{ minHeight: '400px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Permanent Vietnamese labels for Hoàng Sa and Trường Sa */}
      {ISLAND_LABELS.map((island) => (
        <Marker
          key={island.name}
          position={island.position}
          icon={customIcon}
          opacity={0}
          interactive={false}
        >
          <Tooltip
            permanent
            direction="center"
            className="!bg-transparent !border-none !shadow-none text-[10px] font-semibold text-emerald-800"
          >
            {island.name}
          </Tooltip>
        </Marker>
      ))}
      <Marker position={[lat, lng]} icon={customIcon}>
        <Popup>
          <div className="text-center">
            <strong>{locationName}</strong>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationMap;
