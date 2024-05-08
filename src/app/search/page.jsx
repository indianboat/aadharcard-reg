"use client";

import { searchUserInfo } from "@/actions/user/searchUserInfo";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const SearchAadharCard = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      mobile: "",
      dob: "",
    },
    onSubmit,
  });

  async function onSubmit(values) {
    const res = await searchUserInfo(values);
    if (res.success) {
      toast.success(res.message);
      router.push(`/user/${res.data}`);
    } else {
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
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-semibold text-center">
          Search Your Aadhar Card
        </h1>

        <form
          onSubmit={formik.handleSubmit}
          className="lg:w-6/12 md:w-7/12 sm:w-10/12 w-full mt-8 space-y-6"
        >
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
              className="ring-2 ring-purple-100 focus:translate-y-[2px] outline-none px-4 py-2 rounded-xl shadow-md focus:ring-2 focus:ring-purple-800 transition-all mt-2"
              placeholder="Mobile Number"
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
              min={"1960-01-01"}
              max={maxDate}
              className="ring-2 ring-purple-100 focus:translate-y-[2px] outline-none px-4 py-2 rounded-xl shadow-md focus:ring-2 focus:ring-purple-800 transition-all mt-2"
              required
              {...formik.getFieldProps("dob")}
            />
          </div>

          <div className="">
            <button
              type="submit"
              className="bg-purple-800 text-white w-full px-4 py-2 rounded-xl outline-none shadow-md focus:ring-2 ring-offset-2 focus:ring-purple-800 transition-all"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchAadharCard;
