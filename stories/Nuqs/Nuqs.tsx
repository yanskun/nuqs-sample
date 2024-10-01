"use client";

import Link from "next/link";
import { useQueryState, parseAsString } from "nuqs";
import { FormProvider, useForm } from "react-hook-form";

export const Nuqs = () => {
  const formMethods = useForm<{ name: string }>();
  const { register, handleSubmit } = formMethods;
  const [name, setName] = useQueryState("name", parseAsString.withOptions({ history: 'push'}).withDefault(""));

  const onSubmit = handleSubmit((data) => {
    setName(data.name);
  });

  return (
    <div>
       <FormProvider {...formMethods}>
         <form onSubmit={onSubmit}>
           <input {...register("name")} />
           <button type="submit">Submit</button>
         </form>
       </FormProvider>

      <p>Hello, {name || "anonymous visitor"}!</p>

      <Link href="/sample">sample link</Link>
    </div>
  );
};
