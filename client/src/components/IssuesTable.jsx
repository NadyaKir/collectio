import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import TablePagination from "./TablePagination";
import Filter from "./Filter";
import useFilter from "../hooks/useFilter";
import { useDebounce } from "../hooks/useDebounce";
import { useFetchIssues } from "../hooks/useFetchIssues";

export default function IssuesTable() {
  const { values, selectedValue, setSelectedValues } =
    useFilter("jira/statuses");

  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (issueKey) => {
    window.open(
      `https://course-project.atlassian.net/jira/software/projects/KAN/boards/1?selectedIssue=${issueKey}`,
      "_blank"
    );
  };

  const { issues, totalIssues, fetchIssues, isLoading, error } =
    useFetchIssues();

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchText]);

  useEffect(() => {
    fetchIssues(currentPage, pageSize, selectedValue, debouncedSearchText);
  }, [currentPage, pageSize, selectedValue, debouncedSearchText]);

  return (
    <>
      <div className="flex justify-between flex-wrap md:flex-nowrap mb-2 md:mb-0">
        <div className="flex self-center mb-4">
          <Filter
            values={values.map((value) => value.name)}
            selectedValue={selectedValue}
            setSelectedValues={setSelectedValues}
          />
          <input
            className="w-full px-3 lg:w-auto text-gray-600 dark:text-white  border-2 border-gray-300 dark:bg-gray-800/[.3] h-10 rounded-lg text-sm focus:outline-none"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
          />
        </div>
      </div>

      {isLoading && (
        <div className="flex flex-1 h-full justify-center items-center text-gray-500">
          <Spinner />
        </div>
      )}

      {!isLoading && error && (
        <div className="flex flex-1 h-full justify-center items-center text-gray-500">
          <div className="text-center text-red-500">Error: {error.message}</div>
        </div>
      )}

      {!isLoading && issues.length === 0 && !error && (
        <div className="flex flex-1 h-full justify-center items-center text-gray-500">
          No issues found.
        </div>
      )}
      {!isLoading && issues.length > 0 && (
        <div className="flex flex-1  w-full overflow-x-auto relative border rounded-md">
          <div className="flex flex-1 flex-col w-full overflow-x-auto overflow-y-scroll">
            <table className="h-full min-w-full divide-y border-collapse border-b divide-gray-200">
              <thead className="bg-gray-50 dark:bg-gray-800/[.7]">
                <tr className="h-16 text-center text-gray-600 dark:text-white divide-gray-200">
                  <th className="px-4 text-xs font-medium uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 text-xs font-medium uppercase tracking-wider">
                    Summary
                  </th>
                  <th className="px-4 text-xs font-medium uppercase tracking-wider">
                    Assignee
                  </th>
                  <th className="px-4 text-xs font-medium uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-4 text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {issues.map((issue) => (
                  <tr
                    key={issue.id}
                    className="h-fit text-left hover:bg-gray-100 dark:hover:bg-gray-800/[.3] cursor-pointer"
                    onClick={() => handleRowClick(issue.key)}
                  >
                    <td className="px-4 text-center whitespace-nowrap">
                      {issue.id}
                    </td>
                    <td className="px-4 text-center whitespace-nowrap">
                      {issue.fields.summary ? issue.fields.summary : "-"}
                    </td>
                    <td className="px-4 text-center whitespace-nowrap">
                      {issue.fields.assignee
                        ? issue.fields.assignee.emailAddress
                        : "Unassigned"}
                    </td>
                    <td className="px-4 text-center whitespace-nowrap">
                      {issue.fields.priority ? issue.fields.priority.name : "-"}
                    </td>
                    <td className="px-4 text-center whitespace-nowrap">
                      {issue.fields.status ? issue.fields.status.name : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <TablePagination
        currentPage={currentPage}
        pageSize={pageSize}
        total={totalIssues}
        handlePageChange={handlePageChange}
      />
    </>
  );
}
