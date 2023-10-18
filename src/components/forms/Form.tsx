import { ReactElement, ReactNode, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

type FormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type FormProps = {
  children?: ReactElement | ReactNode;
  submitHandler: SubmitHandler<any>;
} & FormConfig;

const Form = ({
  children,
  submitHandler,
  defaultValues,
  resolver,
}: FormProps) => {
  const methods = useForm<FormProps>({
    defaultValues, // Pass default values directly
    resolver,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    submitHandler(data);
    methods.reset(defaultValues); // Reset the form using methods.reset
  };

  useEffect(() => {
    methods.reset(defaultValues); // Ensure the form is reset when defaultValues change
  }, [defaultValues, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
