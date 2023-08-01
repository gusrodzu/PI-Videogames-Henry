const { Router } = require("express");
const getAllVideoGames = require("../controllers/getAllVideoGames");
const getVideogamesByName = require("../controllers/getVideoGamesByName");
const getVideogamesByID = require("../controllers/getVideoGamesByID");
const getGenre = require("../controllers/getGenres");
const postVideoGames = require("../controllers/postVideoGames");


const router = Router();


router.get("/videogames", (req, res) => {

  const { name } = req.query;
  if (name) {
    getVideogamesByName(req, res);
  } else {
    getAllVideoGames(req, res);
  }
});

router.get("/videogames/:id", (req, res) => getVideogamesByID(req, res));

router.get("/genres", getGenre);

router.post("/videogames", postVideoGames);

module.exports = router;