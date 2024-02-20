const Router = require("express").Router();

const categoryHelper = require("../helpers/categoryHelper");

const GeneralHelper = require("../helpers/generalHelper");

const Validation = require("../helpers/validationHelper");

const Middleware = require("../middlewares/authMiddleware");

const fileName = "server/api/category.js";

//user
const listCategoryUser = async (req, res) => {
  try {
    const response = await categoryHelper.getListCategoryUser();
    return res.send({
      message: "List Category received successfully",
      response,
    });
  } catch (err) {
    console.log([fileName, "listCategory", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};



//admin
const listCategoryAdmin = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    const response = await categoryHelper.getListCategoryAdmin(dataToken);
    return res.send({
      message: "List Category received successfully",
      response,
    });
  } catch (err) {
    console.log([fileName, "listCategory", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const detailCategoryAdmin = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    const { id } = req.params;
    const response = await categoryHelper.getDetailCategoryAdmin(id, dataToken);
    return res.send({
      message: "Category detail data received successfully",
      data: response,
    });
  } catch (err) {
    console.log([fileName, "detailCategory", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const createCategoryAdmin = async (req, res) => {
  try {
    const dataToken = req.body.dataToken; // Assuming dataToken contains user information
    Validation.createCategoryValidation(req.body);
    const { name } = req.body;
    const response = await categoryHelper.createCategoryAdmin(
      { name },
      dataToken
    );
    return res.send({
      message: "Category successfully create",
      response,
    });
  } catch (err) {
    console.log([fileName, "createTaskAdmin", "ERROR"], { info: `${err}` });
    return res.status(500).send(GeneralHelper.errorResponse(err));
  }
};

const updateCategoryAdmin = async (req, res) => {
  try {
    const dataToken = req.body.dataToken;
    Validation.idCategoryValidation(req.params);
    Validation.createCategoryValidation(req.body);
    const { id } = req.params;
    const { name } = req.body;
    const response = await categoryHelper.updateCategoryAdmin(id,name, dataToken);
    return res.send({
      message: "Category successfully updated",
      data: response,
    });
  } catch (err) {
    console.log([fileName, "updateCategoryAdmin", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const deleteCategoryAdmin = async (req, res) => {
    try {
      const dataToken = req.body.dataToken;
      Validation.idCategoryValidation(req.params);
      const { id } = req.params;
      const response = await categoryHelper.deleteCategoryAdmin(id, dataToken);
      return res.status(200).send({
        message: "Category successfully deleted",
        response,
      });
    } catch (err) {
      console.log([fileName, "deleteCategoryAdmin", "ERROR"], { info: `${err}` });
      return res.send(GeneralHelper.errorResponse(err));
    }
  };

//user
Router.get("/user/list", listCategoryUser);
//admin
Router.get("/admin/list", Middleware.validateToken, listCategoryAdmin);
Router.get("/admin/detail/:id", Middleware.validateToken, detailCategoryAdmin);
Router.post("/admin/create", Middleware.validateToken, createCategoryAdmin);
Router.put("/admin/update/:id", Middleware.validateToken, updateCategoryAdmin);
Router.delete("/admin/delete/:id", Middleware.validateToken, deleteCategoryAdmin);

module.exports = Router;
