import React, { JSX } from "react";
import { ContactType } from "../_types";
import NavButton from "./NavButton";

type Props = {
  contacts: ContactType[];
};

const ContactList = ({ contacts }: Props): JSX.Element => {
  const handleDelete = async (id: string) => {
    await fetch(`/api/contacts/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <div className="contact-table-container">
      <table className="contact-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th colSpan={2} className="contact-table-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td colSpan={6} className="contact-table-empty">
                No contacts found.
              </td>
            </tr>
          ) : (
            contacts.map((c) => (
              <tr key={c.id}>
                <td>{c.firstName}</td>
                <td>{c.lastName}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td className="contact-table-actions">
                  <div className="action-buttons">
                    <NavButton path={`/contacts/${c.id}`} copy={"Open"} />
                    <button
                      className="buttonStyle"
                      onClick={() => handleDelete(c.id)}
                      style={{ backgroundColor: "red" }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ContactList;