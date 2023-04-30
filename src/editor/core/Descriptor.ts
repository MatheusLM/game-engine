import { IDescriptor } from "../interfaces/Interfaces";

export default class Descriptor {
	private _descriptor: IDescriptor;

	public static instance: Descriptor;

	constructor() {
		if (!Descriptor.instance) {
			Descriptor.instance = this;
		}
	}

	public set descriptor(descriptor: IDescriptor) {
		this._descriptor = descriptor;
		console.log(descriptor);
	}

	public get descriptor() {
		return this._descriptor;
	}
}
