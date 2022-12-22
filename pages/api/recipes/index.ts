import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import Recipe from "../../../models/Recipe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  dbConnect()

  if (method === 'GET') {
    try {
      const products = await Recipe.find()
      res.status(200).json(products)
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'POST') {
    try {
      const recipe = await Recipe.create(req.body);
      res.status(201).json(recipe)
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
