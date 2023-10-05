import { Rule } from "antd/es/form";

export const usernameValidation: Rule[] = [
  {
    required: true,
    message: "Username is required",
  },
  {
    min: 3,
    message: "Username is too short",
  },
];

export const passwordValidation: Rule[] = [
  {
    required: true,
    message: "Password is required",
  },
  {
    min: 8,
    message: "Password is too short",
  },
];

export const confirmPasswordValidation: Rule[] = [
  {
    required: true,
    message: "Password is required",
  },
  {
    min: 8,
    message: "Password is too short",
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("The password don't match"));
    },
  }),
];

export const emailValidation: Rule[] = [
  {
    type: "email",
    message: "Invalid email",
  },
  {
    required: true,
    message: "Email is required",
  },
];

export const boardNameValidation: Rule[] = [
  {
    required: true,
    message: "Board name is required",
  },
  {
    min: 3,
    message: "Board name is too short",
  },
  {
    max: 50,
    message: "Board name is too long",
  },
];

export const boardDescriptionValidation: Rule[] = [
  {
    required: true,
    message: "Board description is required",
  },
  {
    min: 3,
    message: "Board description is too short",
  },
];

export const taskTitleValidation: Rule[] = [
  {
    required: true,
    message: "Task title is required",
  },
  {
    min: 3,
    message: "Task title is too short",
  },
  {
    max: 50,
    message: "Task title is too long",
  },
];

export const taskDescriptionValidation: Rule[] = [
  {
    required: true,
    message: "Task description is required",
  },
  {
    min: 3,
    message: "Task description is too short",
  },
];
