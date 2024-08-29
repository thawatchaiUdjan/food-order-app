import React, { createContext, useState } from 'react'
import MapLocation from '../widgets/MapLocation'

const MapLocationModalContext = createContext()

export function MapLocationModalProvider({ children }) {
    const [isShow, setIsShow] = useState(false)
    const [onSelect, setOnSelect] = useState(null)
    const [location, setLocation] = useState(null)

    function openMapLocation(location, onSelectLocation) {
        setLocation(location)
        setOnSelect(() => onSelectLocation)
        setIsShow(true)
    }

    function close() {
        setIsShow(false)
    }

    return (
        <MapLocationModalContext.Provider value={{ openMapLocation, close }}>
            {children}
            <MapLocation
                location={location}
                isShow={isShow}
                close={close}
                onSelect={onSelect}
            />
        </MapLocationModalContext.Provider>
    )
}

export default MapLocationModalContext