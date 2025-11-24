import { User } from "../@types/CustomTypes";

export const LoadingAllUsers = async (token: string, email: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/users/findUser/${email}`,
      requestOptions
    );
    if (response.ok) {
      const result = (await response.json()) as User[];
      // console.log(result);
      return result;
    }
    if (!response.ok) {
      return null;
    }
  } catch (error) {
    console.log("error loading user", error);
    return null;
  }
};
