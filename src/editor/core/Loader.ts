import { IQueuedObject } from "../interfaces/Interfaces";
import ErrorPopup from "../utils/ErrorPopup";
import configs from "../config/configs.json";

export default class Loader {
	public static instance: Loader;

	private fileReader: FileReader = new FileReader();
	private _queue: IQueuedObject[] = [];
	private _loaded: IQueuedObject[] = [];

	private _lazyIntervalId: number;

	private _directory: FileSystemDirectoryHandle;
	private _actual: IQueuedObject;

	constructor(directory: FileSystemDirectoryHandle) {
		if (!Loader.instance) {
			Loader.instance = this;
			this._directory = directory;
			this.addToQueue({ file: configs.data.mainJson, type: "file" });
			this.startProcess();

			this.fileReader.addEventListener("load", (e) => {
				const data = JSON.parse(e.target.result as string);
				this._loaded.push({
					file: this._actual?.file,
					type: this._actual?.type,
					data: data,
				});
				this._actual = null;
				this.endReadFile(data);
			});
		}
	}

	public addToQueue(file: IQueuedObject) {
		this._queue.push(file);
	}

	public startProcess() {
		this.processQueue();
	}

	private processQueue() {
		if (this._actual) {
			clearTimeout(this._lazyIntervalId);
			console.log("Loader in use");
			return;
		}
		this._actual = this._queue.shift();
		if (!this._actual) {
			console.log(`Empty Queue! Loaded ${this._loaded.length} items`);
			this._lazyIntervalId = setTimeout(() => this.processQueue(), 2000);
			return;
		}

		if (this._actual.type == "file") {
			this.loadFile(this._actual.file);
		} else if (this._actual.type == "folder") {
			this.loadFolder(this._actual.file);
		}
	}

	private loadFile(fileName: string) {
		this._directory
			.getFileHandle(fileName)
			.then((e) => {
				e.getFile()
					.then((f) => this.readFile(f))
					.catch((e) => {
						new ErrorPopup(`Failed on read ${fileName}`);
					});
			})
			.catch(() => new ErrorPopup(`File ${fileName} not found`));
	}

	private loadFolder(folderName: string) {
		this._directory
			.getDirectoryHandle(folderName)
			.then((e) => {
				console.log(e);
			})
			.catch((e) => {
				new ErrorPopup(`Folder ${folderName} not found`);
			});
	}

	private readFile(file: File) {
		this.fileReader.readAsText(file);
	}

	private endReadFile(data: any) {
		data.scenes
			?.filter((scene) => scene.active)
			.forEach((scene) => this.addToQueue({ file: scene.url, type: "file" }));
		this.processQueue();
	}
}
