
import { useEffect, useState } from "react";
import {
  Plus, Search, MessageSquareText, CheckCircle2,
  Clock3, XCircle, X, Pencil, Trash2, User,
  CalendarDays, FileText
} from "lucide-react";

const initialReviews = [
  {
    id: 1,
    title: "Frontend architecture documentation",
    description: "Review the documented React component structure and frontend workflow.",
    reviewer: "Ashika Sanraj",
    comment: "The component structure is clear and ready for use.",
    status: "Approved",
    date: "2026-11-06"
  },
  {
    id: 2,
    title: "Backend API documentation",
    description: "Review API endpoints, request formats and response structure.",
    reviewer: "Rohan Patel",
    comment: "Some endpoint details still need clarification.",
    status: "Pending",
    date: "2026-11-07"
  },
  {
    id: 3,
    title: "Project requirement document",
    description: "Review the requirements collected during the initial planning.",
    reviewer: "Navya Singh",
    comment: "Please update the missing requirement details.",
    status: "Changes Requested",
    date: "2026-11-05"
  }
];

const emptyForm = {
  title: "",
  description: "",
  reviewer: "",
  comment: "",
  status: "Pending",
  date: new Date().toISOString().slice(0, 10)
};

export default function Review() {
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem("knowbridge_reviews");
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    localStorage.setItem("knowbridge_reviews", JSON.stringify(reviews));
  }, [reviews]);

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.title.toLowerCase().includes(search.toLowerCase()) ||
      review.reviewer.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || review.status === filter;

    return matchesSearch && matchesFilter;
  });

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (review) => {
    setEditing(review.id);
    setForm({ ...review });
    setShowForm(true);
  };

  const saveReview = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.reviewer.trim()) return;

    if (editing) {
      setReviews((prev) =>
        prev.map((review) =>
          review.id === editing ? { ...form, id: editing } : review
        )
      );
    } else {
      setReviews((prev) => [
        { ...form, id: Date.now() },
        ...prev
      ]);
    }

    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
  };

  const deleteReview = (id) => {
    if (window.confirm("Delete this review?")) {
      setReviews((prev) => prev.filter((review) => review.id !== id));
    }
  };

  const approved = reviews.filter((r) => r.status === "Approved").length;
  const pending = reviews.filter((r) => r.status === "Pending").length;
  const changes = reviews.filter((r) => r.status === "Changes Requested").length;

  const statusStyle = (status) => {
    if (status === "Approved") return "bg-emerald-100 text-emerald-700";
    if (status === "Changes Requested") return "bg-red-100 text-red-700";
    return "bg-amber-100 text-amber-700";
  };

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-emerald-700">
            Workspace / Review
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Review
          </h1>
          <p className="mt-2 text-slate-500">
            Review project information, share feedback and track approval.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
        >
          <Plus size={18} /> Add Review
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Reviews", value: reviews.length, icon: MessageSquareText },
          { label: "Approved", value: approved, icon: CheckCircle2 },
          { label: "Pending", value: pending, icon: Clock3 },
          { label: "Changes Requested", value: changes, icon: XCircle }
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{stat.label}</p>
                <Icon size={20} className="text-emerald-700" />
              </div>
              <p className="mt-3 text-3xl font-bold text-slate-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-3 text-slate-400"
            size={18}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reviews or reviewers..."
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-emerald-600"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-emerald-600"
        >
          <option>All</option>
          <option>Approved</option>
          <option>Pending</option>
          <option>Changes Requested</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <MessageSquareText size={36} className="mx-auto text-slate-400" />
            <h3 className="mt-3 font-semibold text-slate-800">
              No reviews found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Add a review or change your search.
            </p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div className="flex gap-3">
                  <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                    <FileText size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {review.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {review.description}
                    </p>
                  </div>
                </div>

                <span className={`h-fit w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(review.status)}`}>
                  {review.status}
                </span>
              </div>

              <div className="mt-5 rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Reviewer feedback
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  {review.comment || "No feedback added yet."}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-2">
                  <User size={16} /> {review.reviewer}
                </span>
                <span className="flex items-center gap-2">
                  <CalendarDays size={16} /> {review.date}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setViewing(review)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
                >
                  View Details
                </button>
                <button
                  onClick={() => openEdit(review)}
                  className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
                >
                  <Pencil size={15} /> Edit
                </button>
                <button
                  onClick={() => deleteReview(review.id)}
                  className="flex items-center gap-1 rounded-lg border border-red-100 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={15} /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <form
            onSubmit={saveReview}
            className="my-6 w-full max-w-xl space-y-4 rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                {editing ? "Edit Review" : "Add New Review"}
              </h2>
              <button type="button" onClick={() => setShowForm(false)}>
                <X />
              </button>
            </div>

            {[
              ["title", "Review title", "Enter review title"],
              ["description", "Description", "Describe what needs review"],
              ["reviewer", "Reviewer", "Enter reviewer name"],
              ["comment", "Feedback", "Write review feedback"]
            ].map(([key, label, placeholder]) => (
              <label key={key} className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">
                  {label}
                </span>
                <input
                  required={key === "title" || key === "reviewer"}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600"
                />
              </label>
            ))}

            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className="mb-1 block text-sm font-medium">Status</span>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-3"
                >
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Changes Requested</option>
                </select>
              </label>

              <label>
                <span className="mb-1 block text-sm font-medium">Date</span>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-3"
                />
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-700 py-3 font-semibold text-white hover:bg-emerald-800"
            >
              {editing ? "Save Changes" : "Create Review"}
            </button>
          </form>
        </div>
      )}

      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Review Details</h2>
              <button onClick={() => setViewing(null)}>
                <X />
              </button>
            </div>

            <h3 className="text-lg font-semibold text-slate-900">
              {viewing.title}
            </h3>
            <p className="text-sm text-slate-600">{viewing.description}</p>

            <div>
              <p className="text-sm font-semibold text-slate-800">Feedback</p>
              <p className="text-sm text-slate-600">
                {viewing.comment || "No feedback provided"}
              </p>
            </div>

            <p className="text-sm text-slate-500">
              Reviewer: {viewing.reviewer} · Status: {viewing.status}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
