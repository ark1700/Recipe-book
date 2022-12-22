import mongoose, { Types } from 'mongoose'

export interface IRecipe {
  _id: Types.ObjectId,
  title: string,
  descr: string,
  img: string,
  prepTimeInMinutes: Number,
  cooktTimeInMinutes: Number,
  ingredients: IIngredient[],
  nutrition: {
    calories: Number,
    fat: Number,
    carbs: Number,
    protein: Number,
  },
  serves: Number,
  method: [{
    descr: string,
    img: String,
  }]
}

export interface IIngredient {
  name: string,
  amount: string,
}

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 60
  },
  descr: {
    type: String
  },
  img: String,
  prepTimeInMinutes: {
    type: Number,
    required: true,
  },
  cooktTimeInMinutes: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: [{
      name: {
        type: String,
        required: true,
      },
      amount: {
        type: String,
        required: true,
      },
    }],
  },
  nutrition: {
    type: {
      calories: Number,
      fat: Number,
      carbs: Number,
      protein: Number,
    }
  },
  serves: {
    type: Number,
    required: true,
  },
  method: {
    type: [
      {
        descr: {
          type: String,
          required: true,
        },
        img: {
          type: String,
        },
      }
    ]
  }
}, { timestamps: true}) ;

export default mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema)
