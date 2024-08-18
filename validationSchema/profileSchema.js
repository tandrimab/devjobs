import { z } from "zod";

const userDetails = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  experience: z.string().min(1, { message: "Years of Experience is required" }),
  socialProfile: z.string().min(1, { message: "Social Profile is required" }),
});

const educationDetails = z.object({
  college: z.string().min(1, { message: "College is required" }),
  graduationDate: z.coerce.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  degree: z.string().min(1, { message: "Degree is required" }),
  major: z.string().min(1, { message: "Major is required" }),
  gpa: z.coerce
    .number({
      required_error: "GPA is required",
      invalid_type_error: "GPA must be a number",
    })
    .int()
    .positive()
    .min(1, { message: "GPA should be at least 1" }),
});

const experienceDetails = z.discriminatedUnion("stillWorking", [
  z.object({
    company: z.string().min(1, { message: "Company is required" }),
    position: z.string().min(1, { message: "Position is required" }),
    startDate: z.coerce.date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!",
    }),
    endDate: z.string().optional(),
    stillWorking: z.literal(true),
    jobDescription: z.string({
      required_error: "This field cannot be empty!",
    }),
  }),
  z.object({
    company: z.string().min(1, { message: "Company is required" }),
    position: z.string().min(1, { message: "Position is required" }),
    startDate: z.coerce.date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!",
    }),
    endDate: z.coerce.date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!",
    }),
    stillWorking: z.literal(false),
    jobDescription: z.string().min(1, {
      message: "This field cannot be empty!",
    }),
  }),
]);

const applicationDetails = z.object({
  skills: z
    .array(
      z
        .object({
          skill: z.string(),
          id: z.string().optional(),
        })
    )
    .refine((data) => data.length > 0 && data[0].skill !== "", {
      message: "Please add at least one skill",
      path: ["skills"]
    }),
  coverLetter: z
    .string()
    .min(1, {
      message: "This field cannot be empty!",
    })
    .max(500),
});

const personalDetailsSchema = z.object({
  selectedTab: z.literal("1"),
  personalDetails: userDetails,
});

const educationSchema = z.object({
  selectedTab: z.literal("2"),
  education: educationDetails,
});

const experienceDetailsSchema = z.object({
  selectedTab: z.literal("3"),
  experience: experienceDetails,
});

const applicationDetailsSchema = z.object({
  selectedTab: z.literal("4"),
  application: applicationDetails,
});

const profileSchema = z.discriminatedUnion("selectedTab", [
  personalDetailsSchema,
  educationSchema,
  experienceDetailsSchema,
  applicationDetailsSchema,
]);

export default profileSchema;
