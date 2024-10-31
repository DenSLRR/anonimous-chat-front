import {
  AddMessageDto,
  AddMessageRes,
  chatControllerAddMessage,
} from "@/shared/api/generated.ts";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useMutation } from "@tanstack/vue-query";
import { useUserStore } from "@/entities/user/store.ts";

type FormData = AddMessageDto;

export function sendMessage() {
  const userStore = useUserStore();

  const schema = yup.object({
    encryptedContent: yup.string().required("Required"),
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
      encryptedContent: "",
      chatId: 0,
      senderId: 0,
      username: "",
    },
  });

  defineField("encryptedContent");

  setFieldValue("chatId", userStore.activeChat!.id);
  setFieldValue("senderId", userStore.userId!);
  setFieldValue("username", userStore.userName!);

  const submitMutation = useMutation({
    mutationFn: chatControllerAddMessage,
    onSuccess(res: AddMessageRes) {
      console.log(res);
      resetForm();
    },
    onError(data) {
      console.log(data);
      setFieldError("encryptedContent", "Invalid email address");
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
