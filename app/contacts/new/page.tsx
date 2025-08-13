"use client";
import { useRouter } from "next/navigation";
import { useState, FormEvent, ChangeEvent } from "react";
import ContactForm from "../../_components/ContactForm";
import { ContactFormType } from "../../_types";
import Header from "../../_components/Header";

function Page() {
  const [form, setForm] = useState<ContactFormType>({ firstName: "", lastName: "", email: "", phone: "" });
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("/api/contacts", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const error = await response.json();
      setError(error.error || "Failed to create contact");
    } else {
      setLoading(false);
      router.push("/contacts");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(false);
  };

  return (
    <div>
      <Header title="Add Contact" buttonCopy="Back" buttonPath="/" />
      <div className="centered-form-container">
        <ContactForm
          formData={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default Page;
