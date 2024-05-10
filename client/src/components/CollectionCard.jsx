import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsEditing } from "../store/collectionsSlice";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import ToolButton from "./ToolButton";
import { Input } from "antd";
const { TextArea } = Input;
import ReactMarkdown from "react-markdown";
import { useState } from "react";
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

export default function CollectionCard(props) {
  const { _id, name, image, category, description } = props;

  const ref = useRef(null);
  const dispatch = useDispatch();
  const isEditing = useSelector((state) => state.collections.isEditing);

  const [markdown, setMarkdown] = useState("Hello world");

  const handleEditorChange = (value) => {
    setMarkdown(ref.current.getMarkdown());
  };
  const handleEditClick = () => {
    dispatch(setIsEditing());
  };

  const handleSaveClick = () => {
    setMarkdown(ref.current.getMarkdown());
  };

  return (
    <div className="flex flex-col justify-between h-full border p-4 rounded-lg">
      <div className="flex flex-col">
        <div className="flex justify-between mb-2">
          <h2 className="text-xl font-bold">{name}</h2>
          <div>
            {!isEditing && (
              <ToolButton title="Edit" handleAction={handleEditClick}>
                <EditOutlined />
              </ToolButton>
            )}
            {isEditing && (
              <>
                <ToolButton title="Save" handleAction={handleSaveClick}>
                  <CheckOutlined />
                </ToolButton>
                <ToolButton title="Cancel" handleAction={handleEditClick}>
                  <CloseOutlined />
                </ToolButton>
              </>
            )}

            <ToolButton>
              <DeleteOutlined title="Delete" />
            </ToolButton>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="lg:mr-3">
            {image && (
              <img
                src={image}
                alt={name}
                className="w-auto lg:w-56 h-50  mr-4 rounded-lg"
              />
            )}
            <p className="font-bold mt-2">Category: {category}</p>
          </div>
          <div className="w-full">
            {!isEditing && <ReactMarkdown>{markdown}</ReactMarkdown>}
            {isEditing && (
              <div>
                <MDXEditor
                  ref={ref}
                  markdown={markdown}
                  onChange={handleEditorChange}
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
      <div className="ml-auto">
        {!isEditing && (
          <Link
            className="text-lg font-medium hover:text-teal-600"
            to={`/collection/${_id}`}
          >
            Show
          </Link>
        )}
      </div>
    </div>
  );
}
