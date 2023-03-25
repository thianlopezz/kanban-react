import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    setTareas(tareas);
  }, []);

  const descripcionNuevaTarea = useRef();
  function agregarNuevaTarea(e) {
    e.preventDefault();
    let descripcion = descripcionNuevaTarea.current.value;
    const nuevaTarea = {
      id: tareas.length + 1,
      descripcion,
      estado: "todo",
    };
    const next = [...tareas, nuevaTarea];
    localStorage.setItem("tareas", JSON.stringify(next));
    setTareas(next);
    e.target.reset();
  }

  function cambiarEstadoTarea(e, id, estadoAnterior) {
    e.preventDefault();
    let indiceTarea = tareas.findIndex((tarea) => tarea.id == id);
    let nuevoEstado;
    if (estadoAnterior == "todo") {
      nuevoEstado = "doing";
    } else if (estadoAnterior == "doing") {
      nuevoEstado = "done";
    }

    let next = [...tareas];
    next[indiceTarea].estado = nuevoEstado;
    localStorage.setItem("tareas", JSON.stringify(tareas));
    setTareas(next);
  }

  return (
    <div className="container">
      <div className="columns-3 h-screen p-2">
        <div className="columns-1 h-full rounded border-2 border-teal-500 p-2">
          <h1 className="my-2 text-xl">To do</h1>
          <div className="columns-1 p-1 h-fit rounded border-2 border-teal-500 mb-3 p-3">
            <form onSubmit={agregarNuevaTarea}>
              <input
                ref={descripcionNuevaTarea}
                type="text"
                className="rounded w-full border-2 border-b-gray-500 p-1.5"
                placeholder="Descripcion de la tarea"
                required
              />
              <button
                type="submit"
                className="bg-teal-600 rounded border-3 border-gray-500 text-white text-center w-full my-1 p-1"
              >
                Guardar nueva tarea
              </button>
            </form>
          </div>
          <div>
            {tareas
              .filter((tarea) => tarea.estado == "todo")
              .map((tarea) => (
                <TareaCard
                  tarea={tarea}
                  cambiarEstadoTarea={cambiarEstadoTarea}
                />
              ))}
          </div>
        </div>
        <div className="columns-1 h-full rounded border-2 border-yellow-500 p-2">
          <h1 className="my-2 text-xl">Doing</h1>
          <div>
            {tareas
              .filter((tarea) => tarea.estado == "doing")
              .map((tarea) => (
                <TareaCard
                  tarea={tarea}
                  cambiarEstadoTarea={cambiarEstadoTarea}
                />
              ))}
          </div>
        </div>
        <div className="columns-1 h-full rounded border-2 border-rose-500 p-2">
          <h1 className="my-2 text-xl">Done</h1>
          <div>
            {tareas
              .filter((tarea) => tarea.estado == "done")
              .map((tarea) => (
                <TareaCard
                  tarea={tarea}
                  cambiarEstadoTarea={cambiarEstadoTarea}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

function TareaCard({ tarea, cambiarEstadoTarea }) {
  const botonHTML = (
    <button
      type="button"
      className="bg-yellow-400 rounded border-3 border-gray-500 text-black-400 text-center w-full my-1 p-1"
      onClick={(e) => cambiarEstadoTarea(e, tarea.id, tarea.estado)}
    >
      Cambiar a {tarea.estado == "todo" ? "Doing" : "Done"}!
    </button>
  );

  return (
    <div className="columns-1 p-1 h-fit rounded border-2 bg-teal-500 mb-3 p-3">
      <h1 className="text-2xl text-center text-white">{tarea.descripcion}</h1>
      {tarea.estado == "todo" || tarea.estado == "doing" ? botonHTML : ""}
    </div>
  );
}
