export type ContactType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type ContactFormType = Omit<ContactType, 'id'>;
export type ContactHistoryType = ContactFormType & { editedAt: string };
