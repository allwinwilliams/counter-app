// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  
  console.log(req.query);
  var name = req.query.name;

  // CALCULATION....

  var body = { name: name, id: "12345" }
  res.status(200).json(body);
}
