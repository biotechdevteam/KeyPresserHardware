"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Application, ApplicationSchema } from "@/types/ApplicantionSchema";


const ApplicationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Application>({
    resolver: zodResolver(ApplicationSchema),
  });

  const onSubmit = (data: Application) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-primary p-6 rounded-lg shadow-lg text-white animate-fadeInUp"
    >
      <div className="mb-4">
        <label htmlFor="motivation_letter" className="block mb-1 font-bold">
          Motivation Letter
        </label>
        <Textarea
          id="motivation_letter"
          {...register("motivation_letter")}
          className="w-full bg-muted text-muted-foreground"
        />
        {errors.motivation_letter && (
          <p className="text-red-500 text-sm mt-1">
            {errors.motivation_letter.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="specialization_area" className="block mb-1 font-bold">
          Specialization Area
        </label>
        <Input
          id="specialization_area"
          {...register("specialization_area")}
          className="w-full bg-muted text-muted-foreground"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="resume_url" className="block mb-1 font-bold">
          Resume URL
        </label>
        <Input
          id="resume_url"
          {...register("resume_url")}
          className="w-full bg-muted text-muted-foreground"
        />
        {errors.resume_url && (
          <p className="text-red-500 text-sm mt-1">
            {errors.resume_url.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="bg-secondary text-white w-full hover:bg-primary transition duration-300"
      >
        Submit Application
      </Button>
    </form>
  );
};

export default ApplicationForm;
