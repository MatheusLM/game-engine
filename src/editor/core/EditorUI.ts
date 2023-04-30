import ABaseComponent from "../components/ABaseComponent";
import "../static/style.css";
import configs from "../config/configs.json";

export default class EditorUI extends HTMLElement implements ABaseComponent {
	private object: any;
	public static instance: EditorUI;

	constructor() {
		super();
		if (!EditorUI.instance) {
			EditorUI.instance = this;
			this.object = document.createElement(configs.editor.tags.editorInterface);
			this.createObjects();
		}
	}

	private createObjects() {
		const tags = configs.editor.tags;
		const objects = [tags.editorMenu, tags.treeList, tags.propertiesList];
		objects.forEach((tag) => this.object.append(document.createElement(tag)));
	}

	private getCanvas() {
		let canvasArea = document.getElementById(configs.canvas.canvasAreaId) as HTMLCanvasElement;
		if (canvasArea == null || canvasArea == undefined) {
			canvasArea = document.createElement(configs.editor.tags.canvasNotFound) as HTMLCanvasElement;
		}
		canvasArea.setAttribute(configs.canvas.gameAreaAttribute, "");
		this.append(canvasArea);
	}

	public getObject() {
		return EditorUI.instance.object;
	}

	public connectedCallback() {
		this.getCanvas();
	}

	public disconnectedCallback() {}
}
