import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import user from "../../images/user.png";
import crown from "../../images/crown.png";
import notes from "../../images/notes.png";
import announcement from "../../images/announcement.png";
import neighborhood from "../../images/neighboorhood.png";
import information from "../../images/information.png";
import star from "../../images/star.png";

import { db } from "../firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

import SuperpowerModal from "./SuperpowerModal";

const UserInfo = () => {
  const navigate = useNavigate();
  // const userId = "Uej8TTFv5aXghZ6S8JfzhTo0nWw2";
  const [helped, setHelped] = useState("");
  const [donations, setDonations] = useState("");
  const [outreaches, setOutreaches] = useState("");
  const [superpowers, setSuperpowers] = useState([]);

  const fAuth = getAuth();
  onAuthStateChanged(fAuth, (user) => {
    if (user) {
      console.log("Found user");
    } else {
      console.log("USER NOT FOUND!");
      navigate("/login");
    }
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const getUserData = async () => {
    try {
      const userRef = query(
        collection(db, "users"),
        where("uid", "==", fAuth?.currentUser?.uid)
      );
      const data = await getDocs(userRef);
      setSuperpowers(
        data.docs[0].data().superpowers ? data.docs[0].data().superpowers : []
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getDeedValues = async () => {
      try {
        const logOfUserRef = query(
          collection(db, "testLog"),
          where("uid", "==", fAuth?.currentUser?.uid)
        );
        const data = await getDocs(logOfUserRef);
        let totalHelped = 0;
        let totalDonations = 0;
        data.docs.map((doc) => {
          totalHelped = isNaN(doc.data().numberPeopleHelped)
            ? totalHelped
            : totalHelped + doc.data().numberPeopleHelped;
          totalDonations = isNaN(doc.data().itemQty)
            ? totalDonations
            : totalDonations + doc.data().itemQty;
          return null;
        });
        console.log(totalDonations);
        setHelped(isNaN(parseInt(totalHelped)) ? 0 : parseInt(totalHelped));
        setDonations(
          isNaN(parseInt(totalDonations)) ? 0 : parseInt(totalDonations)
        );
        setOutreaches(data.docs.length);
      } catch (err) {
        console.log(err);
      }
    };

    getDeedValues();
    getUserData();
  }, [fAuth.currentUser]);

  useEffect(() => {
    console.log(helped);
  }, [helped]);
  return (
    // <div className="lg:px-24 lg:py-12 ">
    <div className="xl:px-24 xl:py-12 ">
      <div className="flex flex-col pt-0 px-0 pb-2 md:flex md:flex-row md:px-8  md:pb-8 xl:px-0  xl:pb-12 md:gap-x-6 xl:gap-x-12">
        <div className="pr-0 bg-gradient-to-tr from-[#C0F4FF] from-10% via-[#C0F4FF] via-60% to-[#DDD] to-90% bg-fixed rounded-t-2xl md:bg-none">
          <img
            src={user}
            alt="..."
            className="rounded-full md:w-64 md:h-48 lg:w-72 lg:h-56 border-none md:mt-16 lg:mt-20 h-32 w-32 mx-auto mt-8 mb-4 "
          />
        </div>
        <div className="w-[99%] py-4 md:mt-16 lg:mt-20">
          <div className="px-4">
            <h1 className="font-bricolage md:text-[54px] font-medium md:h-16 text-[#212121] h-12 text-4xl">
              Mandy Klose
            </h1>
            <h3 className="py-4 text-[#212121] font-opensans font-medium text-sm pt-0">
              Joined 12/20/23
            </h3>
          </div>

          {/* <div className=" w-full px-4 pb-2 flex overflow-x-auto md:grid md:grid-cols-2 md:gap-y-2 lg:flex lg:flex-wrap"> */}
          <div className=" w-full px-4 pb-2 flex overflow-x-auto md:flex md:flex-wrap md:gap-y-2">
            {superpowers &&
              superpowers.map((superpower) => {
                return (
                  <div className="px-4 py-2 mr-2 h-10 bg-[#DEF6EB] rounded-full border border-[#CACACA] font-semibold whitespace-nowrap flex justify-center items-center">
                    <h6 className="text-[#212121] w-fit text-[14px] font-opensans">
                      {superpower}
                    </h6>
                  </div>
                );
              })}
            <button
              className="px-2 py-2 mr-2 h-10 rounded-md border border-[#CACACA] hover:bg-[#DEF6EB] font-semibold font-opensans"
              onClick={openModal}
            >
              <h6 className="text-[#273164] w-[160px] text-[14px]">
                Add my superpower
              </h6>
            </button>
            <SuperpowerModal
              isOpen={modalIsOpen}
              closeModal={closeModal}
              currSupPow={superpowers}
              refreshUserQuery={getUserData}
            />
          </div>
        </div>
      </div>
      <div className="px-4 pb-4 grid grid-flow-col overflow-x-auto gap-2 md:px-8 md:pb-12 md:grid md:grid-cols-2 md:grid-rows-3 md:gap-y-4 md:gap-x-6 xl:px-0 xl:pb-16 xl:grid xl:grid-cols-3 xl:grid-rows-2 xl:gap-4">
        {/* <div className="px-4 pb-4 grid grid-flow-col overflow-x-auto gap-2 md:px-8 md:pb-12 md:grid md:grid-cols-2 md:grid-rows-3 md:gap-4 lg:px-0 lg:pb-16 lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-4"> */}
        <div className="p-4 h-24 rounded-2xl flex border border-[#CACACA] w-[265px] md:w-auto">
          <img className="w-16 h-16 mr-4" src={crown} alt="..."></img>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold pb-1 font-bricolage text-[#212121]">
              Community Leader
            </h1>
            <h3 className="text-xs font-opensans font-semibold pb-1 text-[#616161]">
              Achieved June 3rd, 2023
            </h3>
            <h3 className="text-xs font-opensans font-normal text-[#616161]">
              Led Community Outreach
            </h3>
          </div>
        </div>
        <div className="p-4 h-24 rounded-2xl flex border border-[#CACACA] w-[265px] md:w-auto">
          <img className="w-16 h-16 mr-4" src={notes} alt="..."></img>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold mt-2 pb-1 font-bricolage text-[#212121]">
              Volunteer Trainers
            </h1>
            <h3 className="text-xs mb-2 font-opensans font-normal text-[#616161]">
              Led Community Orientation
            </h3>
          </div>
        </div>
        <div className="p-4 h-24 rounded-2xl flex border border-[#CACACA] w-[265px] md:w-auto">
          <img className="w-16 h-16 mr-4" src={announcement} alt="..."></img>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold mt-2 pb-1 font-bricolage text-[#212121]">
              Ambassador
            </h1>
            <h3 className="text-xs mb-2 font-opensans font-normal text-[#616161]">
              Had invited friend to join
            </h3>
          </div>
        </div>
        <div className="p-4 h-24 rounded-2xl flex border border-[#CACACA] w-[265px] md:w-auto">
          <img className="w-16 h-16 mr-4" src={neighborhood} alt="..."></img>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold mt-2 pb-1 font-bricolage text-[#212121]">
              Neighborhood Leader
            </h1>
            <h3 className="text-xs mb-2 font-opensans font-normal text-[#616161]">
              Joined {">"} 3 Outreach in the same neighborhood.
            </h3>
          </div>
        </div>
        <div className="p-4 h-24 rounded-2xl flex border border-[#CACACA] w-[265px] md:w-auto">
          <img className="w-16 h-16 mr-4" src={information} alt="..."></img>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold mt-2 pb-1 font-bricolage text-[#212121]">
              Information Sharer
            </h1>
            <h3 className="text-xs mb-2 font-opensans font-normal text-[#616161]">
              Finish the 10 min how to Streetcare program
            </h3>
          </div>
        </div>
        <div className="p-4 h-24 rounded-2xl flex border border-[#CACACA] w-[265px] md:w-auto">
          <img className="w-16 h-16 mr-4" src={star} alt="..."></img>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold mt-1 pb-1 font-bricolage text-[#212121]">
              Seasoned Volunteer
            </h1>
            <h3 className="text-[11px] mb-2 font-opensans font-normal text-[#616161]">
              Joined more than 4 outreaches or has helped more than 8 people.
            </h3>
          </div>
        </div>
      </div>
      {/* Impact */}
      <div className="">
        <p className="text-[#212121] pl-4 pt-4 text-3xl md:pl-8 md:pt-0 xl:pl-0 xl:pt-0 sm:text-4xl font-medium font-dmsans leading-9">
          My Impact
        </p>
        {/* <div className="w-full h-fit justify-center items-center lg:justify-start lg:items-start  grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-3 font-bricolage py-6 px-2 md:px-8 lg:px-0 md:pt-8 md:pb-8  lg:pt-16 lg:pb-12"> */}
        <div className="w-full h-fit justify-center items-center lg:justify-start lg:items-start  grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-3 font-bricolage py-6 px-4 md:px-8 xl:px-0 md:pt-8 md:pb-8  lg:pt-16 lg:pb-12">
          <div className=" sm:flex grow rounded-l-2xl sm:rounded-t-2xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-l-2xl shrink basis-0 h-fit px-8 py-4 bg-gradient-to-br from-emerald-100 to-neutral-200 justify-center items-center sm:justify-start sm:items-end gap-6 ">
            <div className=" w-full sm:w-fit flex-col  justify-center items-center sm:justify-start sm:items-start sm:gap-6 inline-flex">
              <div className="text-violet-950 text-xs sm:text-2xl font-semibold leading-loose font-inter">
                Helped
              </div>

              <div className=" w-full justify-center sm:justify-start  sm:px-8 sm:py-2 sm:bg-white rounded-[100px] inline-flex">
                <div className="  text-violet-950 font-bricolage text-3xl sm:text-5xl font-normal leading-[64px] ">
                  {helped}
                </div>
              </div>
            </div>
            <div className="w-full  justify-center sm:justify-start text-violet-950 text-xs sm:text-xl font-semibold sm:py-2 md:ml-[-8px] inline-flex">
              People
            </div>
          </div>

          <div className=" sm:flex grow shrink basis-0 h-fit px-8 py-4 bg-gradient-to-br from-purple-300 to-zinc-200 justify-center items-center sm:justify-start sm:items-end gap-6 ">
            <div className=" w-full sm:w-fit flex-col justify-center items-center sm:justify-start sm:items-start  sm:gap-6 inline-flex">
              <div className="text-violet-950 text-xs sm:text-2xl  font-semibold leading-loose font-inter">
                Joined
              </div>
              <div className="sm:px-8 sm:py-2 sm:bg-white rounded-[100px] inline-flex">
                <div className="text-violet-950 font-bricolage text-3xl sm:text-5xl font-normal leading-[64px]">
                  {outreaches}
                </div>
              </div>
            </div>

            <div className="w-full justify-center sm:justify-start text-violet-950 text-xs sm:text-xl font-semibold sm:py-2 md:ml-[-12px] inline-flex ">
              Outreaches
            </div>
          </div>

          <div className=" sm:flex grow sm:rounded-br-2xl rounded-bl-none sm:rounded-b-2xl rounded-r-2xl sm:rounded-r-none lg:rounded-r-2xl  lg:rounded-bl-none shrink basis-0 h-fit px-8 py-4 bg-gradient-to-br from-sky-200 to-neutral-200 justify-start items-end gap-6 ">
            <div className=" w-full sm:w-fit flex-col justify-center items-center sm:justify-start sm:items-start sm:gap-6 inline-flex">
              <div className="text-violet-950 text-xs sm:text-2xl font-semibold leading-loose font-inter">
                Donated
              </div>
              <div className="sm:px-8 sm:py-2 sm:bg-white rounded-[100px] inline-flex">
                <div className="text-violet-950 font-bricolage text-3xl sm:text-5xl font-normal leading-[64px]">
                  {donations}
                </div>
              </div>
            </div>
            <div className="w-full justify-center sm:justify-start  text-violet-950 text-xs sm:text-xl font-semibold sm:py-2 md:ml-[-8px] inline-flex">
              Items
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
