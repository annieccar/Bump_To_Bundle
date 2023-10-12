class AbstractManager {
  constructor({ table }) {
    this.table = table;
  }

  findOne(id) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE id = ?`, [
      id,
    ]);
  }

  findAll() {
    return this.database.query(`SELECT * FROM ${this.table} `);
  }

  delete(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }

  setDatabase(db) {
    this.database = db;
  }
}

export default AbstractManager;
