import ItemManager from "./ItemManager.js";
import ListManager from "./listManager.js";
import UserManager from "./UserManager.js";
import db from "./db.js";

const models = {};

models.item = new ItemManager();
models.item.setDatabase(db);

models.list = new ListManager();
models.list.setDatabase(db);

models.user = new UserManager();
models.user.setDatabase(db);

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `model.${prop} is not defined, did you create ${pascalize(
        prop
      )}Manager.js and did you register it in backend/scr/models/index.js`
    );
  },
};

export default new Proxy(models, handler);
