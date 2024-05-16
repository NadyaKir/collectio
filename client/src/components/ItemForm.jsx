import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, Button } from "antd";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { useNavigate, useParams } from "react-router-dom";
import getTokenData from "../utils/getTokenData";
import Chip from "./Chip";

const ItemForm = () => {
  const [tags, setTags] = useState([]);
  const { userId } = getTokenData();
  const { collectionId } = useParams();
  const navigate = useNavigate();

  console.log(tags);
  const initialValues = {
    title: "",
    tag: "",
  };

  console.log(initialValues);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    try {
      const response = await axios.post(`${SERVER_URL}/api/items/addItem`, {
        ...values,
        tags,
        collectionId,
        userId,
      });
      console.log(response.data.message);
      resetForm();
      navigate(`/collections/${collectionId}/items`);
    } catch (error) {
      console.error(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleTagDelete = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleKeyDown = (e, setFieldValue) => {
    if (e.key === " ") {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (newTag !== "") {
        setTags([...tags, newTag]);
        setFieldValue("tags", "");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-full">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting, setFieldValue }) => (
            <Form className="flex flex-col items-center">
              <div className="mb-4 w-full  max-w-md">
                <Field
                  name="title"
                  as={Input}
                  placeholder="Item name"
                  size="medium"
                />
              </div>
              <div className="mb-4 w-full  max-w-md">
                <Field name="tags">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter <Space> to add tag"
                      onKeyDown={(e) => handleKeyDown(e, setFieldValue)}
                      size="medium"
                    />
                  )}
                </Field>
              </div>
              <div className="flex flex-wrap w-full max-h-46  max-w-lg overflow-auto mb-6">
                {tags.map((tag, index) => (
                  <Chip
                    key={index}
                    marginRight={index === tags.length - 1 ? "mr-0" : "mr-2"}
                    title={tag}
                    onClick={() => handleTagDelete(index)}
                    dismissible
                  />
                ))}
              </div>
              <button
                className="bg-teal-500 text-white py-2 px-8 rounded-md hover:bg-teal-600"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding item..." : "Add item"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ItemForm;
