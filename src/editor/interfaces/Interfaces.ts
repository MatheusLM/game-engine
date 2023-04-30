export interface IBaseObjectDescriptor {
	name: string;
	children: IBaseObjectDescriptor[];
}

export interface ISceneDescriptor {
	name: string;
	url: string;
	active: boolean;
}

export interface IDescriptor {
	scenes: ISceneDescriptor[];
}

export interface IQueuedObject {
	file: string;
	type: "file" | "folder";
	data?: any;
}
