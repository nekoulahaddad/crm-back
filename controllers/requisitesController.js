import { Requisites } from "../models/requisites";



export const editRequisites = async (req, res) => {
  const { id } = req.params
  const { data } = req.body

  try {
    await Requisites.updateOne({ shop_id: id }, { $set: data });
   
    res.status(200).send({
      status: 'ok',
      message: 'edited'
    });
    
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
}
