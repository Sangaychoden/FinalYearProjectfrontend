import React from "react";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";

const TermsAndConditions = () => {
  return (
    <section>
      <BreadCrumb title="Terms & Conditions" />
      <div className="min-h-screen bg-white dark:bg-black py-8 md:py-14 lg:py-14 px-6 md:px-20">
        <div className="max-w-4xl mx-auto space-y-8 leading-relaxed">

          {/* Booking Policy */}
          <div>
            <h3 className="font-bold lg:text-2xl md:text-2xl text-xl mb-5 text-gray-900 dark:text-white">1. Booking Policy</h3>
            <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-[#E5E5E5]">
              <li>Meal plan must be <span className="font-semibold text-gray-900 dark:text-white">confirmed upon booking</span>; no changes will be entertained thereafter.</li>
              <li>Booking can be made either through email or Mobile Phone (WhatsApp).</li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">Payment Terms:</span>
                <ul className="list-decimal list-inside ml-6 mt-2 space-y-1 text-gray-600 dark:text-gray-400">
                  <li>75% down payment is required for confirmation, paid either upon booking or 60 days before check-in, whichever is later.</li>
                  <li>Remaining 25% must be paid 30 days before check-in.</li>
                  <li>Bookings made within 30 days before check-in must be paid in full to confirm.</li>
                </ul>
              </li>
              <li>Check-in time: <span className="font-semibold">2:00 PM</span> | Check-out time: <span className="font-semibold">11:30 AM</span></li>
              <li>
                Children Policy:
                <ul className="list-inside ml-6 mt-2 space-y-1 text-gray-600 dark:text-[#E5E5E5]">
                  <li>Aged 1-5 Years: Free to stay with parents.</li>
                  <li>Aged 6-11 Years: EP - Nu 2800++, CP - Nu 3000++, MAP - Nu 4000++, AP - Nu 4500++</li>
                  <li>12 Years and above: Considered as adult occupant.</li>
                </ul>
              </li>
              <li>The above rates are inclusive of <span className="font-semibold">GST 5%</span> and <span className="font-semibold">Service Charge 10%</span>.</li>
            </ul>
          </div>

          {/* Cancellation & Refund Policy */}
          <div>
            <h3 className="font-bold lg:text-2xl md:text-2xl text-xl mb-5 text-gray-900 dark:text-white">2. Cancellation & Refund Policy</h3>
            <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-[#E5E5E5]">
              <li>All cancellations must be submitted through <span className="font-semibold text-gray-900 dark:text-white">email</span>. No verbal cancellation will be considered.</li>
              <li>
                Refund percentages based on the number of days prior to check-in:
                <ul className="list-decimal list-inside ml-6 mt-2 space-y-1 text-gray-600 dark:text-[#E5E5E5]">
                  <li>Within 1–20 Days: No Refund</li>
                  <li>Within 20–40 Days: 50% Refund</li>
                  <li>Within 40–60 Days: 90% Refund</li>
                </ul>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
