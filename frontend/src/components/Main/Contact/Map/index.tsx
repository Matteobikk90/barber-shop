import { memo } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { barberCoordinates, containerStyle } from "utils/map";

function Map() {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY!
    });

    return (
        isLoaded && (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={barberCoordinates}
                zoom={10}
                onLoad={(map) => {
                    const bounds = new window.google.maps.LatLngBounds(
                        barberCoordinates
                    );
                    map.fitBounds(bounds);
                }}
            >
                <MarkerF position={barberCoordinates} />
            </GoogleMap>
        )
    );
}

export default memo(Map);
