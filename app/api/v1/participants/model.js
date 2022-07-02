const mongoose = require("mongoose"),
  bcrypt = require("bcryptjs");

const ParticipantSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide first name"],
      minlength: 3,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: [true, "Please provide last name"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide email"],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
    },
    role: {
      type: String,
      required: [true, "Please provide your role"],
    },
  },
  { timestamps: true }
);

ParticipantSchema.path("email").validate(
  (value) => {
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
  },
  (attr) => `${attr.value} harus merupakan email valid`
);

ParticipantSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("Participant").countDocuments({ email: value });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `Email ${attr.value} sudah terdaftar`
);

// ParticipantSchema.path("name").validate(
//   async function (value) {
//     try {
//       const count = await this.model("User").countDocuments({ name: value });
//       return !count;
//     } catch (err) {
//       throw err;
//     }
//   },
//   (attr) => `${attr.value} sudah digunakan`
// );

ParticipantSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified("name"));
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

ParticipantSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Participant", ParticipantSchema);
