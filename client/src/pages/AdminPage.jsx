import Header from "../components/Layout/Header";
import ToolBar from "../components/ToolBar";
import ToolButton from "../components/ToolButton";
import UserTable from "../components/UserTable";
import {
  LockOutlined,
  UnlockOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export default function AdminPage() {
  const onBlock = () => {};
  const onUnblock = () => {};
  const onDelete = () => {};

  return (
    <div className="flex flex-col w-full">
      <Header title="Users" />
      <ToolBar>
        <ToolButton handleAction={onBlock} title="Block">
          <LockOutlined />
        </ToolButton>
        <ToolButton handleAction={onUnblock} title="Unblock">
          <UnlockOutlined />
        </ToolButton>
        <ToolButton handleAction={onDelete} title="Delete">
          <DeleteOutlined />
        </ToolButton>
      </ToolBar>
      <UserTable />
    </div>
  );
}
