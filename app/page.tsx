"use client"
import React from "react";
import NavButton from "./_components/NavButton";


function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontSize: "24px" }}>
      <p>Welcome to the Contacts App!</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        <NavButton path="/contacts" copy="Go to Contacts" />
        <NavButton path="/contacts/new" copy="Add New Contact" />
      </div>
    </div>
  );
}

export default App;