import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { CircleChevronLeft } from "lucide-react";
import Image from "next/image";
import { CarouselDemo } from "@/components/PictureCarousel";
import { MapPin } from "lucide-react";
import { LogIn } from "lucide-react";
import ReportPageUpload from "@/components/ReportPageUpload";
type tParams = Promise<{ id: string }>;

//get report id from props [id]
// on page load , get all data from firebase
// display data on page
//https://www.google.com/maps/place/<latitude>,<longitude
export default async function ReportPage({ params }: { params: tParams }) {
  const { id }: { id: string } = await params;

  const docRef = doc(db, "reports", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return <div>Report not found</div>;
  }

  const report = docSnap.data();
  console.log(report);
  const getUrgency = () => {
    const urgencyColors: Record<string, string> = {
      low: "bg-green-600",
      medium: "bg-yellow-600",
      high: "bg-red-600",
    };
    return urgencyColors[report.urgency] || "bg-gray-400"; // fallback for unknown values
  };

  const isGpsPresent = () => {
    return (
      !!(report.gps?.latitude || report.gps?.longitude) &&
      !(report.gps.latitude === 0 && report.gps.longitude === 0)
    );
  };

  return (
      <div
  className="transform-gpu overflow-hidden"
  style={{ transform: "translateZ(0)", willChange: "transform" }}
>
    <div className="w-95/100 md:border-x-1 border-gray-500 p-5 min-h-screen mx-auto max-w-5xl md:w-9/10">
      <Link href="/">
        <div className="flex gap-2">
          <CircleChevronLeft />
          <p>Back</p>
        </div>
      </Link>

      <div className=" flex flex-col justify-center items-center mt-10 w-full report-container">
        <h1 className="text-2xl font-semibold mb-5">
          {report.title[0].toUpperCase() + report.title.slice(1)}
        </h1>

        <CarouselDemo imageURLs={report.imageURLs} />

        <div className="report-description border-2 border-gray-400 md:w-xl max-w-xl flex flex-col gap-6 p-4 mt-10 rounded-2xl">
          <div>
            <h2 className="text-md font-semibold mb-1 ">Description</h2>
            <p className=" font-normal text-sm">{report.description}</p>
          </div>

          <div>
            <h2 className=" font-semibold mb-1">Address</h2>
            <p className=" font-normal text-sm">{report.address}</p>
          </div>

          <div>
            <h2 className=" font-semibold mb-1 ">Date posted</h2>
            <p className=" font-normal  text-sm">
              {report.createdAt.toDate().toLocaleDateString("en-GB")}
            </p>
          </div>

          <div>
            <h2 className=" font-semibold mb-1">Urgency</h2>
            <div
              className={`px-5 py-1 text-sm text-white w-fit rounded-2xl ${getUrgency()}`}
            >
              {report.urgency[0].toUpperCase() + report.urgency.slice(1)}
            </div>
          </div>

          <div>
            <h2 className=" font-semibold mb-1 ">Location</h2>
            <a
              href={
                isGpsPresent()
                  ? `https://www.google.com/maps/place/${report.gps.latitude},${report.gps.longitude}`
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                disabled={!isGpsPresent()}
                className={`flex gap-2 py-2   hover:bg-gray-400  px-5 border-2 w-fit rounded-xl ${
                  !isGpsPresent() ? "opacity-35 disabled" : "bg-gray-300"
                }`}
              >
                <p className="font-medium text-sm">Open in maps</p>
                <LogIn />
              </button>
            </a>
          </div>
        </div>
      
        <div className="border-2  overflow-hidden border-gray-400 mt-10 flex justify-center items-center gap-5 py-5 rounded-2xl flex-col  px-3 max-w-2xl">
          {report.resolutionRequest ? (
            <h2 className="font-medium">
              A resolution request has already been submitted.Review Pending.
            </h2>
          ) : (
            <>
              <h2 className="text-xl font-semibold">
                Is this report already resolved?
              </h2>
              <p>if yes , upload a photo below to provide proof.</p>
              <ReportPageUpload id={id} />
            </>
          )}
        </div>
      </div>
    </div>
     </div>
  );
}
