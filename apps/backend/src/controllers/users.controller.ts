import express from 'express';
import { db } from '../database';
import { Address, User } from '../models';
const router = express.Router();

// get
router.get("/:id", (req, res) => {
  const id = req?.params?.id;
  if (!id) {
    res.send(400);
    return;
  }

  const selectUserQuery = `
    SELECT * FROM User 
    LEFT JOIN Address ON User.id=Address.id
    WHERE User.id=${id}
  `;
  
  db.query(selectUserQuery, (err, result) => {
    console.log('select user query result: ', { err, result });
    if (err) {
      res.sendStatus(400);
    } else if (result instanceof Array && result?.length > 0) {
      const userData: User & Address & any = result[0];
      res.json({ 
        error: null, 
        data: {
          user: {
            id: userData.id,
            name: userData.name,
            username: userData.username,
            email: userData.email,
            address: {
              id: userData.id,
              street: userData.street,
              suite: userData.suite,
              city: userData.city,
              zipcode: userData.zipcode,
              geo: {
                lat: userData.geo_lat,
                lng: userData.geo_lng,
              },
            },
            phone: userData.phone,
            website: userData.website
          }
        }
      });
    } else {
      res.sendStatus(err ? 400 : 200);
    }
  });
});

// get all
router.get("/", (req, res) => {
  const selectAllUsersQuery = `
    SELECT * FROM User 
    LEFT JOIN Address ON User.id=Address.id
  `;
  
  db.query(selectAllUsersQuery, (err, result) => {
    console.log('select user query result: ', { err, result });
    if (err) {
      res.sendStatus(400);
    } else if (result instanceof Array && result?.length > 0) {
      const users: (User & Address & any)[] = result;
      const userData = users?.map((data: User & Address & any) => ({
        id: data?.id,
        name: data?.name,
        username: data?.username,
        email: data?.email,
        address: {
          id: data?.id,
          street: data?.street,
          suite: data?.suite,
          city: data?.city,
          zipcode: data?.zipcode,
          geo: {
            lat: data?.geo_lat,
            lng: data?.geo_lng,
          },
        },
        phone: data?.phone,
        website: data?.website
      }));
      
      res.json({ 
        error: null, 
        data: { users: userData },
      });
      return;
    } else {
      res.sendStatus(err ? 400 : 200);
    }
  });
});

// delete
router.delete("/:id", (req, res) => {
  const id = req?.params?.id;
  if (!id) {
    res.send(400);
    return;
  }
  
  const deleteQuery = `DELETE FROM User WHERE id=${id}`;
  db.query(deleteQuery, (err, result) => {
    res.sendStatus(err ? 400 : 200);
    console.log('delete query result: ', { err, result });
  });
});

// create
router.post("/", (req, res) => {
  const user: User = req?.body?.data?.user;
  if (user) {
    // Assuming the user data is valid
    const createQuery = `
      INSERT INTO User(name, username, email, phone, website)
      VALUES("${user.name}", "${user.username}", "${user.email}", "${user.phone}", "${user.website}");
    `;
    
    db.query(createQuery, (err, result, fields) => {
      console.log('create user query result: ', { err, result, fields });
      res.sendStatus(err ? 400 : 200);
    });
  } else {
    res.sendStatus(400);
  }
});

// update
router.put("/:id", (req, res) => {
  const id = req?.params?.id;
  if (!id) {
    res.send(400);
    return;
  }

  const user: User = req?.body?.data?.user;
  const address: Address = user?.address;
  if (user && address) {
    const updateQuery = `
      UPDATE Users SET 
        name = '${user.name}', 
        username = '${user.username}', 
        email = '${user.email}', 
        address = '${user.address}', 
        phone = '${user.phone}', 
        website = '${user.website}',
      WHERE id = ${id};

      UPDATE Address SET 
        street = '${address.street}', 
        suite = '${address.suite}', 
        city = '${address.city}', 
        zipcode = '${address.zipcode}', 
        country = 'United States', 
        geo_lat = '${address.geo.lat}', 
        geo_lng = '${address.geo.lng}',
      WHERE id = ${id};
    `;

    db.query(updateQuery, (err, result) => {
      console.log('update user query result: ', { err, result });
      res.sendStatus(err ? 400 : 200);
    });
  } else {
    res.sendStatus(400);
  } 



});

module.exports = router;
