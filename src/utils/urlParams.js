// Function to update URL based on filters
export const updateURLParams = (filters) => {
  try {
    const url = new URL(window.location);

    // Clear existing params
    for (const key of [...url.searchParams.keys()]) {
      url.searchParams.delete(key);
    }

    // Add consultation type if present
    if (filters.consultationType) {
      url.searchParams.set("consultationType", filters.consultationType);
    }

    // Add specialties if present
    if (filters.specialties && filters.specialties.length > 0) {
      url.searchParams.set("specialties", filters.specialties.join(","));
    }

    // Add sort if present
    if (filters.sortBy) {
      url.searchParams.set("sortBy", filters.sortBy);
    }

    // Add search term if present
    if (filters.searchTerm && filters.searchTerm.trim() !== "") {
      url.searchParams.set("search", filters.searchTerm);
    }

    // Update URL without reloading page
    window.history.pushState({}, "", url);
  } catch (error) {
    console.error("Error updating URL parameters:", error);
  }
};

// Function to get filters from URL
export const getFiltersFromURL = () => {
  try {
    const url = new URL(window.location);
    const filters = {};

    // Get consultation type
    const consultationType = url.searchParams.get("consultationType");
    if (consultationType) {
      filters.consultationType = consultationType;
    }

    // Get specialties
    const specialties = url.searchParams.get("specialties");
    if (specialties) {
      filters.specialties = specialties.split(",");
    } else {
      filters.specialties = [];
    }

    // Get sort
    const sortBy = url.searchParams.get("sortBy");
    if (sortBy) {
      filters.sortBy = sortBy;
    }

    // Get search term
    const search = url.searchParams.get("search");
    if (search) {
      filters.searchTerm = search;
    }

    return filters;
  } catch (error) {
    console.error("Error getting filters from URL:", error);
    return {};
  }
};
