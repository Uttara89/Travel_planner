import React, { useEffect } from 'react';
import { Button } from '../button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout ,useGoogleLogin} from '@react-oauth/google';
import { useNavigate, useNavigation } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import{ useState } from 'react';
import axios from 'axios';
function Header() {
  const user = localStorage.getItem('user');
  const userDetails = user ? JSON.parse(user) : null;
  const [openDailog, setOpenDailog] = useState(false);

  useEffect(() => {
    if (userDetails) {
      console.log('User details:', userDetails);
    } else {
      console.log('No user details found in localStorage');
    }
  }, [userDetails]);

  const login = useGoogleLogin({
    onSuccess: async (resp) => {
      console.log('Login Response:', resp);
      await GetUserProfile(resp);
    },
    onError: (error) => console.log('Login Error:', error)
  });

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
      window.location.reload();
      // Optionally, update state or perform other actions with user info
    } catch (error) {
      console.error('Error fetching user info:', error.response?.data || error.message);
      toast.error('Failed to fetch user information. Please try again.');
    }
  };

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img src="/logo.svg" alt="" />
      <div>
        {userDetails ? (
          <div className='flex items-center gap-3'>
            <a href="/my-trips">
            <Button variant="outline" className="rounded-full">My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger className='bg-white'>
                <img src={userDetails.picture} className='h-[35px] w-[35px] rounded-full' alt="User" />
              </PopoverTrigger>
              <PopoverContent >
                <h2  onClick={()=>{
                  googleLogout();
                  localStorage.removeItem('user');
                  window.location.reload();
                }}>Log out</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={()=>{
            setOpenDailog(true);
          }}>Sign in</Button>
        )}
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
  );
}

export default Header;