import dbConnect from "../../../lib/mongodb";
import Recipe from "../../../models/Recipe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { id },
    cookies
  } = req;
  const token = cookies.token

  dbConnect();

  if (method === "GET") {
    try {
      const recipe = await Recipe.findById(id);
      res.status(200).json(recipe);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    if(!token || token !== process.env.token){
      return res.status(401).json("Not authenticated!")
    }
    try {
      const product = await Recipe.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    if(!token || token !== process.env.token){
      return res.status(401).json("Not authenticated!")
    }
    try {
      await Recipe.findByIdAndDelete(id);
      res.status(200).json("The product has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
