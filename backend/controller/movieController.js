const { fetchFromTMDB } = require("../services/tmdb");

exports.getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/movie/popular?language=en-US"
    );
    const randomData =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.json({ success: true, content: randomData });
  } catch (err) {
    console.log(err);
  }
};

exports.getMovieTrailer = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res.json({ success: true, trailers: data.results });
  } catch (err) {
    if (err.message.includes("404")) {
      res.status(404).json({ success: false, message: null });
    }
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

exports.getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
    res.json({ success: true,content:data });
  } catch (err) {
    if (err.message.includes("404")) {
      res.status(404).json({ success: false, message: null });
    }
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

exports.getSimilarMovies = async (req, res) => {
    const { id } = req.params;
    try {
      const data = await fetchFromTMDB(
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US`
      );
      res.json({ success: true,similar:data.results });
    } catch (err) {
      res.status(500).json({ success: false, message: "internal server error" });
    }
  };

exports.getMovieByCategory = async (req, res) => {
    const { category } = req.params;
    try {
      const data = await fetchFromTMDB(
        `https://api.themoviedb.org/3/movie/${category}?language=en-US`
      );
      res.json({ success: true,content:data.results });
    } catch (err) {
      res.status(500).json({ success: false, message: "internal server error" });
    }
  };  

// https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US
// https://api.themoviedb.org/3/movie/popular?language=en-US 