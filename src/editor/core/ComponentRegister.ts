import configs from "../config/configs.json";

import CanvasNotFound from "../components/CanvasNotFound";
import PropertiesList from "../components/PropertiesList";
import TreeList from "../components/Treelist";
import EditorUI from "./EditorUI";
import FileSelectorButton from "../components/FileSelectorButton";
import EditorMenu from "../components/EditorMenu";
import Title from "../components/controllers/Title";
import Folder from "../components/controllers/Folder";

export default class ComponentRegister {
	private static creator: CustomElementRegistry = window.customElements;

	constructor() {
		const tags = configs.editor.tags;
		ComponentRegister.register(tags.editorInterface, EditorUI);
		ComponentRegister.register(tags.canvasNotFound, CanvasNotFound);
		ComponentRegister.register(tags.editorMenu, EditorMenu);
		ComponentRegister.register(tags.treeList, TreeList);
		ComponentRegister.register(tags.propertiesList, PropertiesList);
		ComponentRegister.register(tags.FileSelectorButton, FileSelectorButton);
		ComponentRegister.register(tags.titleElement, Title);
		ComponentRegister.register(tags.folderElement, Folder);
	}

	public static register(className: string, constructor: any, options?: ElementDefinitionOptions) {
		ComponentRegister.creator.define(className, constructor, options);
		//console.log(className, "registered");
	}

	public teste() {}
}
