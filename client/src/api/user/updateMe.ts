import { toApiPath } from "../../functions/toApiPath";

interface UpdateMeArguments {
  JWT: string;
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  phoneNumber?: string;
}

export const updateMe = async (info: UpdateMeArguments) => {
  const body = JSON.stringify(
    Object.keys(info).reduce((acc: Partial<UpdateMeArguments>, key) => {
      if (info[key as keyof UpdateMeArguments])
        acc[key as keyof UpdateMeArguments] =
          info[key as keyof UpdateMeArguments];

      return acc;
    }, {})
  );

  const response = await fetch(toApiPath("user/me"), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${info.JWT}`,
    },
    body,
  });

  const data = await response.json();
  return data;
};
