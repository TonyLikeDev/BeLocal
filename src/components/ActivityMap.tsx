import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngBoundsExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import type { Activity } from '@/components/ActivityCard';
import { Heart, Star } from 'lucide-react';

interface ActivityMapProps {
  activities: Activity[];
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

const FitBounds: React.FC<{ positions: [number, number][] }> = ({ positions }) => {
  const map = useMap();

  React.useEffect(() => {
    if (!positions || positions.length === 0) return;
    if (positions.length === 1) {
      map.setView(positions[0], 13);
      return;
    }
    const bounds: LatLngBoundsExpression = positions as LatLngBoundsExpression;
    map.fitBounds(bounds as any, { padding: [50, 50] });
  }, [map, positions]);

  return null;
};

const ActivityMap = ({ activities }: ActivityMapProps) => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  // Memoize positions so the reference doesn't change on hover/unhover re-renders
  // (which would cause FitBounds to run repeatedly and recenter the map).
  const positions = React.useMemo(() => {
    return activities
      .filter((a) => typeof a.lat === 'number' && typeof a.lng === 'number')
      .map((a) => [a.lat as number, a.lng as number] as [number, number]);
  }, [activities]);

  const defaultCenter: [number, number] = positions.length > 0 ? positions[0] : [16.0544, 108.2022];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sidebar list */}
  <aside className="lg:col-span-1 space-y-3 overflow-y-auto max-h-[700px] relative z-10">
        {activities.map((a) => {
          const isHovered = hoveredId === a.id;
          return (
            <div
              key={a.id}
              onClick={() => navigate(`/activity/${a.id}`)}
              onMouseEnter={() => setHoveredId(a.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`flex items-center gap-3 p-3 rounded-lg border bg-white cursor-pointer transition duration-150 ease-in-out ${
                isHovered ? 'shadow-lg border-emerald-100' : 'hover:shadow-md'
              }`}
            >
              <img src={a.image} alt={a.title} className="w-24 h-16 object-cover rounded" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-emerald-600 line-clamp-2">{a.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-4 w-4 fill-star text-star" />
                    <span className="font-semibold">{a.rating.toFixed(1)}</span>
                    <span className="text-xs text-muted-foreground">({a.reviewCount})</span>
                  </div>
                  <div className="text-sm text-muted-foreground">• {a.location}</div>
                </div>
              </div>
              <div className="pl-2">
                <Heart className="h-5 w-5 text-foreground" />
              </div>
            </div>
          );
        })}
      </aside>

      {/* Map */}
  <div className="lg:col-span-2 h-[700px] rounded-xl overflow-hidden relative z-0">
  {/* @ts-ignore - react-leaflet types in this project are causing strict mismatch, ignore for now */}
  <MapContainer center={defaultCenter} zoom={12} scrollWheelZoom={false} className="h-full w-full relative z-0" style={{ zIndex: 0 }}>
          {/* @ts-ignore */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FitBounds positions={positions} />

          {activities.map((activity) =>
              typeof activity.lat === 'number' && typeof activity.lng === 'number' ? (
                /* @ts-ignore */
                <Marker
                  key={activity.id}
                  position={[activity.lat as number, activity.lng as number]}
                  icon={customIcon}
                  eventHandlers={{
                    mouseover: (e: any) => {
                      try {
                        e.target.openPopup();
                      } catch (err) {}
                      setHoveredId(activity.id);
                    },
                    mouseout: (e: any) => {
                      try {
                        e.target.closePopup();
                      } catch (err) {}
                      setHoveredId(null);
                    },
                    click: () => {
                      // Navigate in-app (same tab) to the activity detail
                      navigate(`/activity/${activity.id}`);
                    }
                  }}
                >
                  <Popup>
                    <div className="min-w-[220px]">
                      <img src={activity.image} alt={activity.title} className="w-full h-28 object-cover rounded mb-2" />
                      <strong className="block text-sm">{activity.title}</strong>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Star className="h-4 w-4 fill-star text-star" />
                          <span className="font-semibold">{activity.rating.toFixed(1)}</span>
                          <span className="text-xs">({activity.reviewCount})</span>
                        </div>
                        <div className="text-sm font-bold text-primary">${activity.price}</div>
                      </div>
                      {/* removed View button: clicking marker opens new tab now */}
                    </div>
                  </Popup>
                </Marker>
              ) : null
            )}
        </MapContainer>
      </div>
    </div>
  );
};

export default ActivityMap;
