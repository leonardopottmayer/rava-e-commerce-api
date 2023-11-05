export const getDbErrorMessage = (messageCode: string): string => {
  switch (messageCode) {
    case "P2002":
      return "Unique constraint failed.";

    case "P2003":
      return "Foreignt key constraint failed.";

    default:
      return "DB error.";
  }
};
