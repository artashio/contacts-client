import { API_URL } from "@/app/_constants";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const response = await fetch(`${API_URL}/contacts/${id}/history`);
  const data = await response.json();

  return Response.json(data);
}
