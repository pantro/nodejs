var conn = require('../connections/mysql');
let GMaps = {};

GMaps.byType = (data, callback) => {
    if(conn)
    {
        const sql = `
            SELECT address, name, lat, lng, description, 
            (6371 * acos(cos(radians(?)) 
              * cos(radians(places.lat)) 
              * cos(radians(places.lng) - radians(?)) 
              + sin(radians(?)) 
              * sin(radians(places.lat)))
            ) AS distance
            FROM places 
            WHERE places.type = ?
            HAVING distance < ?
            ORDER BY distance
        `;
        conn.query(sql, [
            data.lat, data.lng, data.lat, data.type, data.radius
        ],
        (error, rows) => {
            if(error)
            {
                return callback(error);
            }
            return callback(null, rows);
        })
    }
}

module.exports = GMaps;