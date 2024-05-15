import Tag from "../models/tagSchema.js";

export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();

    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
