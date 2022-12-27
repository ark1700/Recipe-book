import dbConnect from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import { hash } from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  dbConnect();
  const {
    method,
    body,
  } = req;

  if (method === "POST") {
    try {
      const { username, email, password } = body;
      const checkExisting = await User.findOne({email})
      if (checkExisting) {
        res.status(500).json({
          message: 'User already exist',
        })
      }

      User.create(
        {
          username,
          email,
          password: await hash(password, 12)
        },
        (err: any, data: any) => {
          if(err) {
            return res.status(404).json({ err })
          }
          res.status(201).json({ user: data })
        }
      )
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
