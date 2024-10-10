import { useEffect, useState } from "react";
import GroupByStatus from "./component/GroupByStatus";
import Header from "./component/Header";
import GroupByPriority from "./component/GroupByPriority";
import GroupByUser from "./component/GroupByUser";

function App() {
  const [grouping, setGrouping] = useState("Status");
  const [ordering, setOrdering] = useState("Priority");
  const [data, setData] = useState({ tickets: [], users: [] });

  useEffect(() => {
    const storedGrouping = localStorage.getItem("grouping") || "Status";
    const storedOrdering = localStorage.getItem("ordering") || "Priority";
    setGrouping(storedGrouping);
    setOrdering(storedOrdering);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, []);


  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <Header setGrouping={setGrouping} setOrdering={setOrdering} />
      {grouping === "Status" && (
        <GroupByStatus data={data} ordering={ordering} />
      )}
      {grouping === "User" && (
        <GroupByUser data={data} ordering={ordering} />
      )}
      {grouping === "Priority" && (
        <GroupByPriority data={data} ordering={ordering}  />
      )}
    </div>
  );
}

export default App;
