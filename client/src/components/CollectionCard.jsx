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
import { useRef } from "react";
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
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useCollectionActions } from "../hooks/useCollectionActions";

export default function CollectionCard(props) {
  const { _id, title, image, category, description } = props;
  const categories = useSelector((state) => state.collections.categories);
  const dispatch = useDispatch();

  const {
    collections,
    handleSaveClick,
    handleDeleteClick,
    isLoading,
    error,
    selectedImage,
    setSelectedImage,
  } = useCollectionActions(dispatch);

  const ref = useRef(null);

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

  return (
    <Formik
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
                    <div className="flex flex-col items-center">
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
    </Formik>
  );
}
