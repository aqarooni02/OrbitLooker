import { useState } from "react";
import SatelliteGlobe from "../components/SatelliteGlobe";
import { SatelliteCard } from "../components/SatelliteCard";

export const MainScreen = () => {
    const [group, setGroup] = useState("last-30-days");
    const [selectedSatellite, setSelectedSatellite] = useState()

    const satelliteGroups = [
        { label: "Last 30 Days", value: "last-30-days" },
        { label: "Starlink", value: "starlink" },
        { label: "GPS", value: "gps-ops" },
        { label: "Weather", value: "weather" },
        { label: "ISS", value: "stations" },
        { label: "Iridium", value: "iridium" },
        { label: "Geostationary", value: "geo" },
    ];

    const selectSatellite = async (satellite) => {
        try {
            const res = await fetch(`https://celestrak.org/satcat/records.php?CATNR=${satellite.noradId}&FORMAT=json`);
            const data = await res.json();
    
            if (data.length > 0) {
                const extra = data[0];
                setSelectedSatellite({
                    ...satellite,
                    launchDate: extra.LAUNCH_DATE,
                    owner: extra.OWNER,
                    objectType: extra.OBJECT_TYPE,
                    apogee: extra.APOGEE,
                    perigee: extra.PERIGEE,
                    inclination: extra.INCLINATION,
                    launchSite: extra.LAUNCH_SITE,
                });
            } else {
                setSelectedSatellite(satellite); // fallback
            }
        } catch (err) {
            console.error("Failed to fetch SATCAT info:", err);
            setSelectedSatellite(satellite); // fallback
        }
    };

    const handleChangeGroup = (e) => {
        setSelectedSatellite()
        setGroup(e.target.value)
    }


    return (
        <div className="mainscreen">
            <h1>Welcome to Orbit Looker</h1>
            <p>Track real-time satellite orbits from selected groups!</p>

            <select
                value={group}
                onChange={handleChangeGroup}
                style={{ padding: "0.5rem", fontSize: "1rem", marginBottom: "1rem" }}
            >
                {satelliteGroups.map((g) => (
                    <option key={g.value} value={g.value}>
                        {g.label}
                    </option>
                ))}
            </select>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                <SatelliteGlobe group={group} selectSatellite={selectSatellite} />
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '5%', textAlign: 'left'}}>
                    {!selectedSatellite && <h2>Click on a point to see more details!</h2>}
                    <SatelliteCard satellite={selectedSatellite} />
                </div>
            </div>
        </div>
    );
};
