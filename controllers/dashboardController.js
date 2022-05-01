import { Order } from "../models/order";
import { User } from "../models/user";
import { Product } from "../models/product";
import { StatusOrder } from "../models/statusOrder";


export const getDataForDashboard = async (req, res) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 2);
  const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 2);
  const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 1);

  try {
    const todayOrdersValue = await Order.find({ "createdAt": { '$gte': today } }).count()
    const yesterdayOrders = await Order.find({ "createdAt": { '$gte': yesterday, '$lte': today } }).count()
    const todayOrdersGrowth = (todayOrdersValue - yesterdayOrders) / yesterdayOrders * 100
    const todayOrders = { todayOrdersValue, todayOrdersGrowth }

    const todayUsersValue = await User.find({ "createdAt": { '$gte': today } }).count()
    const yesterdayUsers = await User.find({ "createdAt": { '$gte': yesterday, '$lte': today } }).count()
    const todayUsersGrowth = (todayUsersValue - yesterdayUsers) / yesterdayUsers * 100 || 0
    const todayUsers = { todayUsersValue, todayUsersGrowth }

    const todayProducts = await Order.find({ "createdAt": { '$gte': today } }, "products")
    const todaySalesSum = todayProducts.map(sale => {
      return sale.products
    }).flat(Infinity).reduce((sum, a) => {
      return sum + (a.price * a.quantity)
    }, 0)

    const yesterdayProducts = await Order.find({ "createdAt": { '$gte': yesterday } }, "products")
    const yesterdaySalesSum = yesterdayProducts.map(sale => {
      return sale.products
    }).flat(Infinity).reduce((sum, a) => {
      return sum + (a.price * a.quantity)
    }, 0)

    const todayProductsGrowth = (todaySalesSum - yesterdaySalesSum) / yesterdaySalesSum * 100
    const todaySales = { todaySalesSum, todayProductsGrowth }

    const currentMonthProducts = await Order.find({ "createdAt": { '$gte': currentMonthStart, '$lte': currentMonthEnd } }, "products")
    const currentMonthSum = currentMonthProducts.map(sale => {
      return sale.products
    }).flat(Infinity).reduce((sum, a) => {
      return sum + (a.price * a.quantity)
    }, 0)

    const previousMonthProducts = await Order.find({ "createdAt": { '$gte': previousMonthStart, '$lte': previousMonthEnd } }, "products")
    const previousMonthSum = previousMonthProducts.map(sale => {
      return sale.products
    }).flat(Infinity).reduce((sum, a) => {
      return sum + (a.price * a.quantity)
    }, 0)

    const currentMonthProductsGrowth = (currentMonthSum - previousMonthSum) / previousMonthSum
    const currentMonthSales = { currentMonthSum, currentMonthProductsGrowth }

    const totalUsers = await User.find({}).count()
    const previousMonthUsers = await User.find({ "createdAt": { '$gte': previousMonthStart, '$lte': previousMonthEnd } }).count()
    const currentMonthUsers = await User.find({ "createdAt": { '$gte': currentMonthStart, '$lte': currentMonthEnd } }).count()
    const totalOrdersSumValue = await Order.aggregate([{ $group: { _id: Date.now(), sum: { $sum: "$sum" } } }]).sum
    const currentMonthOrdersGrowth = currentMonthProductsGrowth
    const totalOrdersSum = { totalOrdersSumValue, currentMonthOrdersGrowth }
    const totalOrdersCount = await Order.find({}).count()
    const canceledOrdersCount = await StatusOrder.find({ value: 'canceled' }).count()
    const totalProductsCount = await Product.find({}).count()

    const populatedProducts = await Order.find().populate('products.product_id')
    const soldProducts = populatedProducts.map(array => array.products).flat(1)
    const recentlySoldProducts = soldProducts.slice(Math.max(soldProducts.length - 9, 1))

    const aggregationCurMonthStats = await Order.aggregate(
      [
        {
          $project: {
            quantity: {
              $map: {
                input: "$products.quantity",
                as: 'p',
                in: {
                  $toInt: "$$p"
                }
              }
            },
            createdAt: "$createdAt"
          }
        },
        {
          $group: {
            '_id': {
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

    const moneyBought = await Product.aggregate(
      [
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
      todaySales,
      currentMonthSales,
      totalOrdersSum,
      totalOrdersCount,
      canceledOrdersCount,
      totalProductsCount,
      recentlySoldProducts,
      currentMonthStats,
      income
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