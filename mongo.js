// const {MongoClient} = require("mongodb");

// const client = new MongoClient(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: false });

// const mongo = {
//     products:null,
//     categories:null,
//     users:null,
//     cart:null,
//     orders:null,

//     async connect(){
//         await client.connect();
//         const db = client.db(process.env.MONGODB_NAME);
//         console.log("Mongo DB is Connected");

//         this.products = db.collection("products");
//         this.categories = db.collection("categories");
//         this.users = db.collection("users");
//         this.cart = db.collection("cart");
//         this.orders = db.collection("orders");
//     }
// }
// module.exports = mongo;