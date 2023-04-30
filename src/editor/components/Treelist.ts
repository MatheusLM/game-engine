import ABaseComponent from "./ABaseComponent";

export default class TreeList extends HTMLElement implements ABaseComponent {
	constructor() {
		super();
	}

	public getObject() {
		return this;
	}

	public connectedCallback() {
		this.innerText = "TreeList";
	}

	public disconnectedCallback() {}

	/* public attributeChangedCallback(attributeName: string, oldValue: any, newValue: any) {
		//console.log(attributeName, oldValue, newValue);
	}

	public static get observedAttributes() {
		return [];
	} */
}
