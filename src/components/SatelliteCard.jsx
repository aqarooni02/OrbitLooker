export const SatelliteCard = ({ satellite }) => {
    return (
        <div className="card" style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
            {satellite ? (
                <>
                    <h3>{satellite.name}</h3>
                    <p><strong>NORAD ID:</strong> {satellite.noradId}</p>
                    {satellite.launchDate && (
                        <>
                            <p><strong>Launch Date:</strong> {satellite.launchDate}</p>
                            <p><strong>Owener:</strong> {satellite.owner}</p>
                            <p><strong>Object Type:</strong> {satellite.objectType}</p>
                            <p><strong>Apogee (km):</strong> {satellite.apogee}</p>
                            <p><strong>Perigee (km):</strong> {satellite.perigee}</p>
                            <p><strong>Inclination (°):</strong> {satellite.inclination}</p>
                            <p><strong>Launch Site:</strong> {satellite.launchSite}</p>
                        </>
                    )}
                </>
            ) : (
                <p>Select a satellite to see more details.</p>
            )}
        </div>
    );
};
