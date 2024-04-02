import axios from "./api";

export async function getEvents(token: string, { setError }: any) {
  try {
    const res = await axios.get("/events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.events;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError("erro interno no servidor");
    }
  }
}

export async function getEventById(
  token: string,
  eventId: string,
  { setError }: any
) {
  try {
    const res = await axios.get(`/events/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.event;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError("erro interno no servidor");
    }
  }
}

export async function leaveEvent(
  token: string,
  eventId: string,
  id: string,
  { setError }: any
) {
  try {
    const res = await axios.get(`/events/leave/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        id: id,
      },
    });
    return res;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError("erro interno no servidor");
    }
  }
}

export async function joinEvent(
  token: string,
  eventId: string,
  id: string,
  { setError }: any
) {
  try {
    const res = await axios.put(
      `/events/join/${eventId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          id: id,
        },
      }
    );
    return res.data.event;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError("erro interno no servidor");
    }
  }
}

export async function createEvent(
  token: string,
  id: string,
  name: string,
  description: string,
  location: string,
  date: string,
  age_range: number,
  imageUrl: string,
  participantLimit: number,
  category: string,
  { setError }: any
) {
  try {
    const res = await axios.post(
      "/events",
      {
        name,
        description,
        location,
        date,
        age_range,
        imageUrl,
        participantLimit,
        category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          id: id,
        },
      }
    );
    return res.data.event;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError("erro interno no servidor");
    }
  }
}
