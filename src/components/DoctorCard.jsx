import React from "react";

const DoctorCard = ({ doctor }) => {
  return (
    <div
      data-testid="doctor-card"
      className="bg-white rounded-lg shadow-sm p-6 mb-4"
    >
      <div className="flex justify-between">
        <div className="flex">
          <div className="flex-shrink-0 mr-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              {doctor.photo ? (
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-medium">
                  {doctor.name ? doctor.name.slice(0, 2).toUpperCase() : "DR"}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <h2
              data-testid="doctor-name"
              className="text-lg font-semibold text-gray-800"
            >
              {doctor.name}
            </h2>

            <div data-testid="doctor-specialty" className="mt-1">
              {doctor.specialty && doctor.specialty.length > 0 ? (
                <div className="text-gray-700 font-medium">
                  {doctor.specialty[0]}
                </div>
              ) : (
                <div className="text-gray-700 font-medium">Dentist</div>
              )}
            </div>

            <div className="text-sm text-gray-600 mt-1">
              {doctor.qualifications || "MBBS, Diploma in Cardiology"}
            </div>

            <div className="text-sm text-gray-600 mt-1">
              {doctor.experience
                ? `${doctor.experience} yrs exp.`
                : "13 yrs exp."}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="font-semibold text-gray-800 mb-auto">
            ₹ {doctor.fees || "500"}
          </div>

          <button className="bg-white hover:bg-blue-50 text-blue-600 font-medium py-2.5 px-4 border border-blue-500 rounded-md transition duration-200 mt-auto">
            Book Appointment
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col space-y-1 text-sm">
        <div className="flex items-start">
          <svg
            className="w-4 h-4 mt-0.5 text-gray-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <span className="text-gray-700">{doctor.clinicName}</span>
        </div>
        <div className="flex items-start">
          <svg
            className="w-4 h-4 mt-0.5 text-gray-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-gray-700">{doctor.clinicAddress}</span>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
