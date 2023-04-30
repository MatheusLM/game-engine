import ABaseComponent from "../ABaseComponent";
import Title from "./Title";
import configs from "../../config/configs.json";

export default class Folder extends HTMLElement implements ABaseComponent {
	private _text: string = "";
	private titleElement: Title;

	constructor() {
		super();
	}

	public set text(text: string) {
		this._text = text;
		if (!this.titleElement) {
			this.titleElement = document.createElement(configs.editor.tags.titleElement) as Title;
		}
		this.titleElement.text = this._text;
	}

	public connectedCallback() {
		this.titleElement = document.createElement(configs.editor.tags.titleElement) as Title;
		this.titleElement.text = this.text;
		this.appendChild(this.titleElement);
	}

	public get text() {
		return this._text;
	}

	public getObject() {
		return this;
	}
}
