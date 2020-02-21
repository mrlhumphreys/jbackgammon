/**
 * Is the object not undefined and not null?
 * @param {Object} e - The object.
 * @return {boolean}
 */
export const exists = function(e) {
  return typeof e !== 'undefined' && e !== null;
};
