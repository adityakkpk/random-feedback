export const sendJSONResponse = (
  success: boolean,
  message: string,
  statusCode: number
) => {
  Response.json({ success, message }, { status: statusCode });
};
