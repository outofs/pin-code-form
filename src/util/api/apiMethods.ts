import { ChangePinPayload } from "../types/ChangePinPayload";

const path = process.env.REACT_APP_API_URL;

export const changePin = async (
  changePinPayload: ChangePinPayload
): Promise<null> => {
  const resp = await fetch(`${path}/pin_change`, {
    method: "POST",
    body: JSON.stringify(changePinPayload),
  });

  console.log(resp);

  if (![200, 202, 204].includes(resp.status)) {
    throw new Error(resp.statusText);
  }
  return null;
};
