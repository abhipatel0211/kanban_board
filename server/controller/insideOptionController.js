import insideOption from "../models/insideOption.js";

export const InsideOptionController = async (req, res) => {
  const { name, tag, color, order, insideoption } = req.body;
  if (!name || !tag || !color || !order) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    // const optionExists = await insideOption.findOne({name})
    // if(optionExists){
    //     return res.status(400).json({
    //         success:false,
    //         message:"Task already exists"})
    // }
    const option = new insideOption({ name, tag, order, color, insideoption });
    await option.save();
    res.status(201).json({
      success: true,
      option,
      message: "Task created successfully",
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

export const getInsideOptionController = async (req, res) => {
  try {
    const category = await insideOption.find();
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

export const getSpecificInsideOptionController = async (req, res) => {
  try {
    const option = await insideOption.findById(req.params.id);
    res.status(201).json({
      success: true,
      option,
      message: "Option Fetched successfully",
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

export const updateInsideOptionController = async (req, res) => {
  const { name, tag, color, order } = req.body;
  if (!name || !tag || !color || !order) {
    return res.status(400).json({ error: "All Fields is required" });
  }
  try {
    const option = await insideOption.findByIdAndUpdate(
      req.params.id,
      { name, tag, color, order },
      { new: true }
    );
    res.status(201).json({
      success: true,
      option,
      message: "Inside Option Deleted successfully",
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

export const deleteInsideOptionController = async (req, res) => {
  try {
    const { id, listid } = req.params;

    // Find the deleted option
    const deletedOption = await insideOption.findByIdAndDelete(id);

    if (!deletedOption) {
      return res.status(404).json({
        success: false,
        message: "Option not found",
      });
    }

    const deletedOrder = deletedOption.order;

    // Update the order of the remaining options
    await reorderOptions(listid, deletedOrder, Infinity);

    const alloptions = await insideOption.find({ insideoption: listid });

    res.status(201).json({
      success: true,
      option: deletedOption,
      alloptions,
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

export const reorderOptions = async (listid, startOrder, endOrder) => {
  if (startOrder < endOrder) {
    await insideOption.updateMany(
      { insideoption: listid, order: { $gt: startOrder, $lte: endOrder } },
      { $inc: { order: -1 } }
    );
  } else {
    await insideOption.updateMany(
      { insideoption: listid, order: { $gte: endOrder, $lt: startOrder } },
      { $inc: { order: 1 } }
    );
  }
};
