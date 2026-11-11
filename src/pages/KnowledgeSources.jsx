
import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  FileText,
  Code,
  Video,
  Link as LinkIcon,
  Pencil,
  Trash2,
  Eye,
  X,
  BookOpen,
  Database,
  CheckCircle2,
  Clock3
} from "lucide-react";

const starterSources = [
  {
    id: 1,
    title: "Project Requirements Document",
    type: "Document",
    project: "Campus Management System",
    description: "Core requirements, modules and functional specifications.",
    link: "",
    status: "Verified",
    date: "2026-11-06"
  },
  {
    id: 2,
    title: "Frontend Repository",
    type: "GitHub",
    project: "Campus Management System",
    description: "React frontend source code and component structure.",
    link: "https://github.com/",
    status: "Verified",
    date: "2026-11-07"
  },
  {
    id: 3,
    title: "Team Planning Meeting",
    type: "Meeting Notes",
    project: "Campus Management System",
    description: "Discussion about project modules, responsibilities and deadlines.",
    link: "",
    status: "Pending Review",
    date: "2026-11-08"
  }
];

const emptyForm = {
  title: "",
  type: "Document",
  project: "",
  description: "",
  link: "",
  status: "Pending Review",
  date: new Date().toISOString().split("T")[0]
};

export default function KnowledgeSources() {
  const [sources, setSources] = useState(() => {
    try {
      const saved = localStorage.getItem("knowbridge_sources");
      return saved ? JSON.parse(saved) : starterSources;
    } catch {
      return starterSources;
    }
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    localStorage.setItem("knowbridge_sources", JSON.stringify(sources));
  }, [sources]);

  const filteredSources = sources.filter((source) => {
    const matchesSearch =
      source.title.toLowerCase().includes(search.toLowerCase()) ||
      source.project.toLowerCase().includes(search.toLowerCase()) ||
      source.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || source.type === filter;

    return matchesSearch && matchesFilter;
  });

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (source) => {
    setEditingId(source.id);
    setForm({ ...source });
    setSelected(null);
    setShowForm(true);
  };

  const saveSource = (e) => {
    e.preventDefault();

    if (!form.title.trim()) return;

    if (editingId) {
      setSources((old) =>
        old.map((source) =>
          source.id === editingId
            ? { ...form, id: editingId }
            : source
        )
      );
    } else {
      setSources((old) => [
        { ...form, id: Date.now() },
        ...old
      ]);
    }

    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const deleteSource = (id) => {
    if (!window.confirm("Delete this knowledge source?")) return;

    setSources((old) =>
      old.filter((source) => source.id !== id)
    );

    setSelected(null);
  };

  const iconForType = (type) => {
    if (type === "GitHub") return Code;
    if (type === "Meeting Notes") return Video;
    if (type === "Link") return LinkIcon;
    return FileText;
  };

  const stats = [
    {
      label: "Total Sources",
      value: sources.length,
      icon: Database,
      color: "text-green-700",
      bg: "bg-green-50"
    },
    {
      label: "Verified Sources",
      value: sources.filter(
        (s) => s.status === "Verified"
      ).length,
      icon: CheckCircle2,
      color: "text-blue-700",
      bg: "bg-blue-50"
    },
    {
      label: "Pending Review",
      value: sources.filter(
        (s) => s.status === "Pending Review"
      ).length,
      icon: Clock3,
      color: "text-amber-700",
      bg: "bg-amber-50"
    }
  ];

  return (
    <div className="space-y-7">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-green-700">
            Workspace / Knowledge Sources
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Knowledge Sources
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Collect and organise the information behind your projects.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="flex items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
        >
          <Plus size={19} />
          Add Source
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

      {/* Search and Filter */}
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
              placeholder="Search sources, projects..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-green-600"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-600"
          >
            <option>All</option>
            <option>Document</option>
            <option>GitHub</option>
            <option>Meeting Notes</option>
            <option>Link</option>
          </select>
        </div>
      </div>

      {/* Sources List */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Project Knowledge
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your collected project information and references.
            </p>
          </div>

          <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
            {filteredSources.length} sources
          </span>
        </div>

        {filteredSources.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
            <BookOpen size={38} className="mx-auto text-gray-400" />

            <h3 className="mt-4 font-semibold text-gray-800">
              No sources found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Add a source or change your search.
            </p>

            <button
              onClick={openCreate}
              className="mt-5 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white"
            >
              Add Source
            </button>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {filteredSources.map((source) => {
              const Icon = iconForType(source.type);

              return (
                <div
                  key={source.id}
                  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-green-50 p-3 text-green-700">
                        <Icon size={23} />
                      </div>

                      <div>
                        <h3 className="font-bold text-gray-900">
                          {source.title}
                        </h3>

                        <p className="mt-1 text-xs text-gray-400">
                          {source.type}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        source.status === "Verified"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {source.status}
                    </span>
                  </div>

                  <p className="mt-5 min-h-12 text-sm leading-6 text-gray-500">
                    {source.description || "No description added."}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                    <div>
                      <p className="text-xs text-gray-400">
                        Project
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-800">
                        {source.project || "Not assigned"}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSelected(source)}
                        title="View source"
                        className="rounded-lg p-2 text-gray-500 hover:bg-green-50 hover:text-green-700"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => openEdit(source)}
                        title="Edit source"
                        className="rounded-lg p-2 text-gray-500 hover:bg-green-50 hover:text-green-700"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => deleteSource(source.id)}
                        title="Delete source"
                        className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
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
                  {editingId ? "Edit Knowledge Source" : "Add Knowledge Source"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Enter the details of your project information.
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={saveSource} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Source Title *
                </label>

                <input
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  placeholder="Enter source title"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Source Type
                  </label>

                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm({ ...form, type: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-600"
                  >
                    <option>Document</option>
                    <option>GitHub</option>
                    <option>Meeting Notes</option>
                    <option>Link</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Project Name
                  </label>

                  <input
                    value={form.project}
                    onChange={(e) =>
                      setForm({ ...form, project: e.target.value })
                    }
                    placeholder="Enter project name"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600"
                  />
                </div>
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
                  placeholder="Describe what this source contains..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Source URL
                </label>

                <input
                  type="url"
                  value={form.link}
                  onChange={(e) =>
                    setForm({ ...form, link: e.target.value })
                  }
                  placeholder="https://..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Review Status
                  </label>

                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-600"
                  >
                    <option>Pending Review</option>
                    <option>Verified</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Date Added
                  </label>

                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      setForm({ ...form, date: e.target.value })
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
                  {editingId ? "Save Changes" : "Add Source"}
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
                  <BookOpen size={23} />
                </div>

                <h2 className="text-xl font-bold text-gray-900">
                  {selected.title}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Knowledge source details
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
                <p className="text-xs text-gray-400">Source Type</p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {selected.type}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Status</p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {selected.status}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Project</p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {selected.project || "Not assigned"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Date Added</p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {selected.date || "Not set"}
                </p>
              </div>
            </div>

            {selected.link && (
              <a
                href={selected.link}
                target="_blank"
                rel="noreferrer"
                className="mt-5 block break-all text-sm font-medium text-green-700 hover:underline"
              >
                Open Source Link
              </a>
            )}

            <button
              onClick={() => openEdit(selected)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white hover:bg-green-800"
            >
              <Pencil size={17} />
              Edit Source
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
