import ABaseComponent from "../ABaseComponent";

export default class Title extends HTMLElement implements ABaseComponent {
	private _text: string = "";
	constructor() {
		super();
	}

	public set text(text: string) {
		this._text = text;
		this.innerText = this._text;
	}

	public connectedCallback() {
		this.innerText = this._text;
	}

	public get text() {
		return this._text;
	}

	public getObject() {
		return this;
	}
}
