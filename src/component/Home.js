import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import FAQs from "./HomePage/FAQs";
import Eventcard from "./HomePage/Eventcard";
import BMEcard from "./HomePage/BMEcard";
import BMEcardnew from "./HomePage/BMEofficialCard";
import Landing from "./HomePage/Landing";
import Success from "./HomePage/Success";
import News from "./HomePage/News";
import Map from "./HomePage/Map";
import Process from "./HomePage/Process";
import MoreAboutUs from "./HomePage/MoreAboutUs";
import Navbar from "./Navbar";
import OutreachEventCard from "./Community/OutreachEventCard";
import { formatDate, fetchEvents, fetchOfficialEvents } from "./EventCardService";
import BMEcardimg1 from "../images/BMEofficialcardimg1.png";
import BMEcardimg2 from "../images/BMEofficialcardimg2.png";
import BMEcardimg3 from "../images/BMEofficialcardimg3.png";



function HomePage() {
  const fAuth = getAuth();
  useEffect(() => {}, []);
  onAuthStateChanged(fAuth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      console.log(user);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  const cardData = [
    {
      userName: "William Smith",
      title: "BK Fort Green Outreach",
      eventDate: "Sept 9, 2023 SAT 5:00pm",
      location: {
        street: "200 Eastern Pkwy",
        city: "Brooklyn",
        state: "NY",
        zipcode: "11238"
      },
      helpType: "Childcare Specialist needed",
      totalSlots: 20,
      interests: 5
    },
    {
      userName: "William Smith",
      title: "BK Fort Green Outreach",
      eventDate: "Sept 9, 2023 SAT 5:00pm",
      location: {
        street: "200 Eastern Pkwy",
        city: "Brooklyn",
        state: "NY",
        zipcode: "11238"
      }, helpType: "Childcare Specialist needed",
      totalSlots: 20,
      interests: 5
    },
    {
      userName: "William Smith",
      title: "BK Fort Green Outreach",
      eventDate: "Sept 9, 2023 SAT 5:00pm",
      location: {
        street: "200 Eastern Pkwy",
        city: "Brooklyn",
        state: "NY",
        zipcode: "11238"
      }, helpType: "Childcare Specialist needed",
      totalSlots: 20,
      interests: 5
    },

  ];

  const BMEcardData = [
    {
      title: "Community Connection Night",
      eventDate: "Oct 12,2023 THU 5:30pm",
      location: {
        street: "One Place Plaza,",
        city: "West 2nd Fl,",
        state: "NY,",
        zipcode: "10038"
      },
      totalSlots: 100,
      interests: 61,
      img: BMEcardimg1
    },
    {
      title: "Volunteer November Meetup",
      eventDate: "Nov 1,2023 THU 6:00pm",
      location: {
        street: "Online"
      },
      totalSlots: "Unlimited",
      interests: "Unlimited",
      img: BMEcardimg2
    },
    {
      title: "Volunteer December Meetup",
      eventDate: "Oct 12,2023 THU 5:30pm",
      location: {
        street: "Online"
      },
      totalSlots: "Unlimited",
      interests: "Unlimited",
      img: BMEcardimg3
    },

  ];

  const [events,setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const eventsData = await fetchEvents();
      
      // Sort events in place based on their date
      eventsData.sort((a, b) => a.eventDate - b.eventDate);

      setEvents(eventsData);
    };

    fetchData();
  }, []);

  const [offevents,setOffevents] = useState([]);

  useEffect(() => {
    const fetchOfficialData = async () => {
      const eventsData = await fetchOfficialEvents();
      // Sort events in place based on their date
      eventsData.sort((a, b) => a.eventDate - b.eventDate);
      setOffevents(eventsData);
    };

    fetchOfficialData();
  }, []);

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-32 rounded-2xl bg-white text-black ">
          {" "}
          <Landing />
        </div>
        <div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          <Success />
        </div>

        <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black">
          <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7] ">
            <p className=" font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58]">
              {" "}
              Upcoming outreach events
            </p>
            {/*<div className=" w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              <Eventcard />
              <Eventcard />
              <div className=" md:col-span-2 lg:col-span-1">
                <Eventcard />
              </div>
  </div> */}
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              {events.map(eventData => (
                <OutreachEventCard key={eventData.id} cardData={{ ...eventData, eventDate: formatDate(new Date(eventData.eventDate.seconds * 1000)) }} />
              ))}
            </div>
          </div>
        </div>
        {/* Vishnu */}
        {/* BME Official Gathering  */}
        {/* <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black">
          <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7] ">
            <p className=" font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58]">
              {" "}
              Upcoming outreach events
            </p>
            <div className=" w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              <BMEcard />
              <BMEcard />
              <div className=" md:col-span-2 lg:col-span-1">
                <BMEcard />
              </div>
            </div>
          </div>
        </div> */}


        {/*Vedant*/} {/*BME OFFCIIAL GATHERING BLOCK START*/}

        <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black">
          <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7] ">
            <p className=" font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58]">
              {" "}
              BME Official Gathering
            </p>
            <div className=" w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              {/* {BMEcardData.map(BMEData => (
                        <BMEcardnew key={BMEData.x} BMEcardData={BMEData} />
                      ))} */}
                {offevents.map(eventData => (
                  <BMEcardnew key={eventData.id} BMEcardData={{ ...eventData, eventDate: formatDate(new Date(eventData.eventDate.seconds * 1000)) }} />
                ))}
            </div>
          </div>
        </div>


        {/*Vedant*/} {/*BME OFFCIIAL GATHERING BLOCK END*/}

        {/* Aniket */}
        <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8  rounded-2xl bg-white text-black ">
          <Process />
        </div>

        {/* Meet */}
        <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 mb-8 rounded-2xl bg-white text-black">
          <MoreAboutUs />
        </div>
        {/* Aniket */}

        <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          <Map />
        </div>
        <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          <News />
        </div>
        <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 mb-16 rounded-2xl bg-white text-black ">
          <FAQs />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
