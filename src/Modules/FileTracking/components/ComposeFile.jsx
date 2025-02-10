import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  FileInput,
  TextInput,
  Textarea,
  Title,
  Text,
  Select,
  Group,
} from "@mantine/core";
import { Upload, Trash } from "@phosphor-icons/react";
import { notifications } from "@mantine/notifications";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  designationsRoute,
  createFileRoute,
} from "../../../routes/filetrackingRoutes";

axios.defaults.withCredentials = true;

export default function Compose() {
  const [file, setFile] = React.useState(null);
  const [receiver_username, setReceiverUsername] = React.useState("");
  const [receiver_designation, setReceiverDesignation] = React.useState("");
  const [receiver_designations, setReceiverDesignations] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [description, setDescription] = React.useState("");
  const token = localStorage.getItem("authToken");
  const roles = useSelector((state) => state.user.roles);
  let module = useSelector((state) => state.module.current_module);
  module = module.split(" ").join("").toLowerCase();
  const uploaderRole = useSelector((state) => state.user.role);
  const [designation, setDesignation] = React.useState(uploaderRole);
  const options = roles.map((role) => ({ value: role, label: role }));
  const receiverRoles = Array.isArray(receiver_designations)
    ? receiver_designations.map((role) => ({
        value: role,
        label: role,
      }))
    : [];

  const handleFileChange = (uploadedFile) => {
    setFile(uploadedFile);
  };

  const removeFile = () => {
    setFile(null);
  };

  const postSubmit = () => {
    removeFile();
    setDesignation("");
    setReceiverDesignation("");
    setReceiverDesignations("");
    setReceiverUsername("");
    setSubject("");
    setDescription("");
  };

  useEffect(() => {
    setDesignation(roles);
    console.log("Receiver Roles:", receiverRoles);
  }, [roles, receiverRoles]);
  // eslint-disable-next-line no-unused-vars
  const fetchRoles = async () => {
    const response = await axios.get(
      `${designationsRoute}${receiver_username}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    setReceiverDesignations(response.data.designations);
  };
  // eslint-disable-next-line no-unused-vars
  const handleSaveDraft = async () => {
    notifications.show({
      title: "Draft saved successfully",
      message: "The draft has been saved successfully.",
      color: "green",
      position: "top-center",
    });
    postSubmit();
  };

  const handleCreateFile = async () => {
    if (!file) {
      notifications.show({
        title: "Error",
        message: "Please upload a file.",
        color: "red",
        position: "top-center",
      });
      return;
    }

    try {
      const fileAttachment =
        file.upload_file instanceof File
          ? file.upload_file
          : new File([file.upload_file], "uploaded_file", {
              type: "application/octet-stream",
            });
      const formData = new FormData();
      formData.append("subject", subject);
      formData.append("description", description);
      formData.append("designation", designation);
      formData.append("receiver_username", receiver_username);
      formData.append("receiver_designation", receiver_designation);
      formData.append("file", fileAttachment);
      formData.append("src_module", module);
      const response = await axios.post(`${createFileRoute}`, formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.status === 201) {
        notifications.show({
          title: "File sent successfully",
          message: "The file has been sent successfully.",
          color: "green",
          position: "top-center",
        });
      }
    } catch (err) {
      console.error("Error sending file:", err);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={2} mb="md">
        Compose File
      </Title>
      <Box component="form" onSubmit={(e) => e.preventDefault()}>
        <TextInput
          label="Title of File"
          placeholder="Enter file title here"
          mb="sm"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <Textarea
          label="Description"
          placeholder="Enter description here"
          mb="sm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Select
          label="Designation"
          placeholder="Select Sender's Designation"
          value={designation}
          data={options}
          mb="sm"
          onChange={(value) => setDesignation(value)}
        />
        <FileInput
          label="Attach file (PDF, JPG, PNG) (MAX: 10MB)"
          placeholder="Upload your file"
          accept="application/pdf,image/jpeg,image/png"
          icon={<Upload size={16} />}
          value={file}
          onChange={handleFileChange}
          mb="sm"
          withAsterisk
        />
        {file && (
          <Group position="apart" mt="sm">
            <Text>{file.name}</Text>
            <Button
              leftIcon={<Trash size={16} />}
              color="red"
              onClick={removeFile}
              compact
            >
              Remove File
            </Button>
          </Group>
        )}
        <Button
          type="submit"
          color="blue"
          style={{ display: "block", margin: "0 auto", width: "200px" }}
          onClick={handleCreateFile}
        >
          Submit
        </Button>
      </Box>
    </Card>
  );
}
