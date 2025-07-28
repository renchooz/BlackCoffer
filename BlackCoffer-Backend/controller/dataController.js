import dataModel from "../model/data.js";

export const getFilteredData = async (req, res) => {
  try {
    const filters = {};

    const filterableFields = [
      "end_year",
      "topic",
      "sector",
      "region",
      "pestle",
      "source",
      "swot",
      "country",
      "city",
    ];

    filterableFields.forEach((field) => {
      if (req.query[field]) {
        const values = req.query[field].split(",").map((v) => v.trim());
        filters[field] = values.length > 1 ? { $in: values } : values[0];
      }
    });

    const data = await dataModel.find(filters);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};
