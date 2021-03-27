import policies from './policies';

// // see, https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#safely_detecting_option_support
// const isPassiveSupported = () => {
//   let passiveSupported = false;

//   try {
//     const options = {
//       // This function will be called when the browser attempts to access the passive property.
//       get passive() {
//         passiveSupported = true;
//         return false;
//       },
//     };

//     window.addEventListener('test', null, options);
//     window.removeEventListener('test', null, options);
//   } catch (err) {
//     passiveSupported = false;
//   }

//   return passiveSupported;
// };

class Elephant {
  constructor(options = {}) {
    this.eventLog = [];
    this.listeners = [];

    // properly merge options
    this.options = {
      onChange: options.onChange,
      setupOnConstruction: true,
    };

    if (this.options.setupOnConstruction) {
      this.setup();
    }
  }

  listener(event) {
    const myEvent = {
      ...policies[event.type],
      at: new Date().getTime(),
      timeStamp: event.timeStamp,
    };

    this.eventLog = [...this.eventLog, myEvent];

    this.options.onChange(this.eventLog);
  }

  setup() {
    Object.keys(policies).forEach((key) => {
      const policy = policies[key];
      const listener = [policy.type, this.listener.bind(this)];

      this.listeners.push(listener);

      window.addEventListener(...listener);
    });
  }

  teardown() {
    this.listeners.forEach((listener) => {
      window.removeEventListener(...listener);
    });

    this.listeners = [];
  }
}

export default Elephant;
