import { sleep } from "@/lib/sleep";

const fakeToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTIzNDU2Nzg5MCwidXNlcm5hbWUiOiJTYWhlciBBaG1lZCIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIn0.nqGxH3Lx_GenCjMpEOX-ZaO3FsXOSVBbEWubDfzQd8Y";

export const loginService = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  await sleep(1500);
  if (username === "admin" && password === "admin1234") {
    return fakeToken;
  }
  throw new Error("اسم المستخدم أو كلمة المرور غير صحيحة");
};
