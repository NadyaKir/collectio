import { ConfigProvider, Pagination } from "antd";

const TablePagination = ({
  currentPage,
  pageSize,
  total,
  handlePageChange,
}) => {
  const pageColor = "rgb(15 118 110)";

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: pageColor,
          colorBgContainer: "transparent",
          colorTextDisabled: pageColor,
          colorText: pageColor,
        },
      }}
    >
      <Pagination
        className="mt-4 text-center"
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={handlePageChange}
      />
    </ConfigProvider>
  );
};

export default TablePagination;
