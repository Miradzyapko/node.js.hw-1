const fs = require('fs').promises;
const { json } = require('express');
const shortid = require('shortid');
console.log(shortid.generate());
const path = require("path");
const contactsPath = path.join('./db/contacts.json');
const  listContacts = async () => {
    const list = await fs.readFile(contactsPath);
    return JSON.parse(list)

  }
  
  async function getContactById(contactId) {
    const contacts = await listContacts();
    const contactById = contacts.find(item=> item.id === contactId);
    return contactById;
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  }
  
  async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item=> item.id === contactId);
     if(index === -1){
    return null;

    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}
  async function addContact(name, email, phone) {
    // ...твій код. Повертає об'єкт доданого контакту.
    const contacts = await listContacts();
    const newContact = {
       _id : shortid.generate(),
        name,
        email, 
        phone
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
return newContact;
  }
  module.exports = { listContacts, getContactById, removeContact, addContact };