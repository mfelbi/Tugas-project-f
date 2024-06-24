const { hasPermissionsMiddleware } = require("../utils/middlewares");

const categoryPermissionCreate = hasPermissionsMiddleware(["create-category"]);
const categoryPermissionRead = hasPermissionsMiddleware(["read-category"]);
const categoryPermissionUpdate = hasPermissionsMiddleware(["update-category"]);
const categoryPermissionDelete = hasPermissionsMiddleware(["delete-category"]);

module.exports = {
  categoryPermissionCreate,
  categoryPermissionRead,
  categoryPermissionUpdate,
  categoryPermissionDelete,
};
