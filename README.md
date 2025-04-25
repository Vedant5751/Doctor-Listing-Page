# Doctor Listing Application

A modern React application that allows users to search for doctors, filter by specialties, and find appropriate healthcare providers. This project demonstrates a clean, responsive UI with advanced search and filtering capabilities.

## Features

- **Advanced Search**: Search for doctors, specialists, or clinics in one unified search bar
- **Smart Filtering**: Filter doctors by specialty, consultation type (video/in-clinic)
- **Sorting Options**: Sort results by price (lowest to highest) or experience (most experienced first)
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Modern UI**: Clean, accessible interface with optimized user experience

## Setup Instructions

### Installation

1. Clone the repository

   ```
   git clone https://github.com/Vedant5751/Doctor-Listing-Page.git
   cd doctor-listing-page
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Create a `.env` file in the root directory with:

   ```
   VITE_API_URL=<Enter your API>
   ```

4. Start the development server

   ```
   npm run dev
   ```

## Project Structure

```
/src
  /components        # React components
    AutoComplete.jsx # Search component with dropdown suggestions
    DoctorCard.jsx   # Doctor information card
    DoctorList.jsx   # List of doctors
    FilterPanel.jsx  # Filters for specialties and consultation types
  /services
    api.js           # API calls and data normalization
  /utils
    filterDoctors.js # Logic for filtering and sorting doctors
    urlParams.js     # URL parameter handling for filters
  App.jsx            # Main application component
  main.jsx           # Application entry point
```

## Technology Stack

- **React**: Frontend library
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Modern frontend build tool and development server

## Environment Variables

This application uses environment variables for configuration:

| Variable     | Description                  | Required |
| ------------ | ---------------------------- | -------- |
| VITE_API_URL | URL for the doctors data API | Yes      |

## Features in Detail

### Doctor Search

- Search by doctor name, specialty, or clinic
- Dropdown suggestions with icons to indicate the type of result
- Results categorized by type (doctor, specialty, clinic)

### Doctor Filtering

- Filter by specialty with a searchable multi-select interface
- Filter by consultation type (Video Consultation, In-clinic Consultation, or Both)
- Clear filters with a single click

### Doctor Cards

- Display key information including name, specialty, experience, and fees
- Clinic information with location
- Book appointment button

## Development Notes

- The application uses modern React practices and hooks
- API responses are normalized to handle various data formats consistently
- Environment variables are used to secure API endpoints
- The UI is optimized for accessibility and usability
