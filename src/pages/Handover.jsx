
import { useEffect, useState } from "react";
import {
  Plus, Search, ArrowLeftRight, CheckCircle2, Clock3,
  AlertCircle, X, Pencil, Trash2, User, CalendarDays,
  FileText, ClipboardCheck
} from "lucide-react";

const initialHandovers = [
  {
    id: 1,
    title: "Frontend Development Handover",
    project: "Campus Management System",
    from: "Ashika Sanraj",
    to: "Navya Singh",
    date: "2026-11-12",
    status: "In Progress",
    notes: "Transfer frontend component structure, routing and UI documentation.",
    checklist: [
      { label: "Share source code and repository details", done: true },
      { label: "Explain component structure", done: true },
      { label: "Transfer pending tasks", done: false },
      { label: "Review documentation with new owner", done: false }
    ]
  },
  {
    id: 2,
    title: "Project Documentation Handover",
    project: "E-Commerce Platform",
    from: "Aarav Mehta",
    to: "Rohan Patel",
    date: "2026-11-15",
    status: "Pending",
    notes: "Transfer project requirements, technical decisions and API notes.",
    checklist: [
      { label: "Share project requirements", done: false },
      { label: "Explain technical decisions", done: false },
      { label: "Transfer project documents", done: false }
    ]
  }
];

const emptyForm = {
  title: "",
  project: "",
  from: "",
  to: "",
  date: "",
  status: "Pending",
  notes: "",
  checklist: [
    { label: "Share project documentation", done: false },
    { label: "Transfer pending tasks", done: false },
    { label: "Explain important decisions", done: false }
  ]
};

export default function Handover() {
  const [handovers, setHandovers] = useState(() => {
    try {
      const saved = localStorage.getItem("knowbridge_handovers");
      return saved ? JSON.parse(saved) : initialHandovers;
    } catch {
      return initialHandovers;
    }
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    localStorage.setItem("knowbridge_handovers", JSON.stringify(handovers));
  }, [handovers]);

  const filteredHandovers = handovers.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.project.toLowerCase().includes(search.toLowerCase()) ||
      item.from.toLowerCase().includes(search.toLowerCase()) ||
      item.to.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || item.status === filter;

    return matchesSearch && matchesFilter;
  });

  const openAdd = () => {
    setEditing(null);
    setForm({
      ...emptyForm,
      checklist: emptyForm.checklist.map((item) => ({ ...item }))
    });
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditing(item.id);
    setForm({
      ...item,
      checklist: item.checklist.map((task) => ({ ...task }))
    });
    setShowForm(true);
  };

  const saveHandover = (e) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.project.trim() ||
      !form.from.trim() ||
      !form.to.trim()
    ) return;

    if (editing) {
      setHandovers((prev) =>
        prev.map((item) =>
          item.id === editing ? { ...form, id: editing } : item
        )
      );
    } else {
      setHandovers((prev) => [
        { ...form, id: Date.now() },
        ...prev
      ]);
    }

    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
  };

  const deleteHandover = (id) => {
    if (window.confirm("Delete this handover?")) {
      setHandovers((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const toggleChecklist = (handoverId, index) => {
    setHandovers((prev) =>
      prev.map((item) =>
        item.id === handoverId
          ? {
              ...item,
              checklist: item.checklist.map((task, i) =>
                i === index ? { ...task, done: !task.done } : task
              )
            }
          : item
      )
    );

    setViewing((prev) =>
      prev && prev.id === handoverId
        ? {
            ...prev,
            checklist: prev.checklist.map((task, i) =>
              i === index ? { ...task, done: !task.done } : task
            )
          }
        : prev
    );
  };

  const total = handovers.length;
  const completed = handovers.filter((h) => h.status === "Completed").length;
  const inProgress = handovers.filter((h) => h.status === "In Progress").length;
  const pending = handovers.filter((h) => h.status === "Pending").length;

  const statusStyle = (status) => {
    if (status === "Completed") return "bg-emerald-100 text-emerald-700";
    if (status === "In Progress") return "bg-blue-100 text-blue-700";
    return "bg-amber-100 text-amber-700";
  };

  const progress = (checklist) => {
    if (!checklist.length) return 0;
    return Math.round(
      (checklist.filter((task) => task.done).length / checklist.length) * 100
    );
  };

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-emerald-700">
            Workspace / Handover
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Handover
          </h1>
          <p className="mt-2 text-slate-500">
            Transfer project knowledge, responsibilities and important updates between team members.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
        >
          <Plus size={18} /> Create Handover
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Handovers", value: total, icon: ArrowLeftRight },
          { label: "Completed", value: completed, icon: CheckCircle2 },
          { label: "In Progress", value: inProgress, icon: Clock3 },
          { label: "Pending", value: pending, icon: AlertCircle }
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
            placeholder="Search handovers, projects or members..."
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-emerald-600"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-emerald-600"
        >
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredHandovers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <ArrowLeftRight size={36} className="mx-auto text-slate-400" />
            <h3 className="mt-3 font-semibold text-slate-800">
              No handovers found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Create a handover or change your search.
            </p>
          </div>
        ) : (
          filteredHandovers.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Project: {item.project}
                  </p>
                </div>

                <span className={`h-fit w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(item.status)}`}>
                  {item.status}
                </span>
              </div>

              <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 text-sm text-slate-500 sm:grid-cols-3">
                <p className="flex items-center gap-2">
                  <User size={16} /> From: {item.from}
                </p>
                <p className="flex items-center gap-2">
                  <User size={16} /> To: {item.to}
                </p>
                <p className="flex items-center gap-2">
                  <CalendarDays size={16} /> {item.date || "No date set"}
                </p>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    Knowledge transfer progress
                  </span>
                  <span className="font-semibold text-emerald-700">
                    {progress(item.checklist)}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-emerald-600 transition-all"
                    style={{ width: `${progress(item.checklist)}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setViewing(item)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
                >
                  View Checklist
                </button>
                <button
                  onClick={() => openEdit(item)}
                  className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
                >
                  <Pencil size={15} /> Edit
                </button>
                <button
                  onClick={() => deleteHandover(item.id)}
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
            onSubmit={saveHandover}
            className="my-6 w-full max-w-xl space-y-4 rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                {editing ? "Edit Handover" : "Create Handover"}
              </h2>
              <button type="button" onClick={() => setShowForm(false)}>
                <X />
              </button>
            </div>

            {[
              ["title", "Handover title", "Enter handover title"],
              ["project", "Project name", "Enter project name"],
              ["from", "Outgoing member", "Who is transferring the knowledge?"],
              ["to", "Incoming member", "Who will receive the knowledge?"],
              ["notes", "Handover notes", "Add important instructions or updates"]
            ].map(([key, label, placeholder]) => (
              <label key={key} className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">
                  {label}
                </span>
                <input
                  required={["title", "project", "from", "to"].includes(key)}
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
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </label>

              <label>
                <span className="mb-1 block text-sm font-medium">Handover date</span>
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
              {editing ? "Save Changes" : "Create Handover"}
            </button>
          </form>
        </div>
      )}

      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <div className="my-6 w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Handover Checklist</h2>
              <button onClick={() => setViewing(null)}>
                <X />
              </button>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">{viewing.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{viewing.project}</p>
            </div>

            <div className="space-y-3">
              {viewing.checklist.map((task, index) => (
                <label
                  key={index}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3"
                >
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleChecklist(viewing.id, index)}
                    className="mt-1 h-4 w-4 accent-emerald-700"
                  />
                  <span className={`text-sm ${task.done ? "text-slate-400 line-through" : "text-slate-700"}`}>
                    {task.label}
                  </span>
                </label>
              ))}
            </div>

            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-800">
                {progress(viewing.checklist)}% completed
              </p>
              <p className="mt-1 text-xs text-emerald-700">
                {viewing.notes || "No additional handover notes."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
