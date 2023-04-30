import ABaseComponent from "./ABaseComponent";

export default class CanvasNotFound extends HTMLElement implements ABaseComponent {
	private text: string = "Game area not found on page";
	private canvasElement: HTMLCanvasElement;
	private canvasContext: CanvasRenderingContext2D;

	constructor() {
		super();
		this.canvasElement = document?.createElement("canvas");
		this.canvasContext = this.canvasElement.getContext("2d") as CanvasRenderingContext2D;
	}

	private createText() {
		this.canvasContext.font = "32px arial";
		this.canvasContext.fillStyle = "#ff0000";
		this.canvasContext.textAlign = "center";
		this.canvasContext.textBaseline = "middle";

		const centerX = this.canvasElement.width / 2;
		const centerY = this.canvasElement.height / 2;
		this.canvasContext.fillText(this.text, centerX, centerY);
	}

	public getObject() {
		return this;
	}

	public connectedCallback() {
		this.canvasElement.width = this.clientWidth;
		this.createText();
		this.appendChild(this.canvasElement);
	}

	public disconnectedCallback() {}
}
