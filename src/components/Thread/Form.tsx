import {
  Button,
  Modal as ChakraModal,
  IconButton,
  IconButtonProps,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { ThreadWithComments } from ".";
import logger from "../../utils/logger";
import { trpc } from "../../utils/trpc";
import { AlertPop } from "../Form/AlertPop";

type FormValues = ThreadWithComments;

interface FormProps {
  onSubmit: (data: FormValues) => void;
  defaultValues?: Partial<FormValues>;
}

export const Form = ({ onSubmit, defaultValues }: FormProps) => {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues,
  });

  const handler = (data: FormValues) => {
    onSubmit(data);
  };

  const { errors } = formState;

  return (
    <form onSubmit={handleSubmit(handler)}>
      <ModalBody>
        <Input
          variant="flushed"
          type="text"
          placeholder="Title"
          {...register("title", {
            required: { value: true, message: "Must not be empty" },
            minLength: { value: 3, message: "Too short" },
            maxLength: { value: 1024, message: "Too long" },
          })}
        />
        {errors.title && <AlertPop message={errors.title.message || ""} />}
        <Textarea
          variant="flushed"
          placeholder="Content"
          {...register("content", {
            required: { value: true, message: "Must not be empty" },
            minLength: { value: 3, message: "Too short" },
            maxLength: { value: 1024, message: "Too long" },
          })}
        />
        {errors.content && <AlertPop message={errors.content.message || ""} />}
      </ModalBody>
      <ModalFooter>
        <Button
          borderRadius="md"
          bg="green.300"
          _hover={{ bg: "green.400" }}
          type="submit"
        >
          Submit
        </Button>
      </ModalFooter>
    </form>
  );
};

const allThreads = "thread.all";

interface ThreadFormProps extends Pick<IconButtonProps, "icon"> {
  thread?: ThreadWithComments;
  subforumId?: string;
  mode: "update" | "create" | "delete" | "archive" | "unarchive";
  label?: string;
}

export const ThreadForm = ({
  thread,
  subforumId,
  mode,
  icon,
  label,
}: ThreadFormProps) => {
  const utils = trpc.useContext();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const createThread = trpc.useMutation("thread.create", {
    async onSuccess() {
      await utils.invalidateQueries([allThreads]);
    },
  });

  const updateThread = trpc.useMutation("thread.update", {
    async onSuccess() {
      await utils.invalidateQueries([allThreads]);
    },
  });

  const deleteThread = trpc.useMutation("thread.delete", {
    async onSuccess() {
      await utils.invalidateQueries([allThreads]);
    },
  });

  const archiveThread = trpc.useMutation("thread.archive", {
    async onSuccess() {
      await utils.invalidateQueries([allThreads]);
    },
  });

  const unarchiveThread = trpc.useMutation("thread.unarchive", {
    async onSuccess() {
      await utils.invalidateQueries([allThreads]);
    },
  });

  const session = useSession();

  const userId = session.data?.userId;

  const toast = useToast();

  const middlebit = () => {
    switch (mode) {
      case "create":
        return (
          userId &&
          subforumId && (
            <Form
              defaultValues={{ subforumId }}
              onSubmit={async (submitValues) => {
                createThread
                  .mutateAsync({
                    ...submitValues,
                    userId: userId,
                  })
                  .then(() => {
                    onClose();
                    return toast({
                      title: "Threaded!",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    });
                  })
                  .catch(logger.error);
              }}
            />
          )
        );
      case "update":
        return (
          userId &&
          thread &&
          thread.id && (
            <Form
              defaultValues={thread}
              onSubmit={async (submitValues) => {
                updateThread
                  .mutateAsync({
                    userId: userId,
                    id: thread.id,
                    data: submitValues,
                  })
                  .then(() => {
                    onClose();
                    return toast({
                      title: "Updated!",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    });
                  })
                  .catch(logger.error);
              }}
            />
          )
        );
      case "delete":
        return (
          thread && (
            <Button
              onClick={() =>
                deleteThread.mutateAsync({ id: thread.id }).then(() => {
                  onClose();
                  return toast({
                    title: "Deleted!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                })
              }
            >
              Delete thread titled: {thread?.title} ?
            </Button>
          )
        );
      case "archive":
        return (
          thread && (
            <Button
              onClick={() =>
                archiveThread
                  .mutateAsync({ id: thread.id })
                  .then(() => {
                    onClose();
                    return toast({
                      title: "Archived!",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    });
                  })
                  .catch(logger.error)
              }
            >
              Archive thread titled: {thread?.title} ?
            </Button>
          )
        );
      case "unarchive":
        return (
          thread && (
            <Button
              onClick={() =>
                unarchiveThread
                  .mutateAsync({ id: thread.id })
                  .then(() => {
                    onClose();
                    return toast({
                      title: "Unarchived!",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    });
                  })
                  .catch(logger.error)
              }
            >
              Unarchive thread titled: {thread?.title} ?
            </Button>
          )
        );
      default:
        return <Text>Something went wrong...</Text>;
    }
  };

  return (
    <>
      {label && (
        <Button
          maxWidth="max-content"
          onClick={onOpen}
          fontSize="10px"
          variant="ghost"
          size="xs"
        >
          {label}
        </Button>
      )}
      {icon && (
        <IconButton
          aria-label=""
          maxWidth="max-content"
          icon={icon}
          onClick={onOpen}
          size="sm"
        />
      )}
      <ChakraModal isOpen={isOpen} onClose={onClose} isCentered variant="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {label}
            {icon}
          </ModalHeader>
          <ModalCloseButton mt="8px" />
          {middlebit()}
        </ModalContent>
      </ChakraModal>
    </>
  );
};
