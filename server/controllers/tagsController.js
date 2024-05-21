import Tag from "../models/tagSchema.js";

export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find().sort({ _id: -1 });

    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTagNamesByIds = async (req, res) => {
  try {
    const { tagIds } = req.body;

    const tags = await Tag.find({ _id: { $in: tagIds } }, { _id: 1, name: 1 });

    const tagData = tags.map((tag) => ({
      _id: tag._id,
      name: tag.name,
    }));

    res.status(200).json({ tags: tagData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching tag data" });
  }
};
