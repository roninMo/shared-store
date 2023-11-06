import { User } from "../models/User";
import { Address } from "../models/Address";
import { Model } from "objection";

// These are just utility functions and validation logic. Normally this would be dummy business logic
export const db_validAddress = (data) => {
  if (!data?.street || !data?.city || !data?.suite || !data?.zipcode) {
    return false;
  }
  return true;
}

export const db_validUser = (data) => {
  if (!data?.name || !data?.username || !data?.email) {
    return false;
  }
  return true;
}

export const constructUser = (data) => {
  const user: any = {
    id: data.id,
    name: data.name,
    username: data.username,
    email: data.email,
    address: {
      id: data.addressId,
      street: data.street,
      suite: data.suite,
      city: data.city,
      zipcode: data.zipcode,
      country: data.country,
    },
    website: data.website,
    phone: data.phone,
  };

  if (data.geo_lat && data.geo_lng) {
    user.address.geo = {
      lat: data.geo_lat,
      lng: data.geo_lng
    };
  }

  return user;
}

export const extractUser = (data) => {
  const user: any = {
    id: data.id,
    addressId: data.addressId,
    name: data.name,
    username: data.username,
    email: data.email,
    website: data.website,
    phone: data.phone,
  };

  return user;
}

export const extractAddress = (data) => {
  const address: any = {
    id: !data.addressId ? data.id : data.addressId,
    street: data.street,
    suite: data.suite,
    city: data.city,
    zipcode: data.zipcode,
    country: data.country,

  };

  if (data.geo && data.geo?.lat && data.geo?.lng) {
    address.geo_lat = data.geo.lat;
    address.geo_lng = data.geo.lng;
  }

  return address;
}

export const undoCreate = async (id: number, query) => {
  return await query.deleteById(id);
}