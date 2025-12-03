
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { Calendar } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "";

const countries = [
  { name: "Afghanistan", code: "+93" },
  { name: "Albania", code: "+355" },
  { name: "Algeria", code: "+213" },
  { name: "Andorra", code: "+376" },
  { name: "Angola", code: "+244" },
  { name: "Argentina", code: "+54" },
  { name: "Armenia", code: "+374" },
  { name: "Australia", code: "+61" },
  { name: "Austria", code: "+43" },
  { name: "Azerbaijan", code: "+994" },
  { name: "Bahamas", code: "+1‑242" },
  { name: "Bahrain", code: "+973" },
  { name: "Bangladesh", code: "+880" },
  { name: "Barbados", code: "+1‑246" },
  { name: "Belarus", code: "+375" },
  { name: "Belgium", code: "+32" },
  { name: "Belize", code: "+501" },
  { name: "Benin", code: "+229" },
  { name: "Bhutan", code: "+975" },
  { name: "Bolivia", code: "+591" },
  { name: "Bosnia and Herzegovina", code: "+387" },
  { name: "Botswana", code: "+267" },
  { name: "Brazil", code: "+55" },
  { name: "Brunei", code: "+673" },
  { name: "Bulgaria", code: "+359" },
  { name: "Burkina Faso", code: "+226" },
  { name: "Burundi", code: "+257" },
  { name: "Cambodia", code: "+855" },
  { name: "Cameroon", code: "+237" },
  { name: "Canada", code: "+1" },
  { name: "Chad", code: "+235" },
  { name: "Chile", code: "+56" },
  { name: "China", code: "+86" },
  { name: "Colombia", code: "+57" },
  { name: "Costa Rica", code: "+506" },
  { name: "Croatia", code: "+385" },
  { name: "Cuba", code: "+53" },
  { name: "Cyprus", code: "+357" },
  { name: "Czech Republic", code: "+420" },
  { name: "Denmark", code: "+45" },
  { name: "Djibouti", code: "+253" },
  { name: "Dominica", code: "+1‑767" },
  { name: "Dominican Republic", code: "+1‑809" },
  { name: "Ecuador", code: "+593" },
  { name: "Egypt", code: "+20" },
  { name: "Estonia", code: "+372" },
  { name: "Ethiopia", code: "+251" },
  { name: "Fiji", code: "+679" },
  { name: "Finland", code: "+358" },
  { name: "France", code: "+33" },
  { name: "Gabon", code: "+241" },
  { name: "Gambia", code: "+220" },
  { name: "Georgia", code: "+995" },
  { name: "Germany", code: "+49" },
  { name: "Ghana", code: "+233" },
  { name: "Greece", code: "+30" },
  { name: "Guatemala", code: "+502" },
  { name: "Haiti", code: "+509" },
  { name: "Honduras", code: "+504" },
  { name: "Hungary", code: "+36" },
  { name: "Iceland", code: "+354" },
  { name: "India", code: "+91" },
  { name: "Indonesia", code: "+62" },
  { name: "Iran", code: "+98" },
  { name: "Iraq", code: "+964" },
  { name: "Ireland", code: "+353" },
  { name: "Israel", code: "+972" },
  { name: "Italy", code: "+39" },
  { name: "Jamaica", code: "+1‑876" },
  { name: "Japan", code: "+81" },
  { name: "Jordan", code: "+962" },
  { name: "Kazakhstan", code: "+7" },
  { name: "Kenya", code: "+254" },
  { name: "Kuwait", code: "+965" },
  { name: "Kyrgyzstan", code: "+996" },
  { name: "Laos", code: "+856" },
  { name: "Latvia", code: "+371" },
  { name: "Lebanon", code: "+961" },
  { name: "Lesotho", code: "+266" },
  { name: "Liberia", code: "+231" },
  { name: "Libya", code: "+218" },
  { name: "Lithuania", code: "+370" },
  { name: "Luxembourg", code: "+352" },
  { name: "Madagascar", code: "+261" },
  { name: "Malawi", code: "+265" },
  { name: "Malaysia", code: "+60" },
  { name: "Maldives", code: "+960" },
  { name: "Mali", code: "+223" },
  { name: "Malta", code: "+356" },
  { name: "Mauritania", code: "+222" },
  { name: "Mauritius", code: "+230" },
  { name: "Mexico", code: "+52" },
  { name: "Moldova", code: "+373" },
  { name: "Monaco", code: "+377" },
  { name: "Mongolia", code: "+976" },
  { name: "Montenegro", code: "+382" },
  { name: "Morocco", code: "+212" },
  { name: "Mozambique", code: "+258" },
  { name: "Myanmar", code: "+95" },
  { name: "Namibia", code: "+264" },
  { name: "Nepal", code: "+977" },
  { name: "Netherlands", code: "+31" },
  { name: "New Zealand", code: "+64" },
  { name: "Nicaragua", code: "+505" },
  { name: "Niger", code: "+227" },
  { name: "Nigeria", code: "+234" },
  { name: "North Korea", code: "+850" },
  { name: "Norway", code: "+47" },
  { name: "Oman", code: "+968" },
  { name: "Pakistan", code: "+92" },
  { name: "Palau", code: "+680" },
  { name: "Panama", code: "+507" },
  { name: "Papua New Guinea", code: "+675" },
  { name: "Paraguay", code: "+595" },
  { name: "Peru", code: "+51" },
  { name: "Philippines", code: "+63" },
  { name: "Poland", code: "+48" },
  { name: "Portugal", code: "+351" },
  { name: "Qatar", code: "+974" },
  { name: "Romania", code: "+40" },
  { name: "Russia", code: "+7" },
  { name: "Rwanda", code: "+250" },
  { name: "Samoa", code: "+685" },
  { name: "San Marino", code: "+378" },
  { name: "Saudi Arabia", code: "+966" },
  { name: "Senegal", code: "+221" },
  { name: "Serbia", code: "+381" },
  { name: "Seychelles", code: "+248" },
  { name: "Singapore", code: "+65" },
  { name: "Slovakia", code: "+421" },
  { name: "Slovenia", code: "+386" },
  { name: "Somalia", code: "+252" },
  { name: "South Africa", code: "+27" },
  { name: "South Korea", code: "+82" },
  { name: "Spain", code: "+34" },
  { name: "Sri Lanka", code: "+94" },
  { name: "Sudan", code: "+249" },
  { name: "Sweden", code: "+46" },
  { name: "Switzerland", code: "+41" },
  { name: "Syria", code: "+963" },
  { name: "Taiwan", code: "+886" },
  { name: "Tajikistan", code: "+992" },
  { name: "Tanzania", code: "+255" },
  { name: "Thailand", code: "+66" },
  { name: "Tunisia", code: "+216" },
  { name: "Turkey", code: "+90" },
  { name: "Turkmenistan", code: "+993" },
  { name: "Uganda", code: "+256" },
  { name: "Ukraine", code: "+380" },
  { name: "United Arab Emirates", code: "+971" },
  { name: "United Kingdom", code: "+44" },
  { name: "United States", code: "+1" },
  { name: "Uruguay", code: "+598" },
  { name: "Uzbekistan", code: "+998" },
  { name: "Vanuatu", code: "+678" },
  { name: "Vatican City", code: "+379" },
  { name: "Venezuela", code: "+58" },
  { name: "Vietnam", code: "+84" },
  { name: "Yemen", code: "+967" },
  { name: "Zambia", code: "+260" },
  { name: "Zimbabwe", code: "+263" },
];


export default function BookingForm() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const initialSelectedDate = state?.selectedDate ? new Date(state.selectedDate) : null;
  const selectedRoomTypeFromState = state?.roomType || "";

  // --- CORE ---
  const [selectedRoomType, setSelectedRoomType] = useState(selectedRoomTypeFromState);
  const [roomTypeData, setRoomTypeData] = useState(null);

  const [checkInDate, setCheckInDate] = useState(initialSelectedDate);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const [roomsRequested, setRoomsRequested] = useState(1);

  // Meals
  const [meals, setMeals] = useState([]);
  const [mealPrices, setMealPrices] = useState({ breakfast: 0, lunch: 0, dinner: 0 });

  // Room numbers
  const [selectedRoomNos, setSelectedRoomNos] = useState([]);

  // occupancy per room
  const [occupancyTypes, setOccupancyTypes] = useState(["double"]);

  // adult logic
  const [baseAdults, setBaseAdults] = useState(2);
  const [convertedFromChildren, setConvertedFromChildren] = useState(0);

  // children
  const [childrenCount, setChildrenCount] = useState(0);
  const [childAges, setChildAges] = useState([]);

  // meal plan & extra beds
  const [mealPlan, setMealPlan] = useState("ep");
  const [extraBeds, setExtraBeds] = useState(0);

  // guest/agency
  const [isAgencyBooking, setIsAgencyBooking] = useState(false);
  const [agencyName, setAgencyName] = useState("");
  const [agentName, setAgentName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Bhutan");
  const [phoneCode, setPhoneCode] = useState("+975");
  const [phone, setPhone] = useState("");
  const [journalInput, setJournalInput] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  const [errors, setErrors] = useState({});
  const [loadingAvailableRooms, setLoadingAvailableRooms] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]);

  const [openDatePickerFor, setOpenDatePickerFor] = useState(null);
  const datePickerRef = useRef();

  const [perNightBreakdown, setPerNightBreakdown] = useState({
    baseRooms: 0,
    childrenTotal: 0,
    extraBeds: 0,
    mealsTotal: 0,
    grandPerNight: 0,
    nights: 1,
    grandTotal: 0,
  });

  const adults = Number(baseAdults) + Number(convertedFromChildren);

  // sync selected rooms with room count
  useEffect(() => {
    setSelectedRoomNos((prev) => {
      const arr = [...prev];
      while (arr.length < roomsRequested) arr.push("");
      return arr.slice(0, roomsRequested);
    });
  }, [roomsRequested]);

  // sync occupancy types
  useEffect(() => {
    setOccupancyTypes((prev) => {
      const arr = [...prev];
      while (arr.length < roomsRequested) arr.push("double");
      return arr.slice(0, roomsRequested);
    });
  }, [roomsRequested]);

  // sync child age array
  useEffect(() => {
    setChildAges((prev) => {
      const arr = [...prev];
      while (arr.length < childrenCount) arr.push("6-11");
      return arr.slice(0, childrenCount);
    });
  }, [childrenCount]);

  // load room type data
  useEffect(() => {
    if (!selectedRoomType) return;

    const load = async () => {
        try {
        const res = await fetch(
          `${API_URL}/rooms/room-types/${encodeURIComponent(selectedRoomType)}`,
          { credentials: "include" }
        );

        if (!res.ok) {
          const list = await fetch(`${API_URL}/rooms/room-types`, { credentials: "include" });
          const json = await list.json();
          const found = json.roomTypes?.find((r) => r.roomType === selectedRoomType);
          setRoomTypeData(found || null);
          return;
        }

        const json = await res.json();
        setRoomTypeData(json.roomType || json);
      } catch (e) {
        console.error("Failed to load room type info", e);
      }
    };

    load();
  }, [selectedRoomType]);

  // meal prices
  useEffect(() => {
    if (!roomTypeData?.pricing?.meals) {
      setMealPrices({ breakfast: 0, lunch: 0, dinner: 0 });
      return;
    }
    setMealPrices({
      breakfast: Number(roomTypeData.pricing.meals.breakfast || 0),
      lunch: Number(roomTypeData.pricing.meals.lunch || 0),
      dinner: Number(roomTypeData.pricing.meals.dinner || 0),
    });
  }, [roomTypeData]);

  // auto meals based on mealPlan
  useEffect(() => {
    if (mealPlan === "ep") setMeals([]);
    else if (mealPlan === "cp") setMeals(["breakfast"]);
    else if (mealPlan === "map") setMeals(["breakfast"]);
    else if (mealPlan === "ap") setMeals(["breakfast", "lunch", "dinner"]);
  }, [mealPlan]);

  // available rooms fetch
  useEffect(() => {
    const fetchAvailable = async () => {
      setAvailableRooms([]);
      setSelectedRoomNos((prev) => prev.map(() => ""));
      if (!selectedRoomType || !checkInDate || !checkOutDate) return;

      const toYMD = (d) => {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
      };

      const checkInStr = toYMD(checkInDate);
      const checkOutStr = toYMD(checkOutDate);

      setLoadingAvailableRooms(true);
      try {
        const url = `${API_URL}/rooms/available-numbers/${encodeURIComponent(
          selectedRoomType
        )}?checkIn=${checkInStr}&checkOut=${checkOutStr}`;

        const res = await fetch(url, { credentials: "include" });
        const data = await res.json();

        let arr = null;
        if (Array.isArray(data.availableRoomNumbers)) arr = data.availableRoomNumbers;
        else if (Array.isArray(data.available)) arr = data.available;
        else if (Array.isArray(data)) arr = data;

        if (Array.isArray(arr)) setAvailableRooms(arr.map(String));
      } catch (err) {
        console.error("Error loading available rooms", err);
      } finally {
        setLoadingAvailableRooms(false);
      }
    };

    fetchAvailable();
  }, [selectedRoomType, checkInDate, checkOutDate]);

  // validation helper

  const calcNights = (from, to) => {
    if (!from || !to) return 1;
    const diff = Math.ceil((to - from) / 86400000);
    return diff > 0 ? diff : 1;
  };

  // MAP toggle meal logic
  const toggleMeal = (meal) => {
    if (mealPlan === "ap") return;
    if (mealPlan === "cp" && meal === "breakfast") return;

    if (mealPlan === "map") {
      if (meal === "breakfast") return;
      setMeals((prev) => {
        const updated = [...prev];
        return updated.includes(meal)
          ? updated.filter((m) => m !== meal)
          : [...updated, meal];
      });
      return;
    }

    setMeals((prev) =>
      prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]
    );
  };

  const childAgeOptions = [
    { value: "1-5", label: "1-5" },
    { value: "6-11", label: "6-11" },
    { value: "12+", label: "12+" },
  ];

  const optionsForIndex = (index) => {
    const selectedOthers = selectedRoomNos.filter((_, i) => i !== index && selectedRoomNos[i]);
    return availableRooms.filter((r) => !selectedOthers.includes(r));
  };

  // extra bed UI visibility and eligible rooms
  const showExtraBedSection = mealPlan === "map" || occupancyTypes.some((occ) => occ === "double");

  const eligibleRoomsCount =
    mealPlan === "map" ? roomsRequested : occupancyTypes.filter((occ) => occ === "double").length;

  useEffect(() => {
    if (extraBeds > eligibleRoomsCount) setExtraBeds(eligibleRoomsCount);
  }, [eligibleRoomsCount]);

  // child age -> convert to adult if 12+
  const handleChildAgeChange = (index, value) => {
    if (value === "12+") {
      setConvertedFromChildren((prev) => prev + 1);
      setChildAges((prev) => {
        const arr = [...prev];
        arr.splice(index, 1);
        return arr;
      });
      setChildrenCount((c) => Math.max(0, c - 1));
      return;
    }

    setChildAges((prev) => {
      const arr = [...prev];
      arr[index] = value;
      return arr;
    });
  };

  const handleChildrenCountChange = (newCount) => {
    newCount = Math.max(0, Number(newCount || 0));
    setChildrenCount(newCount);
  };

  const handleAdultsInputChange = (newTotalAdults) => {
    newTotalAdults = Math.max(1, Number(newTotalAdults || 1));
    const newBase = Math.max(1, newTotalAdults - convertedFromChildren);
    setBaseAdults(newBase);
  };

  // ------------ PRICING ------------
  useEffect(() => {
    const breakdown = {
      baseRooms: 0,
      childrenTotal: 0,
      extraBeds: 0,
      mealsTotal: 0,
      grandPerNight: 0,
      nights: calcNights(checkInDate, checkOutDate),
      grandTotal: 0,
    };

    if (!roomTypeData || !roomTypeData.pricing) {
      setPerNightBreakdown(breakdown);
      return;
    }

    const pricing = roomTypeData.pricing;
    const nights = breakdown.nights;

    // ROOM BASE PRICE
    let base = 0;
    for (let i = 0; i < roomsRequested; i++) {
      const occ = occupancyTypes[i] || "double";
      // const occKey = occ === "twin" ? "double" : occ;
      const occKey = occ; // because twin no longer exists
      const mealBlock = pricing[mealPlan] || pricing.ep || {};
      const roomPrice = Number(mealBlock[occKey] ?? 0);
      base += roomPrice;
    }

    // CHILDREN TOTAL (under 12)
    let childrenTotal = 0;
    childAges.forEach((ageStr) => {
      if (!ageStr) return;
      if (ageStr === "0-1" || ageStr === "1-5") {
        childrenTotal += Number(pricing.childPolicy?.age1to5?.price ?? 0);
      } else if (ageStr === "6-11") {
        childrenTotal += Number(pricing.childPolicy?.age6to11?.[mealPlan] ?? 0);
      }
    });

    // EXTRA BED: quantity × unitPrice
    let extraBedTotal = 0;
    try {
      let unit = 0;
      if (mealPlan === "map") {
        unit = Number(
          pricing.extraBed?.mapDouble ?? pricing.extraBed?.mapSingle ?? 0
        );
      } else {
        unit = Number(pricing.extraBed?.[mealPlan] ?? 0);
      }
      extraBedTotal = unit * Number(extraBeds);
    } catch (err) {
      extraBedTotal = 0;
    }

    // MEALS PER NIGHT (adults only)
    let mealPerNight = 0;
    if (mealPlan === "ep") {
      meals.forEach((m) => (mealPerNight += Number(mealPrices[m] ?? 0)));
    }
    if (mealPlan === "cp") {
      meals.forEach((m) => {
        if (m !== "breakfast") mealPerNight += Number(mealPrices[m] ?? 0);
      });
    }
    if (mealPlan === "map") {
      const ld = meals.filter((m) => m === "lunch" || m === "dinner");
      if (ld.length === 2) {
        mealPerNight += Number(mealPrices[ld[1]] ?? 0);
      }
    }

    let mealsTotal = 0;
    if (mealPlan !== "ap") {
      const adultMealCount = Number(baseAdults) + Number(convertedFromChildren);
      mealsTotal = mealPerNight * adultMealCount;
    }

    // FINAL
    const grandPerNight = base + childrenTotal + extraBedTotal + mealsTotal;
    const grandTotal = grandPerNight * nights;

    breakdown.baseRooms = base;
    breakdown.childrenTotal = childrenTotal;
    breakdown.extraBeds = extraBedTotal;
    breakdown.mealsTotal = mealsTotal;
    breakdown.grandPerNight = grandPerNight;
    breakdown.grandTotal = grandTotal;

    setPerNightBreakdown(breakdown);
  }, [
    roomTypeData,
    roomsRequested,
    occupancyTypes,
    baseAdults,
    convertedFromChildren,
    childAges,
    meals,
    mealPlan,
    mealPrices,
    extraBeds,
    checkInDate,
    checkOutDate,
  ]);
  // ---------------------- SUBMIT HELPERS ----------------------
  const toYMD = (d) => {
    if (!d) return "";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

    // ---------------------- VALIDATION ----------------------
  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };
    
    switch (fieldName) {
      case "firstName":
        if (!isAgencyBooking && !value?.trim()) {
          newErrors.firstName = "First name is required";
        } else {
          delete newErrors.firstName;
        }
        break;
      case "lastName":
        if (!isAgencyBooking && !value?.trim()) {
          newErrors.lastName = "Last name is required";
        } else {
          delete newErrors.lastName;
        }
        break;
      case "agencyName":
        if (isAgencyBooking && !value?.trim()) {
          newErrors.agencyName = "Agency name is required";
        } else {
          delete newErrors.agencyName;
        }
        break;
      case "agentName":
        if (isAgencyBooking && !value?.trim()) {
          newErrors.agentName = "Agent name is required";
        } else {
          delete newErrors.agentName;
        }
        break;
      case "email":
        if (!value?.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(value)) {
          newErrors.email = "Invalid email format";
        } else {
          delete newErrors.email;
        }
        break;
      case "phone":
        if (!value?.trim()) {
          newErrors.phone = "Phone number is required";
        } else if (!/^[0-9]{7,15}$/.test(value.replace(/\D/g, ''))) {
          newErrors.phone = "Invalid phone number (7-15 digits)";
        } else {
          delete newErrors.phone;
        }
        break;
      case "journalNumber":
        if (!value?.trim()) {
          newErrors.journalNumber = "Journal number is required";
        } else {
          delete newErrors.journalNumber;
        }
        break;
      case "checkInDate":
        if (!value) {
          newErrors.checkInDate = "Check-in date is required";
        } else {
          delete newErrors.checkInDate;
        }
        // Also check checkout if it exists
        if (value && checkOutDate && checkOutDate <= value) {
          newErrors.checkOutDate = "Check-out must be after check-in";
        }
        break;
      case "checkOutDate":
        if (!value) {
          newErrors.checkOutDate = "Check-out date is required";
        } else if (checkInDate && value <= checkInDate) {
          newErrors.checkOutDate = "Check-out must be after check-in";
        } else {
          delete newErrors.checkOutDate;
        }
        break;
      case "roomSelection":
        if (availableRooms.length > 0) {
          const assignedRooms = selectedRoomNos.filter(room => room && room.trim());
          if (assignedRooms.length !== roomsRequested) {
            newErrors.roomSelection = `Please select ${roomsRequested} room number(s)`;
          } else {
            delete newErrors.roomSelection;
          }
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  // Live validation effects for individual fields
  useEffect(() => {
    validateField("firstName", firstName);
  }, [firstName]);

  useEffect(() => {
    validateField("lastName", lastName);
  }, [lastName]);

  useEffect(() => {
    validateField("agencyName", agencyName);
  }, [agencyName]);

  useEffect(() => {
    validateField("agentName", agentName);
  }, [agentName]);

  useEffect(() => {
    validateField("email", email);
  }, [email]);

  useEffect(() => {
    validateField("phone", phone);
  }, [phone]);

  useEffect(() => {
    validateField("journalNumber", journalInput);
  }, [journalInput]);

  useEffect(() => {
    validateField("checkInDate", checkInDate);
  }, [checkInDate]);

  useEffect(() => {
    validateField("checkOutDate", checkOutDate);
  }, [checkOutDate, checkInDate]);

  useEffect(() => {
    validateField("roomSelection", null);
  }, [selectedRoomNos, roomsRequested, availableRooms]);


  const submitBooking = async (status) => {
      console.log("🟡 submitBooking called with status:", status);
    // Validate all fields on submit
    validateField("firstName", firstName);
    validateField("lastName", lastName);
    validateField("agencyName", agencyName);
    validateField("agentName", agentName);
    validateField("email", email);
    validateField("phone", phone);
    validateField("journalNumber", journalInput);
    validateField("checkInDate", checkInDate);
    validateField("checkOutDate", checkOutDate);
    validateField("roomSelection", null);

    // Check if there are any errors
    const newErrors = {};
    if (!checkInDate) newErrors.checkInDate = "Check-in date is required";
    if (!checkOutDate) newErrors.checkOutDate = "Check-out date is required";
    if (checkInDate && checkOutDate && checkOutDate <= checkInDate) {
      newErrors.checkOutDate = "Check-out must be after check-in";
    }
    if (!journalInput.trim()) {
      newErrors.journalNumber = "Journal number is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{7,15}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = "Invalid phone number (7-15 digits)";
    }
    if (isAgencyBooking) {
      if (!agencyName.trim()) newErrors.agencyName = "Agency name is required";
      if (!agentName.trim()) newErrors.agentName = "Agent name is required";
    } else {
      if (!firstName.trim()) newErrors.firstName = "First name is required";
      if (!lastName.trim()) newErrors.lastName = "Last name is required";
    }
    if (availableRooms.length > 0) {
      const assignedRooms = selectedRoomNos.filter(room => room && room.trim());
      if (assignedRooms.length !== roomsRequested) {
        newErrors.roomSelection = `Please select ${roomsRequested} room number(s)`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
        console.log("❌ Validation errors found:", newErrors);
      setErrors(newErrors);
      return;
    }
    

    // const payload = {
    //   isAgencyBooking,
    //   agencyName: isAgencyBooking ? agencyName : undefined,
    //   agentName: isAgencyBooking ? agentName : undefined,

    //   country,
    //   // Always send email and phone
    //   email,
    //   phone,

    //   // Guest fields only when NOT agency
    //   firstName: isAgencyBooking ? undefined : firstName,
    //   lastName: isAgencyBooking ? undefined : lastName,

    //   // Agency fields only when agency
    //   agencyName: isAgencyBooking ? agencyName : undefined,
    //   agentName: isAgencyBooking ? agentName : undefined,

    //         // firstName: !isAgencyBooking ? firstName : undefined,
    //   // lastName: !isAgencyBooking ? lastName : undefined,
    //   // email: !isAgencyBooking ? email : undefined,
    //   // phone: !isAgencyBooking ? phone : undefined,

    //   checkIn: toYMD(checkInDate),
    //   checkOut: toYMD(checkOutDate),

    //   roomSelection: [
    //     {
    //       roomType: selectedRoomType,
    //       roomsRequested,
    //       occupancyType: occupancyTypes,
    //       adults: Number(baseAdults) + Number(convertedFromChildren),
    //       childrenAges: childAges,
    //       extraBed: extraBeds,
    //       mealPlan,
    //     },
    //   ],

    //   selectedMeals: meals.length ? meals : undefined,
    //   specialRequest,
    //   assignedRoom: assigned.length ? assigned : undefined,
    //   journalNumber: journalInput || undefined,

    //   calculatedPricing: perNightBreakdown,
    //   childAges,
    //   childrenCount: childAges.length,
    //   statusOverride: status,
    // };
const payload = {
  isAgencyBooking,

  // Always send these 3 fields (no duplicates!)
  email,
  phone,
  country,

  // Agency fields (only when agency)
  agencyName: isAgencyBooking ? agencyName : undefined,
  agentName: isAgencyBooking ? agentName : undefined,

  // Normal guest fields (only when NOT agency)
  firstName: !isAgencyBooking ? firstName : undefined,
  lastName: !isAgencyBooking ? lastName : undefined,

  // Dates
  checkIn: toYMD(checkInDate),
  checkOut: toYMD(checkOutDate),

  // Room selection
  roomSelection: [
    {
      roomType: selectedRoomType,
      roomsRequested,
      occupancyType: occupancyTypes,
      adults: Number(baseAdults) + Number(convertedFromChildren),
      childrenAges: childAges,
      extraBed: extraBeds,
      mealPlan,
    },
  ],

  selectedMeals: meals.length ? meals : undefined,
  specialRequest,
  assignedRoom: selectedRoomNos.length ? selectedRoomNos : undefined,
  journalNumber: journalInput || undefined,

  calculatedPricing: perNightBreakdown,
  childAges,
  childrenCount: childAges.length,
  statusOverride: status,
};


    try {
      const res = await fetch(`${API_URL}/bookings/book-rooms`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Booking failed");

      await Swal.fire({
        title: "Success",
        text: `Booking created (${status})`,
        icon: "success",
        background: "#006600",
        color: "white",
        confirmButtonColor: "#008000",
      });

      navigate("/booking", { state: { activeTab: "BOOKED" } });
    } catch (err) {
      Swal.fire("Error", err.message || "Failed to create booking", "error", {
        background: "#006600",
        color: "white",
        confirmButtonColor: "#008000",
      });
    }
  };

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "";

  useEffect(() => {
    const onDocClick = (e) => {
      if (!datePickerRef.current) return;
      if (!datePickerRef.current.contains(e.target)) setOpenDatePickerFor(null);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const mapShowPrice = (mealName) => {
    if (mealPlan !== "map") return true;
    const ld = meals.filter((m) => m === "lunch" || m === "dinner");
    if (ld.length === 2) return ld[1] === mealName;
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50 px-2 py-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-[#006600]">
          AVAILABLE Booking Details
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-gray-300 hover:bg-gray-100"
        >
          Back
        </button>
      </div>

      {/* ---------------- Agency/Guest Toggle ---------------- */}
      <div className="flex justify-center mb-3 mt-6">
        <div className="flex mb-5 border border-gray-300 w-full max-w-md">
          <button
            type="button"
            className={`flex-1 py-2 font-medium ${
              !isAgencyBooking
                ? "bg-[#006600] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => {
              setIsAgencyBooking(false);
              setErrors({});
            }}
          >
            Guest
          </button>
          <button
            type="button"
            className={`flex-1 py-2 font-medium ${
              isAgencyBooking
                ? "bg-[#006600] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => {
              setIsAgencyBooking(true);
              setErrors({});
            }}
          >
            Travel Agency
          </button>
        </div>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* --------------- LEFT PANEL --------------- */}
        <div className="bg-white shadow p-4">
          <h2 className="text-xl font-bold mb-3 py-2">Room Information</h2>

          {/* Room Type */}
          <div>
            <label className="font-semibold">Room Type:</label>
            <div className="mt-1 border px-3 py-2 bg-gray-100 text-gray-800">
              {selectedRoomType || "—"}
            </div>
          </div>

<div className="relative mt-4" ref={datePickerRef}>
  <label className="font-semibold">Check-In:</label>
  <div
    onClick={(e) => {
      e.stopPropagation();
      setOpenDatePickerFor(
        openDatePickerFor === "checkin" ? null : "checkin"
      );
    }}
    className={`mt-1 w-full border px-3 py-3 flex justify-between cursor-pointer ${errors.checkInDate ? 'border-red-500' : ''}`}
  >
    <span>{formatDate(checkInDate)}</span>
    <Calendar />
  </div>
  {errors.checkInDate && (
    <p className="text-red-500 text-sm mt-1">{errors.checkInDate}</p>
  )}

            {openDatePickerFor === "checkin" && (
              <div className="absolute z-50 mt-2">
                <DatePicker
                  inline
                  selected={checkInDate}
                  minDate={new Date()}
                  onChange={(d) => {
                    setCheckInDate(d);
                    validateField("checkInDate", d);
                    setOpenDatePickerFor(null);
                  }}
                />
              </div>
            )}
          </div>

          {/* Check-Out */}
          <div className="relative mt-4" ref={datePickerRef}>
            <label className="font-semibold">Check-Out:</label>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setOpenDatePickerFor(
                  openDatePickerFor === "checkout" ? null : "checkout"
                );
              }}
              className={`mt-1 w-full border px-3 py-3 flex justify-between cursor-pointer ${errors.checkOutDate ? 'border-red-500' : ''}`}
            >
              <span>{formatDate(checkOutDate)}</span>
              <Calendar />
            </div>
            {errors.checkOutDate && (
              <p className="text-red-500 text-sm mt-1">{errors.checkOutDate}</p>
            )}

            {openDatePickerFor === "checkout" && (
              <div className="absolute z-50 mt-2">
                <DatePicker
                  inline
                  selected={checkOutDate}
                  minDate={checkInDate || new Date()}
                  onChange={(d) => {
                    setCheckOutDate(d);
                    validateField("checkOutDate", d);
                    setOpenDatePickerFor(null);
                  }}
                />
              </div>
            )}
          </div>
          {/* Room Numbers */}
          <div className="mt-4">
            <label className="font-semibold">Room Number(s):</label>

            {loadingAvailableRooms ? (
              <div className="mt-1 border px-3 py-2 bg-gray-50">Loading rooms...</div>
            ) : (
              <>
                {Array.from({ length: roomsRequested }).map((_, idx) => (
                  <div key={idx} className="mt-2">
                    <label className="text-sm">Room {idx + 1}</label>
                    <select
                      value={selectedRoomNos[idx] || ""}
                      onChange={(e) => {
                        const arr = [...selectedRoomNos];
                        arr[idx] = e.target.value;
                        setSelectedRoomNos(arr);
                      }}
                      className="mt-1 border px-3 py-2 w-full"
                    >
                      <option value="">Select</option>
                      {optionsForIndex(idx).map((rn) => (
                        <option key={rn} value={rn}>
                          {rn}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

{errors.roomSelection && (
  <p className="text-red-500 text-sm mt-2">{errors.roomSelection}</p>
)}
                {!availableRooms.length && (
                  <p className="text-sm text-gray-600 mt-1">
                    No rooms available for these dates / type.
                  </p>
                )}
              </>
            )}
          </div>

          {/* Rooms / Adults */}
          <div className="flex gap-3 mt-4">
            <div className="flex-1">
              <label className="font-semibold">Rooms Requested:</label>
              <input
                type="number"
                min="1"
                value={roomsRequested}
                onChange={(e) => setRoomsRequested(Math.max(1, parseInt(e.target.value || 1)))}
                className="mt-1 border px-3 py-2 w-full"
              />
            </div>

            <div className="flex-1">
              <label className="font-semibold">Adults:</label>
              <input
                type="number"
                min="1"
                value={adults}
                onChange={(e) => handleAdultsInputChange(e.target.value)}
                className="mt-1 border px-3 py-2 w-full"
              />
              {convertedFromChildren > 0 && (
                <p className="text-sm text-gray-600">Includes {convertedFromChildren} child(ren) converted to adult (age 12+)</p>
              )}
            </div>
          </div>

          {/* Children */}
          <div className="mt-3">
            <label className="font-semibold">Children (under 12):</label>
            <div className="mt-1">
              <input
                type="number"
                min="0"
                value={childrenCount}
                onChange={(e) => handleChildrenCountChange(Math.max(0, parseInt(e.target.value || 0)))}
                className="border px-3 py-2 w-full"
              />

              <div className="mt-3">
                {Array.from({ length: childrenCount }).map((_, idx) => (
                  <div key={idx} className="mt-2">
                    <label className="text-sm">Child {idx + 1} age</label>
                    <select
                      value={childAges[idx] || "6-11"}
                      onChange={(e) => handleChildAgeChange(idx, e.target.value)}
                      className="mt-1 border px-3 py-2 w-full"
                    >
                      {childAgeOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {convertedFromChildren > 0 && (
              <p className="text-sm text-yellow-700 mt-2">Note: {convertedFromChildren} child(ren) selected as 12+ were moved into the adult count automatically.</p>
            )}
          </div>

          {/* Occupancy */}
          <div className="mt-4">
            <label className="font-semibold">Occupancy Type (per room):</label>
            <div className="mt-1 grid grid-cols-1 gap-2">
              {Array.from({ length: roomsRequested }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>Room {i + 1}</div>
                  <select
                    value={occupancyTypes[i] || "double"}
                    onChange={(e) => {
                      const arr = [...occupancyTypes];
                      arr[i] = e.target.value;
                      setOccupancyTypes(arr);
                    }}
                    className="border px-3 py-2 w-36"
                  >
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    {/* <option value="twin">Twin</option> */}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* EXTRA BEDS GLOBAL */}
          {showExtraBedSection && (
            <div className="mt-4">
              <label className="font-semibold">Extra Beds (Global)</label>
              <select
                value={extraBeds}
                onChange={(e) => setExtraBeds(Number(e.target.value))}
                className="mt-1 border px-3 py-2 w-full"
              >
                {Array.from({ length: eligibleRoomsCount + 1 }).map((_, i) => (
                  <option key={i} value={i}>
                    {i} {i === 1 ? "extra bed" : "extra beds"}
                  </option>
                ))}
              </select>

              <p className="text-sm text-gray-600 mt-1">
                Eligible rooms: {eligibleRoomsCount}
                {mealPlan === "map" && " (MAP allows extra beds for all rooms)"}
              </p>
            </div>
          )}

          {/* Meal Plan */}
          <div className="mt-4">
            <label className="font-semibold">Meal Plan</label>
            <select
              value={mealPlan}
              onChange={(e) => setMealPlan(e.target.value)}
              className="mt-1 border px-3 py-2 w-full"
            >
              <option value="ep">EP</option>
              <option value="cp">CP</option>
              <option value="map">MAP</option>
              <option value="ap">AP</option>
            </select>
          </div>

          {/* Summary */}
          <div className="mt-4 border-t pt-3">
            <p className="font-semibold">Summary</p>
            <div className="mt-2 text-sm">
              <div className="flex justify-between mb-1">
                <span>Room(s) per night</span>
                <span>Nu. {perNightBreakdown.baseRooms.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-1">
                <span>Children total / night</span>
                <span>Nu. {perNightBreakdown.childrenTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-1">
                <span>Extra beds / night</span>
                <span>Nu. {perNightBreakdown.extraBeds.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-1">
                <span>Meals / night</span>
                <span>Nu. {perNightBreakdown.mealsTotal.toFixed(2)}</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between font-bold">
                <span>Total per night</span>
                <span>Nu. {perNightBreakdown.grandPerNight.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Length (nights)</span>
                <span>{perNightBreakdown.nights}</span>
              </div>

              <div className="flex justify-between mt-4 mb-2 text-xl font-bold">
                <span>Grand total</span>
                <span>Nu. {perNightBreakdown.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- RIGHT PANEL ---------------- */}
        <div className="bg-white shadow p-4">
          <h2 className="text-xl font-bold mb-3 py-2">{isAgencyBooking ? "Agency Information" : "Guest Information"}</h2>

          {/* ---------------- AGENCY MODE ---------------- */}
          {isAgencyBooking ? (
            <>
              {/* Agency Name */}
<div>
  <label className="font-semibold">Agency Name:</label>
  <input
    type="text"
    value={agencyName}
    onChange={(e) => setAgencyName(e.target.value)}
    className={`mt-1 border px-3 py-2 w-full ${errors.agencyName ? 'border-red-500' : ''}`}
  />
  {errors.agencyName && (
    <p className="text-red-500 text-sm mt-1">{errors.agencyName}</p>
  )}
</div>
<div className="mt-3">
  <label className="font-semibold">Agent Name:</label>
  <input
    type="text"
    value={agentName}
    onChange={(e) => setAgentName(e.target.value)}
    className={`mt-1 border px-3 py-2 w-full ${errors.agentName ? 'border-red-500' : ''}`}
  />
  {errors.agentName && (
    <p className="text-red-500 text-sm mt-1">{errors.agentName}</p>
  )}
</div>
<div className="mt-3">
  <label className="font-semibold">Email:</label>
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className={`mt-1 border px-3 py-2 w-full ${errors.email ? 'border-red-500' : ''}`}
  />
  {errors.email && (
    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
  )}
</div>
              {/* Agent Country */}
              <div className="mt-3">
                <label className="font-semibold">Country:</label>
                <select
                  value={country}
                  onChange={(e) => {
                    const sel = e.target.value;
                    setCountry(sel);
                    const c = countries.find((x) => x.name === sel);
                    setPhoneCode(c?.code || "+975");
                  }}
                  className="mt-1 border px-3 py-2 w-full"
                >
                  {countries.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </div>

<div className="flex gap-2 mt-3">
  <div className="w-32">
    <label>Code</label>
    <input
      readOnly
      value={phoneCode}
      className="mt-1 bg-gray-100 border px-3 py-2 w-full"
    />
  </div>

      <div className="flex-1">
        <label>Phone</label>
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={15}
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 15))}
          className={`mt-1 border px-3 py-2 w-full ${errors.phone ? 'border-red-500' : ''}`}
        />
    {errors.phone && (
      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
    )}
  </div>
</div>
            </>
            
          ) : (
            <>
              {/* ---------------- NORMAL GUEST MODE ---------------- */}

              <div>
                <label className="font-semibold">First Name:</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  className={`mt-1 border px-3 py-2 w-full ${errors.firstName ? 'border-red-500' : ''}`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>

              <div className="mt-3">
                <label className="font-semibold">Last Name:</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  className={`mt-1 border px-3 py-2 w-full ${errors.lastName ? 'border-red-500' : ''}`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>

<div className="mt-3">
  <label className="font-semibold">Email:</label>
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className={`mt-1 border px-3 py-2 w-full ${errors.email ? 'border-red-500' : ''}`}
  />
  {errors.email && (
    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
  )}
</div>
              {/* Country */}
              <div className="mt-3">
                <label className="font-semibold">Country:</label>
                <select
                  value={country}
                  onChange={(e) => {
                    const sel = e.target.value;
                    setCountry(sel);
                    const c = countries.find((x) => x.name === sel);
                    setPhoneCode(c?.code || "+975");
                  }}
                  className="mt-1 border px-3 py-2 w-full"
                >
                  {countries.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </div>

<div className="flex gap-2 mt-3">
  <div className="w-32">
    <label>Code</label>
    <input
      readOnly
      value={phoneCode}
      className="mt-1 bg-gray-100 border px-3 py-2 w-full"
    />
  </div>

    <div className="flex-1">
      <label>Phone</label>
      <input
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={15}
        value={phone}
        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 15))}
        className={`mt-1 border px-3 py-2 w-full ${errors.phone ? 'border-red-500' : ''}`}
      />
    {errors.phone && (
      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
    )}
  </div>
</div>
            </>
          )}

          {/* ---------------- MEALS ---------------- */}
          <div className="mt-4">
            <label className="font-semibold">Meals Required:</label>
            <div className="flex flex-col gap-2 mt-1">
              {/* Breakfast */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={meals.includes("breakfast")}
                  disabled={mealPlan === "cp" || mealPlan === "map" || mealPlan === "ap"}
                  onChange={() => toggleMeal("breakfast")}
                />
                <span>Breakfast</span>

                {mealPlan === "ep" && (
                  <span className="text-gray-500">(+Nu. {mealPrices.breakfast})</span>
                )}
                {mealPlan !== "ep" && (
                  <span className="text-green-600 ml-2">Included</span>
                )}
              </label>

              {/* Lunch */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={meals.includes("lunch")}
                  disabled={mealPlan === "ap"}
                  onChange={() => toggleMeal("lunch")}
                />
                <span>Lunch</span>

                {(mealPlan === "ep" || mealPlan === "cp") && (
                  <span className="text-gray-500">(+Nu. {mealPrices.lunch})</span>
                )}
                {mealPlan === "map" && mapShowPrice("lunch") && (
                  <span className="text-gray-500">(+Nu. {mealPrices.lunch})</span>
                )}
                {mealPlan === "ap" && (
                  <span className="text-green-600 ml-2">Included</span>
                )}
              </label>

              {/* Dinner */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={meals.includes("dinner")}
                  disabled={mealPlan === "ap"}
                  onChange={() => toggleMeal("dinner")}
                />
                <span>Dinner</span>

                {(mealPlan === "ep" || mealPlan === "cp") && (
                  <span className="text-gray-500">(+Nu. {mealPrices.dinner})</span>
                )}
                {mealPlan === "map" && mapShowPrice("dinner") && (
                  <span className="text-gray-500">(+Nu. {mealPrices.dinner})</span>
                )}
                {mealPlan === "ap" && (
                  <span className="text-green-600 ml-2">Included</span>
                )}
              </label>
            </div>
          </div>

          {/* Journal Number */}
          <div className="mt-3">
            <label className="font-semibold">Journal Number:</label>
            <input
              type="text"
              value={journalInput}
              onChange={(e) => setJournalInput(e.target.value)}
              className={`mt-1 border px-3 py-2 w-full ${errors.journalNumber ? 'border-red-500' : ''}`}
            />
            {errors.journalNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.journalNumber}</p>
            )}
          </div>

          {/* Special Request */}
          <div className="mt-3">
            <label className="font-semibold">Special Request:</label>
            <textarea
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              className="mt-1 border px-3 py-2 w-full"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => submitBooking("confirmed")}
              className="flex-1 bg-[#006600] text-white px-6 py-2 shadow hover:bg-green-800"
            >
              Deposit Booking
            </button>

            <button
              type="button"
              onClick={() => submitBooking("guaranteed")}
              className="flex-1 bg-[#0052CC] text-white px-6 py-2 shadow hover:bg-blue-800"
            >
              Full Payment Booking
            </button>
          </div>
          
        </div>
        
      </form>
    </div>
    
  );
}
