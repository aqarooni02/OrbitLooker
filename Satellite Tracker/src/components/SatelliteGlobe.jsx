import React, { useEffect, useState } from "react";
import Globe from "react-globe.gl";
import * as satellite from "satellite.js";

export default function SatelliteGlobe({ group }) {
  const [satellites, setSatellites] = useState([]);

  useEffect(() => {
    const fetchTLEs = async () => {
      try {
        const res = await fetch(
          `https://celestrak.org/NORAD/elements/gp.php?GROUP=${group}&FORMAT=tle`
        );
        const text = await res.text();
        const lines = text.trim().split("\n");

        const satObjects = [];

        for (let i = 0; i < lines.length; i += 3) {
          const name = lines[i].trim();
          const tle1 = lines[i + 1];
          const tle2 = lines[i + 2];

          try {
            const satrec = satellite.twoline2satrec(tle1, tle2);
            const now = new Date();
            const posVel = satellite.propagate(satrec, now);

            if (!posVel.position) continue;

            const gmst = satellite.gstime(now);
            const geo = satellite.eciToGeodetic(posVel.position, gmst);

            satObjects.push({
              name,
              lat: satellite.degreesLat(geo.latitude),
              lng: satellite.degreesLong(geo.longitude),
            });
          } catch (err) {
            console.warn(`Failed to parse TLE for ${name}`, err);
          }
        }

        setSatellites(satObjects);
      } catch (err) {
        console.error("Failed to fetch TLE data:", err);
      }
    };

    fetchTLEs();
  }, [group]);

  return (
    <div>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        pointsData={satellites}
        pointLat="lat"
        pointLng="lng"
        pointLabel="name"
        pointRadius={1}
        pointAltitude={() => 0.01}
        pointColor={() => "orange"}
        height={600}
        bumpImageUrl={"//unpkg.com/three-globe/example/img/earth-topology.png"}
        backgroundColor="rgba(0,0,0,0)"
        onPointClick={(point) => console.log(point)}
      />
    </div>
  );
}
