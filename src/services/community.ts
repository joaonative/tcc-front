import axios from "../api/api";

export class CommunityService {
  static async getCommunities(userToken: string, page: number) {
    const response = await axios.get("/communities", {
      headers: { Authorization: `Bearer ${userToken}` },
      params: { page },
    });
    return response.data;
  }

  static async getCommunityById(userToken: string, eventId: string) {
    const response = await axios.get(`/communities/${eventId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  }

  static async joinCommunity(
    userToken: string,
    communityId: string,
    userId: string
  ) {
    const response = await axios.put(
      `/communities/join/${communityId}`,
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

  static async leaveCommunity(
    userToken: string,
    eventId: string,
    userId: string
  ) {
    const response = await axios.get(`/communities/leave/${eventId}`, {
      headers: {
        Authorization: `Bearer: ${userToken}`,
        id: userId,
      },
    });
    return response.data;
  }

  static async deleteCommunity(
    userToken: string,
    communityId: string,
    userId: string
  ) {
    const response = await axios.delete(`/communities/${communityId}`, {
      headers: {
        Authorization: `Bearer: ${userToken}`,
        id: userId,
      },
    });
    return response.data;
  }

  static async searchCommunity(userToken: string, searchTerm: string) {
    const response = await axios.get(`/communities/search`, {
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
