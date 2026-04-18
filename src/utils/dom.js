export function createElement(tagName, options = {}) {
  const { className = '', text, attributes = {}, children = [] } = options;
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (text !== undefined && text !== null) {
    element.textContent = String(text);
  }

  Object.entries(attributes).forEach(([name, value]) => {
    if (value !== undefined && value !== null) {
      element.setAttribute(name, String(value));
    }
  });

  children.forEach((child) => {
    if (child) {
      element.append(child);
    }
  });

  return element;
}

export function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  return element;
}

export function setText(element, value) {
  element.textContent = value === undefined || value === null ? '' : String(value);
  return element;
}
