const { ContactsCollection } = require('../db/models/contact');

const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

module.exports = {
  getAllContacts,
  getContactById,
};
