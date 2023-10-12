import model from "../models/index.js";

export const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const [list] = await model.list.findOne(id);
    res.status(200).send(list);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const getAll = async (req, res) => {
  try {
    const [lists] = await model.list.findAll();
    res.status(200).send(lists);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const addOne = async (req, res) => {
  const list = req.body;
  try {
    const [result] = await model.list.insert(list);

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
  const list = req.body;
  const { id } = req.params;
  try {
    const [result] = await model.list.update({ ...list, id });
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
    const [result] = await model.list.delete(id);

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
