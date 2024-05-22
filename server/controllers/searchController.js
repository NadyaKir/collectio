import Collection from "../models/collectionSchema.js";
import Item from "../models/itemSchema.js";
import Tag from "../models/tagSchema.js";

export const search = async (req, res) => {
  const searchText = req.query.q;

  try {
    const collectionResults = await Collection.find({
      $text: { $search: searchText },
    });

    // Поиск тега по имени
    const tag = await Tag.findOne({ name: searchText });

    if (tag) {
      // Если тег найден, ищем элементы, связанные с этим тегом
      const itemResults = await Item.find({ tags: tag._id });

      const results = {
        collections: collectionResults,
        items: itemResults,
      };

      res.status(200).json(results);
    } else {
      // Если тег не найден, продолжаем поиск элементов по тексту
      const itemResultsByText = await Item.find({
        $text: { $search: searchText },
      });

      const results = {
        collections: collectionResults,
        items: itemResultsByText,
      };

      res.status(200).json(results);
    }
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ message: "An error occurred during search" });
  }
};
