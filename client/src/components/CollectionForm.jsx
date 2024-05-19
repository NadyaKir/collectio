import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SERVER_URL } from "../utils/config";
import axios from "axios";
import getTokenData from "../utils/getTokenData";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { fileToBase64 } from "file64";
import defaultImage from "../assets/placeholder-image.png";
import { useSelector } from "react-redux";
import { headingsPlugin } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  linkPlugin,
  linkDialogPlugin,
  CreateLink,
} from "@mdxeditor/editor";

const CollectionForm = () => {
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const categories = useSelector((state) => state.collections.categories);
  const navigate = useNavigate();

  const { userId } = getTokenData();

  const initialValues = {
    title: "",
    description: "",
    category: "",
    image: null,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string(),
    category: Yup.string().required("Category is required"),
    image: Yup.mixed()
      .nullable()
      .test("fileFormat", "Unsupported file format", (value) => {
        if (!value) return true;
        return ["image/jpeg", "image/png"].includes(value.type);
      }),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const image64 = values.image ? await fileToBase64(values.image) : "";

    const updatedValuesWithBase64Image = {
      ...values,
      image: image64,
      createdBy: userId,
    };

    try {
      await axios.post(
        `${SERVER_URL}/api/collections/addCollection`,
        updatedValuesWithBase64Image
      );
      navigate("/collections");
      console.log("Collection added successfully");
    } catch (error) {
      console.error("Error adding collection:", error);
    }
    setSubmitting(false);
  };

  //TODO: fix setCategory
  {
    /* <Formik
        initialValues={{
          title: props.title,
          description: props.description,
          image: props.image,
          category: props.category,
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSaveClick(values, _id);
          setSubmitting(false);
          dispatch(toggleEdit(_id));
        }}
        validationSchema=""
      >
        {(formikProps) => (
          <Form>
            <div className="flex flex-col justify-between h-full border p-4 rounded-lg">
              <div className="flex flex-col h-full">
                <div className="flex justify-between mb-2">
                  {!isEditing && (
                    <Link
                      className="text-xl font-bold hover:text-teal-600"
                      to={`/collections/${_id}/collections`}
                    >
                      {title}
                    </Link>
                  )}
                  {isEditing && (
                    <div className="w-full">
                      <Field
                        type="text"
                        id="title"
                        name="title"
                        value={formikProps.values.title}
                        onChange={formikProps.handleChange}
                        className="w-5/6 px-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                  )}
                  <div>
                    {!isEditing && (
                      <ToolButton title="Edit" handleAction={handleEditClick}>
                        <EditOutlined />
                      </ToolButton>
                    )}
                    {isEditing && (
                      <div className="flex">
                        <ToolButton
                          title="Save"
                          handleAction={() => {
                            formikProps.submitForm();
                          }}
                        >
                          <CheckOutlined />
                        </ToolButton>
                        <ToolButton
                          title="Cancel"
                          handleAction={handleCancelClick}
                        >
                          <CloseOutlined />
                        </ToolButton>
                      </div>
                    )}
                    {!isEditing && (
                      <ToolButton handleAction={() => handleDeleteClick(_id)}>
                        <DeleteOutlined title="Delete" />
                      </ToolButton>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="lg:mr-3">
                    {image && (
                      <img
                        src={
                          isEditing && selectedImage != null
                            ? selectedImage
                            : image
                        }
                        alt={title}
                        className="mr-4 rounded-lg"
                      />
                    )}
                    {!isEditing && (
                      <p className="font-bold mt-2">Category: {category}</p>
                    )}
                    {isEditing && (
                      <div className="flex flex-col collections-center">
                        <div className="w-full mt-2">
                          <Input
                            id="image"
                            name="image"
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              console.log("file", file);
                              formikProps.setFieldValue("image", file);
                              const imageUrl = URL.createObjectURL(file);
                              console.log(imageUrl);
                              setSelectedImage(imageUrl);
                            }}
                          />
                        </div>
                        <div className="flex w-full">
                          <p className="font-bold mt-2 mr-2">Category:</p>
                          <select
                            id="category"
                            name="category"
                            value={formikProps.values.category}
                            onChange={(e) => {
                              const value = e.target.value;
                              formikProps.setFieldValue("category", value);
                            }}
                            className="block w-full mt-1 lg:mb-0 py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                          >
                            {categories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-full mt-3">
                    {!isEditing && <ReactMarkdown>{description}</ReactMarkdown>}
                    {isEditing && (
                      <div className="w-full">
                        <MDXEditor
                          id="description"
                          name="description"
                          ref={ref}
                          markdown={description}
                          onChange={(value) =>
                            formikProps.setFieldValue("description", value)
                          }
                          onBlur={formikProps.handleBlur}
                          plugins={[
                            linkPlugin(),
                            linkDialogPlugin(),
                            headingsPlugin(),
                            toolbarPlugin({
                              toolbarContents: () => (
                                <>
                                  <UndoRedo />
                                  <BoldItalicUnderlineToggles />
                                  <CreateLink />
                                </>
                              ),
                            }),
                          ]}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik> */
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <div className="flex flex-col-reverse lg:flex-row lg:flex w-full">
          <div className="w-full">
            <Form>
              <div className="mb-4">
                <label htmlFor="title" className="block mb-2">
                  Title
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block mb-2">
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block mb-2">
                  Category
                </label>
                <Field
                  as="select"
                  id="category"
                  name="category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block mb-2">
                  Image
                </label>
                <Input
                  type="file"
                  name="image"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFieldValue("image", file);
                    const imageUrl = URL.createObjectURL(file);
                    setSelectedImage(imageUrl ? imageUrl : selectedImage);
                  }}
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600"
              >
                {isSubmitting ? "Adding..." : "Add Collection"}
              </button>
            </Form>
          </div>
          <div>
            <img src={selectedImage} className="mr-4 rounded-lg" />
          </div>
        </div>
      )}
    </Formik>
  );
};

export default CollectionForm;
