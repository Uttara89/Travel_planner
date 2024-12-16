import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { GrSend } from 'react-icons/gr';
import { GetPLaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';


function InfoSection({ trip }) {

  const [PhotoUrl, setPhotoUrl] = useState();  
  useEffect(() => {
    if (trip) {
      GetPLacePhoto();
    }
  }, [trip]);

  const GetPLacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
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
    <div>
      <img
        src={PhotoUrl}
        alt=""
        className="h-[340px] w-full object-cover rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              {trip.userSelection?.noOfDays} Days 🗓️
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              {trip.userSelection?.budget} Budget 💳
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              No. of Traveler: {trip.userSelection?.traveler} 🧑🏽‍🤝‍🧑🏻
            </h2>
          </div>
        </div>
        <Button>
          <GrSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;