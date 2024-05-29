import axios from "../api/api";

export class EventService {
  static async getEvents(userToken: string, page: number) {
    const response = await axios.get("/events", {
      headers: { Authorization: `Bearer ${userToken}` },
      params: { page },
    });
    return response.data;
  }

  static async getEventById(userToken: string, eventId: string) {
    const response = await axios.get(`/events/${eventId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  }

  static async joinEvent(userToken: string, eventId: string, userId: string) {
    const response = await axios.put(
      `/events/join/${eventId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          id: userId,
        },
      }
    );
    return response.data;
  }

  static async leaveEvent(userToken: string, eventId: string, userId: string) {
    const response = await axios.get(`/events/leave/${eventId}`, {
      headers: {
        Authorization: `Bearer: ${userToken}`,
        id: userId,
      },
    });
    return response.data;
  }

  static async deleteEvent(userToken: string, eventId: string, userId: string) {
    const response = await axios.delete(`/events/${eventId}`, {
      headers: {
        Authorization: `Bearer: ${userToken}`,
        id: userId,
      },
    });
    return response.data;
  }

  static async getEventsByOwner(userToken: string, ownerId: string) {
    const response = await axios.get(`/events/owner/${ownerId}`, {
      headers: {
        Authorization: `Bearer: ${userToken}`,
      },
    });

    return response.data;
  }

  static async getCommunityEvent(userToken: string, communityId: string) {
    const response = await axios.get(`/events/community/${communityId}`, {
      headers: {
        Authorization: `Bearer: ${userToken}`,
      },
    });

    return response.data;
  }

  static async searchEvent(userToken: string, searchTerm: string) {
    const response = await axios.get(`/events/search`, {
      headers: {
        Authorization: `Bearer: ${userToken}`,
      },
      params: {
        searchTerm,
      },
    });
    return response.data;
  }
}
