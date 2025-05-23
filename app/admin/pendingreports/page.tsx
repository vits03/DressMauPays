"use client";

import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  getDocs,
  where,
  DocumentData,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { useAuth } from "@/utils/AuthContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PendingRequests = () => {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  const [reports, setReports] = useState<DocumentData[]>([]);

  // Redirect if not admin
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push("/admin");
    }
  }, [user, isAdmin, loading, router]);

  // Fetch pending reports
  useEffect(() => {
    const getPendingRequests = async () => {
      const q = query(
        collection(db, "reports"),
        where("isApproved", "==", false),
        where("isResolved", "==", false),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      const docs = snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as DocumentData) }));
      setReports(docs);
    };

    if (user && isAdmin) getPendingRequests();
  }, [user, isAdmin]);

  // Approve report
  const approveReport = async (reportId: string) => {
    try {
      const reportRef = doc(db, "reports", reportId);
      await updateDoc(reportRef, { isApproved: true });
      setReports((prev) => prev.filter((r) => r.id !== reportId)); // update UI
    } catch (error) {
      console.error("Error approving report:", error);
    }
  };

  // Delete report
  const handleDelete = async (reportId: string) => {
    try {
      const reportRef = doc(db, "reports", reportId);
      await deleteDoc(reportRef);
      setReports((prev) => prev.filter((r) => r.id !== reportId)); // update UI
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  if (loading || !user || !isAdmin) {
    return <p>Checking permissions...</p>;
  }

  return (
    <div className="p-10 w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Locality</TableHead>
            <TableHead>Urgency</TableHead>
            <TableHead className="text-left">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.title}</TableCell>
              <TableCell>{report.createdAt.toDate().toLocaleDateString("en-GB")}</TableCell>
              <TableCell>{report.locality}</TableCell>
              <TableCell>{report.urgency}</TableCell>
              <TableCell className="text-left space-x-5">
                <button onClick={() => approveReport(report.id)} className="bg-green-600 px-4 py-2 text-white rounded-2xl">
                  Accept
                </button>
                <button onClick={() => handleDelete(report.id)} className="bg-red-600 px-4 py-2 text-white rounded-2xl">
                  Reject
                </button>
                <Link href={`/report/${report.id}`}>
                  <button className="text-sm text-blue-600 hover:underline">View</button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PendingRequests;
