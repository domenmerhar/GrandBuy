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
  image?: File;
}

export const updateMe = async ({
  JWT,
  firstName,
  city,
  lastName,
  country,
  phoneNumber,
  street,
  zipCode,
  image,
}: UpdateMeArguments) => {
  const formData = new FormData();
  if (firstName) formData.append("firstName", firstName);
  if (lastName) formData.append("lastName", lastName);
  if (street) formData.append("street", street);
  if (city) formData.append("city", city);
  if (zipCode) formData.append("zipCode", zipCode);
  if (country) formData.append("country", country);
  if (phoneNumber) formData.append("phoneNumber", phoneNumber);
  if (image) formData.append("image", image);

  const response = await fetch(toApiPath("user/me"), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
    body: formData,
  });

  const data = await response.json();
  return data;
};
