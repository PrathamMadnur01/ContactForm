const Contact = require("../models/Contact");

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createContact = async (req, res) => {
    try {
      const contact = new Contact(req.body);
      await contact.save();
      res.status(201).json(contact);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
