/**
 * Modified version of https://github.com/editor-js/image/blob/master/src/uploader.js
 */

import ajax from '@codexteam/ajax';
export default class Uploader {
	constructor({ config, getCurrentFile, onUpload, onError }) {
		this.getCurrentFile = getCurrentFile;
		this.config = config;
		this.onUpload = onUpload;
		this.onError = onError;
	}

	async uploadByFile(file, { onPreview }) {
		const formData = new FormData();
		formData.append('file', file);

		const upload = await ajax.post({
			url: this.config.uploader.addTokenToURL(`${this.config.uploader.baseURL}files`),
			data: formData,
			type: ajax.contentType.FORM,
			headers: this.config.additionalRequestHeaders,
		});

		const result = upload.body.data;

		const response = {
			success: 1,
			file: {
				url: this.config.uploader.baseURL + 'assets/' + result.id,
			},
		};
		console.log(response.file.url);
		onPreview(this.config.uploader.addTokenToURL(response.file.url));
		this.onUpload(response);
	}

	uploadByUrl(url) {
		this.onUpload({
			success: 1,
			file: {
				url: url,
			},
		});
	}

	uploadSelectedFile({ onPreview }) {
		if (this.getCurrentFile) {
			const currentPreview = this.getCurrentFile();
			if (currentPreview) {
				this.config.uploader.setCurrentPreview(this.config.uploader.addTokenToURL(currentPreview));
			}
		}

		this.config.uploader.setFileHandler((file) => {
			if (!file) {
				this.onError({
					success: 0,
					message: this.config.t.no_file_selected,
				});
				return;
			}

			const response = {
				success: 1,
				file: {
					width: file.width,
					height: file.height,
					size: file.filesize,
					name: file.filename_download,
					title: file.title,
					extension: file.filename_download.split('.').pop(),
					fileId: file.id,
					fileURL: this.config.uploader.baseURL + 'files/' + file.id,
					url: this.config.uploader.baseURL + 'assets/' + file.id,
				},
			};

			onPreview(this.config.uploader.addTokenToURL(response.file.fileURL));
			this.onUpload(response);
		});
	}
}
