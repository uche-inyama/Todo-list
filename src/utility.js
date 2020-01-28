export function createHtmlElement(
  type,
  attributes = {},
  innerText = null,
  innerHTML = null
) {
  const ele = document.createElement(type);
  for (const prop in attributes) {
    ele.setAttribute(prop, attributes[prop]);
  }

  if (innerText) ele.innerText = innerText;

  if (innerHTML) ele.innerHTML = innerHTML;

  return ele;
}

export function updateHtmlElement(ele, attributes = {}, innerText = null) {
  for (const prop in attributes) {
    ele.setAttribute(prop, attributes[prop]);
  }
  if (innerText) ele.innerText = innerText;
}

export const createHeader = (content, header2) => {
  for (const input in content) {
    if (input.value === null) {
      continue;
    }
    header2.innerHTML = 'Add Todo';
  }
  return header2;
};
