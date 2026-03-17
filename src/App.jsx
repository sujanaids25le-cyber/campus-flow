import { useState } from "react";
import "./App.css";

export default function App() {

  const [page, setPage] = useState("register");

  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [phone, setPhone] = useState("");

  const [notice, setNotice] = useState("");
  const [deadline, setDeadline] = useState("");

  const [tasks, setTasks] = useState([]);

  const enterDashboard = () => {
    if (!name || !gmail || !phone) {
      alert("Fill all details");
      return;
    }
    setPage("dash");
  };

  const createTask = () => {
    if (!notice || !deadline) {
      alert("Enter notice & deadline");
      return;
    }

    const newTask = {
      title: notice,
      time: deadline,
      priority: "HIGH",
    };

    setTasks([newTask, ...tasks]);

    setNotice("");
    setDeadline("");
  };

  /* ================= REGISTER SCREEN ================= */

  if (page === "register") {
    return (
      <div className="space">
        <div className="floatingCard">

          <h1>⚡ CampusFlow AI</h1>
          <p>Smart Student Assistant</p>

          <input
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            placeholder="Gmail"
            value={gmail}
            onChange={(e)=>setGmail(e.target.value)}
          />

          <input
            placeholder="Phone Number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />

          <button onClick={enterDashboard}>
            Enter Dashboard →
          </button>

        </div>
      </div>
    );
  }

  /* ================= DASHBOARD ================= */

  return (
    <div className="dashboard">

      <div className="glassNav">
        <h2>CampusFlow</h2>
        <span>{name}</span>
      </div>

      <div className="content">

        <div className="noticeBox">

          <h2>Create Smart Deadline</h2>

          <textarea
            placeholder="Paste messy college notice..."
            value={notice}
            onChange={(e)=>setNotice(e.target.value)}
          />

          <input
            type="datetime-local"
            value={deadline}
            onChange={(e)=>setDeadline(e.target.value)}
          />

          <button className="analyzeBtn" onClick={createTask}>
            Generate AI Task
          </button>

        </div>

        <div className="taskArea">
          {tasks.map((t,i)=>(
            <div key={i} className="taskCard">
              <h3>{t.title}</h3>
              <p>{t.time}</p>
              <span>{t.priority}</span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}