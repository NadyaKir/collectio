import React from "react";
import Header from "../components/Layout/Header";
import CollectionForm from "../components/CollectionForm";

export default function NewCollectionPage() {
  return (
    <>
      <Header title="Add new collection" />
      <CollectionForm />
    </>
  );
}
