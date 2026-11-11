import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Scale,
  CheckCircle2,
  Clock3,
  X,
  Pencil,
  Trash2,
  FileText,
  User,
  CalendarDays,
} from "lucide-react";

const initialDecisions = [
  {
    id: 1,
    title: "Use React for frontend development",
    description:
      "React will be used to build a reusable and component-based user interface.",
    reason:
      "It supports reusable components and makes frontend development easier to maintain.",
    owner: "Ashika Sanraj",
    status: "Approved",
    date: "2026-11-05",
    evidence: "Frontend architecture discussion",
  },
  {
    id: 2,
    title: "Use Spring Boot for backend",
    description: "Spring Boot will handle APIs and backend business logic.",
    reason: "It provides a structured Java backend framework.",
    owner: "Aarav Patel",
    status: "Proposed",
    date: "2026-11-06",
    evidence: "Backend planning notes",
  },
];

const emptyForm = {
  title: "",
  description: "",
  reason: "",
  owner: "",
  status: "Proposed",
  date: new Date().toISOString().slice(0, 10),
  evidence: "",
};

export default function Decisions() {
  const [decisions, setDecisions] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("knowbridge_decisions")) ||
        initialDecisions
      );
    } catch {
      return initialDecisions;
    }
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    localStorage.setItem("knowbridge_decisions", JSON.stringify(decisions));
  }, [decisions]);

  const filtered = decisions.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.owner.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || item.status === filter;
    return matchesSearch && matchesFilter;
  });

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditing(item.id);
    setForm({ ...item });
    setShowForm(true);
  };

  const saveDecision = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.owner.trim()) return;

    if (editing) {
      setDecisions((prev) =>
        prev.map((item) =>
          item.id === editing ? { ...form, id: editing } : item,
        ),
      );
    } else {
      setDecisions((prev) => [{ ...form, id: Date.now() }, ...prev]);
    }

    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
  };

  const deleteDecision = (id) => {
    if (window.confirm("Delete this decision?")) {
      setDecisions((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const approved = decisions.filter((d) => d.status === "Approved").length;
  const proposed = decisions.filter((d) => d.status === "Proposed").length;
  const rejected = decisions.filter((d) => d.status === "Rejected").length;

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-emerald-700">
            Workspace / Decisions
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Decisions</h1>
          <p className="mt-2 text-slate-500">
            Record important project decisions with reasons and supporting
            evidence.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
        >
          <Plus size={18} /> Add Decision
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Decisions", value: decisions.length, icon: Scale },
          { label: "Approved", value: approved, icon: CheckCircle2 },
          { label: "Proposed", value: proposed, icon: Clock3 },
          { label: "Rejected", value: rejected, icon: X },
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
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search decisions or owners..."
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
          <option>Proposed</option>
          <option>Rejected</option>
        </select>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <Scale size={35} className="mx-auto text-slate-400" />
            <h3 className="mt-3 font-semibold text-slate-800">
              No decisions found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Add a decision or try a different search.
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div className="flex gap-3">
                  <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                    <Scale size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>

                <span
                  className={`h-fit w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                    item.status === "Approved"
                      ? "bg-emerald-100 text-emerald-700"
                      : item.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 text-sm text-slate-500 sm:grid-cols-3">
                <p className="flex items-center gap-2">
                  <User size={16} /> {item.owner}
                </p>
                <p className="flex items-center gap-2">
                  <CalendarDays size={16} /> {item.date}
                </p>
                <p className="flex items-center gap-2">
                  <FileText size={16} /> {item.evidence || "No evidence added"}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setViewing(item)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50"
                >
                  View Details
                </button>
                <button
                  onClick={() => openEdit(item)}
                  className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
                >
                  <Pencil size={15} /> Edit
                </button>
                <button
                  onClick={() => deleteDecision(item.id)}
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
            onSubmit={saveDecision}
            className="my-6 w-full max-w-xl space-y-4 rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                {editing ? "Edit Decision" : "Add New Decision"}
              </h2>
              <button type="button" onClick={() => setShowForm(false)}>
                <X />
              </button>
            </div>

            {[
              ["title", "Decision title", "Enter decision title"],
              ["owner", "Decision owner", "Enter team member name"],
              ["description", "Description", "Describe the decision"],
              ["reason", "Reason", "Why was this decision taken?"],
              [
                "evidence",
                "Supporting evidence",
                "Document, meeting note or link",
              ],
            ].map(([key, label, placeholder]) => (
              <label key={key} className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">
                  {label}
                </span>
                <input
                  required={key === "title" || key === "owner"}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600"
                />
              </label>
            ))}

            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className="mb-1 block text-sm font-medium text-slate-700">
                  Status
                </span>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-3"
                >
                  <option>Proposed</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
              </label>
              <label>
                <span className="mb-1 block text-sm font-medium text-slate-700">
                  Date
                </span>
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
              {editing ? "Save Changes" : "Create Decision"}
            </button>
          </form>
        </div>
      )}

      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Decision Details</h2>
              <button onClick={() => setViewing(null)}>
                <X />
              </button>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              {viewing.title}
            </h3>
            <p className="text-sm text-slate-600">{viewing.description}</p>
            <div>
              <p className="text-sm font-semibold text-slate-800">Reason</p>
              <p className="text-sm text-slate-600">
                {viewing.reason || "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Supporting Evidence
              </p>
              <p className="text-sm text-slate-600">
                {viewing.evidence || "Not provided"}
              </p>
            </div>
            <p className="text-sm text-slate-500">
              Owner: {viewing.owner} · Status: {viewing.status}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
