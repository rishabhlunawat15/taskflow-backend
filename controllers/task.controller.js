const Task = require('../model/task');

exports.createTask = async (req, res) => {
try{ 
    const body=req.body;
    const result=await Task.create({
    title:body.title,
    description:body.description,
    status:body.status,
    createdBy: req.user._id,
    });
    return res.status(201).json(result);
}
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.getTasks = async (req, res) => {
    try{
        const task=await Task.find({createdBy:req.user._id});
        
        return res.status(200).json(task);
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.getTaskById = async (req, res) => {
  try{
    const task=await Task.findById(req.params.id);
    return res.status(200).json(task);
  }
  catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

};

exports.updateTask = async (req, res) => {
  try{
    const body=req.body;
    const task=await Task.findByIdAndUpdate(req.params.id,body,{ new: true, runValidators: true });
    return res.status(200).json(task);
  }
  catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.deleteTask = async (req, res) => {
  try{
    const task=await Task.findByIdAndDelete(req.params.id);
    return res.status(200).json(task);
  }
  catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

