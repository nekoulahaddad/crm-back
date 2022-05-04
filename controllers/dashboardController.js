import { Order } from "../models/order";
import { User } from "../models/user";
import { Product } from "../models/product";
import { StatusOrder } from "../models/statusOrder";
const mongoose = require('mongoose');



const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 2);
const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 2);
const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 1);


export const getDataForDashboard = async (req, res) => {

  const { shopId } = req.query

  try {
    const todayOrdersValue = await Order.find({ "shop_id": shopId, "createdAt": { '$gte': today } }).count()
    const yesterdayOrders = await Order.find({ "shop_id": shopId, "createdAt": { '$gte': yesterday, '$lte': today } }).count()
    const todayOrdersGrowth = (todayOrdersValue - yesterdayOrders) / yesterdayOrders * 100
    const todayOrders = { todayOrdersValue, todayOrdersGrowth }

    const todayUsersValue = await User.find({ "createdAt": { '$gte': today } }).count()
    const yesterdayUsers = await User.find({ "createdAt": { '$gte': yesterday, '$lte': today } }).count()
    const todayUsersGrowth = (todayUsersValue - yesterdayUsers) / yesterdayUsers * 100 || 0
    const todayUsers = { todayUsersValue, todayUsersGrowth }

    console.log(currentMonthStart)

    const currentMonthSum = await Order.aggregate([
      {
        $match: {
          $and: [
            {
              createdAt: { $gte: currentMonthStart, $lte: currentMonthEnd }
            },
            {
              shop_id: mongoose.Types.ObjectId(shopId)
            }
          ]
        }
      },
      {
        $group: {
          _id: Date.now(),
          sum: { $sum: "$sum" }
        }
      }

    ])

    const previousMonthSum = await Order.aggregate([
      {
        $match: {
          $and: [
            {
              createdAt: { $gte: previousMonthStart, $lte: previousMonthEnd }
            },
            {
              shop_id: mongoose.Types.ObjectId(shopId)
            }
          ]
        },
      },
      {
        $group: {
          _id: Date.now(),
          sum: { $sum: "$sum" }
        }
      }

    ])

    //const currentMonthProductsGrowth = (currentMonthSum[0].sum - previousMonthSum[0].sum) / previousMonthSum[0].sum * 100
    const currentMonthSales = { currentMonthSum, /*currentMonthProductsGrowth*/ }




    const totalUsers = await User.find({}).count()
    const previousMonthUsers = await User.find({ "createdAt": { '$gte': previousMonthStart, '$lte': previousMonthEnd } }).count()
    const currentMonthUsers = await User.find({ "createdAt": { '$gte': currentMonthStart, '$lte': currentMonthEnd } }).count()
    const totalOrdersSumValue = await Order.aggregate([{ $group: { _id: Date.now(), sum: { $sum: "$sum" } } }]).sum
    ///const currentMonthOrdersGrowth = currentMonthProductsGrowth
    const totalOrdersSum = { totalOrdersSumValue, /*currentMonthOrdersGrowth*/ }
    const totalOrdersCount = await Order.find({ "shop_id": shopId }).count()
    const canceledOrdersCount = await StatusOrder.find({ value: 'canceled' }).count()
    const totalProductsCount = await Product.find({ "shop_id": shopId }).count()

    const todaySalesSum = await Order.aggregate([
      {
        $match: {
          $and: [{
            createdAt: { $gte: today }

          },
          {
            shop_id: mongoose.Types.ObjectId(shopId)
          }
          ]
        }
      },
      {
        $group: {
          _id: Date.now(),
          sum: { $sum: "$sum" }
        }
      }
    ])

    const yesterdaySalesSum = await Order.aggregate([
      {
        $match: {
          $and: [{
            createdAt: { $gte: yesterday, $lte: today }

          },
          {
            shop_id: mongoose.Types.ObjectId(shopId)
          }
          ]
        }
      },
      {
        $group: {
          _id: Date.now(),
          sum: { $sum: "$sum" }
        }
      }
    ])
    const todayProductsGrowth = (todaySalesSum[0].sum - yesterdaySalesSum[0].sum) / yesterdaySalesSum[0].sum * 100
    const todaySales = { todaySalesSum, todayProductsGrowth }



    const moneyBought = await Product.aggregate(
      [
        {
          $match: {
            shop_id: mongoose.Types.ObjectId(shopId)
          }
        },
        {
          $project: {
            total: {
              $multiply: ["$price", "$quantity"]
            }
          }
        },
        {
          $group: {
            _id: Date.now(),
            sum: { $sum: "$total" }
          }
        }
      ]
    )

    const moneySold = await Order.aggregate([
      {
        $match: {
          shop_id: mongoose.Types.ObjectId(shopId)
        }
      },
      {
        $group: {
          _id: 1,
          sum: { $sum: "$sum" },
        }
      }
    ])

    const income = moneySold[0].sum - moneyBought[0].sum



    const data = {
      todayOrders,
      todayUsers,
      totalUsers,
      previousMonthUsers,
      currentMonthUsers,
      totalOrdersSum,
      totalOrdersCount,
      canceledOrdersCount,
      totalProductsCount,
      income,
      todaySales,
      currentMonthSales,
    }

    res.send({
      status: "ok",
      data: data
    })
  } catch (error) {
    res.status(500).send({
      status: "error",
      error: {
        name: error.name,
        message: error.message
      }
    })
  }
}

export const getCurrentMonthStats = async (req, res) => {
  try {
    const aggregationCurMonthStats = await Order.aggregate(
      [
        {
          $match: {
            createdAt: {
              '$lte': currentMonthEnd,
              '$gte': currentMonthStart
            }
          }
        },
        {
          $project: {
            quantity: {
              $map: {
                input: "$products.quantity",
                as: 'quantity',
                in: {
                  $toInt: "$$quantity"
                }
              }
            },
            createdAt: "$createdAt"
          }
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: "$createdAt"
              }
            },
            products: {
              $push: "$quantity"
            }
          },

        },
        { $sort: { _id: 1 } }
      ]
    )
    const currentMonthStats = aggregationCurMonthStats.map(day => {
      const count = day.products.flat(1).reduce((sum, a) => {
        return sum + a
      }, 0)
      const _id = day._id
      const obj = { _id, count }
      return obj
    })


    res.send({
      status: "ok",
      message: currentMonthStats
    })

  } catch (error) {
    res.status(500).send({
      status: "error",
      error: error.message
    })

  }

}

export const getRecentlySoldProducts = async (req, res) => {
  try {
    const populatedProducts = await Order.find().populate('products.product_id')
    const soldProducts = populatedProducts.map(array => array.products).flat(1)
    const recentlySoldProducts = soldProducts.slice(Math.max(soldProducts.length - 9, 1))

    res.send({
      status: "ok",
      data: recentlySoldProducts
    })

  } catch (error) {
    res.status(500).send({
      status: "error",
      error: {
        name: error.name,
        message: error.message
      }
    })
  }
}