import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polygon,
} from "@react-google-maps/api";
import Box from "@mui/material/Box";

const containerStyle = {
  width: "90%",
  height: "90vh",
};
const options = {
  fillOpacity: 0,
  strokeColor: "red",
  strokeWeight: 2,
};

function Map() {
  const [paths, setPaths] = React.useState([]);
  React.useEffect(() => {
    fetch(`http://localhost:8080/`)
      .then((res) => res.json())
      .then((data) => setPaths(data))
      .catch((Err) => console.log(Err));
  }, []);
  const center = paths[0];
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBHULU2zApDcYnnj3Mrg4mEaq5q3mdsO68",
  });

  //   const [map, setMap] = React.useState(null);

  //   const onLoad = React.useCallback(function callback(map) {
  //     // This is just an example of getting and using the map instance!!! don't just blindly copy!
  //     const bounds = new window.google.maps.LatLngBounds(center);
  //     // map.fitBounds(bounds);

  //     setMap(map);
  //   }, []);

  //   const onUnmount = React.useCallback(function callback(map) {
  //     setMap(null);
  //   }, []);

  return isLoaded ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // border: "4px solid black",
        p: "10px",
        borderRadius: "10px",
      }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
        //   onLoad={onLoad}
        //   onUnmount={onUnmount}
      >
        {paths.map((item) => {
          // console.log({ lat: item.lat, lng: item.lng });
          return (
            <Marker
              position={{ lat: item.lat, lng: item.lng }}
              key={item.lat}
              // icon={"wing.png"}
              // fillOpacity={"green"}
              style={{ with: 1 }}
            />
          );
          // <Marker key={item.lat} position={{ item }} />;
        })}
        <Polygon
          //   onLoad={onLoad}
          paths={paths}
          options={options}
        />
      </GoogleMap>
    </Box>
  ) : (
    <></>
  );
}

export default React.memo(Map);
