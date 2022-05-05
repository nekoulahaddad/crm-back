# Admin ZUMZAK project



## Available Scripts



### Deployment
``` js
cd /var/www/admin.zumzak
git pull
npm i --> if there is new dependences
pm2 restart admin_zum
```

### Документация по API
Базовый url для запросов - https://admin.zumzak.com/api
Ответ сервера - в формате json.
Ответ может содержать два поля: 
- **status** - текстовая строка - "ok" в случае успешного запроса, "error" в случае ошибки 
- **message** - текстовая строка или ассоциативный массив - сообщение с результатами запроса (в случае успешного выполнения), сообщение об ошибке (в случае ошибки), поля может не быть или оно может быть пустым

#### Список клиентов (/customers):
`обратите внимание клиенты на фронте берёт информацию из модели customers на бэк`

Допустимые параметры (GET):
- sort_field (createdAt | lastLogin ) - поле, по которому выполняется сортировка
- sort_direction (asc | desc) - направление сортировки
- page - номер страницы для пагинации
- limit - количество элементов на каждом странице

**Пример ответа:**

    {
        "status": "ok",
        "message": {
            "customers": [
                {
                    "_id": 1,
                    "name": "Ivan",
                    "surname": "Ivanov",
                    "patronymic": "Ivanovesch",
                    "birthday": "17/01/1994",
                    "phone": "+75465454545",
                    "email": "zumzak@zumzak.com",
                    ...
                },
                {
                    "_id": 3,
                    "name": "Ivan",
                    "surname": "Ivanov",
                    "patronymic": "Ivanovesch",
                    "birthday": "17/01/1994",
                    "phone": "+75465454545",
                    "email": "zumzak@zumzak.com",
                    ...
                },
                {
                    "_id": 4,
                    "name": "Ivan",
                    "surname": "Ivanov",
                    "patronymic": "Ivanovesch",
                    "birthday": "17/01/1994",
                    "phone": "+75465454545",
                    "email": "zumzak@zumzak.com",
                    ...
                }
            ],
            "total_customer_count": "5"
        }
    }
    
    
#### Редактирование клиента  (/customers/edit/:id):
`Редактирование доступно только для авторизованных админов. В качестве PUT-параметра нужно передать авторизационный токен (в поле token).`

**Допустимые параметры редактирования:**

- name
- surname
- phone
- email
- gender
- birthday
- country
- city


Пример ответа (ошибка авторизации):

    {
        "status": "error",
        "message": {
            "token": "Токен истёк"
        }
    }
            
Пример ответа:

    {
        "status": "ok"
    }
           

#### Получение данных для дэшборда  (/dashboard/dataForDashBoard)
Обязательные параметры (GET):
- shopId  - поле, по которому выполняется фильтр (id магазина)

**Пример ответа:**
    {
        "status": "ok",
        "data": {
            "todayOrders": {
                "todayOrdersValue": 0,
                "todayOrdersGrowth": -100
            },
            "todayUsers": {
                "todayUsersValue": 0,
                "todayUsersGrowth": 0
            },
            "currentMonthSales": {
                "currentMonthSum": [
                    {
                        "_id": 1651735775981,
                        "sum": 2121000
                    }
                ],
                "currentMonthProductsGrowth": 0
            },
            "totalOrdersSum": {
                "totalOrdersSumValue": 29694000,
                "currentMonthOrdersGrowth": 0
            },
            "totalOrdersCount": 12,
            "canceledOrdersCount": 0,
            "totalProductsCount": 6,
            "previousMonthUsers": 0,
            "currentMonthUsers": 0,
            "totalUsers": 4,
            "todaySales": {
                "todaySalesSum": 0,
                "todayProductsGrowth": -100
            },
            "income": 25128000
        }
    }

#### Получение количества проданных товаров за текущий месяц по дням для дэшборда (/dashboard/currentMonthStats)
Обязательные параметры (GET):
- shopId  - поле, по которому выполняется фильтр (id магазина)

**Пример ответа:**
    {
        "status": "ok",
        "message": [
            {
                "_id": "2022-05-02",
                "count": 18
            },
            {
                "_id": "2022-05-03",
                "count": 18
            }
        ]
    }
  
#### Получение недавно проданных товаров для дэшборда (/dashboard/recentlySoldProducts)
Обязательные параметры (GET):
- shopId  - поле, по которому выполняется фильтр (id магазина)

**Пример ответа:**
    "status": "ok",
    "data": [
        {
            "product_id": {
                "translations": {
                    "en": {
                        "title": "iphone",
                        "description": "very expensive phone",
                        "unit": "piece"
                    }
                },
                "seo": {
                    "title": "iphone",
                    "keywords": "Auchan online store delivers more than 100,000 fresh food and household goods to your home or office in Moscow and other Russian cities.",
                    "description": "Auchan online store delivers more than 100,000 fresh food and household goods to your home or office in Moscow and other Russian cities."
                },
                "pending": true,
                "_id": "626151ca4aa3b0f93ae66c7b",
                "title": "iphone3",
                "article": "126548",
                "options": [],
                "images": [
                    "https://img.mvideo.ru/Pdb/30056770b.jpg",
                    "https://media.wired.com/photos/5d803f5dc891950008ce3447/master/pass/iphone-11_6175-Edit.jpg"
                ],
                "category_id": "6261287c2fa944cff61fe2f8",
                "visible": true,
                "unit": "шт",
                "description": "Auchan online store delivers more than 100,000 fresh food and household goods to your home or office in Moscow and other Russian cities.",
                "price": 4500,
                "discountPrice": 5450,
                "purchasePrice": 4546545,
                "shop_id": "626132729624e112239f7ec6",
                "quantity": 12,
                "createdAt": "2022-04-21T12:44:58.039Z",
                "updatedAt": "2022-04-21T12:44:58.039Z",
                "__v": 0
            },
            "price": 4500,
            "quantity": "3",
            "_id": "6262494f45048e724d1bb45f"
        },
        {
            "product_id":
        ...
        }
    ]
  