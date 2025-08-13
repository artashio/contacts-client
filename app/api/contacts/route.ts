import { API_URL } from "../../_constants";
import { deserializeApiContactData, serializeApiContactPayload } from "../helpers";

export async function GET() {
  const response = await fetch(`${API_URL}/contacts`);
  const data = await response.json();
  const contacts = data.map(deserializeApiContactData);
  return Response.json(contacts);
}

export async function POST(req: Request) {
  const newContact = await req.json();
  const body = serializeApiContactPayload(newContact);
  const response = await fetch(`${API_URL}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    return new Response(JSON.stringify({ error }), { status: response.status });
  }

  const data = await response.json();
  return Response.json(data);
}
