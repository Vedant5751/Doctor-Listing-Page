import React, { useState, useEffect } from "react";

const ALL_SPECIALTIES = [
  "General Physician",
  "Dentist",
  "Dermatologist",
  "Paediatrician",
  "Gynaecologist",
  "ENT",
  "Diabetologist",
  "Cardiologist",
  "Physiotherapist",
  "Endocrinologist",
  "Orthopaedic",
  "Ophthalmologist",
  "Gastroenterologist",
  "Pulmonologist",
  "Psychiatrist",
  "Urologist",
  "Dietitian-Nutritionist",
  "Psychologist",
  "Sexologist",
  "Nephrologist",
  "Neurologist",
  "Oncologist",
  "Ayurveda",
  "Homeopath",
];

const FilterPanel = ({ filters, setFilters, doctors }) => {
  const [specialtySearch, setSpecialtySearch] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    sort: true,
    specialties: true,
    consultation: true,
  });
  const [availableSpecialties, setAvailableSpecialties] =
    useState(ALL_SPECIALTIES);

  useEffect(() => {
    if (doctors && doctors.length > 0) {
      const specialtiesSet = new Set();

      doctors.forEach((doctor) => {
        if (doctor.specialty && Array.isArray(doctor.specialty)) {
          doctor.specialty.forEach((spec) => {
            if (spec) specialtiesSet.add(spec);
          });
        }
      });

      if (specialtiesSet.size > 0) {
        setAvailableSpecialties(Array.from(specialtiesSet).sort());
      }
    }
  }, [doctors]);

  const handleConsultationChange = (type) => {
    setFilters((prev) => ({
      ...prev,
      consultationType: type === "All" ? "" : type,
    }));
  };

  const handleSpecialtyChange = (specialty) => {
    setFilters((prev) => {
      const currentSpecialties = prev.specialties || [];

      const updatedSpecialties = currentSpecialties.includes(specialty)
        ? currentSpecialties.filter((s) => s !== specialty)
        : [...currentSpecialties, specialty];

      return {
        ...prev,
        specialties: updatedSpecialties,
      };
    });
  };

  const handleSortChange = (sortBy) => {
    setFilters((prev) => ({
      ...prev,
      sortBy,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      searchTerm: "",
      consultationType: "",
      specialties: [],
      sortBy: "",
    });
    setSpecialtySearch("");
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const filteredSpecialties = availableSpecialties.filter((specialty) =>
    specialty.toLowerCase().includes(specialtySearch.toLowerCase())
  );

  return (
    <div className="bg-white rounded shadow-sm">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-medium text-gray-700">Filters</h2>
        <button
          className="text-blue-500 text-sm font-medium"
          onClick={clearAllFilters}
        >
          Clear All
        </button>
      </div>

      <div className="border-b">
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => toggleSection("sort")}
        >
          <h3
            data-testid="filter-header-sort"
            className="font-medium text-gray-600"
          >
            Sort by
          </h3>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${
              expandedSections.sort ? "transform rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        {expandedSections.sort && (
          <div className="px-4 pb-4">
            <div className="flex flex-col space-y-3">
              <label className="inline-flex items-center text-sm">
                <input
                  type="radio"
                  data-testid="sort-fees"
                  className="form-radio h-4 w-4 text-blue-600"
                  checked={filters.sortBy === "fees"}
                  onChange={() => handleSortChange("fees")}
                />
                <span className="ml-2 text-gray-700">Price: Low-High</span>
              </label>
              <label className="inline-flex items-center text-sm">
                <input
                  type="radio"
                  data-testid="sort-experience"
                  className="form-radio h-4 w-4 text-blue-600"
                  checked={filters.sortBy === "experience"}
                  onChange={() => handleSortChange("experience")}
                />
                <span className="ml-2 text-gray-700">
                  Experience: Most Experience first
                </span>
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="border-b">
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => toggleSection("specialties")}
        >
          <h3
            data-testid="filter-header-speciality"
            className="font-medium text-gray-600"
          >
            Specialities
          </h3>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${
              expandedSections.specialties ? "transform rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        {expandedSections.specialties && (
          <div className="px-4 pb-4">
            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
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
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded text-sm"
                placeholder="Search specialities..."
                value={specialtySearch}
                onChange={(e) => setSpecialtySearch(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2 max-h-60 overflow-y-auto text-sm">
              {filteredSpecialties.map((specialty) => (
                <label key={specialty} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    data-testid={`filter-specialty-${specialty}`}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                    checked={(filters.specialties || []).includes(specialty)}
                    onChange={() => handleSpecialtyChange(specialty)}
                  />
                  <span className="ml-2 text-gray-700">{specialty}</span>
                </label>
              ))}
              {filteredSpecialties.length === 0 && (
                <p className="text-gray-500 text-sm">No specialties found</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div>
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => toggleSection("consultation")}
        >
          <h3
            data-testid="filter-header-moc"
            className="font-medium text-gray-600"
          >
            Mode of consultation
          </h3>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${
              expandedSections.consultation ? "transform rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        {expandedSections.consultation && (
          <div className="px-4 pb-4">
            <div className="flex flex-col space-y-3 text-sm">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  data-testid="filter-video-consult"
                  className="form-radio h-4 w-4 text-blue-600"
                  checked={filters.consultationType === "Video Consult"}
                  onChange={() => handleConsultationChange("Video Consult")}
                />
                <span className="ml-2 text-gray-700">Video Consultation</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  data-testid="filter-in-clinic"
                  className="form-radio h-4 w-4 text-blue-600"
                  checked={filters.consultationType === "In Clinic"}
                  onChange={() => handleConsultationChange("In Clinic")}
                />
                <span className="ml-2 text-gray-700">
                  In-clinic Consultation
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-blue-600"
                  checked={filters.consultationType === ""}
                  onChange={() => handleConsultationChange("All")}
                />
                <span className="ml-2 text-gray-700">All</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
