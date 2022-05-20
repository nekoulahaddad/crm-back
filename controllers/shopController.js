import { Shop } from "../models/shop";
import { shops } from "../data/shops";
import { CustomID } from "../models/customID";
import { Tariffs } from "../models/tariffs";
import { City } from "../models/city";
import { User } from "../models/user";
import { MainCategory } from "../models/mainCategory";

export const insertShop = async (req, res) => {
  const randomNum = 3;
  const shop = shops[randomNum];
  try {
    const displayID = await CustomID.findOneAndUpdate(
      { name: "shopsCounter" },
      { $inc: { count: 1 } },
      { upsert: true }
    );
    const mainCategory = await MainCategory.findOne({ title: "Одежда" });
    const tarrif = await Tariffs.find({});
    const ratingClient = await User.findOne({ firstName: "Конcтантин" });
    const shopCity = await City.findOne({ name: "Москва" });
    const tarrifObject = [
      {
        tariff: tarrif[randomNum]._id,
        date: new Date(),
      },
    ];
    const ratingObject = [
      {
        client: ratingClient._id,
        score: 4,
      },
    ];
    shop.mainCategory = mainCategory._id;
    shop.tariffs = tarrifObject;
    shop.rating = ratingObject;
    shop.city = shopCity._id;
    shop.displayID = displayID
      ? ("0000000" + displayID.count).slice(-7)
      : "00000000";
    const newShop = new Shop(shop);

    await newShop.save();
    res.status(200).send({
      status: "ok",
      message: newShop,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};


export const editMainInformation = async (req, res) => {
  const { id } = req.params
  const { name, city, address, phone, mainCategory, weekdays, weekends, description } = req.body

  try {

    await Shop.updateOne({ _id: id }, 
      { 
        $set: {
          name: name,
          city: city,
          address: address,
          mainCategory: mainCategory,
          description: description,
          'phone.value': phone,
          'workingHours.weekdays': weekdays,
          'workingHours.weekends': weekends
        } 
      }
    )

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

export const editContactsInformation = async (req, res) => {
  const { id } = req.params
  const { emailValue, emailInfo, phoneValue, phoneDescription, sectionInfo } = req.body

  try {
    console.log(req.body)
    await Shop.updateOne({ _id: id }, 
      { 
        $set: {
          'email.value': emailValue,
          'email.info': emailInfo,
          'phone.value': phoneValue,
          'phone.description': phoneDescription,
          sectionInfo: sectionInfo,
        } 
      }
    )

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
