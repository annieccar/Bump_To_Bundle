import AbstractManager from "./AbstractManager.js";

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `INSERT INTO user (firstname, lastname, email, password) VALUES(?,?,?,?)`,
      [user.firstname, user.lastname, user.email, user.hashedPassword]
    );
  }

  update(user) {
    return this.database.query(
      `UPDATE user SET firstname=?, lastname=?, email=?, password=? WHERE id = ?`,
      [user.firstname, user.lastname, user.email, user.password, user.id]
    );
  }

  findOneByEmail(email) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE email = ?`, [
      email,
    ]);
  }
}

export default UserManager;
