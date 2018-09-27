var conn = require('../connections/mysql');
let Shop = {};

Shop.products = (callback) => {
    if(conn) {
        const sql = "SELECT * FROM products";
        conn.query(sql, (error, rows) => {
            if(error) {
                return callback(error);
            }
            return callback(null, rows);
        });
    }
    else
    {
        return callback("No se ha podido conectar");
    }
}

Shop.findById = (id, callback) => {
    if(conn)
    {
        conn.query("SELECT * FROM products WHERE id = ?", [id], (error, row) => {
            if(error)
            {
                return callback(error);
            }
            return callback(null, row);
        })
    }
}

Shop.processPayment = (total, paypalResponse, products, callback) => {
    if(conn) {
        let order = {
            paypal_transaction: paypalResponse.id,
            status: paypalResponse.state,
            intent: paypalResponse.intent,
            total
        }

        console.log(order);
        conn.query('INSERT INTO orders SET ?', [order], (error, orderResult) => {
            if(error) {
                return callback(error);
                console.log('ERROR')
            }
            let data = [];
            for(let i = 0; i < products.length; i++) {
                data.push([orderResult.insertId, products[i].id, products[i].quantity]);
            }
            conn.query('INSERT INTO order_detail (order_id, product_id, qty) VALUES ?', [data], (error, result) => {
                if(error) {
                    console.log(error);
                    return callback(error);
                }
                return callback(null, "Success");
            });
        })
    }
}

Shop.orders = (callback) => {
    if(conn) {
        const sql = "SELECT o.id, o.paypal_transaction, o.total, o.status, group_concat(p.name,'*',p.price,'*',p.picture,'*',od.qty) as products FROM orders o JOIN order_detail od ON o.id = od.order_id JOIN products p on od.product_id = p.id GROUP BY o.id;";
        conn.query(sql, (error, rows) => {
            if(error) {
                return callback(error);
            }
            return callback(null, rows);
        });
    }
    else
    {
        return callback("No se ha podido conectar");
    }
}

module.exports = Shop;