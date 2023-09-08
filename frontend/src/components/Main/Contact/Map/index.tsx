import { memo, useEffect, useState } from "react";
import useLeaflet from "hooks/useLeaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LeafletEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import { centerMap, defaultMapZoom } from "utils/map";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Map = () => {
    const [mapRef, setMapRef] = useState<LeafletEvent | null>(null);
    const { handleResize } = useLeaflet(mapRef);

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
            maxZoom={20}
            zoomControl={false}
            doubleClickZoom={false}
            dragging={false}
            trackResize={false}
            touchZoom={false}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={centerMap}></Marker>
        </MapContainer>
    );
};

export default memo(Map);
