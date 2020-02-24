import React from 'react';
import RoomFilter from './RoomFilter';
import RoomList from './RoomList';
import { withRoomConsumer } from '../context';
import Loading from './Loading';
import MyMap from './Map';
import Title from './Title';


function RoomContainer({ context }) {
    const { loading, sortedRooms, rooms } = context;

    if (loading) {
        return <Loading />
    }
    return (
        <>
            <div style={{ marginTop: "40px" }}>
                <Title title='search rooms' />
            </div>
            <wrapper id="roomsWrapper">
                <RoomFilter rooms={rooms} />
                <RoomList rooms={sortedRooms} />
                <MyMap rooms={rooms} />
            </wrapper>
        </>
    );
};


export default withRoomConsumer(RoomContainer);