import {
  AddUserToChatDto,
  chatControllerAddUserToChat,
  ChatDtoRes,
} from "@/shared/api/generated.ts";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useMutation } from "@tanstack/vue-query";
import { useUserStore } from "@/entities/user/store.ts";

type FormData = AddUserToChatDto;

export function addUserToChat() {
  const userStore = useUserStore();

  const schema = yup.object({
    userId: yup.string().required("Required"),
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
      chatId: 3,
    },
  });
  setFieldValue("chatId", userStore.activeChat!.id);
  defineField("userId");

  const submitMutation = useMutation({
    mutationFn: chatControllerAddUserToChat,
    onSuccess(res: ChatDtoRes) {
      console.log(res);
      resetForm();
    },
    onError(data) {
      console.log(data);
      setFieldError("userId", "Invalid email address");
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
