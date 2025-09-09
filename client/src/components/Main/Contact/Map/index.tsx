import useLeaflet from "hooks/useLeaflet";
import { LeafletEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import { memo, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { centerMap, defaultMapZoom } from "utils/map";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Map = () => {
  const [mapRef, setMapRef] = useState<LeafletEvent | null>(null);
  const { handleResize, marker } = useLeaflet(mapRef);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <MapContainer
      whenReady={setMapRef as any}
      tw="bg-white h-full w-full"
      center={centerMap}
      zoom={defaultMapZoom}
      minZoom={5}
      maxZoom={18}
      trackResize={false}
      touchZoom={false}
      scrollWheelZoom={false}
      dragging={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={centerMap} icon={marker}>
        <Popup>
          Blendon Barber Shop <br /> Ti aspettiamo !
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default memo(Map);
