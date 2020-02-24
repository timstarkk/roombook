import React, { useState } from 'react';
import { useContext } from 'react';
import { RoomContext } from '../context';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { Link } from 'react-router-dom';

let MyCurrentRoom = {};

function Map() {
    const context = useContext(RoomContext);
    const [selectedRoom, setSelectedRoom] = useState(null);

    let tempRooms = context.sortedRooms;
    console.log(tempRooms);

    console.log('hello again');


    return (
        <GoogleMap
            defaultZoom={13}
            defaultCenter={{ lat: 30.2672, lng: -97.7431 }}
        >

            {tempRooms.map((room, index) => {
                return (
                    <Marker
                        key={index}
                        position={{ lat: room.coordinates[0], lng: room.coordinates[1] }}
                        onClick={() => {
                            setSelectedRoom(room);
                        }} />)
            })}

            {selectedRoom && (
                < InfoWindow
                    position={{
                        lat: selectedRoom.coordinates[0], lng: selectedRoom.coordinates[1]
                    }}
                    onCloseClick={() => {
                        setSelectedRoom(null);
                    }}
                >
                    <article className="info-room">
                        <div className="info-img-container">
                            <img src={selectedRoom.images[0]} alt="room option" className="info-image" />
                            <div className="info-price-top">
                                <h6>${selectedRoom.price}</h6>
                                <p>per night</p>
                            </div>
                            <Link to={`/rooms/${selectedRoom.slug}`} className="btn-primary info-room-link">Features</Link>
                        </div>
                        <h4 className="info-room-info center">
                            {selectedRoom.name}
                        </h4>
                    </article>

                </InfoWindow>
            )
            }
        </GoogleMap >
    )
};

function SingleMap() {
    const context = useContext(RoomContext);

    console.log(MyCurrentRoom);
    let currentCoords = {
        lat: MyCurrentRoom.coordinates[0],
        lng: MyCurrentRoom.coordinates[1]
    }
    return (
        <GoogleMap
            defaultZoom={13}
            defaultCenter={currentCoords}
        >
            <Marker position={currentCoords} />
        </GoogleMap>
    )
};

const WrappedMap = withScriptjs(withGoogleMap(Map))

const SingleWrappedMap = withScriptjs(withGoogleMap(SingleMap))

export default function MyMap({ rooms }) {
    const context = useContext(RoomContext);
    console.log(rooms);
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "100%", height: "100%" }}>
                <WrappedMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCCoZpMrGdo6v9g9roPbPqhAJW1FyEBSSs`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div className="mapContainer" />}
                    mapElement={<div style={{ height: `100%` }} />} />
            </div>
        </div>
    )
};

export function MySingleMap({ room }) {
    MyCurrentRoom = room;
    const context = useContext(RoomContext);
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "80%", height: "100%" }}>
                <SingleWrappedMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCCoZpMrGdo6v9g9roPbPqhAJW1FyEBSSs`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div className="singleMapContainer" style={{ height: "400px", marginBottom: "40px" }} />}
                    mapElement={<div style={{ height: `100%` }}
                        room={room} />} />
            </div>
        </div>
    )
}
