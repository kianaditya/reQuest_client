import axios from "axios";
import createHeaders from "../modules/headers";

export const updateOffer = async (activity, id) => {
  try {
    const resp = await axios.put(
      `/offers/${id}`,
      {
        activity: activity,
      },
      { headers: createHeaders() }
    );
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const markRequestCompleted = async (mySelectedRequestId) => {
  try {
    const resp = await axios.put(
      `/my_request/requests/${mySelectedRequestId}`,
      { activity: "completed" },
      { headers: createHeaders() }
    );
    return resp;
  } catch (error) {
    return error;
  }
};

export const replyToConversation = async (offerId, message) => {
  try {
    await axios.post(
      `/messages`,
      { content: message, offer_id: offerId },
      { headers: createHeaders() }
    );
    return true;
  } catch (error) { 
    console.error(error);
    return false;
  }
};
