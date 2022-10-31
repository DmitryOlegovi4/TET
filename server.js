const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/public`));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mburnaevg4_fulls"
})
connection.connect((error)=>{
    if(error) throw error
    console.log("Подключение к БД установлено")
})

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.post("/", multer().none(), (req, response) => {
    const login = req.body.login.toLowerCase();
    connection.query("SELECT * FROM users WHERE login=?", [login], (error, res)=>{
        if(res.length){
            let userId = res[0].id;
            connection.query("SELECT DISTINCT price, action FROM coins WHERE user_id=?", [userId], (error, res)=>{
                if(res.length){
                    let coins = res.reduce((sum, current) => sum + current.price, 0)
                    connection.query("SELECT product_id, price, description FROM orders_users as t1 INNER JOIN products as t2 on t1.user_id=? and t1.product_id=t2.id", [userId], (error, res)=>{
                        if(res.length){
                            let products = '';
                            let productsId = [];
                            res.forEach((elem,i) => {
                                coins -= elem.price;
                                products += `${i+1}. ${elem.description} <br>`;
                                productsId.push(elem.product_id)
                            })
                            response.send({id: userId, login, coins, products, productsId})
                        }else{
                            response.send({id: userId, login, coins})
                        }
                    })
                }else{
                    response.send({id: userId, login, coins: 0})
                }
            })
        }else{
            response.send({error: "Такого пользователя нет"})
        }
    })
})
app.post("/product", (req, response) => {
    let body = [];
    req.on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {
        body = JSON.parse(Buffer.concat(body).toString());
        connection.query("INSERT INTO orders_users (product_id, user_id) VALUES (?,?)", [body.product_id, body.user_id], (error, res)=>{
            connection.query("SELECT product_id, price, description FROM orders_users as t1 INNER JOIN products as t2 on t1.user_id=? and t1.product_id=t2.id", [body.user_id], (error, res)=>{
                let coins = 0;
                let products = '';
                let productsId = [];
                res.forEach((elem,i) => {
                    coins += elem.price;
                    products += `${i+1}. ${elem.description} <br>`;
                    productsId.push(elem.product_id)
                })
                response.send({coins, products, productsId})
            })
        })
    });

})

app.listen(PORT, ()=>{
    console.log(`Сервер запущен на порту ${PORT}`)
})