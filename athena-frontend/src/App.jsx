import { useState } from "react";

function App() {
  const [_name, setName] = useState("");
  const [urn, setUrn] = useState("");
  const [sessionId, setSessionID] = useState("");
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(false);
  const [totalMcq,setTotalMCQ]= useState(0);

  async function getTotalMCQNumber(){
    const total =await  window.electronAPI.getTotalMCQ();
    setTotalMCQ(total)
  }

  async function handleStartExam() {
    setLoading(true);
    const id = await window.electronAPI.startExam(_name, urn);
    setSessionID(id);
    await getTotalMCQNumber()
    setLoading(false);
    setStart(true);
  }

  return (
    <div>
      {start ? (
        <div>
          <p>Session - {sessionId}</p>
          <p>Total Number MCQ - {totalMcq}</p>
        </div>
      ) : (
        <div>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
          />
          <input
            type="text"
            onChange={(e) => setUrn(e.target.value)}
            placeholder="Enter Your URN"
          />
          <button onClick={() => handleStartExam()}>Start</button>
        </div>
      )}
    </div>
  );
}

export default App;
