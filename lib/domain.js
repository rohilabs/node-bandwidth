/**
 * Domain
 * @constructor
 */
var Domain = function (client) {
	/**
	 * Create a new voice call
	 * @param {Object} params Parameters for creating a new domain
	 * @param {String} params.name The name is a unique URI to be used in DNS lookups.
	 * @param {String} params.description String to describe the domain.
	 * @param {Function} [callback] Callback with the newly created domain
	 * @return {CallResponse} A promise for the newly created domain
	 */
	this.create = function (params, callback) {
		return client.makeRequest({
			path   : "domains",
			method : "POST",
			body   : params
		})
		.then(function (response) {
			var domain = params;
			var location = response.headers.location;
			var domainId = location.substring(location.lastIndexOf("/") + 1);
			domain.id = domainId;
			return domain;
		})
		.asCallback(callback);
	};

	/**
	 * Gets a list of all domains.
	 * @param {Function} callback A callback with the list of calls
	 * @return {Promise} A promise for the list of domains.
	 */
	this.list = function (callback) {
		return client.makeRequest({
			path   : "domains",
			method : "GET",
			qs     : { size : 100 }
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Delete a domain.
	 * @param  {String} domainId ID of the domain to delete.
	 * @param  {Function} [callback] A callback for the domain.
	 * @return {Promise} A promise for current operation.
	 */
	this.delete = function (domainId, callback) {
		return client.makeRequest({
			path   : "domains/" + domainId,
			method : "DELETE"
		})
		.then(function () {
			return;
		})
		.asCallback(callback);
	};
};

module.exports = Domain;