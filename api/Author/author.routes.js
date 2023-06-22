const express = require("express");
const router = express.Router();

const {
  postsCreate,
  createAuthor,
  getAuthors,
} = require("./author.controller");

router.param("authorId", async (req, res, next, authorId) => {
  const author = await fetchPost(authorId, next);
  if (author) {
    req.author = author;
    next();
  } else {
    const err = new Error("Author Not Found");
    err.status = 404;
    next(err);
  }
});

router.post("/", createAuthor);
router.get("/", getAuthors);
router.post("/:authorId", postsCreate);

module.exports = router;
