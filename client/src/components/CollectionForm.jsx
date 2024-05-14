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

const CollectionForm = () => {
  const [selectedImage, setSelectedImage] = useState(defaultImage);
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
                  <option value="">Select category</option>
                  <option value="Books">Books</option>
                  <option value="Signs">Signs</option>
                  <option value="Silverware">Silverware</option>
                  <option value="Other">Other</option>
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
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
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
