
import { useEffect, useState } from "react";
import {
  Plus, Search, ClipboardList, CheckCircle2, Clock3,
  X, Pencil, Trash2, CalendarDays, User, Flag
} from "lucide-react";

const initialTasks = [
  {
    id: 1,
    title: "Build project dashboard",
    description: "Create the main dashboard with project overview and activity.",
    assignee: "Ashika Sanraj",
    priority: "High",
    status: "In Progress",
    dueDate: "2026-11-12"
  },
  {
    id: 2,
    title: "Develop backend APIs",
    description: "Create APIs for project and knowledge source management.",
    assignee: "Rohan Mehta",
    priority: "High",
    status: "To Do",
    dueDate: "2026-11-15"
  },
  {
    id: 3,
    title: "Review project requirements",
    description: "Review the project requirements and identify missing information.",
    assignee: "Navya Singh",
    priority: "Medium",
    status: "Completed",
    dueDate: "2026-11-07"
  }
];

const emptyForm = {
  title: "",
  description: "",
  assignee: "",
  priority: "Medium",
  status: "To Do",
  dueDate: ""
};

export default function Tasks() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("knowbridge_tasks");
      return saved ? JSON.parse(saved) : initialTasks;
    } catch {
      return initialTasks;
    }
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    localStorage.setItem("knowbridge_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.assignee.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || task.status === filter;

    return matchesSearch && matchesFilter;
  });

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (task) => {
    setEditing(task.id);
    setForm({ ...task });
    setShowForm(true);
  };

  const saveTask = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.assignee.trim()) return;

    if (editing) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editing ? { ...form, id: editing } : task
        )
      );
    } else {
      setTasks((prev) => [
        { ...form, id: Date.now() },
        ...prev
      ]);
    }

    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const todo = tasks.filter((t) => t.status === "To Do").length;

  const statusStyle = (status) => {
    if (status === "Completed") return "bg-emerald-100 text-emerald-700";
    if (status === "In Progress") return "bg-blue-100 text-blue-700";
    return "bg-amber-100 text-amber-700";
  };

  const priorityStyle = (priority) => {
    if (priority === "High") return "text-red-600";
    if (priority === "Medium") return "text-amber-600";
    return "text-slate-500";
  };

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-emerald-700">
            Workspace / Tasks
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Tasks
          </h1>
          <p className="mt-2 text-slate-500">
            Assign work, track progress and keep project responsibilities clear.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
        >
          <Plus size={18} /> Create Task
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Tasks", value: total, icon: ClipboardList },
          { label: "Completed", value: completed, icon: CheckCircle2 },
          { label: "In Progress", value: inProgress, icon: Clock3 },
          { label: "To Do", value: todo, icon: Flag }
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
            placeholder="Search tasks or team members..."
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-emerald-600"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-emerald-600"
        >
          <option>All</option>
          <option>To Do</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="font-semibold text-slate-900">Task List</h2>
          <p className="mt-1 text-sm text-slate-500">
            {filteredTasks.length} tasks found
          </p>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center">
            <ClipboardList size={36} className="mx-auto text-slate-400" />
            <h3 className="mt-3 font-semibold text-slate-800">
              No tasks found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Try another search or create a new task.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col justify-between gap-4 p-5 lg:flex-row lg:items-center"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-900">
                    {task.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {task.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                    <span className="flex items-center gap-2">
                      <User size={15} /> {task.assignee}
                    </span>
                    <span className="flex items-center gap-2">
                      <CalendarDays size={15} /> {task.dueDate || "No deadline"}
                    </span>
                    <span className={`flex items-center gap-2 font-medium ${priorityStyle(task.priority)}`}>
                      <Flag size={15} /> {task.priority} Priority
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle(task.status)}`}>
                    {task.status}
                  </span>

                  <button
                    onClick={() => openEdit(task)}
                    className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                    title="Edit task"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="rounded-lg border border-red-100 p-2 text-red-600 hover:bg-red-50"
                    title="Delete task"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <form
            onSubmit={saveTask}
            className="my-6 w-full max-w-xl space-y-4 rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                {editing ? "Edit Task" : "Create New Task"}
              </h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
              >
                <X />
              </button>
            </div>

            <label className="block">
              <span className="mb-1 block text-sm font-medium">Task title</span>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Enter task title"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium">Description</span>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe the task"
                rows="3"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium">Assigned to</span>
              <input
                required
                value={form.assignee}
                onChange={(e) => setForm({ ...form, assignee: e.target.value })}
                placeholder="Enter team member name"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-3">
              <label>
                <span className="mb-1 block text-sm font-medium">Priority</span>
                <select
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-3"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </label>

              <label>
                <span className="mb-1 block text-sm font-medium">Status</span>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-3"
                >
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </label>

              <label>
                <span className="mb-1 block text-sm font-medium">Due date</span>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-3"
                />
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-700 py-3 font-semibold text-white hover:bg-emerald-800"
            >
              {editing ? "Save Changes" : "Create Task"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
