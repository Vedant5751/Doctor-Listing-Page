import React from "react";
import DoctorCard from "./DoctorCard";

const DoctorList = ({ doctors }) => {
  if (doctors.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h3 className="text-xl text-gray-700">
          No doctors found matching your criteria
        </h3>
        <p className="text-gray-500 mt-2">
          Try adjusting your filters or search term
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {doctors.map((doctor, index) => (
        <DoctorCard key={index} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;
