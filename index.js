import express from 'express';
import mysql from 'mysql2/promise';
import { configDB } from './configDB.js';
import cors from 'cors'
const port = 8000

let connection

try {
  connection = await mysql.createConnection(configDB);
} catch (err) {
  console.log(err);
}

const app = express()
app.use(express.json())
app.use(cors())

app.get('/api/property', async (request, response) => {
  try {
    const sql = `SELECT ingatlanok.id,ingatlanok.leiras,ingatlanok.hirdetesDatuma,ingatlanok.tehermentes,ingatlanok.ar,ingatlanok.kepUrl,
        kategoriak.nev kategNev FROM ingatlanok, kategoriak WHERE ingatlanok.kategoriaId=kategoriak.id ORDER BY ingatlanok.hirdetesDatuma desc`
    const [rows, fields] = await connection.execute(sql);
    response.status(200).send(rows)
  } catch (err) {
    console.log(err);
  }
})
app.get('/api/property/from/:fromDate', async (request, resp) => {
  const { fromDate } = request.params
  try {
    const sql = `SELECT ingatlanok.id,ingatlanok.leiras,ingatlanok.hirdetesDatuma,ingatlanok.tehermentes,ingatlanok.ar,ingatlanok.kepUrl,
        kategoriak.nev kategNev FROM ingatlanok, kategoriak WHERE ingatlanok.kategoriaId=kategoriak.id 
        and ingatlanok.hirdetesDatuma>?
        ORDER BY ingatlanok.hirdetesDatuma desc`
    const [rows, fields] = await connection.execute(sql, [fromDate]);
    if (rows.length > 0) resp.status(200).send(rows)
    else resp.status(404).json({ msg: "Nincs eredménye a keresésnek" })
  } catch (err) {
    console.log(err);
  }
})

app.post('/api/property', async (request, response) => {
  const { kategoriaId, leiras, hirdetesDatuma, tehermentes, ar, kepUrl } = request.body
  console.log(kategoriaId, leiras, hirdetesDatuma, tehermentes, ar, kepUrl);

  try {
    const sql = 'insert into ingatlanok values (?,?,?,?,?,?,?)'
    const values = [null, kategoriaId, leiras, hirdetesDatuma, tehermentes, ar, kepUrl]
    const [rows, fields] = await connection.execute(sql, values);
    response.status(201).json({ msg: "Sikeres  hozzáadása!" })
  } catch (err) {
    console.log(err);
    response.status(500).json({ msg: err })
  }
})

app.get('/api/property/:id', async (req, resp) => {
  const { id } = req.params;
  try {
    const sql = `SELECT ingatlanok.id,ingatlanok.leiras,ingatlanok.hirdetesDatuma,ingatlanok.tehermentes,ingatlanok.ar,ingatlanok.kepUrl,
        kategoriak.nev kategNev FROM ingatlanok, kategoriak WHERE ingatlanok.kategoriaId=kategoriak.id and ingatlanok.id=? ORDER BY ingatlanok.hirdetesDatuma desc`
    const values = [+id]
    const [rows, fields] = await connection.query(sql, values);//ha több útasítást szeretnénk egyszerre futtani az execute nem engedi!!!
    if (rows.length > 0) resp.status(200).send(rows)
    else resp.status(404).json({ msg: "Az ingatlan nem található" })
  } catch (error) {
    console.log(error);
    resp.status(500).json({ msg: err })
  }
})
app.put('/api/property/:id', async (req, resp) => {
  const { leiras, ar } = req.body
  const { id } = req.params;
  try {
    const sql = "UPDATE ingatlanok SET leiras=?, ar=? WHERE id=?;";
    const values = [leiras, ar, +id];
    const [result] = await connection.query(sql, values);
    // Ellenőrizzük, hogy történt-e bármilyen módosítás
    if (result.affectedRows === 0) {
      // Ha nem történt módosítás (pl. mert az id nem létezett)
      return resp.status(404).json({ msg: "Az adott azonosítóval nem található ingatlan!" });
    } else
      // Ha sikeresen módosítottunk egy sort
      return resp.status(200).json({ msg: "Sikeres módosítás!" });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ msg: "Hiba történt!" })
  }
})

app.delete('/api/property/:id', async (req, resp) => {
  const { id } = req.params;
  try {
    const sql = 'delete from ingatlanok where id=?'
    const values = [id]
    const [rows, fields] = await connection.execute(sql, values);
    console.log(rows.affectedRows);//ha 0 nincs mit törölni!!!!!!!!!!!!!!!!
    if (rows.affectedRows == 0) return resp.status(404).json({ msg: "Az ingatlan nem található" })
    else return resp.status(200).json({ msg: "Sikeres törlés!" })
  } catch (err) {
    console.log(err);
    resp.status(500).json({ msg: "Hiba történt!" })
  }

})
app.get('/api/categories', async (request, response) => {
  try {
    const sql = 'SELECT * from kategoriak'
    const [rows, fields] = await connection.execute(sql);
    response.status(200).send(rows)
  } catch (err) {
    console.log(err);
  }
})

app.listen(port, () => console.log(`server listening on port ${port}...`))
