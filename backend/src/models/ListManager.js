import AbstractManager from "./AbstractManager.js";

class ListManager extends AbstractManager {
  constructor() {
    super({ table: "list" });
  }

  insert(list) {
    return this.database.query(
      `INSERT INTO list (listname, duedate, sex, babysname, user_ID) VALUES(?,?,?,?,?)`,
      [list.listname, list.duedate, list.sex, list.babysname, list.user_ID]
    );
  }

  update(list) {
    return this.database.query(
      `UPDATE list SET listname=?, duedate=?, sex=?, babysname=?, user_ID=? WHERE id = ?`,
      [
        list.listname,
        list.duedate,
        list.sex,
        list.babysname,
        list.user_ID,
        list.id,
      ]
    );
  }
}

export default ListManager;
