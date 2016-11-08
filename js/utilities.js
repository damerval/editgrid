/**
 * Created by pdamerval on 11/7/2016.
 */

function isJson(item) {

  item = typeof item !== "string"
      ? JSON.stringify(item)
      : item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  return typeof item === "object" && item !== null;


}