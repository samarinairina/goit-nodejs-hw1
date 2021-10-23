const fs = require('fs').promises;
const path = require("path");
const crypto = require("crypto");

const readContacts = async () => {
  const result = await fs.readFile(
    path.join(__dirname, "contacts.json"),
    "utf-8"
  );
  const contacts = JSON.parse(result);
  return contacts;
};

async function listContacts() {
  const contacts = await readContacts();
  console.table(contacts);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const [result] = contacts.filter((contact) => contact.id === contactId);
  return result;
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(filteredContacts, null, 2)
  );
  const result = [filteredContacts, contacts.length - filteredContacts.length];
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const newContact = { id: crypto.randomBytes(16).toString("hex"), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };