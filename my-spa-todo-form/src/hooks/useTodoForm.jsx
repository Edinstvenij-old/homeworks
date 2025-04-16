import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const todoSchema = z.object({
  task: z
    .string()
    .min(5, "Завдання повинно містити не менше 5 символів.")
    .max(100, "Максимум 100 символів."),
});

export const useTodoForm = (onSubmit) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(todoSchema),
    mode: "onSubmit",
  });

  const submit = (data) => {
    onSubmit(data);
    reset();
  };

  return {
    register,
    handleSubmit: handleSubmit(submit),
    errors,
  };
};
