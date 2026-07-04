"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi2";
import { buildApiUrl } from "@/lib/apiBase";

interface TodoItem {
  _id: string;
  title: string;
  isCompleted: boolean;
}

export default function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem("token");
  });
  const router = useRouter();
  const API_URL = buildApiUrl("/api/todos");

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    async function fetchTodos(authToken: string) {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setTodos(data);
        } else {
          setError("Unable to load your tasks right now.");
        }
      } catch (error) {
        console.error("Error connecting to backend database:", error);
        setError("Error connecting to backend database.");
      } finally {
        setLoading(false);
      }
    }

    fetchTodos(token);
  }, [token, router, API_URL]);

  const handleAddTask = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: inputValue.trim() }),
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      if (response.ok) {
        const newTodo = await response.json();
        setTodos((current) => [newTodo, ...current]);
        setInputValue("");
      }
    } catch (error) {
      console.error("Failed to append network task item:", error);
    }
  };

  const handleToggleButton = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      if (response.ok) {
        const updatedTodo = await response.json();
        setTodos((current) =>
          current.map((todo) => (todo._id === id ? updatedTodo : todo)),
        );
      }
    } catch (error) {
      console.error("Failed to execute network state mutate:", error);
    }
  };

  const handleDeleteTask = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      if (response.ok) {
        setTodos((current) => current.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete network resource element:", error);
    }
  };

  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.isCompleted).length;
  const progressPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <section
      id="todo"
      className="min-h-screen flex justify-center bg-slate-950 py-32"
    >
      <div className="max-w-6xl w-full px-4">
        <h1 className="text-4xl font-bold mb-12 text-center bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Todo List
        </h1>

        <div className="max-w-md mx-auto p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl">
          {error ? (
            <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          ) : null}

          <div className="border border-white/10 p-5 rounded-xl flex items-center justify-between mb-6 bg-white/2">
            <div>
              <h2 className="text-xl font-bold text-slate-200">
                Todo Progress
              </h2>
              <p className="text-xs text-slate-400 mt-1">Keep it up!</p>

              <div className="w-48 h-2 bg-slate-800 rounded-full mt-4 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="w-16 h-16 bg-linear-to-br from-white via-slate-500 to-red-300 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-purple-500/20">
              {completedTasks}/{totalTasks}
            </div>
          </div>

          <form onSubmit={handleAddTask} className="flex gap-2 mb-5">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Write a new task..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 text-slate-200 placeholder-slate-500 transition-colors"
            />
            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-500 text-white font-medium px-4 rounded-xl text-sm transition-all active:scale-95"
            >
              Add
            </button>
          </form>

          <div className="grid gap-5">
            {loading ? (
              <div className="text-center py-6 text-slate-500 text-sm border border-dashed border-white/10 rounded-xl">
                Loading your tasks...
              </div>
            ) : todos.length === 0 ? (
              <div className="text-center py-6 text-slate-500 text-sm border border-dashed border-white/10 rounded-xl">
                No tasks available. Add Tasks!
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo._id}
                  className="flex items-center justify-between"
                >
                  <span
                    className={`text-lg transition-all duration-300 select-none max-w-60 truncate ${
                      todo.isCompleted
                        ? "text-slate-500 line-through"
                        : "text-slate-300"
                    }`}
                  >
                    {todo.title}
                  </span>

                  <div className="flex items-center space-x-4">
                    <div
                      onClick={(e) => handleToggleButton(todo._id, e)}
                      className={`w-11 h-6 rounded-full relative transition-all duration-300 cursor-pointer ${
                        todo.isCompleted ? "bg-amber-700/60" : "bg-slate-700"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 bg-white w-5 h-5 rounded-full transition-all duration-300 ${
                          todo.isCompleted ? "right-0.5" : "left-0.5"
                        }`}
                      ></div>
                    </div>

                    <button
                      onClick={(e) => handleDeleteTask(todo._id, e)}
                      className="text-slate-500 hover:text-red-400 transition-colors p-1"
                      title="Delete Task"
                    >
                      <HiOutlineTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
