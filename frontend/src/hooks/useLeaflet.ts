import { useCallback } from "react";
import { centerMap, defaultMapZoom } from "utils/map";
import L from "leaflet";
import pin from "assets/images/pin.svg";

const useLeaflet = (mapRef: any) => {
    const handleResize = useCallback(() => {
        mapRef?.target.invalidateSize();
        mapRef.target.flyTo(centerMap, defaultMapZoom);
    }, [mapRef?.target]);

    const marker = L.icon({
        iconUrl: pin,
        iconSize: [50, 50],
        popupAnchor: [0, 0]
    });

    return { handleResize, marker };
};

export default useLeaflet;
