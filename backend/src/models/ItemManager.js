import AbstractManager from "./AbstractManager.js";

class ItemManager extends AbstractManager {
  constructor() {
    super({ table: "item" });
  }

  insert(item) {
    return this.database.query(
      `INSERT INTO item (name, quantity, category, link, photo, details, status, list_ID) VALUES(?,?,?,?,?,?,?,?)`,
      [
        item.name,
        item.quantity,
        item.category,
        item.link,
        item.photo,
        item.details,
        item.status,
        item.list_ID,
      ]
    );
  }

  offer({ userId, giftId, qty }) {
    return this.database.query(
      `INSERT INTO user_has_gift (user_id, gift_id, quantity) VALUES(? , ? , ?)`,
      [userId, giftId, qty]
    );
  }

  update(item) {
    return this.database.query(
      `UPDATE item SET name=?, quantity=?, category=?, link=?, photo=?, details=?, status=?, list_ID=? WHERE id = ?`,
      [
        item.name,
        item.quantity,
        item.category,
        item.link,
        item.photo,
        item.details,
        item.status,
        item.list_ID,
        item.id,
      ]
    );
  }

  findAllByList(list_Id) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE list_ID = ?`,
      [list_Id]
    );
  }

  findAllUserHasGift(userId) {
    return this.database.query(
      `select ugh.ID, ugh.gift_id, ugh.quantity as offered_quantity, i.name, i.quantity as required_quantity, i.link, i.photo, i.details, i.list_ID from user_has_gift as ugh join item as i on ugh.gift_id = i.id where ugh.user_id = ?`,
      [userId]
    );
  }

  findAllUserHasGiftByGiftId(giftId) {
    return this.database.query(
      `select ugh.gift_id, ugh.quantity as offered_quantity, i.name from user_has_gift as ugh join item as i on ugh.gift_id = i.id where ugh.gift_id = ?`,
      [giftId]
    );
  }

  updateUserHasGiftQty(quantity, id) {
    return this.database.query(
      `UPDATE user_has_gift SET quantity = ? WHERE id = ?`,
      [quantity, id]
    );
  }

  updateItemQty(quantity, status, id) {
    return this.database.query(
      `UPDATE item SET quantity = ?, status = ? WHERE id = ?`,
      [quantity, status, id]
    );
  }

  deleteUserHasGift(id) {
    return this.database.query(`DELETE FROM user_has_gift WHERE id = ?`, [id]);
  }
}

export default ItemManager;
