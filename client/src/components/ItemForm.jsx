import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input } from "antd";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Chip from "./Chip";
import { useFetchTags } from "../hooks/useFetchTags";
import { useSelector } from "react-redux";

const ItemForm = ({ initialValues, tags, setTags }) => {
  const [editingTagIndex, setEditingTagIndex] = useState(null);
  const { collectionId, itemId } = useParams();
  const location = useLocation();
  const pathname = location.pathname;
  const { search } = location;
  const queryParams = new URLSearchParams(search);
  const collectionUserId = queryParams.get("userId");
  const navigate = useNavigate();
  useFetchTags();

  const availableTags = useSelector((state) => state.tags.tags);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (pathname === `/collections/${collectionId}/items/update`) {
      try {
        await axios.put(`${SERVER_URL}/api/items/update/${itemId}`, {
          ...values,
          tags,
        });
        resetForm();
        navigate(
          `/collections/${collectionId}/items?userId=${collectionUserId}`
        );
      } catch (error) {
        console.error(error.response.data.message);
      } finally {
        setSubmitting(false);
      }
    } else {
      try {
        const response = await axios.post(`${SERVER_URL}/api/items/addItem`, {
          ...values,
          tags: tags.map((tag) => tag.name),
          collectionId,
          userId: collectionUserId,
        });
        resetForm();
        navigate(
          `/collections/${collectionId}/items?userId=${collectionUserId}`
        );
      } catch (error) {
        console.error(error.response.data.message);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleTagDelete = (index, setFieldValue) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
    setEditingTagIndex(null);
    setFieldValue("tags", "");
  };

  const handleTagEdit = (index, setFieldValue) => {
    setEditingTagIndex(index);
    setFieldValue("tags", tags[index].name);
  };

  const handleTagClick = (tag) => {
    if (!tags.some((t) => t.name === tag.name)) {
      setTags([...tags, tag]);
    }
  };

  const handleKeyDown = (e, setFieldValue) => {
    if (editingTagIndex !== null) {
      if (e.key === " ") {
        e.preventDefault();
        const updatedTags = [...tags];
        updatedTags[editingTagIndex].name = e.target.value.trim();
        setTags(updatedTags);
        setEditingTagIndex(null);
        setFieldValue("tags", "");
      }
    } else {
      if (e.key === " ") {
        e.preventDefault();
        const newTag = e.target.value.trim();
        if (newTag !== "") {
          setTags([...tags, { _id: null, name: newTag }]);
          setFieldValue("tags", "");
        }
      }
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
  });

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-full">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className="flex flex-col items-center">
              <div className="mb-4 w-full  max-w-md">
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500"
                />
                <Field
                  id="title"
                  name="title"
                  as={Input}
                  value={values.title}
                  placeholder="Item name"
                  size="medium"
                />
              </div>
              <div className="mb-4 w-full  max-w-md">
                <Field name="tags">
                  {({ field }) => (
                    <>
                      <Input
                        {...field}
                        onChange={(e) => {
                          const selectedTag = availableTags.find(
                            (tag) => tag.name === e.target.value
                          );
                          if (selectedTag) {
                            handleTagClick(selectedTag);
                            setFieldValue("tags", "");
                            return;
                          }
                          setFieldValue("tags", e.target.value);
                        }}
                        onKeyDown={(e) => handleKeyDown(e, setFieldValue)}
                        size="medium"
                        autoFocus
                        placeholder={
                          itemId
                            ? "Enter <Space> to add tag or click on one to change"
                            : "Enter <Space> to add tag"
                        }
                        autoComplete="off"
                        list="tags"
                      />
                      <datalist id="tags">
                        {availableTags.map((tag) => (
                          <option
                            key={tag._id}
                            value={tag.name}
                            onClick={() => handleTagClick(tag, setFieldValue)}
                          />
                        ))}
                      </datalist>
                    </>
                  )}
                </Field>
              </div>

              <div className="flex flex-wrap w-full max-h-46  max-w-lg overflow-auto mb-6">
                {tags.map((tag, index) => (
                  <Chip
                    name="tags"
                    key={index}
                    marginRight={index === tags.length - 1 ? "mr-0" : "mr-2"}
                    title={tag.name}
                    chipAction={() => handleTagEdit(index, setFieldValue)}
                    onClick={() => handleTagDelete(index, setFieldValue)}
                    dismissible
                  />
                ))}
              </div>
              <button
                className="bg-teal-500 text-white py-2 px-8 rounded-md hover:bg-teal-600"
                type="submit"
                disabled={isSubmitting}
              >
                {pathname ===
                `/collections/${collectionId}/items/update/${itemId}`
                  ? isSubmitting
                    ? "Updating..."
                    : "Update item"
                  : isSubmitting
                  ? "Adding..."
                  : "Add item"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ItemForm;
