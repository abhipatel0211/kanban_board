import insideOption from "../models/insideOption.js";

export const reorderController = async (req, res) => {
  const { fromListId, toListId, fromPosition, toPosition } = req.body;
  // res.json("json ", fromListId, toListId, fromPosition, toPosition);
  // If dragging within the same list
  try {
    if (fromListId === toListId) {
      if (fromPosition === toPosition) {
        return; // No change needed
      }

      // Determine the range of positions affected
      const start = Math.min(fromPosition, toPosition);
      const end = Math.max(fromPosition, toPosition);

      // Update order values within the same list
      if (fromPosition < toPosition) {
        await insideOption.updateMany(
          { insideoption: fromListId, order: { $gt: start, $lte: end } },
          { $inc: { order: -1 } }
        );
      } else {
        await insideOption.updateMany(
          { insideoption: fromListId, order: { $gte: end, $lt: start } },
          { $inc: { order: 1 } }
        );
      }

      // Set the dragged item's order to the new position
      await insideOption.findOneAndUpdate(
        { insideoption: fromListId, order: fromPosition },
        { order: toPosition }
      );
    } else {
      // If dragging between different lists
      // Decrease order values in the original list after the removed item
      await insideOption.updateMany(
        { insideoption: fromListId, order: { $gt: fromPosition } },
        { $inc: { order: -1 } }
      );

      // Increase order values in the new list after the dropped position
      await insideOption.updateMany(
        { insideoption: toListId, order: { $gte: toPosition } },
        { $inc: { order: 1 } }
      );

      // Move the item to the new list with the new order
      await insideOption.findOneAndUpdate(
        { insideoption: fromListId, order: fromPosition },
        { insideoption: toListId, order: toPosition }
      );

      res
        .status(200)
        .json({ success: true, message: "reordered successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};
