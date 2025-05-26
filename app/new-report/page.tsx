import React from "react";
import ReportContainer from "@/components/reportContainer";
export const metadata = {
  title: 'Add a Report – Dressmaupays',
  description:
    'Help improve your community by reporting local issues on Dressmaupays. Describe the problem, upload a photo, and share your location using GPS data.',
  metadataBase: new URL('https://dressmaupays.com'),
  openGraph: {
    title: 'Report a Local Issue – Dressmaupays',
    description:
      'Use Dressmaupays to report problems like potholes, broken street lights, or public hazards. Attach photos and location data to help authorities take action.',
    url: 'https://dressmaupays.com/new-report',
    siteName: 'Dressmaupays',
   images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/dressmaupays.firebasestorage.app/o/reports%2Fdressmaupays-logo-bg.-croppedjpg.webp?alt=media&token=8872b3dd-387e-42a2-a8ad-301fd9bdab4c', 
        width: 1024,
        height: 587,
        alt: 'Dressmaupays – Community Reporting Platform',
      },
    ],
    locale: 'en_MU',
    type: 'website',
  },
  keywords: [
    'report issue Mauritius',
    'add report',
    'local problems',
    'civic platform',
    'pothole report',
    'upload photo',
    'GPS location',
    'Dressmaupays',
  ],
};



const AddReport = () => {


  return (
    <ReportContainer/>
  );
};

export default AddReport;
