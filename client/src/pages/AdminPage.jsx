import Header from "../components/Layout/Header";
import UserTable from "../components/UserTable";

export default function AdminPage() {
  return (
    <>
      <Header title="Users" />
      <UserTable />
    </>
  );
}
