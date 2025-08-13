"use client"
import React, { useEffect, useState } from "react";
import { ContactType } from "../_types";
import { WS_URL } from "../_constants";
import ContactList from "../_components/ContactList";
import Header from "../_components/Header";

function Page() {
  const [contacts, setContacts] = useState<ContactType[]>([]);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    ws.onmessage = () => {
      loadContacts();
    };
    ws.onclose = () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const response = await fetch('/api/contacts', { method: 'GET' });
    const data = await response.json();
    setContacts(data);
  };

  return (
    <div>
      <Header title="Contacts" buttonPath="contacts/new" buttonCopy="Add New Contact" />
      <ContactList contacts={contacts} />
    </div>
  );
}

export default Page;