// see, https://developer.mozilla.org/en-US/docs/Web/Events
const policies = {
  //
  // Synthetic Events
  //
  setup: {
    description: 'The setup of the listeners has begun.',
    group: 'synthetic',
    type: 'setup',
  },

  //
  // Resource Events
  //
  abort: {
    description: 'The loading of a resource has been aborted.',
    group: 'resource',
    type: 'abort',
    listener: console.log,
  },
  beforeunload: {
    description:
      'The window, the document and its resources are about to be unloaded.',
    group: 'resource',
    type: 'beforeunload',
    listener: console.log,
  },
  error: {
    description: 'A resource failed to load.',
    group: 'resource',
    type: 'error',
    listener: console.log,
  },
  load: {
    description:
      'A resource and its dependent resources have finished loading.',
    group: 'resource',
    type: 'load',
    listener: console.log,
  },
  unload: {
    description: 'The document or a dependent resource is being unloaded.',
    group: 'resource',
    type: 'unload',
    listener: console.log,
  },

  //
  // Network Events
  //
  online: {
    description: 'The browser has gained access to the network.',
    group: 'network',
    type: 'online',
    listener: console.log,
  },
  offline: {
    description: 'The browser has lost access to the network.',
    group: 'network',
    type: 'offline',
    listener: console.log,
  },

  //
  // Focus Events
  //
  focus: {
    description: 'An element has received focus (does not bubble).',
    group: 'focus',
    type: 'focus',
    listener: console.log,
  },
  blur: {
    description: 'An element has lost focus (does not bubble).',
    group: 'focus',
    type: 'blur',
    listener: console.log,
  },
  focusin: {
    description: 'An element is about to receive focus (does bubble).',
    group: 'focus',
    type: 'focusin',
    listener: console.log,
  },
  focusout: {
    description: 'An element is about to lose focus (does bubble).',
    group: 'focus',
    type: 'focus',
    listener: console.log,
  },

  //
  // Mouse Events
  //
  auxclick: {
    description:
      'A pointing device button (ANY non-primary button) has been pressed and released on an element.',
    group: 'mouse',
    type: 'auxclick',
    listener: console.log,
  },
  click: {
    description:
      'A pointing device button (ANY button; soon to be primary button only) has been pressed and released on an element.',
    group: 'mouse',
    type: 'click',
    listener: console.log,
  },
  contextmenu: {
    description:
      'The right button of the mouse is clicked (before the context menu is displayed).',
    group: 'mouse',
    type: 'contextmenu',
    listener: console.log,
  },
  // mouseover: {
  //   description:
  //     'A pointing device is moved onto the element that has the listener attached or onto one of its children.',
  //   group: 'mouse',
  //   type: 'mouseover',
  //   listener: console.log,
  // },
  select: {
    description: 'Some text is being selected.',
    group: 'mouse',
    type: 'select',
    listener: console.log,
  },

  // dblclick	A pointing device button is clicked twice on an element.
  // mousedown	A pointing device button is pressed on an element.
  // mouseenter	A pointing device is moved onto the element that has the listener attached.
  // mouseleave	A pointing device is moved off the element that has the listener attached.
  // mousemove	A pointing device is moved over an element (fired continuously as the mouse moves).
  // mouseout	A pointing device is moved off the element that has the listener attached or off one of its children.
  // mouseup	A pointing device button is released over an element.
  // pointerlockchange	The pointer was locked or released.
  // pointerlockerror	It was impossible to lock the pointer for technical reasons or because the permission was denied.

  // wheel	A wheel button of a pointing device is rotated in any direction.
};

export default policies;
