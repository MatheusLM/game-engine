import config from "../config/configs.json";
import Folder from "./controllers/Folder";
import Title from "./controllers/Title";

export default class FileList {
	public static instance: FileList;
	public static getInstance() {
		if (!FileList.instance) {
			FileList.instance = new FileList();
		}
		return FileList.instance;
	}

	private _tree: any = {};
	private _objects: any[] = [];
	private _root: HTMLDivElement = document.createElement("div");

	constructor() {
		if (!FileList.instance) {
			FileList.instance = this;
		}
	}

	private readTree() {
		this._root.setAttribute("file-list", "");
		this._root.classList.add("top");
		this._root.childNodes.forEach((child) => this._root.removeChild(child));
		this.readObject(this._tree, this._root);
		document.body.appendChild(this._root);
	}

	private readObject(object: any, parent: HTMLDivElement | Folder) {
		const keys = Object.keys(object);
		if (!keys.length) {
			setTimeout(() => this.readObject(object, parent), 1000);
			return;
		}

		const tags = config.editor.tags;
		const newParent = document.createElement(tags.folderElement) as Folder;
		parent.appendChild(newParent);

		keys.forEach((key) => {
			if (object[key] == "file") {
				const file = document.createElement(tags.titleElement) as Title;
				file.text = key;
				newParent.appendChild(file);
			} else {
				const folder = document.createElement(tags.folderElement) as Folder;
				folder.text = key;
				newParent.appendChild(folder);
				this.readObject(object[key], folder);
			}
		});
	}

	public set tree(tree: any) {
		this._tree = tree;
		this.readTree();
	}

	public get tree() {
		return this._tree;
	}
}
