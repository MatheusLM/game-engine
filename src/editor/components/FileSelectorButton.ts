import ABaseComponent from "./ABaseComponent";
import FileList from "./FileList";

export default class FileSelectorButton extends HTMLElement implements ABaseComponent {
	private file: any;
	private _tree: any = {};

	constructor() {
		super();
	}

	public setText(text: string) {
		this.innerText = String(text);
	}

	public connectedCallback() {
		this.innerText = "select";
		this.classList.add("editor-button");
		this.addEventListener("click", async () => {
			const directoryHandle = await window.showDirectoryPicker();
			this._tree[directoryHandle.name] = {};
			const root = this._tree[directoryHandle.name];
			this.createBranch(directoryHandle, root);
			console.log(this._tree);

			FileList.getInstance().tree = root;
		});
	}

	private async createBranch(directoryHandle: FileSystemDirectoryHandle, parent: any) {
		for await (const [name, fileHandle] of directoryHandle) {
			if (fileHandle.kind == "directory") {
				parent[name] = {};
				this.createBranch(fileHandle, parent[name]);
			} else {
				parent[name] = fileHandle.kind;
				//this._tree[directoryHandle.name].push(name);
			}
		}
	}

	public getFile() {
		return this.file;
	}

	public getObject() {
		return this;
	}
}
