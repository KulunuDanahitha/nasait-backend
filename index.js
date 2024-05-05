import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

import multer from 'multer';
import path from 'path';
import fs from 'fs';


const app = express();



app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});


const upload = multer({ storage: storage });



const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nasait"
})





app.get("/", (req, res) => {
    res.json("Hello this is backend!")
})


app.get("/supplier", (req, res) => {
    const q = "SELECT * FROM supplier"
    db.query(q,(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

/////////////////////////////////////////////
// get one uesr details

app.get("/supplier/:id", (req, res) => {
    const q = "SELECT * FROM supplier WHERE supplier_id = ?"


    db.query(q, [req.params.id],(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})
///////////////////////////////////////////////


app.post("/supplier", (req, res) => {
console.log(req.body)

    const q = "INSERT INTO supplier (firstname, lastname, email, address, phonenumber, shopname) VALUES (?,?,?,?,?,?)";
    // const values = [
    //     req.body.firstName,
    //     req.body.lastName,
    //     req.body.email,
    //     req.body.address,
    //     req.body.phoneNumber,
    //     req.body.shopname,
    // ];
    const {firstName, lastName, email, address, phoneNumber, shopname} = req.body


    db.query(q, [firstName, lastName, email, address, phoneNumber, shopname], (err, data) => {
        if (err) return res.json(err);
        return res.json("Supplier has been created successfully!");
    })
})

//// ************************************************************* ////
// Delete Supplier
app.delete("/supplier/:id", (req, res) => {
    const supplierId = req.params.id;
    const q = "DELETE FROM supplier WHERE supplier_id = ?";

    db.query(q, [supplierId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Supplier has been deleted successfully!");
        
    })
})

////////////////////////////////////////////////////////////////////////////


////////// ******************************************** ///////////////////
// Update Supplier
app.put("/supplier/:id", (req, res) => {
    const supplierId = req.params.id;
    const q = "UPDATE supplier SET `firstname` = ?, `lastname` = ?, `email` = ?, `address` = ?, `phonenumber` = ?, `shopname` = ? WHERE supplier_id = ?";

    const {firstName, lastName, email, address, phoneNumber, shopname} = req.body

    db.query(q, [firstName, lastName, email, address, phoneNumber, shopname, supplierId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Supplier has been updated successfully!");
        
    })
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Customer ///////
////////////////////////////////////////////////////////////


app.get("/customer", (req, res) => {
    const q = "SELECT * FROM customer"
    db.query(q,(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})


////////////////////////////////
app.get("/customer/:id", (req, res) => {
    const q = "SELECT * FROM customer WHERE customer_id = ?"


    db.query(q, [req.params.id],(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})
/////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// Create customer
app.post("/customer", (req, res) => {
console.log(req.body)

    const q = "INSERT INTO customer (firstname, lastname, email, address, phonenumber) VALUES (?,?,?,?,?)";
    // const values = [
    //     req.body.firstName,
    //     req.body.lastName,
    //     req.body.email,
    //     req.body.address,
    //     req.body.phoneNumber,
    //     req.body.shopname,
    // ];
    const {firstName, lastName, email, address, phoneNumber} = req.body


    db.query(q, [firstName, lastName, email, address, phoneNumber], (err, data) => {
        if (err) return res.json(err);
        return res.json("Customer has been created successfully!");
    })
})


//////////////////////////////////////////////////
// Delete Customer
app.delete("/customer/:id", (req, res) => {
    const CustomerId = req.params.id;
    const q = "DELETE FROM customer WHERE customer_id = ?";

    db.query(q, [CustomerId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Customer has been deleted successfully!");
        
    })
})


////////////////////////////////////////////////////////////////////////////////////
// Update customer
app.put("/customer/:id", (req, res) => {
    const customerId = req.params.id;
    const q = "UPDATE customer SET `firstname` = ?, `lastname` = ?, `email` = ?, `address` = ?, `phonenumber` = ? WHERE customer_id = ?";

    const {firstName, lastName, email, address, phoneNumber} = req.body

    db.query(q, [firstName, lastName, email, address, phoneNumber, customerId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Customer has been updated successfully!");
        
    })
})


/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////      Discount

//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/discount", (req, res) => {
  const q = "SELECT * FROM discount";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});


/////////////////////////////////////////////
// get one discount details

app.get("/discount/:id", (req, res) => {
  const q = "SELECT * FROM discount WHERE discount_id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
///////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// Create discount
//////////////////////////////////////////////////////////////////////////////////////////////
app.post("/discount", (req, res) => {
  console.log(req.body);

  const q = "INSERT INTO discount (item_id, discount_name, value) VALUES (?,?,?)";

  const { itemId, discountName, value } = req.body;

  db.query(q, [itemId, discountName, value], (err, data) => {
    if (err) return res.json(err);
    return res.json("Discount has been created successfully!");
  });
});


// Delete discount
app.delete("/discount/:id", (req, res) => {
  const DiscountId = req.params.id;
  const q = "DELETE FROM discount WHERE discount_id = ?";

  db.query(q, [DiscountId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Discount has been deleted successfully!");
  });
});

////////////////////////////////////////////////////////////////////////////////////
// Update discount
app.put("/discount/:id", (req, res) => {
    const discountId = req.params.id;
    const q =
      "UPDATE discount SET `item_id` = ?, `discount_name` = ?, `value` = ? WHERE discount_id  = ?";

    const { itemId, discountName, value } = req.body;

    db.query(q, [itemId, discountName, value, discountId], (err, data) => {
      if (err) return res.json(err);
      return res.json("Discount has been updated successfully!");
    });
})



/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////      Category

//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


app.get("/category", (req, res) => {
  const q = "SELECT * FROM category";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

/////////////////////////////////////////////
// get one category details

app.get("/category/:id", (req, res) => {
  const q = "SELECT * FROM category WHERE category_id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});



////////////////////////////////////////////////////////////////////////////
///////////////////////     Image upload Start
////////////////////////////////////////////////////////////////////////////





app.post("/upload/:categoryId", upload.single("image"), (req, res) => {
  console.log(req.file);
  const image = req.file.filename;
  const categoryId = req.params.categoryId;
  const sql = "UPDATE category SET image = ? WHERE category_id = ?";
  db.query(sql, [image, categoryId], (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Message: "Success" });
  });
});



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


app.get("/", (req, res) => {
  const sql = "SELECT * FROM category";
  db.query(sql, (err, result) => {
    if (err) return res.json("Error");
    return res.json(result);
  });
});


////////////////////////////////////////////////////////////////////////////
///////////////////////     Image upload end
////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// Create category
//////////////////////////////////////////////////////////////////////////////////////////////
// app.post("/category", (req, res) => {
//   console.log(req.body);

//   const q = "INSERT INTO category (categoryname, description) VALUES (?,?)";

//   const { categoryName, description } = req.body;

//   db.query(q, [categoryName, description], (err, data) => {
//     if (err) return res.json(err);
//     return res.json("Category has been created successfully!");
//   });
// });


app.post("/category", (req, res) => {
  const { categoryName, description } = req.body;
  const sql = "INSERT INTO category (categoryName, description) VALUES (?, ?)";
  db.query(sql, [categoryName, description], (err, result) => {
    if (err) return res.json({ Message: "Error" });
    const categoryId = result.insertId;
    res.json({ categoryId });
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////


// Delete category
app.delete("/category/:id", (req, res) => {
  const CategoryId = req.params.id;
  const q = "DELETE FROM category WHERE category_id = ?";

  db.query(q, [CategoryId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Category has been deleted successfully!");
  });
});


////////////////////////////////////////////////////////////////////////////////////
// Update discount
app.put("/category/:id", (req, res) => {
  const CategoryId = req.params.id;
  const q =
    "UPDATE category SET `categoryname` = ?, `description` = ? WHERE category_id  = ?";

  const { categoryName, description } = req.body;

  db.query(q, [categoryName, description, CategoryId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Category has been updated successfully!");
  });
});

///////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////   Item Manage   ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////





// app.get("/item", (req, res) => {
//   // const q = "SELECT * FROM item";
//     const q =
//       "SELECT item_id, itemname, categoryname, brandname, description, TO_BASE64(image) AS image FROM item";

//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });


app.get("/item", (req, res) => {
  const sql = "SELECT * FROM item";
  db.query(sql, (err, result) => {
    if (err) return res.json("Error");
    return res.json(result);
  });
});











// app.get("/item", (req, res) => {
//   const q =
//     "SELECT item_id, itemname, categoryname, brandname, description, TO_BASE64(image) AS image FROM item";

//   db.query(q, (err, data) => {
//     if (err) return res.json(err);

//     // Convert the image to base64 format before sending the response
//     const itemsWithBase64Image = data.map((item) => {
//       return {
//         ...item,
//         image: item.image.toString("base64"),
//       };
//     });

//     return res.json(itemsWithBase64Image);
//   });
// });

///////////////////////////////////////// Get one item ////////////////////////////////////////
app.get("/item/:id", (req, res) => {
  const q = "SELECT * FROM item WHERE item_id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
// pp

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////     Item Image uploading part start      //////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////



app.post("/uploadd/:itemId", upload.single("image"), (req, res) => {
  console.log(req.file);
  const image = req.file.filename;
  const itemId = req.params.itemId;
  const sql = "UPDATE item SET image = ? WHERE item_id = ?";
  db.query(sql, [image, itemId], (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Message: "Success" });
  });
});













///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////       Item Image uploading part  End       //////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// Create Item
//////////////////////////////////////////////////////////////////////////////////////////////
app.post("/item",  (req, res) => {
  console.log(req.body);

  //SELECT item_id, itemname, categoryname, brandname, description, TO_BASE64(image) AS image FROM item"

  const q = "INSERT INTO item (itemname, category_id, brandname, description) VALUES (?,?,?,?)";

  const { itemname, categoryId, brandname, description } = req.body;

  db.query(q, [itemname, categoryId, brandname, description], (err, data) => {
    if (err) return res.json(err);
    return res.json("Item has been created successfully!");
  });
});


// Delete item
app.delete("/item/:id", (req, res) => {
  const CategoryId = req.params.id;
  const q = "DELETE FROM item WHERE item_id = ?";

  db.query(q, [CategoryId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Item has been deleted successfully!");
  });
});




// Update item
app.put("/item/:id", (req, res) => {
  const itemId = req.params.id;
  const q =
    "UPDATE category SET `itemname` = ?, `category_id` = ?, `brandname` = ?, `description` = ?, WHERE item_id  = ?";

  const { itemname, categoryid, brandname, description } = req.body;

  db.query(
    q,
    [itemname, categoryid, brandname, description, itemId],
    (err, data) => {
      if (err) return res.json(err);
      return res.json("Item has been updated successfully!");
    }
  );
});






///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////               Add Stock                //////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////



app.post("/addstock", (req, res) => {
  console.log(req.body);

   const q =
     "INSERT INTO addstock (item_id, supplier_id, quantity, purchaseprice, sellprice, description, date) VALUES (?,?,?,?,?,?,?)";

   const { itemid, supplierid, quantity, purchaseprice, sellprice, description, date } = req.body;

  db.query(
    q,
    [
      itemid,
      supplierid,
      quantity,
      purchaseprice,
      sellprice,
      description,
      date,
    ],
    (err, data) => {
      if (err) return res.json(err);
      return res.json("Stock has been added successfully!");
    }
  );
});



// app.get("/item", (req, res) => {
//   const q = "SELECT * FROM item WHERE item.categoryname = category.categoryname";

//    db.query(q, [req.params.id], (err, data) => {
//      if (err) return res.json(err);
//      return res.json(data);
//    });
  
// })


// app.get("/item", (req, res) => {
//   const q = "SELECT * FROM item"; // Select all items

//   db.query(q, (err, items) => {
//     if (err) return res.json(err);

//     // Assuming you have category information within each item, you can directly filter items in the backend
//     // based on categoryname.
//     const filteredItems = items.filter(
//       (item) => item.categoryname === req.params.categoryname
//     );

//     return res.json(filteredItems);
//   });
// });



app.get("/items/:categoryid",  (req, res) => {
  const q = "SELECT * FROM item WHERE category_id = ?";
  console.log(req.params);
  const category_id = req.params.categoryid
  // const {categoryid} = req.params


   db.query(q, [category_id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      console.log("data aaaaaaaawa");
      console.log(data);
      return res.json(data);
    }
  });
});












// app.get("/item/:id", (req, res) => {
//   const q = "SELECT * FROM item WHERE item_id = ?";

//   db.query(q, [req.params.id], (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });



















///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


app.listen(8081, () => {
    console.log("Connected to backend!")
})
