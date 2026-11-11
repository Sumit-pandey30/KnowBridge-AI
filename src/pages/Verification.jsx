
import { useEffect, useState } from "react";
import {
  Plus, Search, ShieldCheck, CheckCircle2, Clock3,
  XCircle, Pencil, Trash2, X, FileText, User, CalendarDays
} from "lucide-react";

const initialRecords = [
  {
    id: 1,
    title: "Frontend framework confirmation",
    description: "Confirm that React is the selected frontend framework.",
    evidence: "Frontend architecture discussion",
    reviewer: "Ashika Sanraj",
    status: "Verified",
    date: "2026-11-06"
  },
  {
    id: 2,
    title: "Backend API documentation",
    description: "Check whether the backend API documentation is complete.",
    evidence: "Backend planning notes",
    reviewer: "Rohan Mehta",
    status: "Pending",
    date: "2026-11-07"
  },
  {
    id: 3,
    title: "Project requirement review",
    description: "Review the initial project requirements for accuracy.",
    evidence: "Project requirement document",
    reviewer: "Navya Singh",
    status: "Rejected",
    date: "2026-11-05"
  }
];

const emptyForm = {
  title: "",
  description: "",
  evidence: "",
  reviewer: "",
  status: "Pending",
  date: new Date().toISOString().slice(0, 10)
};

export default function Verification() {
  const [records, setRecords] = useState(() => {
    try {
      const saved = localStorage.getItem("knowbridge_verification");
      return saved ? JSON.parse(saved) : initialRecords;
    } catch {
      return initialRecords;
    }
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    localStorage.setItem("knowbridge_verification", JSON.stringify(records));
  }, [records]);

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.title.toLowerCase().includes(search.toLowerCase()) ||
      record.reviewer.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || record.status === filter;

    return matchesSearch && matchesFilter;
  });

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (record) => {
    setEditing(record.id);
    setForm({ ...record });
    setShowForm(true);
  };

  const saveRecord = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.reviewer.trim()) return;

    if (editing) {
      setRecords((prev) =>
        prev.map((record) =>
          record.id === editing ? { ...form, id: editing } : record
        )
      );
    } else {
      setRecords((prev) => [
        { ...form, id: Date.now() },
        ...prev
      ]);
    }

    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
  };

  const deleteRecord = (id) => {
    if (window.confirm("Delete this verification record?")) {
      setRecords((prev) => prev.filter((record) => record.id !== id));
    }
  };

  const verified = records.filter((r) => r.status === "Verified").length;
  const pending = records.filter((r) => r.status === "Pending").length;
  const rejected = records.filter((r) => r.status === "Rejected").length;

  const statusStyle = (status) => {
    if (status === "Verified") return "bg-emerald-100 text-emerald-700";
    if (status === "Rejected") return "bg-red-100 text-red-700";
    return "bg-amber-100 text-amber-700";
  };

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-emerald-700">
            Workspace / Verification
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Verification
          </h1>
          <p className="mt-2 text-slate-500">
            Review project information and track whether it has been verified.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
        >
          <Plus size={18} /> Add Verification
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Records", value: records.length, icon: ShieldCheck },
          { label: "Verified", value: verified, icon: CheckCircle2 },
          { label: "Pending Review", value: pending, icon: Clock3 },
          { label: "Rejected", value: rejected, icon: XCircle }
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
            placeholder="Search records or reviewers..."
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-emerald-600"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-emerald-600"
        >
          <option>All</option>
          <option>Verified</option>
          <option>Pending</option>
          <option>Rejected</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredRecords.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <ShieldCheck size={36} className="mx-auto text-slate-400" />
            <h3 className="mt-3 font-semibold text-slate-800">
              No verification records found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Add a record or change your search.
            </p>
          </div>
        ) : (
          filteredRecords.map((record) => (
            <div
              key={record.id}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div className="flex gap-3">
                  <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                    <FileText size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {record.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {record.description}
                    </p>
                  </div>
                </div>

                <span className={`h-fit w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(record.status)}`}>
                  {record.status}
                </span>
              </div>

              <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 text-sm text-slate-500 sm:grid-cols-3">
                <p className="flex items-center gap-2">
                  <User size={16} /> {record.reviewer}
                </p>
                <p className="flex items-center gap-2">
                  <CalendarDays size={16} /> {record.date}
                </p>
                <p className="flex items-center gap-2">
                  <FileText size={16} /> {record.evidence || "No evidence added"}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setViewing(record)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
                >
                  View Details
                </button>
                <button
                  onClick={() => openEdit(record)}
                  className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
                >
                  <Pencil size={15} /> Edit
                </button>
                <button
                  onClick={() => deleteRecord(record.id)}
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
            onSubmit={saveRecord}
            className="my-6 w-full max-w-xl space-y-4 rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                {editing ? "Edit Verification" : "Add Verification"}
              </h2>
              <button type="button" onClick={() => setShowForm(false)}>
                <X />
              </button>
            </div>

            {[
              ["title", "Record title", "Enter record title"],
              ["description", "Description", "What needs to be verified?"],
              ["evidence", "Supporting evidence", "Document, note or link"],
              ["reviewer", "Reviewer", "Enter reviewer name"]
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
                  <option>Verified</option>
                  <option>Rejected</option>
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
              {editing ? "Save Changes" : "Create Record"}
            </button>
          </form>
        </div>
      )}

      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Verification Details</h2>
              <button onClick={() => setViewing(null)}>
                <X />
              </button>
            </div>

            <h3 className="text-lg font-semibold text-slate-900">
              {viewing.title}
            </h3>
            <p className="text-sm text-slate-600">{viewing.description}</p>

            <div>
              <p className="text-sm font-semibold text-slate-800">Evidence</p>
              <p className="text-sm text-slate-600">
                {viewing.evidence || "Not provided"}
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
