const mongoose = require ('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const shortid = require('shortid')


const BlogSchema = new mongoose.Schema({
    _id: { type: String, default: shortid.generate },

    state:{
        type: String,
        enum: ['draft', 'published'], 
        default: 'draft', 
      },

    title: {type: String, required: true},

    description: {type: String, required: true},

    tags: [String],

    author:  {type: String, ref: "User" , required: true},

    read_count:  {type: Number, default: 0},

    reading_time : {type: String}, 

    body:  {type: String, required: true},

    user_id: {
      type: String, 
      ref: 'User', 
      required: true,
    },
},
    {timestamps: true}
)
BlogSchema.pre("save", function (next) {
  if (this.body) {
    const words = this.body.split(/\s+/).length;
    const minutes = Math.ceil(words / 200); // 200 words per minute
    this.reading_time = `${minutes} min${minutes > 1 ? "s" : ""}`; 
  }
  next();
});

BlogSchema.plugin(mongoosePaginate);

const BlogModel = mongoose.model('blog', BlogSchema)

module.exports = BlogModel;