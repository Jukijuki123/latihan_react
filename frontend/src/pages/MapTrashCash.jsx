"use client";
import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* Fix icon */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

/* ICONS */
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const bankIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const nearestIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

/* DATA LOKASI */
const locations = [
  {
    id: 1,
    name: "Bank Sampah Jakarta Timur",
    lat: -6.194455115834534,
    lng: 106.88727397366509,
  },
  {
    id: 2,
    name: "Bank Sampah Jakarta Selatan",
    lat: -6.261,
    lng: 106.812,
  },
  {
    id: 3,
    name: "Bank Sampah Jakarta Pusat",
    lat: -6.189648446680385,
    lng: 106.83845513589276,
  },
];

function AutoCenter({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lng], 14);
    }
  }, [position, map]);

  return null;
}



const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function MapTrashCash() {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => alert("Tidak bisa mendapatkan lokasi Anda")
    );
  }, []);

  const nearestLocation = useMemo(() => {
    if (!userLocation) return null;

    let nearest = null;
    let minDistance = Infinity;

    locations.forEach((loc) => {
      const distance = getDistance(
        userLocation.lat,
        userLocation.lng,
        loc.lat,
        loc.lng
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearest = loc;
      }
    });

    return nearest;
  }, [userLocation]);

  const handleSelect = (loc) => {
    navigate("/trashcash", { state: { lokasi: loc } });
  };

  return (
    <div className="h-screen">
      <MapContainer
        center={[-6.2, 106.816]}
        zoom={12}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Auto Center */}
        {userLocation && <AutoCenter position={userLocation} />}

        {/* Garis ke lokasi terdekat */}
        {userLocation && nearestLocation && (
          <Polyline
            positions={[
              [userLocation.lat, userLocation.lng],
              [nearestLocation.lat, nearestLocation.lng],
            ]}
            pathOptions={{ color: "green", weight: 4 }}
          />
        )}

        {/* Marker Bank Sampah */}
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={
              nearestLocation?.id === loc.id
                ? nearestIcon
                : bankIcon
            }
          >
            <Popup>
              <div>
                <h3 className="font-bold">{loc.name}</h3>
                {nearestLocation?.id === loc.id && (
                  <p className="text-green-600 text-sm">
                    Lokasi Terdekat 🚀
                  </p>
                )}
                <button
                  onClick={() => handleSelect(loc)}
                  className="mt-2 px-4 py-1 bg-green-600 text-white rounded"
                >
                  Pilih Lokasi
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Marker User */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={userIcon}
          >
            <Popup>Lokasi Anda</Popup>
          </Marker>
        )}
      </MapContainer>

    </div>
  );
}
