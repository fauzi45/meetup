const db = require("../../models");
const _ = require("lodash");
const GeneralHelper = require("./generalHelper");
const Boom = require("boom");
const fileName = "server/helpers/categoryHelper.js";

//user
const getListCategoryUser = async () => {
  try {
    const checkCategory = await db.Category.findAll();
    if (_.isEmpty(checkCategory)) {
      return { message: "The Category is Empty" };
    }
    return Promise.resolve(checkCategory);
  } catch (err) {
    console.log([fileName, "getListCategory", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};




//admin
const getListCategoryAdmin = async (dataToken) => {
  try {
    const checkAuthorization = await db.User.findOne({
      where: { id: dataToken.id, role: 1 },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to create this data")
      );
    }
    const checkCategory = await db.Category.findAll({
      paranoid: false
    });
    if (_.isEmpty(checkCategory)) {
      return { message: "The Category is Empty" };
    }
    return Promise.resolve(checkCategory);
  } catch (err) {
    console.log([fileName, "getListCategoryAdmin", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const getDetailCategoryAdmin = async (id,dataToken) => {
  try {
    const checkAuthorization = await db.User.findOne({
      where: { id: dataToken.id, role: 1 },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to create this data")
      );
    }
    const checkCategory = await db.Category.findOne({
      where: { id: id },
    });
    if (_.isEmpty(checkCategory)) {
      return { message: "Category with this id is doesn't exist" };
    }
    return Promise.resolve(checkCategory);
  } catch (err) {
    console.log([fileName, "getTaskDetailHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const createCategoryAdmin = async (dataObject, dataToken) => {
  const { name } = dataObject;
  try {
    const checkAuthorization = await db.User.findOne({
      where: { id: dataToken.id, role: 1 },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to create this data")
      );
    }
    await db.Category.create({
      name: name,
    });
    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, "createCategoryHelper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const updateCategoryAdmin = async (
  id,
  name,
  dataToken
) => {
  try {
    const checkAuthorizationUser = await db.User.findOne({
      where: { id: dataToken.id, role: 1 },
    });
    if (_.isEmpty(checkAuthorizationUser)) {
      return Promise.reject(Boom.unauthorized("You are not authorized"));
    }
    const checkTask = await db.Category.findOne({
      where: { id: id },
    });
    if (!checkTask) {
      return Promise.reject(
        Boom.badRequest("Task with this id is doesn't exist")
      );
    }
    await db.Category.update(
      {
        name: name ? name : checkTask.dataValues.name,
      },
      { where: { id: id } }
    );
    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, "updateCategoryAdmin", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const deleteCategoryAdmin = async (id, dataToken) => {
  try {
    const checkAuthorizationUser = await db.User.findOne({
      where: { id: dataToken.id, role: 1 },
    });
    if (_.isEmpty(checkAuthorizationUser)) {
      return Promise.reject(Boom.unauthorized("You are not authorized"));
    }
    const checkTask = await db.Category.findOne({
      where: { id: id },
    });
    if (!checkTask) {
      return Promise.reject(
        Boom.badRequest("Task with this id is doesn't exist")
      );
    } else {
      await db.Category.destroy({
        where: {
          id: id,
        },
        force: true,
      });
    }
    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, "deleteCategoryUser", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

module.exports = {
  //user
  getListCategoryUser,

  //admin
  getListCategoryAdmin,
  getDetailCategoryAdmin,
  createCategoryAdmin,
  deleteCategoryAdmin,
  updateCategoryAdmin,
};
