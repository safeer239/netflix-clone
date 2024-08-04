const { fetchFromTMDB } = require("../services/tmdb");

exports.getTrendingTvShow = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomData =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.json({ success: true, content: randomData });
  } catch (err) {
    console.log(err);
  }
};

exports.getTvShowTrailer = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.json({ success: true, trailers: data.results });
  } catch (err) {
    if (err.message.includes("404")) {
        res.status(404).json({ success: false, message: null });
      }
    console.log(err);
  }
};

exports.getTvShowDetails = async (req, res) => {
    const { id } = req.params;
    try {
      const data = await fetchFromTMDB(
        `https://api.themoviedb.org/3/tv/${id}?language=en-US`
      );
      res.json({ success: true,content:data });
    } catch (err) {
      if (err.message.includes("404")) {
        res.status(404).json({ success: false, message: null });
      }
      res.status(500).json({ success: false, message: "internal server error" });
    }
  };
  
  exports.getTvShowSimilar = async (req, res) => {
      const { id } = req.params;
      try {
        const data = await fetchFromTMDB(
          `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
        );
        res.json({ success: true,similar:data.results });
      } catch (err) {
        res.status(500).json({ success: false, message: "internal server error" });
      }
    };
  
  exports.getTvShowCategory = async (req, res) => {
      const { category } = req.params;
      try {
        const data = await fetchFromTMDB(
          `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
        );
        res.json({ success: true,content:data.results });
      } catch (err) {
        res.status(500).json({ success: false, message: "internal server error" });
      }
    };  