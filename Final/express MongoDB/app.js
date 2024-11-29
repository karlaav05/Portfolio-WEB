const express = require("express");
const mongoose = require("mongoose");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://0251568:KaAv_0050804@cluster0.mo96f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true });

const teamSchema = new mongoose.Schema({
    name: String,
    nationality: String,
    url: String,
});

const driverSchema = new mongoose.Schema({
    num: Number,
    code: String,
    forename: String,
    surname: String,
    dob: Date,
    nationality: String,
    url: String,
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
});

const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);

let countries = [
    { code: "ENG", label: "England" },
    { code: "SPA", label: "Spain" },
    { code: "GER", label: "Germany" },
    { code: "FRA", label: "France" },
    { code: "MEX", label: "Mexico" },
    { code: "AUS", label: "Australia" },
    { code: "FIN", label: "Finland" },
    { code: "NET", label: "Netherlands" },
    { code: "CAN", label: "Canada" },
    { code: "MON", label: "Monaco" },
    { code: "THA", label: "Thailand" },
    { code: "JAP", label: "Japan" },
    { code: "CHI", label: "China" },
    { code: "USA", label: "USA" },
    { code: "DEN", label: "Denmark" },
  ];

app.use(async (req, res, next) => {
    req.teams = await Team.find({});
    req.drivers = await Driver.find({}).populate("team");
    next();
});

app.get("/", (req, res) => {
    res.render("index", { teams: req.teams, drivers: req.drivers, countries });
});

app.post("/driver", async (req, res) => {
    const driverData = req.body;
    const driver = new Driver(driverData);
    await driver.save();
    res.redirect("/");
});

app.put("/driver/:id", async (req, res) => {
    await Driver.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});