// Function to filter and sort doctors based on applied filters
export const filterDoctors = (doctors, filters) => {
  if (!doctors || !Array.isArray(doctors)) {
    return [];
  }

  let filteredDoctors = [...doctors];

  // Filter by search term
  if (filters.searchTerm) {
    const searchTerm = filters.searchTerm.toLowerCase();
    filteredDoctors = filteredDoctors.filter((doctor) => {
      // Search by doctor name
      const nameMatch =
        doctor.name && doctor.name.toLowerCase().includes(searchTerm);

      // Search by clinic name
      const clinicName =
        doctor.clinicName || doctor.hospitalName || doctor.clinic;
      const clinicMatch =
        clinicName && clinicName.toLowerCase().includes(searchTerm);

      return nameMatch || clinicMatch;
    });
  }

  // Filter by consultation type
  if (filters.consultationType) {
    filteredDoctors = filteredDoctors.filter((doctor) => {
      // Handle the case where consultationType can be "Both"
      if (doctor.consultationType === "Both") {
        return true;
      }
      return (
        doctor.consultationType &&
        doctor.consultationType === filters.consultationType
      );
    });
  }

  // Filter by specialties
  if (filters.specialties && filters.specialties.length > 0) {
    filteredDoctors = filteredDoctors.filter((doctor) => {
      if (!doctor.specialty || !Array.isArray(doctor.specialty)) {
        return false;
      }
      return filters.specialties.some((specialty) =>
        doctor.specialty.includes(specialty)
      );
    });
  }

  // Sort doctors
  if (filters.sortBy === "fees") {
    filteredDoctors = filteredDoctors.sort((a, b) => {
      // Handle undefined or non-numeric fees
      const aFees = Number(a.fees) || 0;
      const bFees = Number(b.fees) || 0;
      return aFees - bFees;
    });
  } else if (filters.sortBy === "experience") {
    filteredDoctors = filteredDoctors.sort((a, b) => {
      // Handle undefined or non-numeric experience
      const aExp = Number(a.experience) || 0;
      const bExp = Number(b.experience) || 0;
      return bExp - aExp; // Higher experience first
    });
  }

  return filteredDoctors;
};
