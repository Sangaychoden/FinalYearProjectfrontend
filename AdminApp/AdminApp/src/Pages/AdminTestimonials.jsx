// src/Admin/Pages/AdminTestimonials.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Plus} from "lucide-react";

const GREEN = "#006600";

const AdminTestimonials = () => {
  const [items, setItems] = useState([
    {
      id: "t1",
      name: "PEMA WANGMO",
      stayed: "Stayed July 2025",
      text:
        "Our stay was wonderful. The serene environment, excellent service, and delicious food made our trip memorable. Highly recommend the resort to anyone visiting Paro.",
      photo:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      status: "published",
    },
    {
      id: "t2",
      name: "PEMA WANGMO",
      stayed: "Stayed July 2025",
      text:
        "Our stay was wonderful. The serene environment, excellent service, and delicious food made our trip memorable. Highly recommend the resort to anyone visiting Paro.",
      photo:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=800&auto=format&fit=crop",
      status: "published",
    },
    {
      id: "t3",
      name: "PEMA WANGMO",
      stayed: "Stayed July 2025",
      text:
        "Our stay was wonderful. The serene environment, excellent service, and delicious food made our trip memorable. Highly recommend the resort to anyone visiting Paro.",
      photo:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
      status: "published",
    },
    {
      id: "t4",
      name: "PEMA WANGMO",
      stayed: "Stayed July 2025",
      text:
        "Our stay was wonderful. The serene environment, excellent service, and delicious food made our trip memorable. Highly recommend the resort to anyone visiting Paro.",
      photo:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
      status: "archived",
    },
  ]);

  const [tab, setTab] = useState("published");

  const filtered = useMemo(
    () => items.filter((t) => t.status === tab),
    [items, tab]
  );

  const archiveItem = (id) => {
    const item = items.find((x) => x.id === id);
    const goingTo = item?.status === "published" ? "archive" : "restore";
    Swal.fire({
      title:
        goingTo === "archive"
          ? "Archive testimonial?"
          : "Restore testimonial?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      color: "#fff",
      background: "#006600",
      cancelButtonColor: "#d33",
      confirmButtonText:
        goingTo === "archive" ? "Archive" : "Restore",
    }).then((res) => {
      if (res.isConfirmed) {
        setItems((prev) =>
          prev.map((t) =>
            t.id === id
              ? {
                  ...t,
                  status:
                    t.status === "published" ? "archived" : "published",
                }
              : t
          )
        );
        Swal.fire({
          title: "Done",
          text:
            goingTo === "archive"
              ? "Moved to Archived."
              : "Moved to Published.",
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
      className="px-2 font-Arial bg-white text-black min-h-screen"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Testimonials</h2>


      {/* Top Row */}
      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center ">
          <button
            onClick={() => setTab("published")}
            className={`px-6 py-2 font-small border ${
              tab === "published"
                ? "text-white"
                : "bg-white text-black"
            }`}
            style={{
              backgroundColor:
                tab === "published" ? GREEN : "transparent",
              borderColor:
                tab === "published" ? GREEN : "#000000ff",
            }}
          >
            PUBLISHED
          </button>
          <button
            onClick={() => setTab("archived")}
            className={`px-6 py-2 font-small border ${
              tab === "archived"
                ? "text-white"
                : "bg-white text-black"
            }`}
            style={{
              backgroundColor:
                tab === "archived" ? GREEN : "transparent",
              borderColor:
                tab === "archived" ? GREEN : "#000000ff",
            }}
          >
            ARCHIVED
          </button>
        </div>

        <Link
          to="/add-testimonial"
          className="inline-flex items-center gap-2 px-4 h-10 text-md  text-white shadow-md hover:shadow-lg transition"
          style={{ backgroundColor: "#006600" }}
        >
          <Plus size={18} />
          Add Testimonials
        </Link>
      </div>

      {/* Testimonials List */}
      <div className="space-y-5">
        {filtered.map((t) => (
          <article
            key={t.id}
            className="border border-gray-200 bg-white rounded-none p-6 "
          >
            <div className="flex items-start gap-6">
              {/* Photo */}
              <div className="w-32 h-32 bg-gray-100 overflow-hidden flex-shrink-0">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <h3
                  className="text-xl font-bold uppercase"
                  style={{ color: GREEN }}
                >
                  {t.name}
                </h3>
                <p className="text-md font-semibold mt-1 text-black">
                  {t.stayed}
                </p>
                <p className="text-md mt-2 leading-6 text-gray-800">
                  {t.text}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 items-end">
                <Link
                  to={`/edit-testimonial`}
                  state={{ testimonial: t }}
                  className="w-24 h-10 inline-flex items-center justify-center text-sm font-semibold text-white rounded-none"
                  style={{ backgroundColor: GREEN }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => archiveItem(t.id)}
                  className="w-24 h-10 inline-flex items-center justify-center text-sm font-semibold text-white rounded-none"
                  style={{
                    backgroundColor:
                      t.status === "published" ? "#b91c1c" : GREEN,
                  }}
                >
                  {t.status === "published" ? "Archive" : "Restore"}
                </button>
              </div>
            </div>
          </article>
        ))}

        {filtered.length === 0 && (
          <div className="text-sm text-gray-500 italic">
            No testimonials.
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminTestimonials;