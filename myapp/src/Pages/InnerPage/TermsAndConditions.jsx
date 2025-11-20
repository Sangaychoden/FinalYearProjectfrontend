import React from "react";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";

const TermsAndConditions = () => {
  return (
    <section>
      <BreadCrumb title="Terms & Conditions" />
      <div className="min-h-screen bg-white py-14 px-6 md:px-20">
        <div className="max-w-9xl mx-auto space-y-8 text-gray-700">
          
          {/* Reservations */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Reservations</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>All bookings made through this website are requests only.</li>
              <li>A reservation is considered confirmed only after you receive an email confirmation from the hotel team.</li>
            </ul>
          </div>

          {/* Check-In & Check-Out */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Check-In & Check-Out</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Check-in time: 2:00 PM onwards.</li>
              <li>Check-out time: 12:00 PM.</li>
              <li>Early check-in or late check-out is subject to availability and may incur additional charges.</li>
            </ul>
          </div>

          {/* Cancellation & No-Show */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Cancellation & No-Show</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Cancellations made up to 48 hours before arrival are free of charge.</li>
              <li>Cancellations made within 48 hours of arrival or no-shows may be charged the first night's stay.</li>
            </ul>
          </div>

          {/* Payments */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Payments</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Payment details and methods will be shared by email once your booking is confirmed.</li>
              <li>The booking will only be finalized after payment is received.</li>
            </ul>
          </div>

          {/* Guest Responsibilities */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Guest Responsibilities</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Guests are expected to respect hotel property and fellow guests.</li>
              <li>Any damages caused will be charged to the guest’s account.</li>
              <li>Smoking is prohibited in non-smoking rooms.</li>
            </ul>
          </div>

          {/* Hotel Rights */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Hotel Rights</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>The hotel reserves the right to refuse a booking if details provided are incomplete or invalid.</li>
              <li>The hotel may modify these Terms & Conditions without prior notice.</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
