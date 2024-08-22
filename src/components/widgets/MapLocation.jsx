import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import FoodCartContext from '../contexts/FoodCartContext'
import AuthContext from '../contexts/AuthContext'

export default function MapLocation({ isShow, close, onSelect }) {
    const defaultLocation = [13.7563, 100.5018] // center of thailand
    const { location } = useContext(FoodCartContext)
    const { user } = useContext(AuthContext)
    const [currentLocation, setCurrentLocation] = useState(location ? location.latlng : defaultLocation)
    const [isLoading, setIsLoading] = useState(true)

    async function setDefaultLocation() {
        let currPosition = currentLocation
        if (currPosition == defaultLocation) {
            currPosition = user.user && user.user.location_latlng ? [13.84341360315534, 100.75424194335938] : await getCurrentPosition() // change 'false' to user.location_latlng
        }
        const location = currPosition || defaultLocation
        setCurrentLocation(location)
        setIsLoading(false)
    }

    useEffect(() => {
        setDefaultLocation()
    }, []);

    return (
        !isLoading &&
        <dialog id='food-option-modal' className={`modal z-10 max-w-full ${isShow ? 'modal-open' : 'modal-closed'}`}>
            <div className="modal-box max-w-2xl">
                <div className='text-center text-xl mb-3'>Choose your location</div>
                <MapContainer center={currentLocation} zoom={currentLocation === defaultLocation ? 10 : 15} style={{ height: '400px', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
    }, [defaultPosition]);

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
        <Marker position={position} />
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
            }
        )
    })
}