
// // import React, { useState, useEffect, useRef } from "react";
// // import { useNavigate, useParams, useLocation } from "react-router-dom";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";
// // import Swal from "sweetalert2";
// // import { Calendar } from "lucide-react";

// // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// // const countries = [
// //   { name: "Bhutan", code: "+975" },
// //   { name: "India", code: "+91" },
// //   { name: "United States", code: "+1" },
// // ];

// // export default function BookingDetailsPage() {
// //   const navigate = useNavigate();
// //   const { id } = useParams();
// //   const { state } = useLocation();

// //   const bookingFromState = state?.booking || null;
// //   const initialSelectedDate = state?.selectedDate ? new Date(state.selectedDate) : null;

// //   const [booking, setBooking] = useState(bookingFromState);
// //   const [bookingStatus, setBookingStatus] = useState((bookingFromState?.status || "").toUpperCase());

// //   const [roomTypes, setRoomTypes] = useState([]);

// //   const [isAgencyBooking, setIsAgencyBooking] = useState(false);

// //   // Agency
// //   const [agencyName, setAgencyName] = useState("");
// //   const [agencyEmail, setAgencyEmail] = useState("");
// //   const [agencyPhone, setAgencyPhone] = useState("");
// //   const [agentName, setAgentName] = useState("");

// //   // Guest
// //   const [firstName, setFirstName] = useState("");
// //   const [lastName, setLastName] = useState("");
// //   const [email, setEmail] = useState("");

// //   const [country, setCountry] = useState("Bhutan");
// //   const [phoneCode, setPhoneCode] = useState("+975");
// //   const [phone, setPhone] = useState("");

// //   const [journalInput, setJournalInput] = useState("");
// //   const [selectedRoomType, setSelectedRoomType] = useState("");
// //   const [selectedRoomNo, setSelectedRoomNo] = useState("");
// //   const [checkInDate, setCheckInDate] = useState(initialSelectedDate);
// //   const [checkOutDate, setCheckOutDate] = useState(null);

// //   const [roomsRequested, setRoomsRequested] = useState(1);
// //   const [children, setChildren] = useState(0);

// //   const [specialRequest, setSpecialRequest] = useState("");
// //   const [meals, setMeals] = useState([]);

// //   const [roomPrice, setRoomPrice] = useState(0);
// //   const [totalPrice, setTotalPrice] = useState(0);

// //   const [errors, setErrors] = useState({});
// //   const [showUpdateRoomBtn, setShowUpdateRoomBtn] = useState(false);

// //   const [openDatePickerFor, setOpenDatePickerFor] = useState(null);
// //   const datePickerRef = useRef();
// //   const toggleKnobRef = useRef(null);

// //   // available rooms states
// //   const [availableRooms, setAvailableRooms] = useState([]);
// //   const [loadingAvailableRooms, setLoadingAvailableRooms] = useState(false);

// //   useEffect(() => {
// //     const loadRoomTypes = async () => {
// //       try {
// //         const res = await fetch(`${API_URL}/rooms/room-types`, { credentials: 'include' });
// //         const json = await res.json();
// //         if (res.ok && Array.isArray(json.roomTypes)) {
// //           const list = json.roomTypes.map((r) => ({ name: r.roomType, price: r.price }));
// //           setRoomTypes(list);
// //         } else {
// //           setRoomTypes([]);
// //         }
// //       } catch (err) {
// //         console.error('Failed to load room types:', err);
// //         setRoomTypes([]);
// //       }
// //     };
// //     loadRoomTypes();
// //   }, []);

// //   useEffect(() => {
// //     if (bookingFromState) {
// //       initializeFromBooking(bookingFromState);
// //       return;
// //     }

// //     const loadData = async () => {
// //       try {
// //         const endpoints = [
// //           `${API_URL}/bookings/confirmed-guaranteed-bookings`,
// //           `${API_URL}/bookings/checked-in`,
// //           `${API_URL}/bookings/booked`,
// //           `${API_URL}/bookings/pending`,
// //         ];

// //         let found = null;
// //         for (let url of endpoints) {
// //           try {
// //             const res = await fetch(url, { credentials: 'include' });
// //             const data = await res.json();
// //             found = data.bookings?.find((b) => b._id === id);
// //             if (found) break;
// //           } catch (e) {
// //             // ignore per original
// //           }
// //         }

// //         if (!found) {
// //           setBooking(null);
// //           return;
// //         }

// //         initializeFromBooking(found);
// //       } catch (err) {
// //         console.error('Load booking error:', err);
// //       }
// //     };

// //     loadData();
// //   }, [id, bookingFromState]);

// //   const initializeFromBooking = (b) => {
// //   setBooking(b);
// //   setBookingStatus((b.status || '').toUpperCase());
// //   setJournalInput(b.transactionNumber || '');

// //   if ((b.status || '').toUpperCase() === 'AVAILABLE') {
// //     setSelectedRoomType(b.roomType || '');
// //     setCheckInDate(initialSelectedDate || null);
// //     setCheckOutDate(null);

// //     const room = roomTypes.find((r) => r.name === (b.roomType || ''));
// //     setRoomPrice(room ? room.price : 0);
// //     setTotalPrice(0);

// //     setFirstName('');
// //     setLastName('');
// //     setEmail('');
// //     setPhone('');
// //     setSpecialRequest('');
// //     setRoomsRequested(1);
// //     setMeals([]);
// //     setIsAgencyBooking(false);

// //     setAgencyName('');
// //     setAgencyEmail('');
// //     setAgencyPhone('');
// //     setAgentName('');
// //     return;
// //   }

// //   // ✅ Correct order (type → dates → assignedRoom)
// //   setSelectedRoomType(b.rooms?.[0]?.roomType || '');
// //   setCheckInDate(b.checkIn ? new Date(b.checkIn) : null);
// //   setCheckOutDate(b.checkOut ? new Date(b.checkOut) : null);

// //   // ✅ This now works properly
// //   setSelectedRoomNo((b.assignedRoom || []).join(', '));

// //   setFirstName(b.firstName || '');
// //   setLastName(b.lastName || '');
// //   setEmail(b.email || '');

// //   setCountry(b.country || 'Bhutan');
// //   const c = countries.find((x) => x.name === b.country);
// //   setPhoneCode(c?.code || '+975');

// //   setPhone(b.phoneNumber || '');
// //   setSpecialRequest(b.specialRequest || '');
// //   setRoomsRequested(b.rooms?.[0]?.quantity || 1);
// //   setTotalPrice(b.totalPrice || 0);
// //   setMeals(b.meals || []);
// //   setIsAgencyBooking(Boolean(b.isAgencyBooking));

// //   setAgencyName(b.agencyName || '');
// //   setAgencyEmail(b.agencyEmail || '');
// //   setAgencyPhone(b.agencyPhone || '');
// //   setAgentName(b.agentName || '');
// // };

// //   useEffect(() => {
// //     const r = roomTypes.find((x) => x.name === selectedRoomType);
// //     const price = r ? r.price : 0;
// //     setRoomPrice(price);

// //     if (checkInDate && checkOutDate && price) {
// //       const diff = Math.ceil((checkOutDate - checkInDate) / 86400000);
// //       const nights = diff > 0 ? diff : 1;
// //       setTotalPrice(nights * price * (roomsRequested || 1));
// //     } else if (checkInDate && price && !checkOutDate) {
// //       setTotalPrice(price * (roomsRequested || 1));
// //     } else {
// //       setTotalPrice(0);
// //     }
// //   }, [selectedRoomType, checkInDate, checkOutDate, roomsRequested, roomTypes]);

// //   // // Robust fetch that handles backend returning array or stringified array
// //   // useEffect(() => {
// //   //   const fetchAvailableRooms = async () => {
// //   //     setAvailableRooms([]);
// //   //     setSelectedRoomNo('');
// //   //     if (!selectedRoomType || !checkInDate || !checkOutDate) return;

// //   //     const toYMD = (d) => {
// //   //       const yyyy = d.getFullYear();
// //   //       const mm = String(d.getMonth() + 1).padStart(2, '0');
// //   //       const dd = String(d.getDate()).padStart(2, '0');
// //   //       return `${yyyy}-${mm}-${dd}`;
// //   //     };

// //   //     const checkInStr = toYMD(checkInDate);
// //   //     const checkOutStr = toYMD(checkOutDate);

// //   //     setLoadingAvailableRooms(true);
// //   //     try {
// //   //       const url = `${API_URL}/rooms/available-numbers/${encodeURIComponent(selectedRoomType)}?checkIn=${encodeURIComponent(checkInStr)}&checkOut=${encodeURIComponent(checkOutStr)}`;
// //   //       const res = await fetch(url, { credentials: 'include' });
// //   //       const data = await res.json();

// //   //       // Prefer common field availableRoomNumbers
// //   //       let arr = null;
// //   //       if (res.ok) {
// //   //         if (Array.isArray(data.availableRoomNumbers)) arr = data.availableRoomNumbers;
// //   //         else if (Array.isArray(data.available)) arr = data.available;
// //   //         else if (Array.isArray(data)) arr = data;
// //   //         else if (typeof data.availableRoomNumbers === 'string') {
// //   //           try { arr = JSON.parse(data.availableRoomNumbers); } catch (e) { arr = null; }
// //   //         }
// //   //       }

// //   //       if (Array.isArray(arr)) setAvailableRooms(arr.map((r) => String(r)));
// //   //       else setAvailableRooms([]);
// //   //     } catch (err) {
// //   //       console.error('Failed to load available rooms:', err);
// //   //       setAvailableRooms([]);
// //   //     } finally {
// //   //       setLoadingAvailableRooms(false);
// //   //     }
// //   //   };

// //   //   fetchAvailableRooms();
// //   // }, [selectedRoomType, checkInDate, checkOutDate]);
// // useEffect(() => {
// //   const fetchAvailableRooms = async () => {
// //     setAvailableRooms([]);

// //     // ❌ DO NOT CLEAR selectedRoomNo here
// //     // setSelectedRoomNo('');

// //     if (!selectedRoomType || !checkInDate || !checkOutDate) return;

// //     const toYMD = (d) => {
// //       const yyyy = d.getFullYear();
// //       const mm = String(d.getMonth() + 1).padStart(2, '0');
// //       const dd = String(d.getDate()).padStart(2, '0');
// //       return `${yyyy}-${mm}-${dd}`;
// //     };

// //     const checkInStr = toYMD(checkInDate);
// //     const checkOutStr = toYMD(checkOutDate);

// //     setLoadingAvailableRooms(true);
// //     try {
// //       const url = `${API_URL}/rooms/available-numbers/${encodeURIComponent(
// //         selectedRoomType
// //       )}?checkIn=${encodeURIComponent(checkInStr)}&checkOut=${encodeURIComponent(
// //         checkOutStr
// //       )}`;
// //       const res = await fetch(url, { credentials: 'include' });
// //       const data = await res.json();

// //       let arr = null;
// //       if (res.ok) {
// //         if (Array.isArray(data.availableRoomNumbers)) arr = data.availableRoomNumbers;
// //         else if (Array.isArray(data.available)) arr = data.available;
// //         else if (Array.isArray(data)) arr = data;
// //         else if (typeof data.availableRoomNumbers === 'string') {
// //           try {
// //             arr = JSON.parse(data.availableRoomNumbers);
// //           } catch (e) {
// //             arr = null;
// //           }
// //         }
// //       }

// //       if (Array.isArray(arr)) setAvailableRooms(arr.map((r) => String(r)));
// //       else setAvailableRooms([]);
// //     } catch (err) {
// //       console.error('Failed to load available rooms:', err);
// //       setAvailableRooms([]);
// //     } finally {
// //       setLoadingAvailableRooms(false);
// //     }
// //   };

// //   fetchAvailableRooms();
// // }, [selectedRoomType, checkInDate, checkOutDate]);

// //   const inputClass = (field) =>
// //     `mt-1 border px-3 py-2 w-full focus:outline-none focus:ring-2 ${errors[field] ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-300'}`;

// //   const validateField = (field, value) => {
// //     let msg = '';
// //     switch (field) {
// //       case 'agencyName':
// //         if (isAgencyBooking && (!value || !String(value).trim())) msg = 'Agency name is required.';
// //         break;
// //       case 'agentName':
// //         if (isAgencyBooking && (!value || !String(value).trim())) msg = 'Agent name is required.';
// //         break;
// //       case 'firstName':
// //       case 'lastName':
// //       case 'selectedRoomNo':
// //       case 'journalInput':
// //         if (!isAgencyBooking && (!value || String(value).trim() === '')) msg = 'This field is required.';
// //         break;
// //       case 'email':
// //         if (!isAgencyBooking) {
// //           if (!value || String(value).trim() === '') msg = 'Required.';
// //           else if (!/^\S+@\S+\.\S+$/.test(value)) msg = 'Invalid email.';
// //         } else {
// //           if (value && !/^\S+@\S+\.\S+$/.test(value)) msg = 'Invalid email.';
// //         }
// //         break;
// //       default:
// //         break;
// //     }
// //     setErrors((prev) => ({ ...prev, [field]: msg }));
// //   };

// //   const toggleMeal = (meal) => {
// //     setMeals((prev) => (prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]));
// //   };

// //   const createBooking = async () => {
// //     ['selectedRoomType', 'selectedRoomNo', 'checkInDate', 'checkOutDate', 'roomsRequested'].forEach((f) => validateField(f, eval(f)));

// //     if (isAgencyBooking) {
// //       validateField('agencyName', agencyName);
// //       validateField('email', agencyEmail);
// //       validateField('agentName', agentName);
// //       if (!country) return Swal.fire('Error', 'Country is required.', 'error');
// //     } else {
// //       ['firstName', 'lastName', 'email', 'phone', 'selectedRoomNo'].forEach((f) => validateField(f, eval(f)));
// //     }

// //     const payload = {
// //       isAgencyBooking,
// //       agencyName: isAgencyBooking ? agencyName : undefined,
// //       agencyEmail: isAgencyBooking ? agencyEmail : undefined,
// //       agencyPhone: isAgencyBooking ? agencyPhone : undefined,
// //       agentName: isAgencyBooking ? agentName : undefined,
// //       country,
// //       firstName: isAgencyBooking ? undefined : firstName,
// //       lastName: isAgencyBooking ? undefined : lastName,
// //       email: isAgencyBooking ? undefined : email,
// //       phone: isAgencyBooking ? undefined : phone,
// //       checkIn: checkInDate?.toISOString(),
// //       checkOut: checkOutDate?.toISOString(),
// //       roomSelection: [{ roomType: selectedRoomType, roomsRequested: roomsRequested || 1 }],
// //       meals,
// //       specialRequest,
// //       assignedRoom: selectedRoomNo ? selectedRoomNo.split(',').map((r) => r.trim()).filter(Boolean) : undefined,
// //       transactionNumber: journalInput || undefined,
// //     };

// //     try {
// //       const res = await fetch(`${API_URL}/bookings/book-rooms`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         credentials: 'include',
// //         body: JSON.stringify(payload),
// //       });

// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.message || 'Server error');

// //       await Swal.fire({ title: 'Success!', text: 'Booking created.', icon: 'success', background: '#006600', color: 'white' });
// //       navigate('/booking', { state: { activeTab: 'BOOKED' } });
// //     } catch (err) {
// //       Swal.fire('Error', err.message || 'Server error', 'error');
// //     }
// //   };

// //   const handleConfirmBooking = async (e) => {
// //     e.preventDefault();
// //     await createBooking();
// //   };

// //   // New helper: submit booking with admin status override (confirmed / guaranteed)
// //   const submitAdminBooking = async (status) => {
// //     // validate minimal fields first
// //     ['selectedRoomType', 'checkInDate', 'checkOutDate', 'roomsRequested'].forEach((f) => validateField(f, eval(f)));

// //     const payload = {
// //       isAgencyBooking,
// //       agencyName: isAgencyBooking ? agencyName : undefined,
// //       agencyEmail: isAgencyBooking ? agencyEmail : undefined,
// //       agencyPhone: isAgencyBooking ? agencyPhone : undefined,
// //       agentName: isAgencyBooking ? agentName : undefined,

// //       country,
// //       firstName: isAgencyBooking ? undefined : firstName,
// //       lastName: isAgencyBooking ? undefined : lastName,
// //       email: isAgencyBooking ? undefined : email,
// //       phone: isAgencyBooking ? undefined : phone,

// //       checkIn: checkInDate?.toISOString(),
// //       checkOut: checkOutDate?.toISOString(),

// //       roomSelection: [{ roomType: selectedRoomType, roomsRequested: roomsRequested || 1 }],

// //       meals,
// //       specialRequest,
// //       assignedRoom: selectedRoomNo ? selectedRoomNo.split(',').map((x) => x.trim()).filter(Boolean) : undefined,

// //       transactionNumber: journalInput || undefined,

// //       statusOverride: status,
// //     };

// //     try {
// //       const res = await fetch(`${API_URL}/bookings/book-rooms`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         credentials: 'include',
// //         body: JSON.stringify(payload),
// //       });

// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.message || 'Server error');

// //       await Swal.fire({ title: 'Success!', text: `Booking created as ${status.toUpperCase()}`, icon: 'success', background: '#006600', color: 'white' });
// //       navigate('/booking', { state: { activeTab: 'BOOKED' } });
// //     } catch (err) {
// //       Swal.fire('Error', err.message || 'Server error', 'error');
// //     }
// //   };

// //   const handleCheckIn = async () => {
// //     const c = await Swal.fire({ title: 'Check-In Booking?', icon: 'warning', showCancelButton: true, background: '#006600', color: '#fff', confirmButtonColor: '#008000' });
// //     if (!c.isConfirmed) return;
// //     try {
// //       const res = await fetch(`${API_URL}/bookings/checkin/${id}`, { method: 'PUT', credentials: 'include' });
// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.message || 'Server error');
// //       setBookingStatus('CHECKED_IN');
// //       await Swal.fire({ title: 'Checked In', icon: 'success', background: '#006600', color: 'white' });
// //       navigate('/booking', { state: { activeTab: 'CHECKED IN' } });
// //     } catch (err) {
// //       Swal.fire('Error', err.message || 'Server error', 'error');
// //     }
// //   };

// //   const handleUpdateAssignedRooms = async () => {
// //     const newRooms = selectedRoomNo.split(',').map((r) => r.trim()).filter(Boolean);
// //     const c = await Swal.fire({ icon: 'question', title: 'Update Room(s)?', text: `Assign rooms: ${newRooms.join(', ')}?`, showCancelButton: true, confirmButtonColor: '#006600', background: '#006600', color: 'white' });
// //     if (!c.isConfirmed) return;
// //     try {
// //       const res = await fetch(`${API_URL}/bookings/change-room/${booking._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ newRoom: newRooms }) });
// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.message || 'Server error');
// //       Swal.fire({ title: 'Updated!', text: 'Room numbers updated.', icon: 'success', background: '#006600', color: 'white' });
// //       setShowUpdateRoomBtn(false);
// //       setBooking({ ...booking, assignedRoom: newRooms });
// //     } catch (err) {
// //       Swal.fire('Error', err.message || 'Server error', 'error');
// //     }
// //   };

// //   const handleToggleAgency = () => {
// //     setIsAgencyBooking((prev) => {
// //       const next = !prev;
// //       setErrors({});
// //       if (next) {
// //         setFirstName('');
// //         setLastName('');
// //         setEmail('');
// //         setPhone('');
// //       } else {
// //         setAgencyName('');
// //         setAgencyEmail('');
// //         setAgencyPhone('');
// //         setAgentName('');
// //       }
// //       return next;
// //     });
// //   };

// //   const formatDate = (d) => {
// //     if (!d) return '';
// //     return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(' ', ' ');
// //   };

// //   useEffect(() => {
// //     const onDocClick = (e) => {
// //       if (!datePickerRef.current) return;
// //       if (!datePickerRef.current.contains(e.target)) setOpenDatePickerFor(null);
// //     };
// //     document.addEventListener('click', onDocClick);
// //     return () => document.removeEventListener('click', onDocClick);
// //   }, []);

// //   if (!booking) return (
// //     <div className="p-8 text-center"><h2 className="text-2xl font-bold">Booking not found</h2></div>
// //   );

// //   return (
// //     <div className="min-h-screen bg-gray-50 px-2 py-4">
// //       <div className="flex items-center justify-between mb-2">
// //         <h1 className="text-2xl font-bold text-[#006600]">AVAILABLE Booking Details</h1>
// //         <button onClick={() => navigate(-1)} className="px-4 py-2 border border-gray-300  hover:bg-gray-100">Back</button>
// //       </div>

// //       {bookingStatus === 'AVAILABLE' && (
// //         <div className="flex justify-center mb-6">
// //           <div role="switch" aria-checked={isAgencyBooking} onClick={handleToggleAgency} className="relative select-none cursor-pointer">
// //             <div className="w-56 h-12 -full bg-gray-200 p-1 shadow-inner relative">
// //               <div ref={toggleKnobRef} className={`absolute top-1 left-1 h-10 w-1/2 -full transition-transform duration-200 ${isAgencyBooking ? 'translate-x-full' : ''} bg-white shadow`} />
// //               <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
// //                 <span className={`text-sm font-medium ${!isAgencyBooking ? 'text-[#006600]' : 'text-gray-500'}`}>NORMAL</span>
// //                 <span className={`text-sm font-medium ${isAgencyBooking ? 'text-[#006600]' : 'text-gray-500'}`}>AGENCY</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {bookingStatus === 'AVAILABLE' && (
// //         <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleConfirmBooking}>

// //           <div className="bg-white shadow p-4">
// //             <h2 className="text-xl font-bold mb-3 py-2">Room Information</h2>

// //             {/* <div>
// //               <label className="font-semibold">Room Type:</label>
// //               <select value={selectedRoomType} onChange={(e) => { setSelectedRoomType(e.target.value); validateField('selectedRoomType', e.target.value);} } className={`${inputClass('selectedRoomType')}`}>
// //                 <option value="">Select</option>
// //                 {roomTypes.length > 0 ? roomTypes.map((r) => (<option key={r.name} value={r.name}>{r.name} (Nu. {r.price})</option>)) : <option value="">Loading room types...</option>}
// //               </select>
// //               {errors.selectedRoomType && <p className="text-red-500 text-sm">{errors.selectedRoomType}</p>}
// //             </div> */}
// //             <div>
// //   <label className="font-semibold">Room Type:</label>

// //   <div className="mt-1 border px-3 py-2 w-full bg-gray-100 text-gray-800 ">
// //     {selectedRoomType}
// //   </div>

// //   {errors.selectedRoomType && (
// //     <p className="text-red-500 text-sm">{errors.selectedRoomType}</p>
// //   )}
// // </div>


// //             <div ref={datePickerRef} className="relative mt-4">
// //               <label className="font-semibold">Check-In:</label>
// //               <div onClick={(e) => { e.stopPropagation(); setOpenDatePickerFor((prev) => (prev === 'checkin' ? null : 'checkin')); }} className="mt-1 w-full border border-gray-300 px-3 py-3 flex items-center justify-between cursor-pointer">
// //                 <div className="text-gray-800">{checkInDate ? formatDate(checkInDate) : ''}</div>
// //                 <Calendar size={18} className="text-gray-600" />
// //               </div>

// //               {openDatePickerFor === 'checkin' && (
// //                 <div className="absolute z-50 mt-2">
// //                   <DatePicker inline selected={checkInDate} onChange={(d) => { setCheckInDate(d); validateField('checkInDate', d); setOpenDatePickerFor(null); }} minDate={new Date()} />
// //                 </div>
// //               )}
// //               {errors.checkInDate && <p className="text-red-500 text-sm">{errors.checkInDate}</p>}
// //             </div>

// //             <div ref={datePickerRef} className="relative mt-4">
// //               <label className="font-semibold">Check-Out:</label>
// //               <div onClick={(e) => { e.stopPropagation(); setOpenDatePickerFor((prev) => (prev === 'checkout' ? null : 'checkout')); }} className="mt-1 w-full border border-gray-300 px-3 py-3 flex items-center justify-between cursor-pointer">
// //                 <div className="text-gray-800">{checkOutDate ? formatDate(checkOutDate) : ''}</div>
// //                 <Calendar size={18} className="text-gray-600" />
// //               </div>

// //               {openDatePickerFor === 'checkout' && (
// //                 <div className="absolute z-50 mt-2">
// //                   <DatePicker inline selected={checkOutDate} onChange={(d) => { setCheckOutDate(d); validateField('checkOutDate', d); setOpenDatePickerFor(null); }} minDate={checkInDate || new Date()} />
// //                 </div>
// //               )}
// //               {errors.checkOutDate && <p className="text-red-500 text-sm">{errors.checkOutDate}</p>}
// //             </div>

// //             <div className="mt-4">
// //               <label className="font-semibold">Room Number(s):</label>

// //               {loadingAvailableRooms ? (
// //                 <div className="mt-1 border border-gray-300 px-3 py-2 w-full bg-gray-50">Loading available rooms...</div>
// //               ) : (
// //                 <>
// //                   <select value={selectedRoomNo} onChange={(e) => { setSelectedRoomNo(e.target.value); validateField('selectedRoomNo', e.target.value); }} className={`${inputClass('selectedRoomNo')}`}>
// //                     <option value="">Select a room</option>
// //                     {availableRooms.map((rn) => (<option key={rn} value={rn}>{rn}</option>))}
// //                   </select>
// //                   {!availableRooms.length && <p className="text-sm mt-2 text-gray-600">No rooms available.</p>}
// //                 </>
// //               )}

// //               {errors.selectedRoomNo && <p className="text-red-500 text-sm">{errors.selectedRoomNo}</p>}
// //             </div>

// //             <div className="flex gap-2 mt-4">
// //               <div className="flex-1">
// //                 <label className="font-semibold">Rooms Requested:</label>
// //                 <input type="number" min="1" value={roomsRequested} onChange={(e) => { setRoomsRequested(parseInt(e.target.value) || 1); validateField('roomsRequested', e.target.value); }} className={inputClass('roomsRequested')} />
// //                 {errors.roomsRequested && <p className="text-red-500 text-sm">{errors.roomsRequested}</p>}
// //               </div>

// //               <div className="flex-1">
// //                 <label className="font-semibold">Children:</label>
// //                 <input type="number" min="0" value={children} onChange={(e) => setChildren(parseInt(e.target.value) || 0)} className="mt-1 border border-gray-300 px-3 py-2 w-full" />
// //               </div>
// //             </div>

// //             <p className="font-semibold mt-2">Room Price: Nu. {roomPrice} / night</p>
// //             <p className="font-semibold">Total Price: Nu. {totalPrice}</p>
// //           </div>

// //           <div className="bg-white shadow p-4">
// //             <h2 className="text-xl font-bold mb-3 py-2">Guest / Agency Information</h2>

// //             {isAgencyBooking ? (
// //               <>
// //                 <div>
// //                   <label className="font-semibold">Agency Name:</label>
// //                   <input type="text" value={agencyName} onChange={(e) => { setAgencyName(e.target.value); validateField('agencyName', e.target.value); }} className={inputClass('agencyName')} />
// //                   {errors.agencyName && <p className="text-red-500 text-sm">{errors.agencyName}</p>}
// //                 </div>

// //                 <div>
// //                   <label className="font-semibold">Agency Email (optional):</label>
// //                   <input type="email" value={agencyEmail} onChange={(e) => { setAgencyEmail(e.target.value); validateField('email', e.target.value); }} className="mt-1 border border-gray-300 px-3 py-2 w-full" />
// //                 </div>

// //                 <div>
// //                   <label className="font-semibold">Agency Phone (optional):</label>
// //                   <input type="text" value={agencyPhone} onChange={(e) => setAgencyPhone(e.target.value)} className="mt-1 border border-gray-300 px-3 py-2 w-full" />
// //                 </div>

// //                 <div>
// //                   <label className="font-semibold">Agent Name:</label>
// //                   <input type="text" value={agentName} onChange={(e) => { setAgentName(e.target.value); validateField('agentName', e.target.value); }} className={inputClass('agentName')} />
// //                   {errors.agentName && <p className="text-red-500 text-sm">{errors.agentName}</p>}
// //                 </div>

// //                 <div>
// //                   <label className="font-semibold">Country:</label>
// //                   <select value={country} onChange={(e) => { const sel = e.target.value; setCountry(sel); const found = countries.find((x) => x.name === sel); setPhoneCode(found?.code || '+975'); }} className="mt-1 border border-gray-300 px-3 py-2 w-full">
// //                     {countries.map((c) => (<option key={c.name} value={c.name}>{c.name} ({c.code})</option>))}
// //                   </select>
// //                 </div>

// //                 <div className="mt-3">
// //                   <label className="font-semibold">Types of Meals:</label>
// //                   <div className="flex flex-col gap-2 mt-1">{['breakfast', 'lunch', 'dinner'].map((m) => (<label key={m} className="flex items-center gap-2"><input type="checkbox" checked={meals.includes(m)} onChange={() => toggleMeal(m)} /><span className="capitalize">{m}</span></label>))}</div>
// //                 </div>
// //               </>
// //             ) : (
// //               <>
// //                 <div>
// //                   <label className="font-semibold">First Name:</label>
// //                   <input type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value); validateField('firstName', e.target.value); }} className={inputClass('firstName')} />
// //                 </div>

// //                 <div>
// //                   <label className="font-semibold">Last Name:</label>
// //                   <input type="text" value={lastName} onChange={(e) => { setLastName(e.target.value); validateField('lastName', e.target.value); }} className={inputClass('lastName')} />
// //                 </div>

// //                 <div>
// //                   <label className="font-semibold">Email:</label>
// //                   <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); validateField('email', e.target.value); }} className={inputClass('email')} />
// //                 </div>

// //                 <div>
// //                   <label className="font-semibold">Country:</label>
// //                   <select value={country} onChange={(e) => { const sel = e.target.value; setCountry(sel); const found = countries.find((x) => x.name === sel); setPhoneCode(found?.code || '+975'); }} className="mt-1 border border-gray-300 px-3 py-2 w-full">{countries.map((c) => (<option key={c.name} value={c.name}>{c.name} ({c.code})</option>))}</select>
// //                 </div>

// //                 <div className="flex gap-2">
// //                   <div className="flex-1">
// //                     <label>Code:</label>
// //                     <input type="text" readOnly className="mt-1 bg-gray-100 border px-3 py-2 w-full" value={phoneCode} />
// //                   </div>

// //                   <div className="flex-1">
// //                     <label>Phone:</label>
// //                     <input type="text" value={phone} onChange={(e) => { setPhone(e.target.value); validateField('phone', e.target.value); }} className={inputClass('phone')} />
// //                     {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
// //                   </div>
// //                 </div>

// //                 <div className="mt-3">
// //                   <label className="font-semibold">Types of Meals:</label>
// //                   <div className="flex flex-col gap-2 mt-1">{['breakfast', 'lunch', 'dinner'].map((m) => (<label key={m} className="flex items-center gap-2"><input type="checkbox" checked={meals.includes(m)} onChange={() => toggleMeal(m)} /><span className="capitalize">{m}</span></label>))}</div>
// //                 </div>
// //               </>
// //             )}

// //             <div>
// //               <label className="font-semibold">Journal Number:</label>
// //               <input type="text" value={journalInput} onChange={(e) => { setJournalInput(e.target.value); validateField('journalInput', e.target.value); }} className={inputClass('journalInput')} />
// //               {errors.journalInput && <p className="text-red-500 text-sm">{errors.journalInput}</p>}
// //             </div>

// //             <div>
// //               <label>Special Request:</label>
// //               <textarea value={specialRequest} onChange={(e) => setSpecialRequest(e.target.value)} className="mt-1 border border-gray-300 px-3 py-2 w-full" />
// //             </div>

// //             {/* Buttons: Confirm + Guaranteed (admin) */}
// //             <div className="flex gap-3 mt-4">
// //               <button type="button" onClick={() => submitAdminBooking('confirmed')} className="flex-1 bg-[#006600] text-white px-6 py-2 shadow hover:bg-green-800">Confirm Booking</button>
// //               <button type="button" onClick={() => submitAdminBooking('guaranteed')} className="flex-1 bg-[#0044cc] text-white px-6 py-2 shadow hover:bg-blue-800">Guaranteed Booking</button>
// //             </div>

// //           </div>
// //         </form>
// //       )}

// //       {bookingStatus === 'CHECKED_IN' && (
// //         <div className="bg-white shadow p-6 -md grid grid-cols-1 md:grid-cols-2 gap-4"> 
// //           <p><strong>Booking No:</strong> {booking.bookingNumber}</p>
// //           <p><strong>Transaction Number:</strong> {booking.transactionNumber}</p>
// //           <p><strong>Name:</strong> {isAgencyBooking ? agencyName || agentName : `${firstName} ${lastName}`}</p>
// //           <p><strong>Email:</strong> {isAgencyBooking ? agencyEmail || '—' : email}</p>
// //           <p><strong>Country:</strong> {country}</p>
// //           <p><strong>Phone:</strong> {isAgencyBooking ? agencyPhone || phone : phone}</p>
// //           <p><strong>Room Type:</strong> {selectedRoomType}</p>
// //           <p className="col-span-2"><strong>Assigned Room(s):</strong> {selectedRoomNo}</p>
// //           <p className="col-span-2"><strong>Meals:</strong> {booking.meals?.length ? booking.meals.join(', ') : 'None'}</p>
// //           <p><strong>Check-In:</strong> {checkInDate?.toLocaleDateString()}</p>
// //           <p><strong>Check-Out:</strong> {checkOutDate?.toLocaleDateString()}</p>
// //           <p><strong>Total Price:</strong> Nu. {booking.totalPrice}</p>
// //           <p className="col-span-2"><strong>Special Request:</strong> {specialRequest || 'None'}</p>
// //         </div>
// //       )}

// //       {bookingStatus !== 'AVAILABLE' && bookingStatus !== 'CHECKED_IN' && (
// //         <div className="bg-white shadow p-6 -md grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
// //           <p><strong>Booking No:</strong> {booking.bookingNumber}</p>
// //           <p><strong>Transaction Number:</strong> {booking.transactionNumber}</p>
// //           <p><strong>Name:</strong> {isAgencyBooking ? agencyName || agentName : `${firstName} ${lastName}`}</p>
// //           <p><strong>Email:</strong> {isAgencyBooking ? agencyEmail || '—' : email}</p>
// //           <p><strong>Country:</strong> {country}</p>
// //           <p><strong>Phone:</strong> {isAgencyBooking ? agencyPhone || phone : phone}</p>
// //           <p><strong>Room Type:</strong> {selectedRoomType}</p>

// //           <div className="col-span-2">
// //             <label className="font-semibold">Assigned Room(s):</label>
// //             <div className="flex items-center gap-3 mt-1">
// //               <input type="text" value={selectedRoomNo} onChange={(e) => { setSelectedRoomNo(e.target.value); setShowUpdateRoomBtn(true); }} className="border border-gray-300 px-3 py-2 -lg w-60 shadow-sm" />
// //               {showUpdateRoomBtn && <button onClick={handleUpdateAssignedRooms} className="px-4 py-2 bg-[#009900] text-white -lg shadow">UPDATE ROOMS</button>}
// //             </div>
// //           </div>

// //           <p><strong>Check-In:</strong> {checkInDate?.toLocaleDateString()}</p>
// //           <p><strong>Check-Out:</strong> {checkOutDate?.toLocaleDateString()}</p>
// //           <p><strong>Total Price:</strong> Nu. {totalPrice}</p>
// //           <p className="col-span-2"><strong>Special Request:</strong> {specialRequest || 'None'}</p>

// //           {(bookingStatus === 'CONFIRMED' || bookingStatus === 'GUARANTEED') && (
// //             <div className="col-span-2 flex justify-center mt-4">
// //               <button
// //                 className="bg-[#006600] text-white px-8 py-2 -lg font-semibold hover:bg-green-800"
// //                 onClick={handleCheckIn}
// //               >
// //                 Check-In
// //               </button>
// //             </div>
// //           )}

// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "react-datepicker/dist/react-datepicker.css";
// import { setAlert } from "../utils/sweetAlert";
// import Swal from "sweetalert2";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// const BookingDetailsPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [booking, setBooking] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [roomInput, setRoomInput] = useState("");
//   const [showUpdate, setShowUpdate] = useState(false);

//   // ⭐ Fetch booking for ALL STATUSES (Pending, Confirmed, Guaranteed, Checked-in, Cancelled)
//   const fetchBookingData = async () => {
//     try {
//       let found = null;

//       // 1️⃣ PENDING
//       const pending = await fetch(`${API_URL}/bookings/pending`, {
//         credentials: "include",
//       });
//       const pendingJSON = await pending.json();
//       if (pendingJSON.bookings)
//         found = pendingJSON.bookings.find((b) => b._id === id);

//       // 2️⃣ CONFIRMED + GUARANTEED
//       if (!found) {
//         const booked = await fetch(
//           `${API_URL}/bookings/confirmed-guaranteed-bookings`,
//           { credentials: "include" }
//         );
//         const bookedJSON = await booked.json();
//         if (bookedJSON.bookings)
//           found = bookedJSON.bookings.find((b) => b._id === id);
//       }

//       // 3️⃣ CHECKED-IN
//       if (!found) {
//         const checkedIn = await fetch(`${API_URL}/bookings/checked-in`, {
//           credentials: "include",
//         });
//         const checkedInJSON = await checkedIn.json();
//         if (checkedInJSON.bookings)
//           found = checkedInJSON.bookings.find((b) => b._id === id);
//       }

//       // 4️⃣ CANCELLED
//       if (!found) {
//         const cancelled = await fetch(`${API_URL}/bookings/cancelled/all`, {
//           credentials: "include",
//         });
//         const cancelledJSON = await cancelled.json();
//         if (cancelledJSON.bookings)
//           found = cancelledJSON.bookings.find((b) => b._id === id);
//       }

//       setBooking(found || null);
//       setRoomInput(found?.assignedRoom?.join(", ") || "");

//       // Load room details ONLY if not cancelled or checked-in
//       if (found && found.status !== "cancelled") {
//         const date = new Date().toISOString().split("T")[0];
//         const roomRes = await fetch(`${API_URL}/rooms/available?date=${date}`);
//         const roomData = await roomRes.json();

//         if (roomData.availableRooms?.length > 0) {
//           const matched = roomData.availableRooms.find(
//             (r) => r.roomType === found.rooms?.[0]?.roomType
//           );
//           setSelectedRoom(matched);
//         }
//       }
//     } catch (err) {
//       console.error("❌ Error fetching booking:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookingData();
//   }, [id]);

//   // UPDATE ROOM(S)
//   const handleUpdateRoom = async () => {
//     const newRooms = roomInput.split(",").map((r) => r.trim()).filter(Boolean);

//     if (!newRooms.length)
//       return setAlert({
//         icon: "warning",
//         title: "Invalid",
//         text: "Enter at least one room.",
//       });

//     const ok = await setAlert({
//       icon: "question",
//       title: "Update Room(s)?",
//       text: `Change to: ${newRooms.join(", ")}`,
//       showCancelButton: true,
//       confirmButtonText: "OK",
//       confirmButtonColor: "#008000",
//     });

//     if (!ok) return;

//     try {
//       const res = await fetch(`${API_URL}/bookings/change-room/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ newRoom: newRooms }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       await Swal.fire({
//         icon: "success",
//         iconColor: "#008000",
//         confirmButtonColor: "#008000",
//         title: "Updated!",
//         text: "Room updated.",
//       });

//       setBooking({ ...booking, assignedRoom: newRooms });
//       setShowUpdate(false);
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Failed",
//         text: err.message,
//       });
//     }
//   };

//   // CONFIRM BOOKING
//   const handleConfirmBooking = async () => {
//     const popup = await Swal.fire({
//       title: "Confirm Booking?",
//       text: "Enter deposit transaction number:",
//       input: "text",
//       showCancelButton: true,
//       confirmButtonText: "OK",
//       confirmButtonColor: "#008000",
//       iconColor: "#008000",
//     });

//     if (!popup.isConfirmed) return;

//     try {
//       const res = await fetch(`${API_URL}/bookings/confirm/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ transactionNumber: popup.value }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       await Swal.fire({
//         icon: "success",
//         iconColor: "#008000",
//         confirmButtonColor: "#008000",
//         title: "Confirmed!",
//         text: "Deposit received.",
//       });

//       navigate("/booking", { state: { activeTab: "BOOKED" } });
//     } catch (err) {
//       Swal.fire({ icon: "error", title: "Error", text: err.message });
//     }
//   };

//   // GUARANTEE BOOKING
//   const handleGuaranteeBooking = async () => {
//     const popup = await Swal.fire({
//       title: "Guarantee Booking?",
//       text: "Enter FULL payment transaction number:",
//       input: "text",
//       showCancelButton: true,
//       confirmButtonText: "OK",
//       confirmButtonColor: "#008000",
//       iconColor: "#008000",
//     });

//     if (!popup.isConfirmed) return;

//     try {
//       const res = await fetch(
//         `${API_URL}/bookings/guarantee-booking/${id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify({ transactionNumber: popup.value }),
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       await Swal.fire({
//         icon: "success",
//         iconColor: "#008000",
//         confirmButtonColor: "#008000",
//         title: "Guaranteed!",
//         text: "Full payment received.",
//       });

//       navigate("/booking", { state: { activeTab: "BOOKED" } });
//     } catch (err) {
//       Swal.fire({ icon: "error", title: "Failed", text: err.message });
//     }
//   };

//   // CANCEL / REJECT WITH REASON
//   const handleCancelBooking = async () => {
//     const popup = await Swal.fire({
//       title: booking.status === "pending" ? "Reject Booking?" : "Cancel Booking?",
//       text: "Enter the reason:",
//       input: "text",
//       showCancelButton: true,
//       confirmButtonText: "OK",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#008000",
//       iconColor: "#008000",
//     });

//     if (!popup.value) return;

//     try {
//       const endpoint =
//         booking.status === "pending"
//           ? `${API_URL}/bookings/reject/${id}`
//           : `${API_URL}/bookings/cancel/${id}`;

//       const res = await fetch(endpoint, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ reason: popup.value }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       await Swal.fire({
//         icon: "success",
//         iconColor: "#008000",
//         confirmButtonColor: "#008000",
//         title:
//           booking.status === "pending"
//             ? "Booking Rejected"
//             : "Booking Cancelled",
//         text: "Action completed.",
//       });

//       navigate("/booking", {
//         state: {
//           activeTab: booking.status === "pending" ? "AVAILABLE" : "BOOKED",
//         },
//       });
//     } catch (err) {
//       Swal.fire({ icon: "error", title: "Failed", text: err.message });
//     }
//   };
// const formatNiceDate = (date) => {
//   const d = new Date(date);
//   const day = d.getDate(); // no leading zero
//   const month = d.toLocaleString("en-GB", { month: "short" }); // Jan, Feb, Mar
//   const year = d.getFullYear();
//   return `${day} ${month}, ${year}`;
// };

//   // =======================
//   // PAGE LOADING
//   // =======================
//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         Loading booking details...
//       </div>
//     );

//   if (!booking)
//     return (
//       <div className="p-6 text-center">
//         <h2 className="text-2xl font-bold">Booking not found.</h2>
//         <button
//           className="mt-4 px-4 py-2 bg-green-600 text-white"
//           onClick={() => navigate("/booking")}
//         >
//           Go Back
//         </button>
//       </div>
//     );

//   // =======================
//   // UI RENDER
//   // =======================
//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-6">
//       <div className="flex justify-between mb-6">
//         <h1 className="text-2xl font-bold text-[#006600]">
//           Booking #{booking.bookingNumber}
//         </h1>

//         <button
//           onClick={() => navigate(-1)}
//           className="px-4 py-2 border text-gray-700"
//         >
//           Back
//         </button>
//       </div>

//       <div className="bg-white shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-4 ">

//         <p><strong>Name:</strong> {booking.firstName} {booking.lastName}</p>
//         <p><strong>Email:</strong> {booking.email}</p>
//         <p><strong>Country:</strong> {booking.country}</p>
//         <p><strong>Phone:</strong> {booking.phoneNumber}</p>

//         <p><strong>Room Type:</strong> {booking.rooms?.[0]?.roomType}</p>
//         <p><strong>Quantity:</strong> {booking.rooms?.[0]?.quantity}</p>
//         <p><strong>Price/Night:</strong> Nu. {booking.rooms?.[0]?.pricePerNight}</p>

//         {selectedRoom && (
//           <>
//             <p><strong>Room Location:</strong> {selectedRoom.location}</p>
//             <p><strong>Occupancy:</strong> {selectedRoom.occupancy}</p>
//             <p><strong>Size:</strong> {selectedRoom.size} m²</p>
//           </>
//         )}

//         {/* ASSIGNED ROOM */}
//         <div className="col-span-2 mt-2">
//           <p className="font-semibold">Assigned Room(s):</p>

//           {/* Disable editing for CHECKED-IN or CANCELLED */}
//           {booking.status === "checked_in" || booking.status === "cancelled" ? (
//             <p className="mt-1 text-gray-700">{booking.assignedRoom?.join(", ")}</p>
//           ) : (
//             <div className="flex gap-2 mt-1">
//               <input
//                 value={roomInput}
//                 onChange={(e) => {
//                   setRoomInput(e.target.value);
//                   setShowUpdate(true);
//                 }}
//                 className="border px-2 py-1  w-44 text-sm"
//               />
//               {showUpdate && (
//                 <button
//                   onClick={handleUpdateRoom}
//                   className="px-3 py-1 bg-[#006600] text-white text-xs "
//                 >
//                   Update
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//         <p><strong>Check-In:</strong> {formatNiceDate(booking.checkIn)}</p>
//         <p><strong>Check-Out:</strong> {formatNiceDate(booking.checkOut)}</p>

//         <p><strong>Total Price:</strong> Nu. {booking.totalPrice}</p>

//         <p><strong>Status:</strong> {booking.status.toUpperCase()}</p>

//         {/* SHOW CANCEL REASON */}
//         {booking.status === "cancelled" && (
//           <p className="text-red-600 col-span-2">
//             <strong>Cancel Reason:</strong> {booking.cancelReason}
//           </p>
//         )}

//         <div className="col-span-2">
//           <p><strong>Special Request:</strong> {booking.specialRequest}</p>
//         </div>

//         {/* ACTION BUTTONS */}
//         <div className="col-span-2 flex justify-center space-x-6 mt-6">

//           {/* PENDING → confirm */}
//           {booking.status === "pending" && (
//             <button
//               onClick={handleConfirmBooking}
//               className="bg-[#006600] text-white px-6 py-2 "
//             >
//               Confirm Booking
//             </button>
//           )}

//           {/* pending + confirmed → guarantee */}
//           {(booking.status === "pending" || booking.status === "confirmed") && (
//             <button
//               onClick={handleGuaranteeBooking}
//               className="bg-blue-700 text-white px-6 py-2 "
//             >
//               Guarantee Booking
//             </button>
//           )}

//           {/* pending + confirmed → cancel / reject */}
//           {(booking.status === "pending" || booking.status === "confirmed") && (
//             <button
//               onClick={handleCancelBooking}
//               className="bg-red-600 text-white px-6 py-2 "
//             >
//               {booking.status === "pending" ? "Reject Booking" : "Cancel Booking"}
//             </button>
//           )}

//           {/* CHECKED-IN + CANCELLED → NO BUTTONS */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingDetailsPage;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { setAlert } from "../utils/sweetAlert";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const BookingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomInput, setRoomInput] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);

  // ⭐ Fetch booking for ALL STATUSES
  const fetchBookingData = async () => {
    try {
      let found = null;

      // 1️⃣ PENDING
      const pending = await fetch(`${API_URL}/bookings/pending`, {
        credentials: "include",
      });
      const pendingJSON = await pending.json();
      if (pendingJSON.bookings)
        found = pendingJSON.bookings.find((b) => b._id === id);

      // 2️⃣ CONFIRMED + GUARANTEED
      if (!found) {
        const booked = await fetch(
          `${API_URL}/bookings/confirmed-guaranteed-bookings`,
          { credentials: "include" }
        );
        const bookedJSON = await booked.json();
        if (bookedJSON.bookings)
          found = bookedJSON.bookings.find((b) => b._id === id);
      }

      // 3️⃣ CHECKED-IN
      if (!found) {
        const checkedIn = await fetch(`${API_URL}/bookings/checked-in`, {
          credentials: "include",
        });
        const checkedInJSON = await checkedIn.json();
        if (checkedInJSON.bookings)
          found = checkedInJSON.bookings.find((b) => b._id === id);
      }

      // 4️⃣ CANCELLED
      if (!found) {
        const cancelled = await fetch(`${API_URL}/bookings/cancelled/all`, {
          credentials: "include",
        });
        const cancelledJSON = await cancelled.json();
        if (cancelledJSON.bookings)
          found = cancelledJSON.bookings.find((b) => b._id === id);
      }

      setBooking(found || null);
      setRoomInput(found?.assignedRoom?.join(", ") || "");

      // Load room details ONLY if not cancelled or checked-in
      if (found && found.status !== "cancelled") {
        const date = new Date().toISOString().split("T")[0];
        const roomRes = await fetch(`${API_URL}/rooms/available?date=${date}`);
        const roomData = await roomRes.json();

        if (roomData.availableRooms?.length > 0) {
          const matched = roomData.availableRooms.find(
            (r) => r.roomType === found.rooms?.[0]?.roomType
          );
          setSelectedRoom(matched);
        }
      }
    } catch (err) {
      console.error("❌ Error fetching booking:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, [id]);

  // UPDATE ROOM(S)
  const handleUpdateRoom = async () => {
    const newRooms = roomInput.split(",").map((r) => r.trim()).filter(Boolean);

    if (!newRooms.length)
      return setAlert({
        icon: "warning",
        title: "Invalid",
        text: "Enter at least one room.",
      });

    const ok = await setAlert({
      icon: "question",
      title: "Update Room(s)?",
      text: `Change to: ${newRooms.join(", ")}`,
      showCancelButton: true,
      confirmButtonText: "OK",
      confirmButtonColor: "#008000",
    });

    if (!ok) return;

    try {
      const res = await fetch(`${API_URL}/bookings/change-room/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ newRoom: newRooms }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      await Swal.fire({
        icon: "success",
    color: "#fff",
    confirmButtonColor: "#008000",
    background: "#006600",
        title: "Updated!",
        text: "Room updated.",
      });

      setBooking({ ...booking, assignedRoom: newRooms });
      setShowUpdate(false);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.message,
      });
    }
  };

  // CONFIRM BOOKING (DEPOSIT)
  const handleConfirmBooking = async () => {
const popup = await Swal.fire({
  title: "Confirm Booking",
  text: "Enter deposit transaction number:",
  input: "text",
  showCancelButton: true,
  confirmButtonText: "OK",
  color: "#fff",                // text color of title & content
  confirmButtonColor: "#008000",
  cancelButtonColor: "#d33",
  background: "#006600",
  iconColor: "#008000",
  inputAttributes: {
    style: "color: #000000; background-color: #ffffff;" // input text black, bg white
  }
});


    if (!popup.isConfirmed) return;

    try {
      const res = await fetch(`${API_URL}/bookings/confirm/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ transactionNumber: popup.value }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      await Swal.fire({
        icon: "success",
  color: "#fff",                // text color of title & content
  confirmButtonColor: "#008000",
  background: "#006600",
        title: "Confirmed!",
        text: "Deposit received.",
      });

      navigate("/booking", { state: { activeTab: "BOOKED" } });
    } catch (err) {
      Swal.fire({ 
        icon: "error", 
        title: "Error", 
        text: err.message,
          color: "#fff",                // text color of title & content
  confirmButtonColor: "#008000",
  background: "#006600",

      });
    }
  };

  // GUARANTEE (FULL PAYMENT)
  const handleGuaranteeBooking = async () => {
const popup = await Swal.fire({
  title: "Guarantee Booking",
  text: "Enter FULL payment transaction number:",
  input: "text",
  showCancelButton: true,
  confirmButtonText: "OK",
  color: "#fff",                // title & text color
  confirmButtonColor: "#008000",
  cancelButtonColor: "#d33",
  background: "#006600",
  inputAttributes: {
    style: "color: #000000; background-color: #ffffff;" // input text black, bg white
  }
});


    if (!popup.isConfirmed) return;

    try {
      const res = await fetch(
        `${API_URL}/bookings/guarantee-booking/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ transactionNumber: popup.value }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      await Swal.fire({
        icon: "success",
  color: "#fff",                // text color of title & content
  confirmButtonColor: "#008000",
  background: "#006600",
        title: "Guaranteed!",
        text: "Full payment received.",
      });

      navigate("/booking", { state: { activeTab: "BOOKED" } });
    } catch (err) {
      Swal.fire({ 
        icon: "error", 
        title: "Failed", 
        text: err.message,
          color: "#fff",                // text color of title & content
  confirmButtonColor: "#008000",
  background: "#006600",

      });    }
  };

  // CHECK IN (NEW BUTTON)
  const handleCheckIn = async () => {
    // IF CONFIRMED → popup for TXN
    if (booking.status === "confirmed") {
      const popup = await Swal.fire({
        title: "Check In?",
        text: "Enter check-in transaction number:",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "OK",
  color: "#fff",                // text color of title & content
  confirmButtonColor: "#008000",
  cancelButtonColor: "#d33",
  background: "#006600",
      });

      if (!popup.isConfirmed) return;

      try {
        const res = await fetch(`${API_URL}/bookings/checkin/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ transactionNumber: popup.value }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        await Swal.fire({
          icon: "success",
          title: "Checked In!",
  color: "#fff",                // text color of title & content
  confirmButtonColor: "#008000",
  background: "#006600",
        });

        // navigate("/booking", { state: { activeTab: "CHECKED IN" } });
        navigate("/booking", { state: { activeTab: "CHECKED IN" } });
      } catch (err) {
      Swal.fire({ 
        icon: "error", 
        title: "Failed", 
        text: err.message,
        color: "#fff",                // text color of title & content
        confirmButtonColor: "#008000",
        background: "#006600",
      });      
    }
    }

    // IF GUARANTEED → direct check in
    if (booking.status === "guaranteed") {
      try {
        const res = await fetch(`${API_URL}/bookings/checkin/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ transactionNumber: "FULLY_PAID" }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        await Swal.fire({
          icon: "success",
          title: "Checked In!",
  color: "#fff",                // text color of title & content
  confirmButtonColor: "#008000",
  background: "#006600",
        });

        navigate("/booking", { state: { activeTab: "CHECKED IN" } });
      } catch (err) {
      Swal.fire({ 
        icon: "error", 
        title: "Failed", 
        text: err.message,
        color: "#fff",                // text color of title & content
        confirmButtonColor: "#008000",
        background: "#006600",
      });      }
    }
  };

  // CANCEL / REJECT
  const handleCancelBooking = async () => {
const popup = await Swal.fire({
  title: booking.status === "pending" ? "Reject Booking" : "Cancel Booking",
  text: "Enter the reason:",
  input: "text",
  showCancelButton: true,
  confirmButtonText: "OK",
  cancelButtonText: "Cancel",
  color: "#fff",                // title & content text color
  confirmButtonColor: "#008000",
  cancelButtonColor: "#d33",
  background: "#006600",
  inputAttributes: {
    style: "color: #000000; background-color: #ffffff;" // input text black, bg white
  }
});


    if (!popup.value) return;

    try {
      const endpoint =
        booking.status === "pending"
          ? `${API_URL}/bookings/reject/${id}`
          : `${API_URL}/bookings/cancel/${id}`;

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ reason: popup.value }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      await Swal.fire({
        icon: "success",
        title:
          booking.status === "pending"
            ? "Booking Rejected"
            : "Booking Cancelled",
  color: "#fff",                // text color of title & content
  confirmButtonColor: "#008000",
  cancelButtonColor: "#d33",
  background: "#006600",
      });

      navigate("/booking", {
        state: {
          activeTab: booking.status === "pending" ? "AVAILABLE" : "BOOKED",
        },
      });
    } catch (err) {
      Swal.fire({ 
        icon: "error", 
        title: "Failed", 
        text: err.message,
        color: "#fff",                // text color of title & content
        confirmButtonColor: "#008000",
        background: "#006600",
      });    }
  };

  const formatNiceDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()} ${d.toLocaleString("en-GB", { month: "short" })}, ${d.getFullYear()}`;
  };

  // =======================
  // RENDER
  // =======================
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading booking details...
      </div>
    );

  if (!booking)
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">Booking not found.</h2>
        <button
          className="mt-4 px-4 py-2 bg-green-600 text-white"
          onClick={() => navigate("/booking")}
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#006600]">
          Booking #{booking.bookingNumber}
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border text-gray-700"
        >
          Back
        </button>
      </div>

      <div className="bg-white shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-4 ">

        <p><strong>Name:</strong> {booking.firstName} {booking.lastName}</p>
        <p><strong>Email:</strong> {booking.email}</p>
        <p><strong>Country:</strong> {booking.country}</p>
        <p><strong>Phone:</strong> {booking.phoneNumber}</p>

        <p><strong>Room Type:</strong> {booking.rooms?.[0]?.roomType}</p>
        <p><strong>Quantity:</strong> {booking.rooms?.[0]?.quantity}</p>
        <p><strong>Price/Night:</strong> Nu. {booking.rooms?.[0]?.pricePerNight}</p>

        {selectedRoom && (
          <>
            <p><strong>Room Location:</strong> {selectedRoom.location}</p>
            <p><strong>Occupancy:</strong> {selectedRoom.occupancy}</p>
            <p><strong>Size:</strong> {selectedRoom.size} m²</p>
          </>
        )}


        <p><strong>Check-In:</strong> {formatNiceDate(booking.checkIn)}</p>
        <p><strong>Check-Out:</strong> {formatNiceDate(booking.checkOut)}</p>

        <p><strong>Total Price:</strong> Nu. {booking.totalPrice}</p>
        <p><strong>Status:</strong> {booking.status.toUpperCase()}</p>

        {/* ASSIGNED ROOM */}
        <div className="col-span-2 mt-2">
          <p className="font-bold">Assigned Room(s):</p>

          {booking.status === "checked_in" || booking.status === "cancelled" ? (
            <p className="mt-1 text-gray-700">{booking.assignedRoom?.join(", ")}</p>
          ) : (
            <div className="flex gap-2 mt-1">
              <input
                value={roomInput}
                onChange={(e) => {
                  setRoomInput(e.target.value);
                  setShowUpdate(true);
                }}
                className="border px-2 py-1  w-44 text-sm"
              />
              {showUpdate && (
                <button
                  onClick={handleUpdateRoom}
                  className="px-3 py-1 bg-[#006600] text-white text-xs "
                >
                  Update
                </button>
              )}
            </div>
          )}
        </div>

        {booking.status === "cancelled" && (
          <p className="text-red-600 col-span-2">
            <strong>Cancel Reason:</strong> {booking.cancelReason}
          </p>
        )}

        <div className="col-span-2">
          <p><strong>Special Request:</strong> {booking.specialRequest}</p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="col-span-2 flex justify-center space-x-6 mt-6">

          {/* PENDING → CONFIRM */}
          {booking.status === "pending" && (
            <button
              onClick={handleConfirmBooking}
              className="bg-[#006600] text-white px-6 py-2 "
            >
              Confirm Booking
            </button>
          )}

          {/* PENDING + CONFIRMED → GUARANTEE */}
          {(booking.status === "pending" || booking.status === "confirmed") && (
            <button
              onClick={handleGuaranteeBooking}
              className="bg-blue-700 text-white px-6 py-2 "
            >
              Guarantee Booking
            </button>
          )}

          {/* PENDING + CONFIRMED → CANCEL */}
          {(booking.status === "pending" || booking.status === "confirmed") && (
            <button
              onClick={handleCancelBooking}
              className="bg-red-600 text-white px-6 py-2 "
            >
              {booking.status === "pending" ? "Reject Booking" : "Cancel Booking"}
            </button>
          )}

          {/* CONFIRMED + GUARANTEED → CHECK IN */}
          {(booking.status === "confirmed" || booking.status === "guaranteed") && (
            <button
              onClick={handleCheckIn}
              className="bg-purple-700 text-white px-6 py-2 "
            >
              Check In
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;
