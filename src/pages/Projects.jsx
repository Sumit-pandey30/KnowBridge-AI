
import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  FolderKanban,
  CalendarDays,
  Pencil,
  Trash2,
  X,
  Eye,
  Users,
  Clock3,
  CheckCircle2,
  BriefcaseBusiness,
  Layers3
} from "lucide-react";

const starterProjects = [
  {
    id: 1,
    name: "Campus Management System",
    description: "A centralized platform for managing student records, attendance, faculty and campus activities.",
    status: "In Progress",
    owner: "Ashika Sanraj",
    startDate: "2026-11-01",
    members: 4
  },
  {
    id: 2,
    name: "E-Commerce Platform",
    description: "An online shopping platform with product management, orders and user authentication.",
    status: "Planning",
    owner: "Akshita Prasad",
    startDate: "2026-11-05",
    members: 3
  }
];

const emptyForm = {
  name: "",
  description: "",
  status: "Planning",
  owner: "",
  startDate: "",
  members: 1
};

export default function Projects() {
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem("knowbridge_projects_v2");
      return saved ? JSON.parse(saved) : starterProjects;
    } catch {
      return starterProjects;
    }
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    localStorage.setItem(
      "knowbridge_projects_v2",
      JSON.stringify(projects)
    );
  }, [projects]);

  const filtered = projects.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      filter === "All" || p.status === filter;

    return matchSearch && matchStatus;
  });

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (project) => {
    setEditingId(project.id);
    setForm({ ...project });
    setSelected(null);
    setShowForm(true);
  };

  const saveProject = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return;

    if (editingId) {
      setProjects((old) =>
        old.map((p) =>
          p.id === editingId
            ? { ...form, id: editingId }
            : p
        )
      );
    } else {
      setProjects((old) => [
        { ...form, id: Date.now() },
        ...old
      ]);
    }

    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const deleteProject = (id) => {
    if (!window.confirm("Delete this project permanently?")) {
      return;
    }

    setProjects((old) =>
      old.filter((p) => p.id !== id)
    );

    setSelected(null);
  };

  const statusClass = (status) => {
    if (status === "Completed") {
      return "bg-emerald-50 text-emerald-700";
    }

    if (status === "In Progress") {
      return "bg-blue-50 text-blue-700";
    }

    return "bg-amber-50 text-amber-700";
  };

  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      icon: FolderKanban,
      color: "text-green-700",
      bg: "bg-green-50"
    },
    {
      label: "In Progress",
      value: projects.filter(
        (p) => p.status === "In Progress"
      ).length,
      icon: Clock3,
      color: "text-blue-700",
      bg: "bg-blue-50"
    },
    {
      label: "Completed",
      value: projects.filter(
        (p) => p.status === "Completed"
      ).length,
      icon: CheckCircle2,
      color: "text-emerald-700",
      bg: "bg-emerald-50"
    }
  ];

  return (
    <div className="space-y-7">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-green-700">
            Workspace / Projects
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Project Workspace
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Organise projects, track progress and maintain knowledge continuity.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="flex items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white shadow-sm hover:bg-green-800"
        >
          <Plus size={19} />
          Create Project
        </button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  {item.label}
                </p>

                <div className={`rounded-xl p-3 ${item.bg} ${item.color}`}>
                  <Icon size={21} />
                </div>
              </div>

              <h2 className="mt-3 text-3xl font-bold text-gray-900">
                {item.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects by name or description..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-green-600"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-600"
          >
            <option>All</option>
            <option>Planning</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {/* Project List */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Your Projects
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage your project workspaces and activities.
            </p>
          </div>

          <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
            {filtered.length} projects
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
            <FolderKanban
              size={38}
              className="mx-auto text-gray-400"
            />

            <h3 className="mt-4 font-semibold text-gray-800">
              No projects found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Create a project or change your search.
            </p>

            <button
              onClick={openCreate}
              className="mt-5 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-green-50 p-3 text-green-700">
                      <BriefcaseBusiness size={23} />
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900">
                        {project.name}
                      </h3>

                      <p className="mt-1 text-xs text-gray-400">
                        Project workspace
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(project.status)}`}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="mt-5 min-h-12 text-sm leading-6 text-gray-500">
                  {project.description}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2">
                    <Users
                      size={17}
                      className="text-gray-400"
                    />

                    <div>
                      <p className="text-xs text-gray-400">
                        Team Members
                      </p>

                      <p className="text-sm font-semibold text-gray-800">
                        {project.members}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays
                      size={17}
                      className="text-gray-400"
                    />

                    <div>
                      <p className="text-xs text-gray-400">
                        Start Date
                      </p>

                      <p className="text-sm font-semibold text-gray-800">
                        {project.startDate || "Not set"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-xs text-gray-500">
                    Owner:{" "}
                    <strong className="text-gray-700">
                      {project.owner || "Unassigned"}
                    </strong>
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSelected(project)}
                      title="View details"
                      className="rounded-lg p-2 text-gray-500 hover:bg-green-50 hover:text-green-700"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => openEdit(project)}
                      title="Edit project"
                      className="rounded-lg p-2 text-gray-500 hover:bg-green-50 hover:text-green-700"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => deleteProject(project.id)}
                      title="Delete project"
                      className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create and Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-950/50 p-4">
          <div className="my-5 w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editingId ? "Edit Project" : "Create New Project"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add project information below.
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={saveProject} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Project Name *
                </label>

                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="Enter project name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  rows="3"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Describe your project..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Project Owner
                  </label>

                  <input
                    value={form.owner}
                    onChange={(e) =>
                      setForm({ ...form, owner: e.target.value })
                    }
                    placeholder="Owner name"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Status
                  </label>

                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-600"
                  >
                    <option>Planning</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Start Date
                  </label>

                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Team Members
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={form.members}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        members: Number(e.target.value)
                      })
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
                >
                  {editingId ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-950/50 p-4">
          <div className="my-5 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-3 inline-flex rounded-xl bg-green-50 p-3 text-green-700">
                  <Layers3 size={23} />
                </div>

                <h2 className="text-xl font-bold text-gray-900">
                  {selected.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Project overview and details
                </p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mt-6 text-sm leading-6 text-gray-600">
              {selected.description || "No description available."}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-5 rounded-xl bg-gray-50 p-4">
              <div>
                <p className="text-xs text-gray-400">Status</p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {selected.status}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Owner</p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {selected.owner || "Unassigned"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Start Date</p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {selected.startDate || "Not set"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Team Members</p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {selected.members}
                </p>
              </div>
            </div>

            <button
              onClick={() => openEdit(selected)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white hover:bg-green-800"
            >
              <Pencil size={17} />
              Edit Project
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
