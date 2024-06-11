import insideOption from "../models/insideOption.js";
import options from "../models/options.js";

export const OptionController = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  try {
    const optionExists = await options.findOne({ name });
    if (optionExists) {
      return res.status(400).json({
        success: false,
        message: "Option already exists",
      });
    }
    const option = new options({ name });
    await option.save();
    res.status(201).json({
      success: true,
      option,
      message: "Option created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "Something went wrong",
    });
  }
};

export const getOptionController = async (req, res) => {
  try {
    const category = await options.find();
    res.status(200).json({
      success: true,
      category,
      message: "Options fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
      message: "Something went wrong",
    });
  }
};

export const getSpecificOptionController = async (req, res) => {
  try {
    const getdata = async () => {
      const data = await insideOption.find({ insideoption: req.params.id });
      const category = await options.findById(req.params.id);
      if (!category) {
        throw new Error("Category not found");
      }
      const combinedData = { ...category.toObject(), data: data };
      return combinedData;
    };
    const category = await getdata();
    res.status(200).json({
      success: true,
      category,
      message: "Options fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
      message: "Something went wrong",
    });
  }
};

export const updateOptionController = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  try {
    const optionExists = await options.findOne({ name });
    if (optionExists) {
      return res.status(400).json({
        success: false,
        message: "Option already exists",
      });
    }
    const option = await options.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.status(201).json({
      success: true,
      option,
      message: "Option Updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "Something went wrong",
    });
  }
};

export const deleteOptionController = async (req, res) => {
  try {
    const insideOptiondelete = await insideOption.deleteMany({
      insideoption: req.params.id,
    });

    const option = await options.findByIdAndDelete(req.params.id);
    res.status(201).json({
      success: true,
      option,
      message: "Option Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "Something went wrong",
    });
  }
};
