import { UPDATE_MY_PROFILE, UPDATE_PROFILE_IMAGE } from "./constants";

export const updateMyProfile = (payload, cb) => ({
  type: UPDATE_MY_PROFILE,
  payload,
  cb,
});

export const updateProfileImage = (payload, cb) => ({
  type: UPDATE_PROFILE_IMAGE,
  payload,
  cb,
})
