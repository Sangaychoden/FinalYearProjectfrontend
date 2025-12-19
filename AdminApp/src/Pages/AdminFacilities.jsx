
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit3, Trash2, Search } from "lucide-react";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL ;
const THEME_GREEN = "#006600"; // background
const CONFIRM_GREEN = "#008000"; // confirm button

const AdminFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  // ✅ Fetch all facilities initially
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await fetch(`${API_URL}/facilities`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 401) throw new Error("Unauthorized");

        const data = await res.json();
        setFacilities(data.facilities || []);
      } catch (error) {
        console.error("❌ Fetch facilities error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.message === "Unauthorized"
              ? "Session expired. Please log in again."
              : "Failed to fetch facilities.",
          confirmButtonColor: THEME_GREEN,
          color: "#fff",
          background: THEME_GREEN,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchFacilities();
  }, []);

  // ✅ Search handler
  useEffect(() => {
    if (!query.trim()) {
      // If search is empty → reload all
      const refetchAll = async () => {
        const res = await fetch(`${API_URL}/facilities`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setFacilities(data.facilities || []);
      };
      refetchAll();
      return;
    }

    const timeout = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(
          `${API_URL}/facilities/search?title=${encodeURIComponent(query)}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (res.status === 401) throw new Error("Unauthorized");

        const data = await res.json();
        if (
          data.message === "No facilities found matching your search" ||
          !data.facilities ||
          data.facilities.length === 0
        ) {
          setFacilities([]); // just clear list
        } else {
          setFacilities(data.facilities);
        }
      } catch (err) {
        console.error("❌ Search error:", err);
        setFacilities([]);
      } finally {
        setSearching(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);
  
  // ✅ Delete facility (green confirmation, success uses same confirm green)
const confirmDelete = (id) => {
  const item = facilities.find((f) => f._id === id);
  Swal.fire({
    title: "Confirm Delete",
    html: `<p>Do you want to delete <b>${item?.title}</b>?</p>`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
    confirmButtonColor: CONFIRM_GREEN, // 💚 Bright green
    cancelButtonColor: "#d33",
    color: "#fff",
    background: THEME_GREEN,
  }).then(async (res) => {
    if (res.isConfirmed) {
      try {
        const response = await fetch(`${API_URL}/facilities/${id}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (response.status === 401) throw new Error("Unauthorized");
        if (!response.ok) throw new Error("Delete failed");

        setFacilities((prev) => prev.filter((f) => f._id !== id));

        // ✅ Success popup also uses CONFIRM_GREEN now
        Swal.fire({
          title: "Deleted",
          text: "Facility removed successfully.",
          icon: "success",
          confirmButtonColor: CONFIRM_GREEN, // 💚 bright green button
          color: "#fff",
          background: THEME_GREEN,
        });
      } catch (err) {
        console.error("❌ Delete facility error:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            err.message === "Unauthorized"
              ? "Session expired. Please log in again."
              : "Failed to delete facility. Please try again.",
          confirmButtonColor: CONFIRM_GREEN,
          color: "#fff",
          background: THEME_GREEN,
        });
      }
    }
  });
};

  const truncateWords = (text, wordLimit = 20) => {
    if (!text) return "";
    const words = String(text).split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading facilities...
      </div>
    );
  }

  return (
    <main
      className="px-2 md:px-2 lg:px-2 font-inter bg-white text-black min-h-screen"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-800">Facilities</h1>
        </div>

        <Link
          to="/add-facility"
  className="
    inline-flex items-center gap-2 px-4 h-10 text-md text-white 
    shadow-md hover:shadow-lg transition 
    bg-[#006600] hover:bg-[#000000] 
    -none
  "
        >
          <Plus size={18} />
          Add Service
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md mb-8">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search facilities by title..."
          className="w-full pl-9 pr-3 h-11 border border-gray-300 focus:border-[#006600] focus:ring-2 focus:ring-[#006600]/40 outline-none transition-all"
        />
      </div>

      {searching && (
        <p className="text-sm text-gray-500 mb-3">Searching...</p>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-white border border-[#9CA3AF] shadow relative z-0">
        <table className="min-w-full divide-y divide-[#9CA3AF]">
          <thead className="bg-green-700 text-black">
            <tr>
              <th className="px-4 py-3 text-left text-m font-semibold">Title</th>
              <th className="px-4 py-3 text-left text-m font-semibold">
                Description
              </th>
              <th className="px-4 py-3 text-left text-m font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#9CA3AF]">
            {facilities.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="py-6 text-center text-gray-500 italic"
                >
                  No facilities found.
                </td>
              </tr>
            ) : (
              facilities.map((f, i) => (
                <tr
                  key={f._id || i}
                  className="hover:bg-green-50 transition-colors"
                >
                  <td className="px-4 py-3 text-gray-800 font-medium">
                    {f.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600" title={f.description}>
                    {truncateWords(f.description, 20)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-3">
                      <Link
                        to={`/edit-facility/${f._id}`}
                        state={{ facility: f }}
                        className="text-[#006600] font-medium hover:underline flex items-center gap-1"
                      >
                        <Edit3 size={16} />
                        Edit
                      </Link>
                      <button
                        onClick={() => confirmDelete(f._id)}
                        className="text-red-600 font-medium hover:underline flex items-center gap-1"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdminFacilities;
