import React, { useState, useEffect, useRef } from "react";

const AutoComplete = ({ doctors, setFilteredDoctors, filters, setFilters }) => {
  const [search, setSearch] = useState(filters.searchTerm || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (filters.searchTerm && filters.searchTerm !== search) {
      setSearch(filters.searchTerm);
    }
  }, [filters.searchTerm]);

  useEffect(() => {
    if (search.trim() === "") {
      setSuggestions([]);
      return;
    }

    const searchLower = search.toLowerCase();
    let results = [];

    // 1. Search by doctor names
    const doctorResults = doctors
      .filter(
        (doctor) =>
          doctor.name && doctor.name.toLowerCase().includes(searchLower)
      )
      .slice(0, 3)
      .map((doctor) => ({
        ...doctor,
        type: "doctor",
        displayText: doctor.name,
        subtitle: getSpecialtyText(doctor),
      }));

    results = [...doctorResults];

    // 2. Search by specialties
    const specialties = new Set();
    doctors.forEach((doctor) => {
      if (doctor.specialty && Array.isArray(doctor.specialty)) {
        doctor.specialty.forEach((spec) => {
          if (spec && spec.toLowerCase().includes(searchLower)) {
            specialties.add(spec);
          }
        });
      }
    });

    const specialtyResults = Array.from(specialties)
      .slice(0, 2)
      .map((specialty) => ({
        type: "specialty",
        displayText: specialty,
        subtitle: "Specialty",
      }));

    results = [...results, ...specialtyResults];

    // 3. Search by clinics
    const clinics = new Set();
    doctors.forEach((doctor) => {
      const clinicName =
        doctor.clinicName || doctor.hospitalName || doctor.clinic;
      if (clinicName && clinicName.toLowerCase().includes(searchLower)) {
        clinics.add(clinicName);
      }
    });

    const clinicResults = Array.from(clinics)
      .slice(0, 2)
      .map((clinic) => ({
        type: "clinic",
        displayText: clinic,
        subtitle: "Clinic",
      }));

    results = [...results, ...clinicResults];

    // Limit total results
    setSuggestions(results.slice(0, 5));
  }, [search, doctors]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (suggestion) => {
    if (!suggestion) return;

    setSearch(suggestion.displayText);
    setShowSuggestions(false);

    // Update filters based on suggestion type
    if (suggestion.type === "doctor") {
      setFilters((prev) => ({
        ...prev,
        searchTerm: suggestion.displayText,
        specialties: [],
      }));
    } else if (suggestion.type === "specialty") {
      setFilters((prev) => ({
        ...prev,
        searchTerm: "",
        specialties: [suggestion.displayText],
      }));
    } else if (suggestion.type === "clinic") {
      // For clinics, we'll need to filter doctors by clinic name
      setFilters((prev) => ({
        ...prev,
        searchTerm: suggestion.displayText,
        specialties: [],
      }));
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setShowSuggestions(true);

    // Update filters with the search term
    setFilters((prev) => ({
      ...prev,
      searchTerm: value,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
    }
  };

  const getSpecialtyText = (doctor) => {
    if (
      doctor.specialty &&
      Array.isArray(doctor.specialty) &&
      doctor.specialty.length > 0
    ) {
      return doctor.specialty[0];
    }
    return "Doctor";
  };

  // Get icon based on suggestion type
  const getSuggestionIcon = (type) => {
    if (type === "doctor") {
      return (
        <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    } else if (type === "specialty") {
      return (
        <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
        </div>
      );
    } else if (type === "clinic") {
      return (
        <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-400"
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
        </div>
      );
    }
  };

  return (
    <div className="relative w-full mx-auto" ref={wrapperRef}>
      <div className="relative bg-blue-600 p-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              data-testid="autocomplete-input"
              className="block w-full p-3 pl-10 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Search Symptoms, Doctors, Specialists, Clinics"
              value={search}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(true)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full max-w-5xl left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-b shadow z-10">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              data-testid="suggestion-item"
              className={`p-3 hover:bg-gray-50 cursor-pointer flex items-center ${
                index < suggestions.length - 1 ? "border-b border-gray-100" : ""
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="mr-3">
                {suggestion.photo ? (
                  <img
                    src={suggestion.photo}
                    alt=""
                    className="w-10 h-10 rounded object-cover"
                  />
                ) : (
                  getSuggestionIcon(suggestion.type)
                )}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">
                  {suggestion.displayText}
                </div>
                <div className="text-xs text-gray-400 uppercase">
                  {suggestion.subtitle}
                </div>
              </div>
              <div className="ml-auto">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
