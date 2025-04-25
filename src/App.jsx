import React, { useState, useEffect } from "react";
import AutoComplete from "./components/AutoComplete";
import FilterPanel from "./components/FilterPanel";
import DoctorList from "./components/DoctorList";
import { fetchDoctors } from "./services/api";
import { filterDoctors } from "./utils/filterDoctors";
import { updateURLParams, getFiltersFromURL } from "./utils/urlParams";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: "",
    consultationType: "",
    specialties: [],
    sortBy: "",
  });

  // Fetch doctors on component mount
  useEffect(() => {
    const getDoctors = async () => {
      try {
        setLoading(true);
        const data = await fetchDoctors();

        if (!data || data.length === 0) {
          setError("No doctors available. Please try again later.");
          return;
        }

        setDoctors(data);
        setFilteredDoctors(data);

        // Load filters from URL if any
        const urlFilters = getFiltersFromURL();
        if (Object.keys(urlFilters).length > 0) {
          setFilters((prev) => ({
            ...prev,
            ...urlFilters,
          }));
        }
      } catch (err) {
        setError("Failed to load doctors data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getDoctors();

    // Listen for browser navigation events
    const handlePopState = () => {
      const urlFilters = getFiltersFromURL();
      setFilters((prev) => ({
        ...prev,
        ...urlFilters,
      }));
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Apply filters and update URL whenever filters change
  useEffect(() => {
    if (doctors.length > 0) {
      const filtered = filterDoctors(doctors, filters);
      setFilteredDoctors(filtered);
      updateURLParams(filters);
    }
  }, [filters, doctors]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Search Section */}
      {!loading && !error && (
        <AutoComplete
          doctors={doctors}
          setFilteredDoctors={setFilteredDoctors}
          filters={filters}
          setFilters={setFilters}
        />
      )}

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar for Filters */}
          <div className="md:w-1/4">
            {!loading && !error && (
              <FilterPanel
                filters={filters}
                setFilters={setFilters}
                doctors={doctors}
              />
            )}
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            {loading ? (
              <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading doctors...</p>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md">
                <p className="font-medium">{error}</p>
                <p className="mt-2">
                  Please check your internet connection and try again.
                </p>
              </div>
            ) : filteredDoctors.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-400 text-yellow-700 px-4 py-8 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-medium mb-2">
                  No doctors found matching your criteria
                </h3>
                <p>
                  Try adjusting your filters or search term to see more results.
                </p>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
                  <p className="text-gray-700">
                    <span className="font-medium">
                      {filteredDoctors.length}
                    </span>{" "}
                    doctors available
                  </p>
                </div>
                <DoctorList doctors={filteredDoctors} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
