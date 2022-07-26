import React, { useState, useEffect } from 'react';
import useFetch from './useFetch';

export default function TripList() {
    const [url, setUrl] = useState("default url string");
    const {data:trips, isPending, error } = useFetch(url,{type:'GET'});
  //use this value according to your need in component.
    return (
        <div className='trip-list'>
            <h1>TripList</h1>
            <ul>
                {trips.map(trip => (
                    <li key={trip.id}>
                        <h3>{trip.tittle}</h3>
                        <p>{trip.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
