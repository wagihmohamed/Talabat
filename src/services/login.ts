import { sleep } from "@/lib/sleep";

export const loginService = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  await sleep(1500);
  if (username === "admin" && password === "admin1234") {
    return {
      username: "admin",
      token: "ewasdkjnandlwaidjlwadnaw",
      id: 162,
      email: "admin@admin.com",
    };
  }
  throw new Error("اسم المستخدم أو كلمة المرور غير صحيحة");
};
