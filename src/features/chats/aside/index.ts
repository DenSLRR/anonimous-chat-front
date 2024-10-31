import axios from "axios";
import {
  chatControllerCreate,
  ChatDtoRes,
  CreateChatDto,
} from "@/shared/api/generated.ts";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useMutation } from "@tanstack/vue-query";
import { useUserStore } from "@/entities/user/store.ts";
import { generateEncryptKey } from "@/shared/utils";

export const getAllUserChats = async (): Promise<ChatDtoRes[]> => {
  const userStore = useUserStore();
  const userId = userStore.userId;

  const response = await axios.get(`http://localhost:3000/user/chats`, {
    params: { userId },
  });

  console.log(response.data);
  return response.data;
};

type FormData = CreateChatDto;

export function useCreateChat() {
  const userStore = useUserStore();

  const schema = yup.object({
    name: yup.string().required("Required"),
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
      name: "",
      userIds: [userStore.userId!],
      encryptedChatKey: "",
    },
  });

  (async () => {
    const encryptedChatKey = await generateEncryptKey();
    setFieldValue("encryptedChatKey", encryptedChatKey);
  })();

  defineField("name");

  const submitMutation = useMutation({
    mutationFn: chatControllerCreate,
    onSuccess(res: ChatDtoRes) {
      resetForm();
      userStore.getChats();
      console.log(res);
    },
    onError(data) {
      console.log(data);
      setFieldError("name", "Invalid email address");
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
