import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleEdit } from "../store/collectionsSlice";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import ToolButton from "./Toolbar/ToolButton";
import { Input } from "antd";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { useRef } from "react";
import { headingsPlugin } from "@mdxeditor/editor";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
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
import { useCategories } from "../hooks/useCategories";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { fileToBase64 } from "file64";
import { setCollections } from "../store/collectionsSlice";

export default function CollectionCard(props) {
  const { _id, title, image, category, description } = props;
  const collections = useSelector((state) => state.collections.collections);

  const ref = useRef(null);
  const dispatch = useDispatch();

  const { categories } = useCategories();

  const [selectedImage, setSelectedImage] = useState(null);

  const isEditing = useSelector((state) =>
    state.collections.editingCollections.includes(_id)
  );

  const handleEditClick = () => {
    dispatch(toggleEdit(_id));
  };

  const handleCancelClick = () => {
    dispatch(toggleEdit(_id));
    setSelectedImage(null);
  };

  const handleDelete = (deletedId) => {
    dispatch(
      setCollections(
        collections.filter((collection) => collection._id !== deletedId)
      )
    );
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`${SERVER_URL}/api/collections/${_id}`);
      handleDelete(_id);
      console.log("Collection deleted successfully");
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };

  //TODO: make fix of the cyclic values errorwhen save
  const handleSaveClick = async (values) => {
    console.log("values", values);

    const image64 =
      values.image instanceof File
        ? await fileToBase64(values.image)
        : values.image;

    const updatedCollectionWithBase64Image = {
      ...values,
      image: image64,
    };
    try {
      const response = await axios.put(
        `${SERVER_URL}/api/collections/${_id}`,
        updatedCollectionWithBase64Image
      );

      const updatedCollections = collections.map((collection) => {
        if (collection._id === _id) {
          return response.data;
        } else {
          return collection;
        }
      });

      dispatch(setCollections(updatedCollections));
      dispatch(toggleEdit(_id));
      setSelectedImage(null);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        title: props.title,
        description: props.description,
        image: props.image,
        category: props.category,
      }}
      onSubmit={(values, { setSubmitting }) => {
        handleSaveClick(values);
        setSubmitting(false);
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
                    to={`/collections/${_id}/items`}
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
                      onBlur={formikProps.handleBlur}
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
                      <ToolButton title="Save" handleAction={handleSaveClick}>
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
                    <ToolButton handleAction={handleDeleteClick}>
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
                    <div className="flex flex-col items-center">
                      <div className="w-full mt-2">
                        <Input
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
                          value={formikProps.values.category}
                          onChange={(e) => {
                            const value = e.target.value;
                            formikProps.setFieldValue("category", value);
                          }}
                          className="block w-full mt-1 lg:mb-0 py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
    </Formik>
  );
}
