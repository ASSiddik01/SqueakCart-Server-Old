const {
  createContactService,
  getContactsService,
  getContactService,
  updateContactService,
  deleteContactService,
} = require("../services/contact.services");

// create brand
exports.createContact = async (req, res, next) => {
  try {
    const result = await createContactService(req.body);
    res.status(200).json({
      success: true,
      message: `Contact create successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Contact create failed`,
      error: error.message,
    });
  }
};

// get brands
exports.getContacts = async (req, res, next) => {
  try {
    const result = await getContactsService();
    res.status(200).json({
      success: true,
      message: `Contacts get successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Contacts get failed`,
      error: error.message,
    });
  }
};

// get brand
exports.getContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await getContactService(id);
    res.status(200).json({
      success: true,
      message: `Contact get successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Contact get failed`,
      error: error.message,
    });
  }
};

// update brand
exports.updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateContactService(id, req.body);
    res.status(200).json({
      success: true,
      message: `Contact update successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Contact update failed`,
      error: error.message,
    });
  }
};

// delete brand
exports.deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteContactService(id);
    res.status(200).json({
      success: true,
      message: `Contact delete successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Contact delete failed`,
      error: error.message,
    });
  }
};
