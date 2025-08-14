"use client"
import { ChangeEvent, FormEvent, JSX, useEffect, useState } from "react";
import ContactForm from "@/app/_components/ContactForm";
import ContactHistory from "@/app/_components/ContactHistory";
import Header from "@/app/_components/Header";
import { ContactType, ContactFormType } from "@/app/_types";
import { deserializeApiContactData } from "@/app/api/helpers";
import { useParams } from "next/navigation";
import { WS_URL } from "@/app/_constants";

function ContactDetails(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<ContactType | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<ContactFormType | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    ws.onmessage = () => {
      fetchContact()
    };
    ws.onclose = () => {
      ws.close();
    };
  }, []);

  const fetchContact = async () => {
    setLoading(true);
    const response = await fetch(`/api/contacts/${id}`);
    if (!response.ok) {
      const error = await response.json();
      setError(error.error || "Failed to create contact");
    } else {
      const data = await response.json();
      const result: ContactType = deserializeApiContactData(data);
      setForm(result);
      setContact(result);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, [id]);

  const handleEditToggle = () => {
    setEditMode((prev) => !prev);
    setForm(contact);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form) return;
    const response = await fetch(`/api/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!response.ok) {
      const error = await response.json();
      setError(error.error || "Failed to update contact");
    } else {
      setContact(form as ContactType);
      setEditMode(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!contact) return <div>Contact not found.</div>;

  return (
    <div>
      <Header title="Contact Details" buttonPath="/contacts" buttonCopy="Back" />
      <div className="contact-details-layout">
        <div className="contact-details-info">
          {!editMode ? (
            <div className="contact-details-view">
              <table className="contact-table" style={{ marginTop: 16 }}>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{contact.firstName}</td>
                    <td>{contact.lastName}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                  </tr>
                </tbody>
              </table>
              <button className="buttonStyle" onClick={handleEditToggle}>Edit</button>
            </div>
          ) : (
            <div className="contact-details-form">
              <ContactForm
                formData={form!}
                onChange={handleChange}
                onSubmit={handleSubmit}
                error={error}
              />
              <button
                className="buttonStyle"
                onClick={handleEditToggle}
                type="button"
                style={{ marginTop: "1rem" }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="contact-details-history">
          <ContactHistory id={contact.id} />
        </div>
      </div>
    </div>
  );
}
export default ContactDetails;