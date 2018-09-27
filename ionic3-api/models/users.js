var conn = require('../connections/mysql');
var bcrypt = require('bcrypt-nodejs');
let User = {};

User.fetchAll = (callback) => {
    if(conn) {
        const sql = "SELECT * FROM users";
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

User.insert = (user, callback) => {
    if(conn) {
        conn.query('INSERT INTO users SET ?', [user], (error, result) => {
            if(error) {
                return callback(error);
            }
            return callback(null, result.insertId);
        })
    }
    else
    {
        return callback('No se ha podido conectar');
    }
}

User.findById = (id, callback) => {
    if(conn)
    {
        conn.query("SELECT * FROM users WHERE id = ?", [id], (error, row) => {
            if(error)
            {
                return callback(error);
            }
            return callback(null, row);
        })
    }
}

User.findOne = (username, password, callback) => {
    if(conn) {
        conn.query(
            `SELECT * FROM users WHERE username = ${conn.escape(username)}`,
            (error, rows) => {
                if(error) {
                    return callback(error);
                }
                if(rows.length === 0) {
                    return callback(null, null);
                }
                var check = bcrypt.compareSync(password, rows[0].password);
                if(check) {
                    return callback(null, rows[0]);
                }
                return callback(null, null);
            }
        )
    }
}

User.update = (user, callback) => {
    if(conn) {
        conn.query(
            'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?',
            [user.username, user.email, bcrypt.hashSync(user.password), user.id],
            (error, result) => {
                if(error) {
                    return callback('Error actualizando usuario');
                }
                return callback(null, "Usuario actualizado");
            }
        )
    }
}

User.remove = (id, callback) => {
    if(conn) {
        conn.query(
            'DELETE FROM users WHERE id = ?',
            [id],
            (error, result) => {
                if(error) {
                    return callback('Error eliminando usuario');
                }
                return callback(null, "Usuario eliminado");
            }
        )
    }
}

User.paginate = (offset, limit, callback) => {
    if(conn)
    {
        conn.query("SELECT * FROM users LIMIT ?, ?", [offset, limit], (error, rows) => {
            if(error)
            {
                return callback(error);
            }
            else
            {
                conn.query('SELECT COUNT(*) as total FROM users', (error, count) => {
                    return callback(null, {count, rows});
                })
            }
        })
    }
}

User.response = (res, error, data) => {
    if(error) {
        res.status(500).json(error);
    }
    else
    {
        res.status(200).json(data);
    }
}

module.exports = User;