"use client"
import React, { ChangeEvent, FormEvent, JSX } from "react";
import { ContactFormType } from "../_types";

type Props = {
  onSubmit: (e: FormEvent) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  formData: ContactFormType;
  error: boolean
};

function ContactForm({ error, formData, onChange, onSubmit }: Props): JSX.Element {
  return (
    <>
      <form onSubmit={onSubmit} className="formStyle" >
        {error && <div className="error-message">{error}</div>}
        <label>
          First Name
          <input
            name="firstName"
            value={formData.firstName}
            className="inputStyle"
            onChange={onChange}
            required
          />
        </label>
        <label>
          Last Name
          <input
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            className="inputStyle"
            required
          />
        </label>
        <label>
          Email
          <input
            name="email"
            value={formData.email}
            onChange={onChange}
            className="inputStyle"
            type="email"
            required
          />
        </label>
        <label>
          Phone
          <input
            name="phone"
            value={formData.phone}
            onChange={onChange}
            className="inputStyle"
            type="tel"
            required
          />
        </label>
        <button type="submit" className="buttonStyle">
          Submit
        </button>
      </form >
    </>
  );
}

export default ContactForm;