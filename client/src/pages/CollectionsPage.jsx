import React from "react";
import CollectionList from "../components/CollectionList";
import ToolBar from "../components/Toolbar/ToolBar";
import ToolButton from "../components/Toolbar/ToolButton";
import { PlusOutlined } from "@ant-design/icons";
import Header from "../components/Layout/Header";

import { useNavigate } from "react-router-dom";

const collections2 = [
  {
    _id: 1,
    name: "Books Collection",
    description: "A collection of interesting books.",
    category: "Books",
    image:
      "https://www.southernliving.com/thmb/ZY8yg3J65pJPh0X_wI1gncy0f3w=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/gettyimages-183822187-1-709a5ded972a426a9e214eba1f81c8a4.jpg",
  },
  {
    _id: 1,
    name: "Books Collection",
    description: "A collection of interesting books.",
    category: "Books",
    image:
      "https://www.southernliving.com/thmb/ZY8yg3J65pJPh0X_wI1gncy0f3w=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/gettyimages-183822187-1-709a5ded972a426a9e214eba1f81c8a4.jpg",
  },
  {
    _id: 1,
    name: "Books Collection",
    description: "A collection of interesting books.",
    category: "Books",
    image:
      "https://www.southernliving.com/thmb/ZY8yg3J65pJPh0X_wI1gncy0f3w=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/gettyimages-183822187-1-709a5ded972a426a9e214eba1f81c8a4.jpg",
  },
  {
    _id: 1,
    name: "Books Collection",
    description: "A collection of interesting books.",
    category: "Books",
    image:
      "https://www.southernliving.com/thmb/ZY8yg3J65pJPh0X_wI1gncy0f3w=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/gettyimages-183822187-1-709a5ded972a426a9e214eba1f81c8a4.jpg",
  },
  {
    _id: 1,
    name: "Books Collection",
    description:
      "A collection of signs from around the world.A collection of signs from around the world.A collection of signs from around the world.A collection of signs from around the world.A collection of signs from around the world.A collection of signs from around the world.A collection of signs from around the world.A collection of signs from around the world.A collection of signs from around the world.A collection of signs from around the world.",
    category: "Books",
    image:
      "https://www.southernliving.com/thmb/ZY8yg3J65pJPh0X_wI1gncy0f3w=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/gettyimages-183822187-1-709a5ded972a426a9e214eba1f81c8a4.jpg",
  },
  {
    _id: 2,
    name: "Signs Collection",
    description:
      "A collection of signs from around the world.A collection of signs from around the world.A collection of signs from around the world.A collection of signs from around the world.A collection of signs from around the world.A collection of signs from around the world.A collection of signs from around the world.A collection of signs from around the world.A collection of signs from around the world.A collection of signs from around the world.",
    category: "Signs",
    image:
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
  },
];

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
