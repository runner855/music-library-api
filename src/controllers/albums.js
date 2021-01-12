const { Album, Artist } = require("../models");

exports.create = (req, res) => {
  const { artistId } = req.params;
  Artist.findByPk(artistId).then((artist) => {
    if (!artist) {
      res.status(404).json({ error: "The artist could not be found." });
    } else {
      Album.create({
        name: req.body.name,
        year: req.body.year,
      }).then((album) => {
        album.setArtist(artist).then((album) => {
          res.status(201).json(album);
        });
      });
    }
  });
};

exports.list = (req, res) => {

  Album.findAll({
    include: [
      {
        model: Artist,
        as: "artist",
      },
    ],
  }).then((albums) => {
    res.status(200).json(albums);
  });
};

exports.getAlbumById = (req, res) => {
  const { albumId } = req.params;
  Album.findByPk(albumId).then((album) => {
    if (!album) {
      res.status(400).json({ error: "The album could not be found." });
    } else {
      res.status(200).json(album);
    }
  });
};
