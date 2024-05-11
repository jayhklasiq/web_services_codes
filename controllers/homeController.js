
function homePage(req, res) {
  res.render("index",
    {
      title: "Home Page",
      errors: null
    }
  )
}

module.exports =  {homePage}