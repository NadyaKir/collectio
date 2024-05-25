import { ConfigProvider, Pagination } from "antd";

const TablePagination = ({
  currentPage,
  pageSize,
  total,
  handlePageChange,
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "rgb(15 118 110)",
        },
      }}
    >
      <Pagination
        className="mt-4 text-center"
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={handlePageChange}
        hideOnSinglePage
      />
    </ConfigProvider>
  );
};

export default TablePagination;
