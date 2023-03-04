export default class InfoBox {
  static get toolbox() {
    return {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></g></svg>`,
      title: "Info Box",
    };
  }

  static get enableLineBreaks() {
    return true;
  }

  static get DEFAULT_TYPE() {
    return { type: "pro-tip", label: "Pro Tip", emoji: "🧢" };
  }

  static get DEFAULT_MESSAGE() {
    return "Message goes here...";
  }

  static get ALERT_TYPES() {
    return [
      { type: "pro-tip", label: "Pro Tip", emoji: "🧢" },
      { type: "definition", label: "Definition", emoji: "📚" },
      { type: "study", label: "Study Conclusion", emoji: "📊" },
      { type: "insight", label: "Key Insight", emoji: "🔑" },
      { type: "important", label: "Important Note", emoji: "🚨" },
    ];
  }

  get CSS() {
    return {
      baseClass: this.api.styles.block,
      wrapper: "cdx-infobox",
      type: (type) => `cdx-infobox-${type}`,
      message: "cdx-infobox-message",
      label: "cdx-infobox-label",
    };
  }

  constructor({ data, api, config }) {
    this.api = api;

    this.defaultType = config.defaultType || InfoBox.DEFAULT_TYPE;
    this.messagePlaceholder =
      config.messagePlaceholder || InfoBox.DEFAULT_MESSAGE;

    this.data = {
      label: InfoBox.ALERT_TYPES.includes(data.type)
        ? data.type
        : this.defaultType.label,
      emoji: InfoBox.ALERT_TYPES.includes(data.type)
        ? data.type
        : this.defaultType.emoji,
      type: InfoBox.ALERT_TYPES.includes(data.type)
        ? data.type
        : this.defaultType.type,
      message: data.message || "",
    };

    this.container = undefined;
    this.label = undefined;
  }

  renderSettings() {
    const settings = InfoBox.ALERT_TYPES.map((infoBox) => {
      return {
        icon: infoBox.emoji,
        label: infoBox.label,
        toggle: "type",
        closeOnActivate: true,
        onActivate: () => {
          this._changeType(infoBox.type);
        },
      };
    });
    return [...settings];
  }

  render() {
    const containerClasses = [this.CSS.wrapper, this.CSS.type(this.data.type)];

    this.container = this._make("div", containerClasses);
    this.label = this._make("span", this.CSS.label);
    this.label.innerHTML = `${this.data.emoji} ${this.data.label}`;

    const messageEl = this._make("div", [this.CSS.message], {
      contentEditable: true,
      innerHTML: this.data.message,
    });

    messageEl.dataset.placeholder = this.messagePlaceholder;
    this.container.appendChild(this.label);
    this.container.appendChild(messageEl);

    return this.container;
  }

  save(infoBoxElement) {
    const messageEl = infoBoxElement.querySelector(`.${this.CSS.message}`);

    return { type: this.data.type, message: messageEl.innerHTML };
  }

  _changeType(newType) {
    this.container.classList.remove(this.CSS.type(this.data.type));
    this.data.type = newType;
    const newInfoBox = InfoBox.ALERT_TYPES.find(
      (infoBox) => infoBox.type === newType
    );
    this.data.label = newInfoBox.label;
    this.data.emoji = newInfoBox.emoji;
    this.label.innerHTML = `${newInfoBox.emoji} ${newInfoBox.label}`;
    this.container.classList.add(this.CSS.type(newType));
  }

  _make(tagName, classNames = null, attributes = {}) {
    let el = document.createElement(tagName);

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }

    for (let attrName in attributes) {
      el[attrName] = attributes[attrName];
    }

    return el;
  }

  onPaste(event) {
    const { data } = event.detail;

    this.data = {
      type: this.defaultType.type,
      label: this.defaultType.label,
      emoji: this.defaultType.emoji,
      message: data.innerHTML || "",
    };
  }

  static get sanitize() {
    return {
      type: false,
      message: true,
    };
  }
}
