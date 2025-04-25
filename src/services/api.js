// Use environment variable for API URL with fallback
const API_URL = import.meta.env.VITE_API_URL;

const normalizeDoctorData = (doctorData) => {
  return doctorData.map((doctor) => {
    let specialties = [];
    if (doctor.specialities && Array.isArray(doctor.specialities)) {
      specialties = doctor.specialities.map((spec) => spec.name);
    } else if (doctor.specialty && Array.isArray(doctor.specialty)) {
      specialties = doctor.specialty;
    }

    let experienceYears = null;
    if (doctor.experience) {
      if (typeof doctor.experience === "number") {
        experienceYears = doctor.experience;
      } else if (typeof doctor.experience === "string") {
        const match = doctor.experience.match(/\d+/);
        if (match) {
          experienceYears = parseInt(match[0], 10);
        }
      }
    }

    let feesAmount = null;
    if (doctor.fees) {
      if (typeof doctor.fees === "number") {
        feesAmount = doctor.fees;
      } else if (typeof doctor.fees === "string") {
        const match = doctor.fees.replace(/[^\d]/g, "");
        if (match) {
          feesAmount = parseInt(match, 10);
        }
      }
    }

    let consultationType = "";
    if (doctor.video_consult && doctor.in_clinic) {
      consultationType = "Both";
    } else if (doctor.video_consult) {
      consultationType = "Video Consult";
    } else if (doctor.in_clinic) {
      consultationType = "In Clinic";
    } else if (doctor.consultationType) {
      consultationType = doctor.consultationType;
    } else {
      consultationType = "Not specified";
    }

    return {
      id: doctor.id || "",
      name: doctor.name || "",
      photo: doctor.photo || "",
      specialty: specialties,
      experience: experienceYears,
      fees: feesAmount,
      rating: doctor.rating || Math.floor(Math.random() * 2) + 4,
      consultationType: consultationType,
      languages: doctor.languages || [],
      clinicName: doctor.clinic?.name || "",
      clinicAddress: doctor.clinic?.address?.locality
        ? `${doctor.clinic.address.locality}, ${doctor.clinic.address.city}`
        : "",
      introduction: doctor.doctor_introduction || "",
    };
  });
};

const MOCK_DATA = [
  {
    id: "111418",
    name: "Dr. Kshitija Jagdale",
    photo:
      "https://doctorlistingingestionpr.azureedge.net/539482078762581145_5a00f31266ed11efbae40ada1afa5198_ProfilePic_crop%20pic.jpg",
    specialty: ["Dentist"],
    experience: 13,
    fees: 500,
    rating: 4.5,
    consultationType: "Both",
    languages: ["English", "हिन्दी", "मराठी"],
    clinicName: "The Dent Inn Advanced Dental Clinic",
    clinicAddress: "Wanowrie, Pune",
    introduction:
      "Dr. Kshitija Jagdale, BDS, has an Experience of 10 years, Graduated from Maharashtra University of Health Sciences, Nashik, currently practising in The Dent Inn Advanced Dental Clinic, Fatima Nagar, Pune",
  },
];

export const fetchDoctors = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch doctors");
    }

    const data = await response.json();
    return normalizeDoctorData(data);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return MOCK_DATA;
  }
};
