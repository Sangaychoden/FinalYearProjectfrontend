
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit3, Trash2, Search } from "lucide-react";
import Swal from "sweetalert2";

const AdminFacilities = () => {
  // Demo data – replace with API data later
  const [facilities, setFacilities] = useState([
    {
      id: "f1",
      category: "LOFT",
      title: "The Loft",
      description:
        "The Loft is located on the top floor of the right guestroom wing. It is a column-free open space perfect for private events and quiet reading.",
    },
    {
      id: "f2",
      category: "RESTAURANT",
      title: "Riverside Restaurant",
      description:
        "All-day dining with river views, seasonal produce, and a cozy ambience. Breakfast, lunch, and dinner available.",
    },
    {
      id: "f3",
      category: "LOUNGE",
      title: "Sky Lounge",
      description:
        "An elegant rooftop lounge for evening cocktails and panoramic views of the river.",
    },
  ]);

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return facilities;
    const q = query.toLowerCase();
    return facilities.filter(
      (f) =>
        f.title.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q)
    );
  }, [facilities, query]);

  const confirmDelete = (id) => {
    const item = facilities.find((f) => f.id === id);
    Swal.fire({
      title: "Delete facility?",
      html: `<p>You are about to delete <b>${item?.title}</b>.</p>`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      confirmButtonColor: "#008000",
      color: "#fff",
      background: "#006600",

    }).then((res) => {
      if (res.isConfirmed) {
        setFacilities((prev) => prev.filter((f) => f.id !== id));
        Swal.fire({
          title: "Deleted",
          text: "Facility removed successfully.",
          icon: "success",
      confirmButtonColor: "#008000",
      color: "#fff",
      background: "#006600",
        });
      }
    });
  };

  return (
    <main
      className="px-2 md:px-2 lg:px-2 font-inter bg-white text-black min-h-screen"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-800">Facilities</h1>
          <span className="text-xs md:text-sm px-2 py-1 -full bg-gray-100">
          
          </span>
        </div>

        <Link
          to="/add-facility"
          className="inline-flex items-center gap-2 px-4 h-10 text-md  text-white shadow-md hover:shadow-lg transition"
          style={{ backgroundColor: "#006600" }}
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
          placeholder="Search facilities by title, category, or description…"
          className="w-full pl-9 pr-3 h-11 -lg border border-gray-300 focus:border-[#006600] focus:ring-2 focus:ring-[#006600]/40 outline-none transition-all"
        />
      </div>

      {/* Table */}
<div className="overflow-x-auto bg-white border border-[#9CA3AF] shadow relative z-0 ">
  <table className="min-w-full divide-y divide-[#9CA3AF]">
    <thead className="bg-green-700 text-black">
      <tr>
        <th className="px-4 py-3 text-left text-m font-semibold">Title</th>
        <th className="px-4 py-3 text-left text-m font-semibold">Description</th>
        <th className="px-4 py-3 text-left text-m font-semibold">Actions</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-[#9CA3AF]">
      {filtered.length === 0 && (
        <tr>
          <td colSpan={3} className="py-6 text-center text-gray-500 italic">
            No facilities found.
          </td>
        </tr>
      )}

      {filtered.map((f, i) => (
        <tr
          key={f.id}
          className="hover:bg-green-50 transition-colors"
        >
          <td className="px-4 py-3 text-gray-800 font-medium">{f.title}</td>
          <td className="px-4 py-3 text-gray-600">{f.description}</td>
          <td className="px-4 py-3 text-right">
            <div className="flex justify-end gap-3">
              <Link
                to={`/edit-facility`}
                state={{ facility: f }}
                className="text-[#006600] font-medium hover:underline flex items-center gap-1"
              >
                <Edit3 size={16} />
                Edit
              </Link>
              <button
                onClick={() => confirmDelete(f.id)}
                className="text-red-600 font-medium hover:underline flex items-center gap-1"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </main>
  );
};

export default AdminFacilities;
