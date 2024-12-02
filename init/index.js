const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
main()
    .then(res => {
        console.log("DB also Connected.");
    })
    .catch(err => {
        console.log(err);
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "674596cade22c2f44ee21124" }));
    await Listing.insertMany(initData.data);  // here initdata.data because in data.js file we pass the [data: sampleListings];
    console.log("data was initialized.");    // initdata is a object and data it is particuler data of initdata.
};

initDB();