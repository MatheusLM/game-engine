import ABaseComponent from "./components/ABaseComponent";
import ComponentRegister from "./core/ComponentRegister";
import Descriptor from "./core/Descriptor";
import EditorUI from "./core/EditorUI";

export default class Editor implements ABaseComponent {
	public static instance: Editor;
	public static descriptor: Descriptor;
	public static componentRegister: ComponentRegister | null;
	public static editorUI: EditorUI | null;

	private object: EditorUI;

	constructor() {
		if (!Editor.instance) {
			Editor.componentRegister = new ComponentRegister();
			Editor.editorUI = new EditorUI();
			Editor.descriptor = new Descriptor();
			Editor.instance = this;
			Editor.instance.object = EditorUI.instance.getObject();
		}
	}

	public getObject() {
		return Editor.instance.object as EditorUI;
	}

	public connectedCallback() {}

	public disconnectedCallback() {
		/* Editor.componentRegister = null;
		Editor.editorUI = null;
		Editor.instance.object = null; */
	}
}
