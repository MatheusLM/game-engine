import ABaseComponent from "./ABaseComponent";

export default class PropertiesList extends HTMLElement implements ABaseComponent {
	constructor() {
		super();
	}

	public getObject() {
		return this;
	}

	public connectedCallback() {
		this.innerText = "PropertiesList";
	}

	public disconnectedCallback() {
		this.innerText = "";
	}
}
