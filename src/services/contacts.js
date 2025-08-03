import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const searchFilter = { userId };

  if (filter.type) {
    searchFilter.contactType = filter.type;
  }
  if (filter.isFavourite) {
    searchFilter.isFavourite = filter.isFavourite;
  }
  if (filter.name) {
    searchFilter.name = { $regex: filter.name, $options: 'i' };
  }
  if (filter.phoneNumber) {
    searchFilter.phoneNumber = { $regex: filter.phoneNumber, $options: 'i' };
  }
  if (filter.email) {
    searchFilter.email = { $regex: filter.email, $options: 'i' };
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.countDocuments(searchFilter),
    ContactsCollection.find(searchFilter)
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder }),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({
    _id: contactId,
    userId,
  });
  return contact;
};

export const createContact = async (contactData) => {
  const contact = await ContactsCollection.create(contactData);
  return contact;
};

export const updateContact = async (
  contactId,
  contactData,
  userId,
  options = {},
) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
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

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};
