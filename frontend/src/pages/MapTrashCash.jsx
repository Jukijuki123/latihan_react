"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";

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

export default function MapTrashCash() {
  const navigate = useNavigate();

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

        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]}>
            <Popup>
              <div>
                <h3 className="font-bold">{loc.name}</h3>
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
      </MapContainer>
    </div>
  );
}
