"use client";

import { getUserInfo } from "@/actions/user/getUserInfo";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useQRCode } from "next-qrcode";

const UserAadharCardPage = ({ params }) => {

  const QRCode = useQRCode().Image;
  const { uid } = params;

  const handleDownload = () => {
    window.print();
  };

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const user = async () => {
      const res = await getUserInfo(uid);
      setLoading(false);
      if (res.success) {
        setUserInfo(JSON.parse(res.data));
      } else if (res.message === "Invalid Uid") {
        setErrorMsg("setErrorMsg");
      }
    };
    user();
  }, []);

  return (
    <>
      <div className="">
        {loading ? (
          <div className="p-4 text-blue-600">Loading</div>
        ) : errorMsg !== "" ? (
          <div className="p-4 text-rose-500">Invalid UID</div>
        ) : userInfo === null ? (
          <div className="p-4 text-rose-500">No Aadhar Card Found</div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-8 p-4">
              <div className="printable-content flex flex-col items-start space-y-2 justify-center border-2 border-dotted rounded-2xl p-4 bg-white xl:w-5/12 lg:w-5/12 md:w-7/12 sm:w-8/12 w-full mx-auto relative">
                <span className="absolute text-sm inset-x-0 text-center left-auto w-full bottom-32 text-gray-300/50 font-bold h-fit -rotate-12">This is FAKE Generated Aadhar Card, Do not use as ID proof</span>
                <Image
                  className="select-none w-full z-10"
                  src="/aadharcard-top.jpg"
                  width={500}
                  height={500}
                  alt="adharcard"
                  priority
                />
                <div className="flex justify-center md:gap-8 gap-4 w-full">
                  <Image
                    src={userInfo?.user_image || "/user-image.jpg"}
                    width={500}
                    height={500}
                    className="aspect-square md:w-28 w-16 md:h-32 h-20 select-none"
                    alt="user-image"
                    priority
                  />
                  <div className="flex justify-between w-full">
                    <div className="space-y-1">
                      <h1 className="md:text-lg text-sm font-medium capitalize">
                        {userInfo?.fname || "fname"} {userInfo?.lname || "lname"}
                      </h1>
                      <p className="md:text-[16px] text-xs">
                        Gender:{" "}
                        <span className=" font-medium capitalize">
                          {userInfo?.gender}
                        </span>
                      </p>
                      <p className="md:text-[16px] text-xs ">
                        DOB:{" "}
                        <span className="font-medium">
                          {new Date(userInfo?.dob).toLocaleDateString()}
                        </span>
                      </p>
                      <p className="md:text-[16px] text-xs ">
                        Mobile:{" "}
                        <span className="font-medium">{userInfo?.mobile}</span>
                      </p>

                    </div>
                    <div className="">
                      <QRCode text={`https://aadharcard-reg.vercel.app/user/${userInfo?.uid}`}
                        options={{
                          type: 'image/jpeg',
                          quality: 0.3,
                          errorCorrectionLevel: 'M',
                          margin: 3,
                          scale: 4,
                          width: 80,
                          color: {
                            dark: '#000000',
                            light: '#ffffff',
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full">
                  <p className="md:text-lg text-sm flex gap-1">
                    UID:{" "}
                    <span className="font-bold">{userInfo?.uid}</span>
                  </p>

                </div>

                <Image
                  src="/aadharcard-bottom.png"
                  width={500}
                  height={500}
                  className="select-none w-full"
                  alt="user-image"
                />
              </div>

              <div className="printable-content flex flex-col items-start justify-between space-y-4 border-2 border-dotted rounded-2xl p-5 bg-white xl:w-5/12 lg:w-5/12 md:w-7/12 sm:w-8/12 w-full mx-auto h-auto relative">
              <span className="absolute text-sm inset-x-0 text-center left-auto w-full bottom-32 text-gray-300/50 font-bold h-fit -rotate-12">This is FAKE Generated Aadhar Card, Do not use as ID proof</span>
                <Image
                  className="select-none w-full"
                  src="/aadharcard-top.jpg"
                  width={500}
                  height={500}
                  alt="adharcard"
                  priority
                />
                <div className="flex items-start justify-between">
                  <div className="">
                    <h1 className="md:text-lg text-sm">
                      Resident of:{" "}
                      <span className="font-medium capitalize">
                        {userInfo?.address}, {userInfo?.city}, {userInfo?.state}-{" "}
                        {userInfo?.pincode}
                      </span>
                    </h1>
                    <p className="md:text-xl text-sm mt-3">
                      UID:{" "}
                      <span className="font-bold">{userInfo?.uid}</span>
                    </p>
                  </div>

                  <QRCode text={`https://aadharcard-reg.vercel.app/user/${userInfo?.uid}`}
                    options={{
                      type: 'image/jpeg',
                      quality: 0.3,
                      errorCorrectionLevel: 'M',
                      margin: 3,
                      scale: 4,
                      width: 80,
                      color: {
                        dark: '#000000',
                        light: '#ffffff',
                      }
                    }}
                  />
                </div>
                <Image
                  src="/aadharcard-bottom.png"
                  width={500}
                  height={500}
                  className="select-none w-full"
                  alt="user-image"
                  priority
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                className="my-4 bg-blue-500 text-white px-4 py-1.5 rounded-lg shadow-lg text-center"
                onClick={handleDownload}
              >
                Download Aadhar Card
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserAadharCardPage;
