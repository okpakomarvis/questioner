function validatersvp(req, res, next) {
  const responses = ["yes", "no", "maybe"];
  let { response } = req.body;
  if (response) response = response.toLowerCase();
  if (!responses.includes(response)) {
    return res.json({
      status: 400,
      error: "Your response must be yes, no or maybe"
    });
  }
  next();
}
export default validatersvp;
