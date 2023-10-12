import model from "../models/index.js";

export const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const [item] = await model.item.findOne(id);
    res.status(200).send(item);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const getAll = async (req, res) => {
  const { list_ID } = req.query;

  if (list_ID) {
    try {
      const [items] = await model.item.findAllByList(list_ID);
      res.status(200).send(items);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  } else {
    try {
      const [items] = await model.item.findAll();
      res.status(200).send(items);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }
};

export const getAllUserHasGift = async (req, res) => {
  const { userId } = req.params;

  try {
    const [items] = await model.item.findAllUserHasGift(userId);
    res.status(200).send(items);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const getAllUserHasGiftByGiftId = async (req, res) => {
  const { giftId } = req.params;

  try {
    const [items] = await model.item.findAllUserHasGiftByGiftId(giftId);
    res.status(200).send(items);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const addOne = async (req, res) => {
  const item = req.body;
  if (req.file) {
    item.photo = req.file.filename;
  } else {
    item.photo = null;
  }

  try {
    const [result] = await model.item.insert(item);

    if (result.affectedRows) {
      res.sendStatus(201);
    } else {
      res.sendStatus(400);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const editOne = async (req, res) => {
  const item = req.body;

  const { id } = req.params;
  if (req.file) {
    item.photo = req.file.filename;
  } else {
    if (!item.photo) item.photo = null;
  }

  try {
    const [result] = await model.item.update({ ...item, id });
    if (result.affectedRows) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const editUserHasGiftQty = async (req, res) => {
  const quantity = req.body.offeredQTY;
  const { id } = req.params;
  try {
    const [result] = await model.item.updateUserHasGiftQty(quantity, id);
    if (result.affectedRows) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const editItemQty = async (req, res) => {
  const quantity = req.body.newReqQty;
  let status = 1;
  if (quantity <= 0) {
    status = 0;
  }
  const { id } = req.params;
  try {
    const [result] = await model.item.updateItemQty(quantity, status, id);
    if (result.affectedRows) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await model.item.delete(id);

    if (result.affectedRows) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const deleteOneUserHasGift = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await model.item.deleteUserHasGift(id);

    if (result.affectedRows) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const offerOne = async (req, res) => {
  const userId = req.body.userId;
  const giftId = req.body.id;
  const qty = req.body.offeredQTY;
  try {
    const [result] = await model.item.offer({ userId, giftId, qty });

    if (result.affectedRows) {
      res.sendStatus(201);
    } else {
      res.sendStatus(400);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};
