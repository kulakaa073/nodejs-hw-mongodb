import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (contactData) => {
  const contact = await ContactsCollection.create(contactData);
  return contact;
};

export const updateContact = async (contactId, contactData, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    contactData,
    {
      new: true,
      runValidators: true, // Ensures that the update adheres to the schema
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({ _id: contactId });
  return contact;
};
