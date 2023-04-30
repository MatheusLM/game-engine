import ABaseComponent from "./ABaseComponent";
import configs from "../config/configs.json";
import FileSelectorButton from "./FileSelectorButton";

export default class EditorMenu extends HTMLElement implements ABaseComponent {
	private items: any[] = [];
	private descriptorSelectorButton: FileSelectorButton;
	private tags = configs.editor.tags;

	public static instance: EditorMenu;

	constructor() {
		super();
		this.createDescritorSelectorButton();
	}

	private createDescritorSelectorButton() {
		this.descriptorSelectorButton = document.createElement(this.tags.FileSelectorButton) as FileSelectorButton;
		this.addItem(this.descriptorSelectorButton);
	}

	private addItem(item: any) {
		this.items.push(item);
	}

	private createItems() {
		this.childNodes.forEach((child) => this.removeChild(child));
		this.items.forEach((item) => this.appendChild(item));
	}

	public connectedCallback() {
		this.createItems();
		if (!EditorMenu.instance) {
			EditorMenu.instance = this;
		}
		this.descriptorSelectorButton.setText("Select descriptor");
	}

	public getObject() {
		return this;
	}
}
