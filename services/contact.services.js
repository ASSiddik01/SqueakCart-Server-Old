const Contact = require("../models/contact.schema");

// create blog brand service
exports.createContactService = async (brand) => {
  const savedContact = await Contact.create(brand);
  return savedContact;
};

// get blog brands service
exports.getContactsService = async () => {
  const brands = await Contact.find();
  return brands;
};

// get blog brand service
exports.getContactService = async (id) => {
  const brand = await Contact.findById(id);
  return brand;
};

// update blog categories service
exports.updateContactService = async (id, reqData) => {
  const updateContact = await Contact.findByIdAndUpdate(id, reqData, {
    new: true,
  });
  return updateContact;
};

// delete blog categories service
exports.deleteContactService = async (id) => {
  const deleteContact = await Contact.findByIdAndDelete(id);
  return deleteContact;
};
