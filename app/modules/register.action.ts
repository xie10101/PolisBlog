const registerUser = async (
  prevState: { message: string } | undefined,
  formData: FormData,
) => {
  'use server';

  const { errors, message } = await registerUser(prevState, formData);

  return { errors, message };
};
