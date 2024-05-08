"use client";

import { getUserInfo } from '@/actions/user/getUserInfo';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const UserAadharCardPage = ({ params }) => {

  const { uid } = params;

  const handleDownload = () => {
    window.print()
  };

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = async () => {
      const res = await getUserInfo(uid);
      setLoading(false);
      if (res.success) {
        setUserInfo(JSON.parse(res.data));
      }
      else {
        toast.error(res.message);
      }
    }
    user();
  }, [])

  // console.log(userInfo);

  return (
    <>
      <div className="">
        {
          loading ? <span>Loading</span> :
            <>
              <div className="flex flex-col items-center gap-8 p-4">
                <div className="printable-content flex flex-col items-start space-y-4 justify-center border-2 rounded-2xl p-4 bg-white xl:w-5/12 lg:w-5/12 md:w-7/12 sm:w-8/12 w-full mx-auto">
                  <Image className="select-none w-full" src="/aadharcard-top.jpg" width={500} height={500} alt='adharcard' priority />
                  <div className="flex gap-8">
                    <Image src={userInfo?.user_image || "/user-image.jpg"} width={500} height={500} className="aspect-square w-28 h-28 select-none" alt='user-image' priority />
                    <div className="">
                      <h1 className='text-lg font-medium capitalize'>{userInfo?.fname || "fname"} {userInfo?.lname || "lname"}</h1>
                      <p>Gender: <span className='font-medium'>{userInfo?.gender}</span></p>
                      <p>DOB: <span className='font-medium'>{new Date(userInfo?.dob).toLocaleDateString()}</span></p>
                      <p>Mobile: <span className='font-medium'>{userInfo?.mobile}</span></p>
                      <p className='text-xl mt-3'>UID: <span className='text-xl font-bold'>{userInfo?.uid}</span></p>
                    </div>
                  </div>
                  <Image src="/aadharcard-bottom.png" width={500} height={500} className="select-none w-full" alt='user-image' />
                </div>

                <div className="printable-content flex flex-col items-start justify-between space-y-4 border-2 rounded-2xl p-5 bg-white xl:w-5/12 lg:w-5/12 md:w-7/12 sm:w-8/12 w-full mx-auto h-[318px]">
                  <Image className="select-none w-full" src="/aadharcard-top.jpg" width={500} height={500} alt='adharcard' priority />
                  <div className="">
                    <h1 className='text-lg font-medium'>Resident of: <span>{userInfo?.address}, {userInfo?.city}, {userInfo?.state}- {userInfo?.pincode}</span></h1>
                    <p className='text-xl mt-3'>UID: <span className='text-xl font-bold'>{userInfo?.uid}</span></p>
                  </div>
                  <Image src="/aadharcard-bottom.png" width={500} height={500} className="select-none w-full" alt='user-image' priority />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <button className='my-4 bg-blue-500 text-white px-4 py-1.5 rounded-lg shadow-lg text-center' onClick={handleDownload}>Download Aadhar Card</button>
              </div>
            </>
        }
      </div>
    </>
  )
}

export default UserAadharCardPage