import {
  authControllerLogin,
  LoginDto,
  LoginDtoRes,
} from "@/shared/api/generated.ts";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useMutation } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { useUserStore } from "@/entities/user/store.ts";

type FormData = LoginDto;

export function useLogin() {
  const userStore = useUserStore();
  const router = useRouter();

  const schema = yup.object({
    email: yup.string().required("Required"),
    password: yup.string().required("Required"),
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
    },
  });

  defineField("email");
  defineField("password");

  const submitMutation = useMutation({
    mutationFn: authControllerLogin,
    onSuccess(res: LoginDtoRes) {
      resetForm();
      userStore.access_token = res.accessToken;
      //@ts-ignore
      userStore.userId = res.user.id;
      //@ts-ignore
      userStore.userName = res.user.username;
      userStore.getChats();
      router.push("/chats");
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
