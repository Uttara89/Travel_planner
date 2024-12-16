import React from 'react';
import PlaceCarditem from './PlaceCarditem';

function PlacesToVisit({ trip }) {
    return (
        <div>
            <h2 className="font-bold text-lg">Places to Visit</h2>

            <div className=''>
                {trip.tripData?.itinerary ? (
                    // Sort the entries to ensure day1 comes before day2
                    Object.entries(trip.tripData.itinerary)
                        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB)) // Sort by key (day1, day2, etc.)
                        .map(([day, details], index) => (
                            <div key={index} className="my-4 ">
                                <h2 className="font-medium text-lg ">{day}</h2>


                                <div className="ml-4 grid md:grid-cols-2 gap-5">
                                    {details.plan.map((place, idx) => (
                                        <div key={idx} className="my-2">
                                            <PlaceCarditem place={place} />
                                            
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                ) : (
                    <p>No itinerary available.</p>
                )}
            </div>
        </div>
    );
}

export default PlacesToVisit;
