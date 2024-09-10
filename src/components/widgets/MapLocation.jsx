import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import mapMarkerIcon from '../../assets/map-pin.png'

const markerIcon = new L.Icon({
    iconUrl: mapMarkerIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [32, 32],
    shadowAnchor: [16, 32],
})


export default function MapLocation({ location, isShow, close, onSelect }) {
    const defaultLocation = { lat: 13.7563, lng: 100.5018 } // center of thailand
    const [currentLocation, setCurrentLocation] = useState(null)

    async function setDefaultLocation() {
        if (location != null) {
            if (location != '') {
                setCurrentLocation(location.latlng)
            } else {
                const userPosition = await getCurrentPosition()
                const targetPosition = userPosition ? { lat: userPosition[0], lng: userPosition[1] } : defaultLocation
                setCurrentLocation(targetPosition)
            }
        }
    }

    useEffect(() => {
        setDefaultLocation()
    }, [location])

    return (
        isShow &&
        <dialog id='map-location-modal' className='modal modal-open z-10 max-w-full'>
            <div className="modal-box max-w-2xl">
                <div className='text-center text-xl mb-3'>Choose your location</div>
                <MapContainer center={currentLocation} zoom={currentLocation === defaultLocation ? 10 : 15} style={{ height: '400px', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationMarker
                        onSelect={onSelect}
                        defaultPosition={currentLocation === defaultLocation ? null : currentLocation}
                        setCurrentLocation={setCurrentLocation} />
                </MapContainer>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={close}>close</button>
            </form>
        </dialog>
    )
}

function LocationMarker({ onSelect, defaultPosition, setCurrentLocation }) {
    const [position, setPosition] = useState(defaultPosition)

    useEffect(() => {
        setPosition(defaultPosition)
    }, [defaultPosition])

    useMapEvents({
        async click(event) {
            const { latlng } = event
            const address = await getAddressLocation(latlng)
            setCurrentLocation(latlng)
            setPosition(latlng)
            onSelect({ address, latlng })
        }
    })

    return position ? (
        <Marker position={position} icon={markerIcon} />
    ) : null
}

async function getAddressLocation({ lat, lng }) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
    try {
        const res = await axios.get(url)
        const data = res.data
        if (data) {
            return data.display_name
        } else {
            return null
        }
    } catch (err) {
        console.log('Error fetching address:', err.message)
        return null
    }
}

async function getCurrentPosition() {
    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                resolve([latitude, longitude])
            },
            (error) => {
                resolve(null)
            }
        )
    })
}