import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { CloseOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import useRouterParams from "../hooks/useRouterParams";
import { useFetchCollection } from "../hooks/useFetchCollection";
import getTokenData from "../utils/getTokenData";

const initialValues = {
  description: "",
  priority: "Medium",
};

export default function TicketModal({ closeModal }) {
  const { email } = getTokenData();
  const { queryParams, currentUrl } = useRouterParams();
  const [collectionTitle, setCollectionTitle] = useState("");
  const [issueKey, setIssueKey] = useState("");

  const { collectionId: collectionIdFromParams } = useParams();
  const collectionIdFromQuery = queryParams.get("collectionId");

  const collectionId = collectionIdFromParams || collectionIdFromQuery;

  const currentCollection = useFetchCollection(collectionId);
  const { title } = currentCollection;

  useEffect(() => {
    if (title) {
      setCollectionTitle(title);
    }
  }, [title]);

  const validationSchema = Yup.object().shape({
    description: Yup.string().required("Description is required"),
    priority: Yup.string().required("Priority is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { description, priority } = values;

    try {
      const ticket = await axios.post(`${SERVER_URL}/api/jira/issue/create`, {
        email,
        collectionTitle,
        currentUrl,
        description,
        priority,
      });
      setIssueKey(ticket.data?.key);
      resetForm();
    } catch (error) {
      console.error("Error:", error);
    }

    setSubmitting(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-md shadow-md">
        <button
          className="text-right w-full mb-2 text-sm text-gray-600 no-underline hover:underline"
          onClick={closeModal}
        >
          <CloseOutlined />
        </button>
        <h2 className="text-center text-lg font-semibold mb-4">
          {issueKey ? "Sucsessfully created!" : "Create Support Ticket"}
        </h2>
        {issueKey && (
          <div className="text-center text-lg font-semibold my-6 hover:text-teal-600">
            <a
              className="block w-full text-md p-2 rounded border border-teal-600 font-bold hover:text-teal-700 lg:mt-0"
              href={`https://course-project.atlassian.net/jira/software/projects/KAN/boards/1?selectedIssue=${issueKey}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Ticket
            </a>
          </div>
        )}
        {!issueKey && (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
                    htmlFor="description"
                  >
                    Description:
                  </label>
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm mb-2"
                  />
                  <Field
                    id="description"
                    name="description"
                    as="textarea"
                    className="form-textarea w-full dark:bg-gray-900"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
                    htmlFor="priority"
                  >
                    Priority:
                  </label>
                  <Field
                    id="priority"
                    name="priority"
                    as="select"
                    className="block w-full py-1 px-2 border border-gray-300 bg-white dark:bg-gray-800/[.3] rounded-md shadow-sm focus:outline-none focus:ring-teal-600 focus:border-teal-700 sm:text-sm"
                    required
                  >
                    <option value="Highest">Highest</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                    <option value="Lowest">Lowest</option>
                  </Field>
                  <ErrorMessage
                    name="priority"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <button
                  className="block w-full text-md p-2 rounded border border-teal-600 font-bold hover:text-teal-700 lg:mt-0"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create"}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}
