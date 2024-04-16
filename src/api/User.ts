import axios from "./api";

export async function createUser(
  email: string,
  password: string,
  name: string,
  age: number,
  phone: string,
  { setAuthenticated, setUser }: any,
  { setError }: any
) {
  try {
    const res = await axios.post("/users", {
      email,
      password,
      name,
      age,
      phone,
      imageUrl: "/default.webp",
    });

    window.localStorage.setItem("user", JSON.stringify(res.data.userData));

    setUser(res.data.userData);
    setAuthenticated(true);
    window.location.href = "/eventos";
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError("erro interno no servidor");
    }
  }
}

export async function login(
  email: string,
  password: string,
  { setAuthenticated, setUser }: any,
  { setError }: any
) {
  try {
    const res = await axios.post("/users/login", {
      email,
      password,
    });

    window.localStorage.setItem("user", JSON.stringify(res.data.userData));

    setUser(res.data.userData);
    setAuthenticated(true);
    window.location.href = "/eventos";
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError("erro interno no servidor");
    }
  }
}

export async function updateUser(
  token: string,
  id: string,
  body: object,
  { setError, setUser }: any
) {
  try {
    const res = await axios.patch(`/users/update/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });

    window.localStorage.setItem("user", JSON.stringify(res.data.userData));
    setUser(res.data.userData);
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError("erro interno no servidor");
    }
  }
}

export async function getUserImageUrl(token: string, id: string) {
  try {
    const res = await axios.get(`/users/pfp/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.imageUrl;
  } catch (err: any) {
    console.error(err);
  }
}
