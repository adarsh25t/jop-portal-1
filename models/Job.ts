import { Schema, Document, Types, model, models } from "mongoose";

export interface IJob extends Document {
  title: string;
  slug: string;
  id: string;
  type: string;
  locationType: string;
  location: string;
  description: string;
  salary: number;
  companyName: string;
  applicationEmail: string;
  applicationUrl: string;
  companyLogoUrl: string;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema: Schema<IJob> = new Schema<IJob>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    id: { type: String, required: true },
    type: { type: String, required: true },
    locationType: { type: String, required: true, },
    location: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: Number, required: true },
    companyName: { type: String, required: true },
    applicationEmail: { type: String, required: true },
    applicationUrl: { type: String, required: true },
    companyLogoUrl: { type: String, required: true },
    approved: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Job = models.Job || model<IJob>("Job", JobSchema);
