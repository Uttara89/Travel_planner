import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react';
import { GetPLaceDetails,PHOTO_REF_URL } from '@/service/GlobalApi';
function PlaceCarditem({place}) {
  const [PhotoUrl, setPhotoUrl] = useState();  
  useEffect(() => {
    if (place) {
      GetPLacePhoto();
    }
  }, [place]);

  const GetPLacePhoto = async () => {
    const data = {
      textQuery: place?.placeName,
    };
    try {
      const result = await GetPLaceDetails(data);
      console.log(result.data.places[0].photos[3].name);
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',result.data.places[0].photos[3].name)
      setPhotoUrl(PhotoUrl);
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  }; 
  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=`+place.placeName} target="_blank">
    <div className='border rounded-xl p-3 mt-5 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src={PhotoUrl?PhotoUrl:"/placeholder.jpg"} alt=""  className='w-[150px] h-[100px] rounded-xl object-cover'/>
        <div>
            <h2 className='font-bold text-lg'> {place.placeName}</h2>
            <h2 className='font-semibold text-sm text-gray-400'>{place.placeDetails}</h2>
            <h2 className='font-semibold text-sm text-gray-700'>Time: {place.timeToVisit}</h2>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCarditem