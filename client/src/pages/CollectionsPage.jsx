import React from "react";
import CollectionList from "../components/CollectionList";
import ToolBar from "../components/Toolbar/ToolBar";
import ToolButton from "../components/Toolbar/ToolButton";
import { PlusOutlined } from "@ant-design/icons";
import Header from "../components/Layout/Header";
import { useNavigate } from "react-router-dom";

const CollectionsPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header title="Collections" />
      <ToolBar>
        <ToolButton
          title="Add"
          handleAction={() => navigate("/collections/add")}
        >
          <PlusOutlined />
        </ToolButton>
      </ToolBar>
      <CollectionList />
    </>
  );
};

export default CollectionsPage;
