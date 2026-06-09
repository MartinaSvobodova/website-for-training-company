declare module "@iarna/rtf-to-html" {
	interface RtfToHtml {
		fromString(input: string, callback: (error: Error | null, html: string) => void): void;
	}

	const rtfToHTML: RtfToHtml;
	export default rtfToHTML;
}
