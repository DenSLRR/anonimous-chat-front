import {
  authControllerRegister,
  RegisterDto,
  RegistrationDtoRes,
} from "@/shared/api/generated.ts";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useMutation } from "@tanstack/vue-query";
import { useUserStore } from "@/entities/user/store.ts";
import { useRouter } from "vue-router";

type FormData = RegisterDto;

export function useRegister() {
  const userStore = useUserStore();
  const router = useRouter();

  const schema = yup.object({
    email: yup.string().required("Required"),
    password: yup.string().required("Required"),
    username: yup.string().required("Required"),
  });

  const {
    defineField,
    setFieldError,
    handleSubmit,
    values,
    setFieldValue,
    resetForm,
    errors,
  } = useForm<FormData>({
    validationSchema: schema,
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  defineField("email");
  defineField("password");
  defineField("username");

  const submitMutation = useMutation({
    mutationFn: authControllerRegister,
    onSuccess(res: RegistrationDtoRes) {
      userStore.access_token = res.accessToken;
      userStore.userId = res.user.id;
      userStore.userName = res.user.username;
      userStore.getChats();
      resetForm();
      router.push("/chats");
      console.log(res);
    },
    onError(data) {
      console.log(data);
      setFieldError("email", "Invalid email address");
    },
  });

  const onSubmit = handleSubmit((values: FormData) => {
    submitMutation.mutate(values);
  });

  return {
    handleSubmit: onSubmit,
    values,
    setFieldValue,
    errors,
    isLoading: submitMutation.isPending,
  };
}
