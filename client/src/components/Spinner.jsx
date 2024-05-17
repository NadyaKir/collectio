import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function Spinner() {
  return (
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 36,
            color: "#0d9488",
          }}
          spin
        />
      }
    />
  );
}
