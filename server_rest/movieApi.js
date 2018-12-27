const router = require("express").Router();

var movieId = 3;
var movies = [
  {
    id: 1,
    title: "Bumblebee"
  },
  {
    id: 2,
    title: "Aquaman"
  }
];

function loadMovie(req, res, next) {
  const movie = movies.find(movie => movie.id === parseInt(req.params.id));

  if (movie) {
    req.__movie_instance = movie;
    next();
  } else {
    res.sendStatus(404);
  }
}

router.post("/", (req, res) => {
  if (req.body.title) {
    movies.push({
      id: movieId++,
      title: req.body.title
    });
    res.send({ status: "ok", movies });
  } else {
    res.send({ status: "fail", reason: "not found title." });
  }
});

router.get("/", (req, res) => {
  res.send({ status: "ok", movies });
});

router.get("/:id", loadMovie, (req, res) => {
  const movie = req.__movie_instance;
  res.send({ status: "ok", movie });
});

router.put("/:id", loadMovie, (req, res) => {
  let movie = req.__movie_instance;
  movie = {
    ...movie,
    title: req.body.title
  };
  movies = movies.map(_movie => {
    if (_movie.id === movieId) {
      return movie;
    }
    return _movie;
  });
  res.send({ status: "ok", movie });
});

router.delete("/:id", loadMovie, (req, res) => {
  const movie = req.__movie_instance;
  if (movie) {
    movies = movies.filter(movie => movie.id !== parseInt(req.params.id));
    res.send({ status: "ok" });
  } else {
    res.send({ status: "fail", reason: "can't delete id " + req.params.id });
  }
});

module.exports = router;
