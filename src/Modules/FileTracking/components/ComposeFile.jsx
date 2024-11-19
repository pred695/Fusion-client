import React from "react";
import {
  Box,
  Button,
  Card,
  FileInput,
  TextInput,
  Textarea,
  Title,
  ActionIcon,
  Text,
  Select,
} from "@mantine/core";
import { Upload, FloppyDisk } from "@phosphor-icons/react";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";

export default function Compose() {
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      createAs: "",
      file: null,
      remark: "",
      forwardTo: "",
      receiverDesignation: "",
    },
    validate: {
      file: (value) => (value ? null : "File is required"),
    },
  });

  const handleSaveDraft = () => {
    notifications.show({
      title: "Draft Saved",
      message: "File has been saved as draft",
    });
  };

  const handleSubmit = (values) => {
    notifications.show({
      title: "File Submitted",
      message: `File with title "${values.title}" has been successfully submitted.`,
    });
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        backgroundColor: "#F5F7F8",
        position: "relative",
        margin: "32px",
      }}
    >
      {/* Icon at Top Right with Text Beneath */}
      <Box
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ActionIcon
          size="lg"
          variant="outline"
          color="blue"
          onClick={handleSaveDraft}
          title="Save as Draft"
        >
          <FloppyDisk size={20} />
        </ActionIcon>
        <Text color="blue" size="xs" mt={4}>
          Save as Draft
        </Text>
      </Box>

      <Title order={2} mb="md">
        Compose File
      </Title>
      <Box
        component="form"
        onSubmit={form.onSubmit(handleSubmit)}
        style={{
          backgroundColor: "#F5F7F8",
          padding: "16px",
        }}
      >
        <TextInput
          label="Title of File"
          placeholder="Enter file title"
          mb="sm"
          {...form.getInputProps("title")}
        />
        <Textarea
          label="Description"
          placeholder="Enter description"
          mb="sm"
          {...form.getInputProps("description")}
        />
        <TextInput
          label="Create as"
          placeholder="Enter creation type"
          mb="sm"
          {...form.getInputProps("createAs")}
        />
        <FileInput
          label={
            <span>
              Attach file (PDF, JPG, PNG) (MAX: 10MB)
              <Text color="red" component="span">
                {" "}
                *
              </Text>
            </span>
          }
          placeholder="Upload file"
          accept="application/pdf,image/jpeg,image/png"
          icon={<Upload size={14} />}
          mb="sm"
          {...form.getInputProps("file")}
          error={form.errors.file}
        />
        <Textarea
          label="Remark"
          placeholder="Enter remark"
          mb="sm"
          {...form.getInputProps("remark")}
        />
        <TextInput
          label="Forward To"
          placeholder="Enter forward recipient"
          mb="sm"
          {...form.getInputProps("forwardTo")}
        />
        <Select
          label="Receiver Designation"
          placeholder="Select designation"
          mb="sm"
          data={[
            { value: "Professor", label: "Professor" },
            { value: "Student", label: "Student" },
            { value: "Employee", label: "Employee" },
          ]}
          {...form.getInputProps("receiverDesignation")}
        />

        <Button
          type="submit"
          color="blue"
          style={{
            display: "block",
            margin: "0 auto",
            width: "200px",
          }}
        >
          Submit
        </Button>
      </Box>
    </Card>
  );
}
