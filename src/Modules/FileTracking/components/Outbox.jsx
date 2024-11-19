import React, { useState } from "react";
import { Box, Card, Title, Table, Tooltip, ActionIcon } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ArrowArcRight, Eye } from "@phosphor-icons/react";
import ViewFiles from "./ViewFile";

export default function Outboxfunc() {
  const [files] = useState([
    {
      fileType: "PDF",
      sentTo: "Employee-Myself",
      fileID: "CSE-2023-11-#596",
      subject: "Fusion Project Module",
      date: "Nov 16, 2023, 11:26 p.m",
    },
    {
      fileType: "PDF",
      sentTo: "Employee-Myself",
      fileID: "CSE-2023-11-#597",
      subject: "Another Project Module",
      date: "Nov 16, 2023, 11:26 p.m",
    },
  ]);

  const [selectedFile, setSelectedFile] = useState(null);

  // Mantine form for forward (if needed for future enhancements)
  const form = useForm({
    initialValues: {},
  });

  const handleViewFile = (file) => {
    setSelectedFile(file);
  };

  const handleBack = () => {
    setSelectedFile(null);
  };

  const handleForward = (file) => {
    alert(`Forwarding file: "${file.fileID}"`);
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ backgroundColor: "#F5F7F8", maxWidth: "100%", margin: "32px" }}
    >
      {!selectedFile && (
        <Title order={2} mb="md">
          Outbox
        </Title>
      )}

      {selectedFile ? (
        <div>
          <Title order={3} mb="md">
            File Subject
          </Title>
          <ViewFiles file={selectedFile} onBack={handleBack} />
        </div>
      ) : (
        <Box
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflowY: "auto",
            height: "400px",
            backgroundColor: "#fff",
          }}
        >
          <Table
            highlightOnHover
            style={{
              width: "100%",
              borderCollapse: "collapse",
              tableLayout: "fixed",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: "12px",
                    width: "8%",
                    border: "1px solid #ddd",
                  }}
                >
                  Forward
                </th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                  Sent as
                </th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                  Sent To
                </th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                  File ID
                </th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                  Subject
                </th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                  Date
                </th>
                <th
                  style={{
                    padding: "12px",
                    width: "8.5%",
                    border: "1px solid #ddd",
                  }}
                >
                  View File
                </th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index}>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      border: "1px solid #ddd",
                    }}
                  >
                    <Tooltip label="Forward" position="top" withArrow>
                      <ActionIcon
                        variant="light"
                        color="blue"
                        style={{
                          transition: "background-color 0.3s",
                          width: "2rem",
                          height: "2rem",
                        }}
                        onClick={() => handleForward(file)}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#ffebee")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                      >
                        <ArrowArcRight size="1rem" />
                      </ActionIcon>
                    </Tooltip>
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    {file.fileType}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    {file.sentTo}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    {file.fileID}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    {file.subject}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    {file.date}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    <ActionIcon
                      variant="outline"
                      color="black"
                      style={{
                        transition: "background-color 0.3s",
                        width: "2rem",
                        height: "2rem",
                      }}
                      onClick={() => handleViewFile(file)}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#e0e0e0")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "white")
                      }
                    >
                      <Eye size="1rem" />
                    </ActionIcon>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      )}
    </Card>
  );
}
