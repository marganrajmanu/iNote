const mongoose = require("mongoose");

main().catch((err) => console.error(err));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/myDatabase", {
        useNewUrlParser: true
    });
}

const connected = mongoose.connection;
connected.on("open", () => console.log("connected..."));

exports.connectToMongo = main;