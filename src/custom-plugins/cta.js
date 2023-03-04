export default class CallToAction {
  static get toolbox() {
    return {
      title: "Call to action",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 9l5 12l1.774-5.226L21 14L9 9zm7.071 7.071l4.243 4.243M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/></svg>',
    };
  }

  constructor({ data }) {
    this.data = data;
    this.wrapper = undefined;

    this.types = new Map();
    this.types.set("coach-primary", {
      title: "Wanna grow your baseball or softball coaching brand?",
      description:
        "Get connected to new local and online lesson clients—along with all the tools you need to scale.",
      button: {
        text: "Download the free app",
        link: "https://apps.apple.com/us/app/seamsup-1-1-coaching-app/id1509211308",
      },
      type: "coach-primary",
    });
    this.types.set("coach-secondary", {
      title: "See why SeamsUp's the #1 app for baseball & softball businesses",
      description: "",
      button: {
        text: "Download the free app",
        link: "https://apps.apple.com/us/app/seamsup-1-1-coaching-app/id1509211308",
      },
      type: "coach-secondary",
    });
    this.types.set("player-primary", {
      title: "Unlock your ballplayer’s full potential",
      description:
        "Find the perfect vetted coach to build a solid foundation or take your player's skills to new heights.",
      button: {
        text: "Download the free app",
        link: "https://apps.apple.com/us/app/seamsup-1-1-coaching-app/id1509211308",
      },
      type: "player-primary",
    });
    this.types.set("player-secondary", {
      title: "See why SeamsUp's the #1 instructional app for ballplayers",
      description: "",
      button: {
        text: "Download the free app",
        link: "https://apps.apple.com/us/app/seamsup-1-1-coaching-app/id1509211308",
      },
      type: "player-secondary",
    });

    this.classes = {
      wrapper: "cta-block",
      title: "cta-block-title",
      description: "cta-block-description",
      button: "cta-block-button",
      link: "cta-block-link",
      type: "cta-block-type",
      input: "cdx-input",
    };
  }

  _setValues() {
    this.wrapper.querySelector(`input.${this.classes.title}`).value =
      this.data.title;
    this.wrapper.querySelector(`input.${this.classes.description}`).value =
      this.data.description;
    this.wrapper.querySelector(`input.${this.classes.button}`).value =
      this.data.button.text;
    this.wrapper.querySelector(`input.${this.classes.link}`).value =
      this.data.button.link;
    this.wrapper.querySelector(`p.${this.classes.type}`).innerHTML =
      this.data.type;
  }

  _clearValues() {
    this.wrapper.querySelector(`input.${this.classes.title}`).value = "";
    this.wrapper.querySelector(`input.${this.classes.description}`).value = "";
    this.wrapper.querySelector(`input.${this.classes.button}`).value = "";
    this.wrapper.querySelector(`input.${this.classes.link}`).value = "";
    this.wrapper.querySelector(`p.${this.classes.type}`).innerHTML = "";
  }

  _onDataChange(data) {
    if (this.data.title) {
      this.data = {};
      this._clearValues();
    }
    this.data = { ...data };
    this._setValues();
  }

  renderSettings() {
    return [
      {
        icon: `C1`,
        label: "Coach Primary",
        toggle: "type",
        closeOnActivate: true,
        onActivate: () => {
          this._onDataChange(this.types.get("coach-primary"));
        },
      },
      {
        icon: `C2`,
        label: "Coach Secondary",
        toggle: "type",
        closeOnActivate: true,
        onActivate: () => {
          this._onDataChange(this.types.get("coach-secondary"));
        },
      },
      {
        icon: `P1`,
        label: "Player Primary",
        toggle: "type",
        closeOnActivate: true,
        onActivate: () => {
          this._onDataChange(this.types.get("player-primary"));
        },
      },
      {
        icon: `P2`,
        label: "Player Secondary",
        toggle: "type",
        closeOnActivate: true,
        onActivate: () => {
          this._onDataChange(this.types.get("player-secondary"));
        },
      },
    ];
  }

  render() {
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add(this.classes.wrapper);

    const type = document.createElement("p");
    this.wrapper.appendChild(type);
    type.classList.add(this.classes.type);
    type.innerText = this.data && this.data.type ? this.data.type : "empty";

    const title = document.createElement("input");
    this.wrapper.appendChild(title);
    title.classList.add(this.classes.title);
    title.classList.add(this.classes.input);

    title.placeholder = "Main title";
    title.value = this.data && this.data.title ? this.data.title : "";

    const description = document.createElement("input");
    this.wrapper.appendChild(description);
    description.classList.add(this.classes.description);
    description.classList.add(this.classes.input);

    description.placeholder = "Description";
    description.value =
      this.data && this.data.description ? this.data.description : "";

    const buttonText = document.createElement("input");
    this.wrapper.appendChild(buttonText);
    buttonText.classList.add(this.classes.button);
    buttonText.classList.add(this.classes.input);

    buttonText.placeholder = "Button text";
    buttonText.value =
      this.data && this.data?.button?.text ? this.data?.button?.text : "";

    const link = document.createElement("input");
    this.wrapper.appendChild(link);
    link.classList.add(this.classes.link);
    link.classList.add(this.classes.input);

    link.placeholder = "Link";
    link.value =
      this.data && this.data?.button?.link ? this.data?.button?.link : "";

    return this.wrapper;
  }

  save(blockContent) {
    const title =
      blockContent.querySelector(`input.${this.classes.title}`).value || "";
    const description =
      blockContent.querySelector(`input.${this.classes.description}`).value ||
      "";
    const text =
      blockContent.querySelector(`input.${this.classes.button}`).value || "";
    const link =
      blockContent.querySelector(`input.${this.classes.link}`).value || "";

    return {
      title,
      description,
      button: {
        text,
        link,
      },
      type: this.data.type,
    };
  }

  static get sanitize() {
    return {
      title: {},
      description: {},
      button: {
        text: {},
        link: {},
      },
      type: {},
    };
  }
}
