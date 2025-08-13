import { API_URL } from "@/app/_constants";
import { serializeApiContactPayload } from "../../helpers";

export async function GET(_req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const response = await fetch(`${API_URL}/contacts/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return Response.json(data);
}

export async function PUT(req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const updatedContact = await req.json();
  const body = serializeApiContactPayload(updatedContact);
  const response = await fetch(`${API_URL}/contacts/${id}`, {
    method: "PUT",
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

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const response = await fetch(`${API_URL}/contacts/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return new Response(null, { status: response.status });
}