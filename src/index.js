/**
 * Import Tool's icon
 */
import ToolboxIcon from './svg/toolbox.svg';
/**
 * Build styles
 */
require('./index.css').toString();

/**
 * @typedef {object} YteConfig
 * @description Youtube Embed Config
 * @property {string} wrapperClass - wrapper element class
 * @property {string} inputClass - Input class
 * @property {string} inputPlaceholder - Input Placeholder
 * @property {string} buttonClass - Button class
 * @property {string} buttonText - Embed Button Text
 * @property {string} invalidText - Invalid URL Text
 */

/**
 * @typedef {object} YteData
 * @description Youtube Embed data
 * @property {string} url - Youtube Video URL
 */

/**
 * @class YoutubeEmbed
 * @classdesc Youtube Video Embed Tool for Editor.js
 */
export default class YoutubeEmbed {


	/**
	 * Returns true to notify the core that read-only mode is supported
	 *
	 * @return {boolean}
	 */
	static get isReadOnlySupported() {
		return true;
	}
  /**
   * Get Toolbox settings
   *
   * @public
   * @returns {string}
   */
	static get toolbox() {
		return {
			title: 'Youtube Video',
			icon: ToolboxIcon
    	};
	}
	/**
	 *
	 * @param {YteData} data
	 * @param readOnly
	 * @param {YteConfig} config
	 */
	constructor({ data, readOnly, config }) {
		this.data = data;
		this.readonly = readOnly;
		this.config = config || {};
		this.isEditing = true;
		this.wrapper = null;
	}
	/**
	 * Render Embed tool content
	 *
	 * @returns {HTMLElement}
	 */
	render() {
		this.wrapper = document.createElement('div');
		this.wrapper.classList.add(this.config.wrapperClass || 'ce-yte');
		const input = document.createElement('input');
		input.classList.add(this.config.inputClass || 'ce-yte__input');
		input.value = this.data && this.data.url ? this.data.url : '';
		input.placeholder = this.config.inputPlaceholder || 'Paste youtube link here';

		const button = document.createElement('button');
		button.classList.add(this.config.buttonClass || 'ce-yte__button');
		button.innerText = this.config.buttonText || 'Embed';
		button.setAttribute('type', 'button');

		this.wrapper.appendChild(input);
		this.wrapper.appendChild(button);

		button.addEventListener('click', () => {
			this._createYoutubeIframe(input.value);
		});
		if (input.value) {
			this._createYoutubeIframe(input.value);
		}

		return this.wrapper;
	}
	/**
	 * create youtube video iframe
	 * @param {string} url_string - youtube video link
	 */
	_createYoutubeIframe(url_string) {
		if (!this.__isValidURL(url_string)) {
			alert(this.config.invalidText || 'Invalid Youtube Video Url');
			this.wrapper.querySelector('input').classList.add('ce-yte__input--invalid');
			return;
		}
		this.wrapper.querySelector('input').classList.remove('ce-yte__input--invalid');
		this.isEditing = false;
		this.wrapper.innerHTML = null;
		this.data.url = this._convertToEmbedUrl(url_string);
		const iframeContainer = document.createElement('div');
		iframeContainer.classList.add('ce-yte__container');
		const iframe = document.createElement('iframe');
		iframe.classList.add('ce-yte__iframe');
		iframe.setAttribute('src', this.data.url);
		iframe.setAttribute('allowfullscreen', true);
		iframeContainer.appendChild(iframe);
		this.wrapper.appendChild(iframeContainer);
	}
	/**
	 * convert youtube url to embed url
	 * @param {string} url_string - youtube video link
	 */
	_convertToEmbedUrl(url_string) {
		const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
		const match = url_string.match(regExp);
		return match && match[7].length === 11
			? 'https://www.youtube.com/embed/' + match[7]
			: 'https://www.youtube.com/embed/wvLddabQ1nc';
	}
	/**
	 * check if url is a youtube url
	 * @param {string} url
	 * @return {boolean}
	 * @private
	 */
	__isValidURL(url) {
		console.log(url);
		if (!url) return false;
		const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
		return !!url.match(regExp);
	}
	/**
	 * Return block data
	 *
	 * @public
	 * @returns {object}
	 */
	save() {
		return this.data;
	}
}
