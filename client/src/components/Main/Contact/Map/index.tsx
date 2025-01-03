import { memo, useEffect, useState } from "react";
import useLeaflet from "hooks/useLeaflet";
import { MapContainer, Marker, Popup } from "react-leaflet";
import { LeafletEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
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
      <Marker position={centerMap} icon={marker}>
        <Popup>
          Blendon Barber Shop <br /> Ti aspettiamo !
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default memo(Map);
