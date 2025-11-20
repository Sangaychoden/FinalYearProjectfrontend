// import { createBrowserRouter } from "react-router-dom";
// import Main from "../Main/Main.jsx";
// import Home1 from "../Pages/Home1.jsx";
// import ErrorPage from "../Shared/ErrorPage/ErrorPage.jsx";
// import Rooms from "../Components/Rooms/Rooms.jsx";
// import Offers from "../Components/Offers/Offers.jsx";
// import Facilities from "../Components/Facilities/Facilities.jsx";
// import About from "../Pages/InnerPage/About.jsx";
// //inner pages
// import Room from "../Pages/InnerPage/Room";
// import Services from "../Pages/InnerPage/Services.jsx";
// import ServiceDetails from "../Pages/InnerPage/ServiceDetails.jsx"
// import RoomDetails from "../Pages/InnerPage/RoomDetails";
// import RoomDetails2 from "../Pages/InnerPage/RoomDetails2";
// import Contact from "../Pages/InnerPage/Contact";
// import BookingDetails from "../Pages/InnerPage/BookingDetails.jsx";
// import TermsAndConditions from "../Pages/InnerPage/TermsAndConditions.jsx";
// import Gallery from "../Pages/InnerPage/Gallery.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Main />,
//     errorElement: <ErrorPage />,
//     children: [
//       { index: true, element: <Home1 /> },       // ✅ homepage
//       { path: "rooms", element: <Rooms /> },     // ✅ /rooms
//       { path: "offers", element: <Offers /> },   // ✅ /offers
//       { path: "facilities", element: <Facilities /> }, // ✅ /facilities

//       {
//         path: "/room",
//         element: <Room />,
//       },
//       {
//         path: "/room_details",
//         element: <RoomDetails />,
//       },
//           {
//         path: "/room_details2/:id",
//         element: <RoomDetails2 />,
//       },

//       {
//         path: "/booking_details",
//         element: <BookingDetails />,
//       },
//       {
//         path: "/terms_and_conditions",
//         element: <TermsAndConditions />,
//       },
//       {
//         path: "/gallery",
//         element: <Gallery />,
//       },
//       {
//         path: "/about",
//         element: <About />,
//       },
//        {
//         path: "/services",
//         element: <Services />,
//       },
//       {
//         path: "/service_details",
//         element: <ServiceDetails />,
//       },
//       {
//         path: "/contact",
//         element: <Contact />,
//       },
//     ],
//   },
// ]);

// export default router;
import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main.jsx";
import Home1 from "../Pages/Home1.jsx";
import ErrorPage from "../Shared/ErrorPage/ErrorPage.jsx";
import Rooms from "../Components/Rooms/Rooms.jsx";
import Offers from "../Components/Offers/Offers.jsx";
import Facilities from "../Components/Facilities/Facilities.jsx";
import About from "../Pages/InnerPage/About.jsx";

// Inner pages
import Room from "../Pages/InnerPage/Room.jsx";
import Services from "../Pages/InnerPage/Services.jsx";
import ServiceDetails from "../Pages/InnerPage/ServiceDetails.jsx";
import RoomDetails from "../Pages/InnerPage/RoomDetails.jsx";
import RoomDetails2 from "../Pages/InnerPage/RoomDetails2.jsx";
import Contact from "../Pages/InnerPage/Contact.jsx";
import BookingDetails from "../Pages/InnerPage/BookingDetails.jsx";
import TermsAndConditions from "../Pages/InnerPage/TermsAndConditions.jsx";
import Gallery from "../Pages/InnerPage/Gallery.jsx";
import AvailableRooms from "../Pages/InnerPage/AvailableRooms.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home1 /> },               // ✅ homepage
      { path: "rooms", element: <Rooms /> },             // ✅ /rooms
      { path: "offers", element: <Offers /> },           // ✅ /offers
      { path: "facilities", element: <Facilities /> },   // ✅ /facilities
      { path: "about", element: <About /> },             // ✅ /about
      { path: "services", element: <Services /> },       // ✅ /services
      { path: "service_details/:id", element: <ServiceDetails /> },

      // { path: "service_details", element: <ServiceDetails /> }, // ✅ /service_details
      { path: "contact", element: <Contact /> },         // ✅ /contact
      { path: "gallery", element: <Gallery /> },         // ✅ /gallery
      { path: "terms_and_conditions", element: <TermsAndConditions /> }, // ✅ /terms_and_conditions

      // Inner detailed routes
      { path: "room", element: <Room /> },               // ✅ /room
      { path: "available_rooms", element: <AvailableRooms /> }, // ✅ /available_rooms
      // { path: "room_details", element: <RoomDetails /> },        // ✅ /room_details
      { path: "room_details/:id", element: <RoomDetails /> },

      { path: "room_details2/:id", element: <RoomDetails2 /> },  // ✅ dynamic route
      { path: "booking_details", element: <BookingDetails /> },  // ✅ /booking_details
    ],
  },
]);

export default router;
