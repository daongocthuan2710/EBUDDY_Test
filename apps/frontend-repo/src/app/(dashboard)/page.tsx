"use client";
import { useState } from "react";
import { fetchUserData } from "../../apis/userApi";

const UpdateButton = () => {
  const [userData, setUserData] = useState(null);

  const handleFetch = async () => {
    const data = await fetchUserData();
    setUserData(data);
  };

  return (
    <div>
      <button onClick={handleFetch}>Fetch User Data</button>
      {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>}
    </div>
  );
};

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <UpdateButton />
    </div>
  );
}
