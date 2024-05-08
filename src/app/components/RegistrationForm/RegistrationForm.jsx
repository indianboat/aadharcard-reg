"use client";

import { userRegistration } from "@/actions/user/userRegistration";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const RegistrationForm = () => {

  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      mobile: "",
      email: "",
      dob: "",
      gender: "male",
      address: "",
      city: "",
      state: "",
      pincode: "",
      user_image: null,
    },
    onSubmit,
  });

  async function onSubmit(values) {

    const formData = new FormData();
    formData.append("fname", values.fname);
    formData.append("lname", values.lname);
    formData.append("mobile", values.mobile);
    formData.append("email", values.email);
    formData.append("address", values.address);
    formData.append("dob", values.dob);
    formData.append("gender", values.gender);
    formData.append("city", values.city);
    formData.append("state", values.state);
    formData.append("pincode", values.pincode);
    formData.append("user_image", values.user_image);

    const res = await userRegistration(formData);

    if (res.success) {
      toast.success(res.message + "Redirecting to download");
      formik.resetForm();
      formik.setFieldValue("user_image", null);

      setTimeout(() => {
        router.push(`/user/${res.data}`)
      }, 2000);
    }
    else {
      toast.error(res.message);
    }
  }

  let yyyy = new Date().getFullYear();
  let mm = new Date().getMonth() + 1;
  let dd = new Date().getDate();

  if (mm < 9) {
    mm = `0${mm}`;
  }
  if (dd < 9) {
    dd = `0${dd}`;
  }

  const maxDate = `${yyyy}-${mm}-${dd}`;

  return (
    <>
      <div className="p-5">
        <h1 className="text-2xl font-semibold text-center">
          Aadhar Card Registration
        </h1>
        <p className="text-center mt-1 text-gray-600">
          Fill out the form for aadhar card registration.
        </p>
        <form
          onSubmit={formik.handleSubmit}
          className="mt-8 lg:w-6/12 md:w-7/12 sm:w-10/12 w-full mx-auto p-6 bg-purple-100 rounded-2xl space-y-6"
        >
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-4">
            <div className="flex flex-col ">
              <label
                htmlFor="fname"
                className="text-gray-700 md:text-[16px] text-sm"
              >
                First name <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                id="fname"
                className="ring-2 ring-purple-100 focus:translate-y-[2px] outline-none px-4 py-2 rounded-xl shadow-md focus:ring-2 focus:ring-purple-800 transition-all mt-1"
                placeholder="First name"
                required
                {...formik.getFieldProps("fname")}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="lname"
                className="text-gray-700 md:text-[16px] text-sm"
              >
                Last name
              </label>
              <input
                type="text"
                id="lname"
                className="ring-2 ring-purple-100 focus:translate-y-[2px] outline-none px-4 py-2 rounded-xl shadow-md focus:ring-2 focus:ring-purple-800 transition-all mt-1"
                placeholder="Last name"
                {...formik.getFieldProps("lname")}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="mobile"
                className="text-gray-700 md:text-[16px] text-sm"
              >
                Mobile Number <span className="text-rose-600">*</span>
              </label>
              <input
                type="tel"
                inputMode="tel"
                maxLength={10}
                minLength={10}
                pattern="[6789][0-9]{9}"
                title="Please enter valid mobile number"
                id="mobile"
                className="ring-2 ring-purple-100 focus:translate-y-[2px] outline-none px-4 py-2 rounded-xl shadow-md focus:ring-2 focus:ring-purple-800 transition-all mt-1"
                placeholder="9999988888"
                required
                {...formik.getFieldProps("mobile")}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="dob"
                className="text-gray-700 md:text-[16px] text-sm"
              >
                Date of Birth <span className="text-rose-600">*</span>
              </label>
              <input
                type="date"
                id="dob"
                max={maxDate}
                min="1960-01-01"
                className="ring-2 ring-purple-100 focus:translate-y-[2px] outline-none px-4 py-2 rounded-xl shadow-md focus:ring-2 focus:ring-purple-800 transition-all mt-1 w-full bg-white"
                required
                placeholder="Date of Birth"
                {...formik.getFieldProps("dob")}
              />
            </div>

          </div>

          <div className="flex flex-col">
            <label
              htmlFor="gender"
              className="text-gray-700 md:text-[16px] text-sm"
            >
              Gender <span className="text-rose-600">*</span>
            </label>
            <select
              id="gender"
              className="ring-2 ring-purple-100 focus:translate-y-[2px] outline-none px-4 py-2 rounded-xl shadow-md focus:ring-2 focus:ring-purple-800 transition-all mt-1 bg-white"
              required
              {...formik.getFieldProps("gender")}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-gray-700 md:text-[16px] text-sm"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="ring-2 ring-purple-100 focus:translate-y-[2px] outline-none px-4 py-2 rounded-xl shadow-md focus:ring-2 focus:ring-purple-800 transition-all mt-1"
              placeholder="example@gmail.com"
              {...formik.getFieldProps("email")}
            />
          </div>

          <hr className="border-t border-purple-200"></hr>

          <div className="flex flex-col">
            <label
              htmlFor="address"
              className="text-gray-700 md:text-[16px] text-sm"
            >
              Address <span className="text-rose-600">*</span>
            </label>
            <textarea
              type="text"
              id="address"
              className="ring-2 ring-purple-100 focus:translate-y-[2px] outline-none px-4 py-2 rounded-xl shadow-md focus:ring-2 focus:ring-purple-800 transition-all mt-1"
              placeholder="Full Address"
              required
              {...formik.getFieldProps("address")}
            />
          </div>

          <div className="grid md:grid-cols-3 grid-cols-1 md:gap-6 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="city"
                className="text-gray-700 md:text-[16px] text-sm"
              >
                City <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                id="city"
                className="ring-2 ring-purple-100 focus:translate-y-[2px] outline-none px-4 py-2 rounded-xl shadow-md focus:ring-2 focus:ring-purple-800 transition-all mt-1"
                placeholder="Eg: New Delhi"
                required
                {...formik.getFieldProps("city")}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="state"
                className="text-gray-700 md:text-[16px] text-sm"
              >
                State <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                id="state"
                className="ring-2 ring-purple-100 focus:translate-y-[2px] outline-none px-4 py-2 rounded-xl shadow-md focus:ring-2 focus:ring-purple-800 transition-all mt-1"
                placeholder="Eg: Delhi"
                required
                {...formik.getFieldProps("state")}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="pincode"
                className="text-gray-700 md:text-[16px] text-sm"
              >
                Pincode <span className="text-rose-600">*</span>
              </label>
              <input
                type="tel"
                maxLength={6}
                minLength={6}
                id="pincode"
                className="ring-2 ring-purple-100 focus:translate-y-[2px] outline-none px-4 py-2 rounded-xl shadow-md focus:ring-2 focus:ring-purple-800 transition-all mt-1"
                placeholder="Eg: 111111"
                required
                pattern="[0-9]{6}"
                {...formik.getFieldProps("pincode")}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="image"
              className="text-gray-700 md:text-[16px] text-sm"
            >
              Your Photo <span className="text-rose-600">*</span>
            </label>
            <input
              type="file"
              id="image"
              accept="image/png, image/jpg, image/jpeg"
              className="ring-2 ring-purple-100 bg-white focus:translate-y-[2px] outline-none px-4 py-2 rounded-xl shadow-md focus:ring-2 focus:ring-purple-800 transition-all mt-1"
              placeholder="Eg: 111111"
              required
              onChange={(event) => formik.setFieldValue("user_image", event.currentTarget.files[0])}
            />
          </div>

          <div className="">
            <button
              type="submit"
              className="bg-purple-800 text-white w-full px-4 py-2 rounded-xl outline-none shadow-md focus:ring-2 ring-offset-2 focus:ring-purple-800 transition-all"
            >
              Register
            </button>
          </div>
        </form>

        <div className="text-center my-2">
          Already done registration?{" "}
          <Link href={"/search"} className="text-blue-500 hover:underline">
            Download from here
          </Link>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
