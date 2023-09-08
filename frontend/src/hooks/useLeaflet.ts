import { useCallback } from "react";
import { centerMap, defaultMapZoom } from "utils/map";

const useLeaflet = (mapRef: any) => {
    const handleResize = useCallback(() => {
        mapRef?.target.invalidateSize();
        mapRef.target.flyTo(centerMap, defaultMapZoom);
    }, [mapRef?.target]);

    return { handleResize };
};

export default useLeaflet;
