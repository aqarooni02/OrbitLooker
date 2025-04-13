export const SatelliteCard = ({ satellite }) => {
    return (
        <div className="card">
            {satellite && <>
                <h3>Name: {satellite.name}</h3>
                <h3>NORAD ID: {satellite.noradId}</h3>
            </>
            }


        </div>
    )
}