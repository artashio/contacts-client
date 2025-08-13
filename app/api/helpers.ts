import { ContactHistoryType, ContactType } from "../_types";


export const serializeApiContactPayload = (form: ContactType) => {
  return {
    first_name: form.firstName,
    last_name: form.lastName,
    email: form.email,
    phone: form.phone,
  };
};

export const deserializeApiContactData = (data: any): ContactType => {
  return {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    phone: data.phone,
  };
};

export const deserializeApiContactHistoryData = (data: any): ContactHistoryType[] => {
  const result: ContactHistoryType[] = [];
  if (!Array.isArray(data)) return result;

  data.forEach((item: any) => {
    const attr = JSON.parse(item?.diff)
    result.push({
      firstName: attr.first_name,
      lastName: attr.last_name,
      email: attr.email,
      phone: attr.phone,
      editedAt: new Date(item.updated_at).toLocaleString(),
    });
  });

  return result;
};