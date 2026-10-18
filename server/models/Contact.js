import mongoose from 'mongoose';

export const CONTACT_LIMITS = Object.freeze({
  name: { min: 2, max: 80 },
  email: { max: 254 },
  message: { min: 10, max: 2000 },
});

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: CONTACT_LIMITS.name.min,
      maxlength: CONTACT_LIMITS.name.max,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      maxlength: CONTACT_LIMITS.email.max,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email is invalid'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: CONTACT_LIMITS.message.min,
      maxlength: CONTACT_LIMITS.message.max,
    },
    status: {
      type: String,
      enum: ['new', 'read', 'archived'],
      default: 'new',
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    versionKey: false,
  },
);

contactSchema.index({ createdAt: -1 });

export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
