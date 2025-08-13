'use client'
import React, { JSX, useEffect, useState } from "react";
import { ContactHistoryType } from "../_types";
import { deserializeApiContactHistoryData } from "../api/helpers";
import { WS_URL } from "../_constants";

type Props = {
  id: string;
};

const ContactHistory = ({ id }: Props): JSX.Element | null => {
  const [history, setHistory] = useState<ContactHistoryType[]>([]);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    ws.onmessage = () => {
      loadHistory();
    };
    ws.onclose = () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const response = await fetch(`/api/contacts/${id}/history`);
    const data = await response.json();
    const result = deserializeApiContactHistoryData(data);
    setHistory(result);
  };

  return history.length > 0 ? (
    <div>
      <h3>Edit History</h3>
      {history.map((h, i) => (
        <div key={i} style={{ marginBottom: "1em", borderBottom: "1px solid #eee", paddingBottom: "0.5em" }}>
          <strong>Date:</strong> {h.editedAt} <br />
          <table className="contact-table" >
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
                <td>{h.firstName}</td>
                <td>{h.lastName}</td>
                <td>{h.email}</td>
                <td>{h.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  ) : null;
};

export default ContactHistory;