
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { toast } from "sonner"


import { AI_Prompt, SelectBudgetOptions, SelectTravelList } from "@/constants/options";

import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { chatSession } from "@/service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({})
  const [openDailog, setOpenDailog] = useState(false);
  const [loading,setLoading]=useState(false);

const navigate = useNavigate();

  const handelInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const login = useGoogleLogin({
    onSuccess: async (resp) => {
      console.log('Login Response:', resp);
      await GetUserProfile(resp);
    },
    onError: (error) => console.log('Login Error:', error)
  });

  const OnGenerateTrip = async () => {

    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDailog(true)
      return;
    }

    if (formData?.noOfDays > 6 && !formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please all fields")
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_Prompt.replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)

    // console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text())
  }

 

  const SaveAiTrip= async(TripData)=>{
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'))
    const docID= Date.now().toString()
    await setDoc(doc(db, "AITrips", docID), {
      userSelection:formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id:docID
    });
    setLoading(false);
    navigate('/view-trip/'+docID)
  }

  const GetUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get('https://openidconnect.googleapis.com/v1/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: 'application/json',
        },
      });
  
      console.log('User Info:', response.data);
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenDailog(false);
      OnGenerateTrip(); 
      // Optionally, update state or perform other actions with user info
    } catch (error) {
      console.error('Error fetching user info:', error.response?.data || error.message);
      toast.error('Failed to fetch user information. Please try again.');
    }
  };

  
 
  
  return (
    <div className='sm:px-10 md:px-32 lg:px56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️</h2>
      <p className='mt-3 text-gray-500 text-xl'>just provide some basic information, and our trip planner will generate a customized itineary based on your preferences</p>

      <div>
        <div className='mt-20' flex flex-col gap-9>
          <h2 className='text-cl my-3 font-medium'>What is your destination of choice</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handelInputChange('location', v) }
            }}
          />
        </div>
        <div><h2 className='text-cl my-3 font-medium'>How many days are you planning to stay for?</h2>
          <Input placeholder='ex.1' type='number'
            onChange = {(e) => handelInputChange('noOfDays', e.target.value)} />
        </div>
      </div>
      <div>
        <h2 className ='text-cl my-3 font-medium'>What is your budget?</h2>
        <div className ="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div key={index}
              onClick={() => handelInputChange('budget', item.title)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
            ${formData?.budget == item.title && 'shadow-lg border-gray-600 text-teal-600'}`}>
              <h2 className="text-3xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm ">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className='text-cl my-3 font-medium'>Who do you plan to travel with?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelList.map((item, index) => (
            <div onClick={() => handelInputChange('traveler', item.people)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer 
            ${formData?.traveler == item.people && 'shadow-lg border-black text-cyan-600'}
            `}>
              <h2 className="text-3xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>


      <div className="my-10 justify-end flex">
        <Button 
        disabled={loading}
        onClick={OnGenerateTrip}>
          {loading?
        <AiOutlineLoading className="h-7 w-7 animate-spin"/>: 'Generate Trip'
  
        }
           🤖</Button>
      </div>
      <Dialog open={openDailog}>
        
        <DialogContent>
          <DialogHeader>
            
            <img src="logo.svg" alt="" className="w-13 h-12" />
            <h2 className="font-bold text-lg mt-7">Sign in With Google</h2>
            <p>Sign in to the App with Google authentication securely</p>
            <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
            <FcGoogle className="w-10 h-7" />
            Sign in with Google
            
            </Button>
            
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>
  )
}

export default CreateTrip