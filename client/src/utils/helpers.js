export const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "bg-green-500 text-white";
    case "Blocked":
      return "bg-red-500 text-white";
    default:
      return "bg-blue-500 text-white";
  }
};
