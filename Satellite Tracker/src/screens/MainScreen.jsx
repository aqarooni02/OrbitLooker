import { useState } from "react";
import SatelliteGlobe from "../components/SatelliteGlobe";

export const MainScreen = () => {
    const [group, setGroup] = useState("last-30-days");

    const satelliteGroups = [
        { label: "Last 30 Days", value: "last-30-days" },
        { label: "Starlink", value: "starlink" },
        { label: "GPS", value: "gps-ops" },
        { label: "Weather", value: "weather" },
        { label: "ISS", value: "stations" },
        { label: "Iridium", value: "iridium" },
        { label: "Geostationary", value: "geo" },
    ];

    return (
        <div className="mainscreen">
            <h1>Welcome to Orbit Looker</h1>
            <p>Track real-time satellite orbits from selected groups!</p>

            <select
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                style={{ padding: "0.5rem", fontSize: "1rem", marginBottom: "1rem" }}
            >
                {satelliteGroups.map((g) => (
                    <option key={g.value} value={g.value}>
                        {g.label}
                    </option>
                ))}
            </select>


            <SatelliteGlobe group={group} />
        </div>
    );
};
