import { useCallback } from "react";
import { centerMap, defaultMapZoom } from "utils/map";
import L from "leaflet";

const useLeaflet = (mapRef: any) => {
    const handleResize = useCallback(() => {
        mapRef?.target.invalidateSize();
        mapRef.target.flyTo(centerMap, defaultMapZoom);
    }, [mapRef?.target]);

    const marker = L.icon({
        iconUrl: "https://blendon-barber-shop.it/assets/images/pin.svg",
        iconSize: [50, 50],
        popupAnchor: [0, 0]
    });

    return { handleResize, marker };
};

export default useLeaflet;
