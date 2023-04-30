export default abstract class ABaseComponent {
	public getObject?() {}
	public connectedCallback?() {}
	public disconnectedCallback?() {}
	public static observedAttributes: Function;
}
