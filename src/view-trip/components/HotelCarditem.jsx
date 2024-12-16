import React from 'react'
import { Link } from 'react-router-dom'
import{ useState, useEffect } from 'react';
import { GetPLaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';

function HotelCarditem({hotel, index}) {
  const [PhotoUrl, setPhotoUrl] = useState();  
  useEffect(() => {
    if (hotel) {
      GetPLacePhoto();
    }
  }, [hotel]);

  const GetPLacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
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

    <Link
            key={index}
            to={`https://www.google.com/maps/search/?api=1&query=`+hotel.hotelName+" "+hotel.hotelAddress}
            target="_blank"
            className="hover:scale-105 transition-all cursor-pointer"
          >
            <div>
              <img src={PhotoUrl} alt="Hotel" className="rounded-xl h-[200px] w-full object-cover" />

              <div className="my-2">
                <h2 className="font-medium">{hotel.hotelName}</h2>
                <h2 className="text-xs text-gray-500">{hotel.hotelAddress}</h2>
                <h2 className="text-xs text-gray-700">{hotel.priceRange}</h2>
                <h2 className="text-xs text-gray-700">{hotel.ratingDescription}</h2>
              </div>
            </div>
          </Link>
  )
}

export default HotelCarditem