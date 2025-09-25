import axios from "axios";
import { cookies } from "next/headers";

export const getProfileMeServer = async () => {
  const cookieStore = cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) return null;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASEURL}/profile/me`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    );
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
