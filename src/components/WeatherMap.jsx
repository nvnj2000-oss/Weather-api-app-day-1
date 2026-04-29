import { useEffect, useMemo } from 'react'
import { divIcon } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function MapRecenter({ center }) {
  const map = useMap()

  useEffect(() => {
    map.flyTo(center, 9, {
      animate: true,
      duration: 1.1,
    })
  }, [center, map])

  return null
}

function WeatherMap({ apiKey, current, location }) {
  const center = useMemo(() => [location.lat, location.lon], [location.lat, location.lon])
  const markerIcon = useMemo(
    () =>
      divIcon({
        className: 'weather-map-marker',
        html: `<span>${Math.round(current.temp_c)}°</span>`,
        iconSize: [54, 54],
        iconAnchor: [27, 27],
        popupAnchor: [0, -26],
      }),
    [current.temp_c],
  )

  return (
    <section className="glass-card map-card">
      <div className="section-heading">
        <div>
          <p className="card-label">Live Weather Map</p>
          <h2>{location.name} Radar View</h2>
        </div>
      </div>

      <div className="map-frame">
        <MapContainer center={center} zoom={9} scrollWheelZoom className="weather-map">
          <MapRecenter center={center} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <TileLayer
            attribution="Weather tiles by WeatherAPI"
            opacity={0.42}
            url={`https://tile.weatherapi.com/v1/clouds/{z}/{x}/{y}.png?key=${apiKey}`}
          />
          <Marker position={center} icon={markerIcon}>
            <Popup>
              <div className="map-popup">
                <strong>{location.name}</strong>
                <span>{Math.round(current.temp_c)}°C</span>
                <p>{current.condition.text}</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  )
}

export default WeatherMap
