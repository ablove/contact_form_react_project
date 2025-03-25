// src/components/ContactForm.tsx
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface IFormInputs {
  name: string;
  email: string;
  message: string;
  address: {
    street: string;
    city: string;
    zip: string;
  };
}

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must have a valid domain (e.g., .com)"
    ),
  message: Yup.string().required("Message is required"),
  address: Yup.object().shape({
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    zip: Yup.string().required("Zip code is required"),
  }),
});

const ContactForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, submitCount },
    reset,
    setValue,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "John Doe",
      email: "john.doe@example.com",
      message: "Hello, this is a test message.",
      address: {
        street: "123 Main St",
        city: "Anytown",
        zip: "12345",
      },
    },
  });

  useEffect(() => {
    // Example of using useEffect to set a value programmatically
    setValue("name", "Jane Doe");
  }, [setValue]);

  const onSubmit = async (data: IFormInputs) => {
    try {
      // Simulate an async operation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onError = (errors: Record<string, unknown>) => {
    console.error(errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input id="name" {...field} disabled={isSubmitting} />
          )}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input id="email" {...field} disabled={isSubmitting} />
          )}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <textarea id="message" {...field} disabled={isSubmitting} />
          )}
        />
        {errors.message && <p className="error">{errors.message.message}</p>}
      </div>
      <div className="form-group">
        <h2>Address</h2>
        <div className="form-group">
          <label htmlFor="street">Street</label>
          <Controller
            name="address.street"
            control={control}
            render={({ field }) => (
              <input id="street" {...field} disabled={isSubmitting} />
            )}
          />
          {errors.address?.street && (
            <p className="error">{errors.address.street.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <Controller
            name="address.city"
            control={control}
            render={({ field }) => (
              <input id="city" {...field} disabled={isSubmitting} />
            )}
          />
          {errors.address?.city && (
            <p className="error">{errors.address.city.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="zip">Zip Code</label>
          <Controller
            name="address.zip"
            control={control}
            render={({ field }) => (
              <input id="zip" {...field} disabled={isSubmitting} />
            )}
          />
          {errors.address?.zip && (
            <p className="error">{errors.address.zip.message}</p>
          )}
        </div>
      </div>
      <div className="button-group">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <button type="button" onClick={() => reset()} disabled={isSubmitting}>
          Reset
        </button>
      </div>
      <div className="status">
        <p>Is Submitting: {isSubmitting ? "Yes" : "No"}</p>
        <p>Is Submitted: {isSubmitted ? "Yes" : "No"}</p>
        <p>Submit Count: {submitCount}</p>
      </div>
    </form>
  );
};

export default ContactForm;
