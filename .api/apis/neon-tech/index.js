"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'neon-tech/v2 (api/6.1.2)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * Retrieves the API keys for your Neon account.
     * The response does not include API key tokens. A token is only provided when creating an
     * API key.
     * API keys can also be managed in the Neon Console.
     * For more information, see [Manage API keys](https://neon.tech/docs/manage/api-keys/).
     *
     *
     * @summary Get a list of API keys
     */
    SDK.prototype.listApiKeys = function () {
        return this.core.fetch('/api_keys', 'get');
    };
    /**
     * Creates an API key.
     * The `key_name` is a user-specified name for the key.
     * This method returns an `id` and `key`. The `key` is a randomly generated, 64-bit token
     * required to access the Neon API.
     * API keys can also be managed in the Neon Console.
     * See [Manage API keys](https://neon.tech/docs/manage/api-keys/).
     *
     *
     * @summary Create an API key
     */
    SDK.prototype.createApiKey = function (body) {
        return this.core.fetch('/api_keys', 'post', body);
    };
    /**
     * Revokes the specified API key.
     * An API key that is no longer needed can be revoked.
     * This action cannot be reversed.
     * You can obtain `key_id` values by listing the API keys for your Neon account.
     * API keys can also be managed in the Neon Console.
     * See [Manage API keys](https://neon.tech/docs/manage/api-keys/).
     *
     *
     * @summary Revoke an API key
     */
    SDK.prototype.revokeApiKey = function (metadata) {
        return this.core.fetch('/api_keys/{key_id}', 'delete', metadata);
    };
    /**
     * Retrieves details for the specified operation.
     * An operation is an action performed on a Neon project resource.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain a `operation_id` by listing operations for the project.
     *
     *
     * @summary Get operation details
     */
    SDK.prototype.getProjectOperation = function (metadata) {
        return this.core.fetch('/projects/{project_id}/operations/{operation_id}', 'get', metadata);
    };
    /**
     * Retrieves a list of projects for the Neon account.
     * A project is the top-level object in the Neon object hierarchy.
     * For more information, see [Manage projects](https://neon.tech/docs/manage/projects/).
     *
     *
     * @summary Get a list of projects
     */
    SDK.prototype.listProjects = function (metadata) {
        return this.core.fetch('/projects', 'get', metadata);
    };
    /**
     * Creates a Neon project.
     * A project is the top-level object in the Neon object hierarchy.
     * Plan limits define how many projects you can create.
     * Neon's Free plan permits one project per Neon account.
     * For more information, see [Manage projects](https://neon.tech/docs/manage/projects/).
     *
     * You can specify a region and Postgres version in the request body.
     * Neon currently supports PostgreSQL 14, 15, and 16.
     * For supported regions and `region_id` values, see
     * [Regions](https://neon.tech/docs/introduction/regions/).
     *
     *
     * @summary Create a project
     */
    SDK.prototype.createProject = function (body) {
        return this.core.fetch('/projects', 'post', body);
    };
    /**
     * Retrieves a list of shared projects for the Neon account.
     * A project is the top-level object in the Neon object hierarchy.
     * For more information, see [Manage projects](https://neon.tech/docs/manage/projects/).
     *
     *
     * @summary Get a list of shared projects
     */
    SDK.prototype.listSharedProjects = function (metadata) {
        return this.core.fetch('/projects/shared', 'get', metadata);
    };
    /**
     * Retrieves information about the specified project.
     * A project is the top-level object in the Neon object hierarchy.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     *
     *
     * @summary Get project details
     */
    SDK.prototype.getProject = function (metadata) {
        return this.core.fetch('/projects/{project_id}', 'get', metadata);
    };
    /**
     * Updates the specified project.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * Neon permits updating the project name only.
     *
     *
     * @summary Update a project
     */
    SDK.prototype.updateProject = function (body, metadata) {
        return this.core.fetch('/projects/{project_id}', 'patch', body, metadata);
    };
    /**
     * Deletes the specified project.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * Deleting a project is a permanent action.
     * Deleting a project also deletes endpoints, branches, databases, and users that belong to
     * the project.
     *
     *
     * @summary Delete a project
     */
    SDK.prototype.deleteProject = function (metadata) {
        return this.core.fetch('/projects/{project_id}', 'delete', metadata);
    };
    /**
     * Retrieves a list of operations for the specified Neon project.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * The number of operations returned can be large.
     * To paginate the response, issue an initial request with a `limit` value.
     * Then, add the `cursor` value that was returned in the response to the next request.
     *
     *
     * @summary Get a list of operations
     */
    SDK.prototype.listProjectOperations = function (metadata) {
        return this.core.fetch('/projects/{project_id}/operations', 'get', metadata);
    };
    /**
     * Retrieves details about users who have access to the project, including the permission
     * `id`, the granted-to email address, and the date project access was granted.
     *
     * @summary List project access
     */
    SDK.prototype.listProjectPermissions = function (metadata) {
        return this.core.fetch('/projects/{project_id}/permissions', 'get', metadata);
    };
    /**
     * Grants project access to the account associated with the specified email address
     *
     * @summary Grant project access
     */
    SDK.prototype.grantPermissionToProject = function (body, metadata) {
        return this.core.fetch('/projects/{project_id}/permissions', 'post', body, metadata);
    };
    /**
     * Revokes project access from the user associted with the specified permisison `id`. You
     * can retrieve a user's permission `id` by listing project access.
     *
     * @summary Revoke project access
     */
    SDK.prototype.revokePermissionFromProject = function (metadata) {
        return this.core.fetch('/projects/{project_id}/permissions/{permission_id}', 'delete', metadata);
    };
    /**
     * Returns all JWKS definitions for a project
     *
     *
     * @summary Returns all JWKS definitions for a project
     */
    SDK.prototype.getProjectJWKS = function (metadata) {
        return this.core.fetch('/projects/{project_id}/jwks', 'get', metadata);
    };
    /**
     * Add a new JWKS to a project
     *
     * @summary Adds a JWKS to a project
     */
    SDK.prototype.addProjectJWKS = function (body, metadata) {
        return this.core.fetch('/projects/{project_id}/jwks', 'post', body, metadata);
    };
    /**
     * Delete the specified JWKS from the project
     *
     * @summary Delete a JWKS
     */
    SDK.prototype.deleteProjectJWKS = function (metadata) {
        return this.core.fetch('/projects/{project_id}/jwks/{jwks_id}', 'delete', metadata);
    };
    /**
     * Retrieves a connection URI for the specified database.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain the `database_name` by listing the databases for a branch.
     * You can obtain a `role_name` by listing the roles for a branch.
     *
     *
     * @summary Get a connection URI
     */
    SDK.prototype.getConnectionURI = function (metadata) {
        return this.core.fetch('/projects/{project_id}/connection_uri', 'get', metadata);
    };
    SDK.prototype.createProjectBranch = function (body, metadata) {
        return this.core.fetch('/projects/{project_id}/branches', 'post', body, metadata);
    };
    /**
     * Retrieves a list of branches for the specified project.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     *
     * Each Neon project has a root branch named `main`.
     * A `branch_id` value has a `br-` prefix.
     * A project may contain child branches that were branched from `main` or from another
     * branch.
     * A parent branch is identified by the `parent_id` value, which is the `id` of the parent
     * branch.
     * For related information, see [Manage branches](https://neon.tech/docs/manage/branches/).
     *
     *
     * @summary Get a list of branches
     */
    SDK.prototype.listProjectBranches = function (metadata) {
        return this.core.fetch('/projects/{project_id}/branches', 'get', metadata);
    };
    /**
     * Retrieves information about the specified branch.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain a `branch_id` by listing the project's branches.
     * A `branch_id` value has a `br-` prefix.
     *
     * Each Neon project is initially created with a root and default branch named `main`.
     * A project can contain one or more branches.
     * A parent branch is identified by a `parent_id` value, which is the `id` of the parent
     * branch.
     * For related information, see [Manage branches](https://neon.tech/docs/manage/branches/).
     *
     *
     * @summary Get branch details
     */
    SDK.prototype.getProjectBranch = function (metadata) {
        return this.core.fetch('/projects/{project_id}/branches/{branch_id}', 'get', metadata);
    };
    /**
     * Deletes the specified branch from a project, and places
     * all compute endpoints into an idle state, breaking existing client connections.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain a `branch_id` by listing the project's branches.
     * For related information, see [Manage branches](https://neon.tech/docs/manage/branches/).
     *
     * When a successful response status is received, the compute endpoints are still active,
     * and the branch is not yet deleted from storage.
     * The deletion occurs after all operations finish.
     * You cannot delete a project's root or default branch, and you cannot delete a branch
     * that has a child branch.
     * A project must have at least one branch.
     *
     *
     * @summary Delete a branch
     */
    SDK.prototype.deleteProjectBranch = function (metadata) {
        return this.core.fetch('/projects/{project_id}/branches/{branch_id}', 'delete', metadata);
    };
    /**
     * Updates the specified branch.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain the `branch_id` by listing the project's branches.
     * For more information, see [Manage branches](https://neon.tech/docs/manage/branches/).
     *
     *
     * @summary Update a branch
     */
    SDK.prototype.updateProjectBranch = function (body, metadata) {
        return this.core.fetch('/projects/{project_id}/branches/{branch_id}', 'patch', body, metadata);
    };
    /**
     * Restores a branch to an earlier state in its own or another branch's history
     *
     * @summary Restore a branch
     */
    SDK.prototype.restoreProjectBranch = function (body, metadata) {
        return this.core.fetch('/projects/{project_id}/branches/{branch_id}/restore', 'post', body, metadata);
    };
    /**
     * Retrieves the schema from the specified database. The `lsn` and `timestamp` values
     * cannot be specified at the same time. If both are omitted, the database schema is
     * retrieved from database's head .
     *
     * @summary Get the database schema
     */
    SDK.prototype.getProjectBranchSchema = function (metadata) {
        return this.core.fetch('/projects/{project_id}/branches/{branch_id}/schema', 'get', metadata);
    };
    /**
     * DEPRECATED. Use `/set_as_default` endpoint.
     * Sets the specified branch as the project's primary branch.
     * The primary designation is automatically removed from the previous primary branch.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain the `branch_id` by listing the project's branches.
     * For more information, see [Manage branches](https://neon.tech/docs/manage/branches/).
     *
     *
     * @summary Set branch as primary
     */
    SDK.prototype.setPrimaryProjectBranch = function (metadata) {
        return this.core.fetch('/projects/{project_id}/branches/{branch_id}/set_as_primary', 'post', metadata);
    };
    /**
     * Sets the specified branch as the project's default branch.
     * The default designation is automatically removed from the previous default branch.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain the `branch_id` by listing the project's branches.
     * For more information, see [Manage branches](https://neon.tech/docs/manage/branches/).
     *
     *
     * @summary Set branch as default
     */
    SDK.prototype.setDefaultProjectBranch = function (metadata) {
        return this.core.fetch('/projects/{project_id}/branches/{branch_id}/set_as_default', 'post', metadata);
    };
    /**
     * Retrieves a list of compute endpoints for the specified branch.
     * Neon permits only one read-write compute endpoint per branch.
     * A branch can have multiple read-only compute endpoints.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain the `branch_id` by listing the project's branches.
     *
     *
     * @summary Get a list of branch endpoints
     */
    SDK.prototype.listProjectBranchEndpoints = function (metadata) {
        return this.core.fetch('/projects/{project_id}/branches/{branch_id}/endpoints', 'get', metadata);
    };
    /**
     * Retrieves a list of databases for the specified branch.
     * A branch can have multiple databases.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain the `branch_id` by listing the project's branches.
     * For related information, see [Manage
     * databases](https://neon.tech/docs/manage/databases/).
     *
     *
     * @summary Get a list of databases
     */
    SDK.prototype.listProjectBranchDatabases = function (metadata) {
        return this.core.fetch('/projects/{project_id}/branches/{branch_id}/databases', 'get', metadata);
    };
    /**
     * Creates a database in the specified branch.
     * A branch can have multiple databases.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain the `branch_id` by listing the project's branches.
     * For related information, see [Manage
     * databases](https://neon.tech/docs/manage/databases/).
     *
     *
     * @summary Create a database
     */
    SDK.prototype.createProjectBranchDatabase = function (body, metadata) {
        return this.core.fetch('/projects/{project_id}/branches/{branch_id}/databases', 'post', body, metadata);
    };
    /**
     * Retrieves information about the specified database.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain the `branch_id` and `database_name` by listing the branch's databases.
     * For related information, see [Manage
     * databases](https://neon.tech/docs/manage/databases/).
     *
     *
     * @summary Get database details
     */
    SDK.prototype.getProjectBranchDatabase = function (metadata) {
        return this.core.fetch('/projects/{project_id}/branches/{branch_id}/databases/{database_name}', 'get', metadata);
    };
    /**
     * Updates the specified database in the branch.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain the `branch_id` and `database_name` by listing the branch's databases.
     * For related information, see [Manage
     * databases](https://neon.tech/docs/manage/databases/).
     *
     *
     * @summary Update a database
     */
    SDK.prototype.updateProjectBranchDatabase = function (body, metadata) {
        return this.core.fetch('/projects/{project_id}/branches/{branch_id}/databases/{database_name}', 'patch', body, metadata);
    };
    /**
     * Deletes the specified database from the branch.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain the `branch_id` and `database_name` by listing the branch's databases.
     * For related information, see [Manage
     * databases](https://neon.tech/docs/manage/databases/).
     *
     *
     * @summary Delete a database
     */
    SDK.prototype.deleteProjectBranchDatabase = function (metadata) {
        return this.core.fetch('/projects/{project_id}/branches/{branch_id}/databases/{database_name}', 'delete', metadata);
    };
    /**
     * Retrieves a list of Postgres roles from the specified branch.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain the `branch_id` by listing the project's branches.
     * For related information, see [Manage roles](https://neon.tech/docs/manage/roles/).
     *
     *
     * @summary Get a list of roles
     */
    SDK.prototype.listProjectBranchRoles = function (metadata) {
        return this.core.fetch('/projects/{project_id}/branches/{branch_id}/roles', 'get', metadata);
    };
    /**
     * Creates a Postgres role in the specified branch.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain the `branch_id` by listing the project's branches.
     * For related information, see [Manage roles](https://neon.tech/docs/manage/roles/).
     *
     * Connections established to the active compute endpoint will be dropped.
     * If the compute endpoint is idle, the endpoint becomes active for a short period of time
     * and is suspended afterward.
     *
     *
     * @summary Create a role
     */
    SDK.prototype.createProjectBranchRole = function (body, metadata) {
        return this.core.fetch('/projects/{project_id}/branches/{branch_id}/roles', 'post', body, metadata);
    };
    /**
     * Retrieves details about the specified role.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain the `branch_id` by listing the project's branches.
     * You can obtain the `role_name` by listing the roles for a branch.
     * In Neon, the terms "role" and "user" are synonymous.
     * For related information, see [Manage roles](https://neon.tech/docs/manage/roles/).
     *
     *
     * @summary Get role details
     */
    SDK.prototype.getProjectBranchRole = function (metadata) {
        return this.core.fetch('/projects/{project_id}/branches/{branch_id}/roles/{role_name}', 'get', metadata);
    };
    /**
     * Deletes the specified Postgres role from the branch.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain the `branch_id` by listing the project's branches.
     * You can obtain the `role_name` by listing the roles for a branch.
     * For related information, see [Manage roles](https://neon.tech/docs/manage/roles/).
     *
     *
     * @summary Delete a role
     */
    SDK.prototype.deleteProjectBranchRole = function (metadata) {
        return this.core.fetch('/projects/{project_id}/branches/{branch_id}/roles/{role_name}', 'delete', metadata);
    };
    /**
     * Retrieves the password for the specified Postgres role, if possible.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain the `branch_id` by listing the project's branches.
     * You can obtain the `role_name` by listing the roles for a branch.
     * For related information, see [Manage roles](https://neon.tech/docs/manage/roles/).
     *
     *
     * @summary Get role password
     * @throws FetchError<404, types.GetProjectBranchRolePasswordResponse404> Role not found
     * @throws FetchError<412, types.GetProjectBranchRolePasswordResponse412> Storing passwords is disabled
     */
    SDK.prototype.getProjectBranchRolePassword = function (metadata) {
        return this.core.fetch('/projects/{project_id}/branches/{branch_id}/roles/{role_name}/reveal_password', 'get', metadata);
    };
    /**
     * Resets the password for the specified Postgres role.
     * Returns a new password and operations. The new password is ready to use when the last
     * operation finishes.
     * The old password remains valid until last operation finishes.
     * Connections to the compute endpoint are dropped. If idle,
     * the compute endpoint becomes active for a short period of time.
     *
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain the `branch_id` by listing the project's branches.
     * You can obtain the `role_name` by listing the roles for a branch.
     * For related information, see [Manage roles](https://neon.tech/docs/manage/roles/).
     *
     *
     * @summary Reset the role password
     */
    SDK.prototype.resetProjectBranchRolePassword = function (metadata) {
        return this.core.fetch('/projects/{project_id}/branches/{branch_id}/roles/{role_name}/reset_password', 'post', metadata);
    };
    /**
     * Creates a compute endpoint for the specified branch.
     * An endpoint is a Neon compute instance.
     * There is a maximum of one read-write compute endpoint per branch.
     * If the specified branch already has a read-write compute endpoint, the operation fails.
     * A branch can have multiple read-only compute endpoints.
     *
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain `branch_id` by listing the project's branches.
     * A `branch_id` has a `br-` prefix.
     * For supported regions and `region_id` values, see
     * [Regions](https://neon.tech/docs/introduction/regions/).
     * For more information about compute endpoints, see [Manage
     * computes](https://neon.tech/docs/manage/endpoints/).
     *
     *
     * @summary Create a compute endpoint
     */
    SDK.prototype.createProjectEndpoint = function (body, metadata) {
        return this.core.fetch('/projects/{project_id}/endpoints', 'post', body, metadata);
    };
    /**
     * Retrieves a list of compute endpoints for the specified project.
     * A compute endpoint is a Neon compute instance.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * For information about compute endpoints, see [Manage
     * computes](https://neon.tech/docs/manage/endpoints/).
     *
     *
     * @summary Get a list of compute endpoints
     */
    SDK.prototype.listProjectEndpoints = function (metadata) {
        return this.core.fetch('/projects/{project_id}/endpoints', 'get', metadata);
    };
    /**
     * Retrieves information about the specified compute endpoint.
     * A compute endpoint is a Neon compute instance.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain an `endpoint_id` by listing your project's compute endpoints.
     * An `endpoint_id` has an `ep-` prefix.
     * For information about compute endpoints, see [Manage
     * computes](https://neon.tech/docs/manage/endpoints/).
     *
     *
     * @summary Get a compute endpoint
     */
    SDK.prototype.getProjectEndpoint = function (metadata) {
        return this.core.fetch('/projects/{project_id}/endpoints/{endpoint_id}', 'get', metadata);
    };
    /**
     * Delete the specified compute endpoint.
     * A compute endpoint is a Neon compute instance.
     * Deleting a compute endpoint drops existing network connections to the compute endpoint.
     * The deletion is completed when last operation in the chain finishes successfully.
     *
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain an `endpoint_id` by listing your project's compute endpoints.
     * An `endpoint_id` has an `ep-` prefix.
     * For information about compute endpoints, see [Manage
     * computes](https://neon.tech/docs/manage/endpoints/).
     *
     *
     * @summary Delete a compute endpoint
     */
    SDK.prototype.deleteProjectEndpoint = function (metadata) {
        return this.core.fetch('/projects/{project_id}/endpoints/{endpoint_id}', 'delete', metadata);
    };
    /**
     * Updates the specified compute endpoint.
     *
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain an `endpoint_id` and `branch_id` by listing your project's compute
     * endpoints.
     * An `endpoint_id` has an `ep-` prefix. A `branch_id` has a `br-` prefix.
     *  For more information about compute endpoints, see [Manage
     * computes](https://neon.tech/docs/manage/endpoints/).
     *
     * If the returned list of operations is not empty, the compute endpoint is not ready to
     * use.
     * The client must wait for the last operation to finish before using the compute endpoint.
     * If the compute endpoint was idle before the update, it becomes active for a short period
     * of time,
     * and the control plane suspends it again after the update.
     *
     *
     * @summary Update a compute endpoint
     */
    SDK.prototype.updateProjectEndpoint = function (body, metadata) {
        return this.core.fetch('/projects/{project_id}/endpoints/{endpoint_id}', 'patch', body, metadata);
    };
    /**
     * Starts a compute endpoint. The compute endpoint is ready to use
     * after the last operation in chain finishes successfully.
     *
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain an `endpoint_id` by listing your project's compute endpoints.
     * An `endpoint_id` has an `ep-` prefix.
     * For information about compute endpoints, see [Manage
     * computes](https://neon.tech/docs/manage/endpoints/).
     *
     *
     * @summary Start a compute endpoint
     */
    SDK.prototype.startProjectEndpoint = function (metadata) {
        return this.core.fetch('/projects/{project_id}/endpoints/{endpoint_id}/start', 'post', metadata);
    };
    /**
     * Suspend the specified compute endpoint
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain an `endpoint_id` by listing your project's compute endpoints.
     * An `endpoint_id` has an `ep-` prefix.
     * For information about compute endpoints, see [Manage
     * computes](https://neon.tech/docs/manage/endpoints/).
     *
     *
     * @summary Suspend a compute endpoint
     */
    SDK.prototype.suspendProjectEndpoint = function (metadata) {
        return this.core.fetch('/projects/{project_id}/endpoints/{endpoint_id}/suspend', 'post', metadata);
    };
    /**
     * Restart the specified compute endpoint: suspend immediately followed by start
     * operations.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain an `endpoint_id` by listing your project's compute endpoints.
     * An `endpoint_id` has an `ep-` prefix.
     * For information about compute endpoints, see [Manage
     * computes](https://neon.tech/docs/manage/endpoints/).
     *
     *
     * @summary Restart a compute endpoint
     */
    SDK.prototype.restartProjectEndpoint = function (metadata) {
        return this.core.fetch('/projects/{project_id}/endpoints/{endpoint_id}/restart', 'post', metadata);
    };
    /**
     * Retrieves consumption metrics for Scale plan accounts. History begins at the time of
     * upgrade.
     * Available for Scale plan users only.
     *
     *
     * @summary Get account consumption metrics
     * @throws FetchError<403, types.GetConsumptionHistoryPerAccountResponse403> This endpoint is not available. It is only supported with Scale plan accounts.
     * @throws FetchError<404, types.GetConsumptionHistoryPerAccountResponse404> Account is not a member of the organization specified by `org_id`.
     * @throws FetchError<406, types.GetConsumptionHistoryPerAccountResponse406> The specified `date-time` range is outside the boundaries of the specified
     * `granularity`.
     * Adjust your `from` and `to` values or select a different `granularity`.
     *
     * @throws FetchError<429, types.GetConsumptionHistoryPerAccountResponse429> Too many requests
     */
    SDK.prototype.getConsumptionHistoryPerAccount = function (metadata) {
        return this.core.fetch('/consumption_history/account', 'get', metadata);
    };
    /**
     * Retrieves consumption metrics for Scale plan projects. History begins at the time of
     * upgrade.
     * Available for Scale plan users only.
     *
     *
     * @summary Get consumption metrics for each project
     * @throws FetchError<403, types.GetConsumptionHistoryPerProjectResponse403> This endpoint is not available. It is only supported with Scale plan accounts.
     * @throws FetchError<404, types.GetConsumptionHistoryPerProjectResponse404> Account is not a member of the organization specified by `org_id`.
     * @throws FetchError<406, types.GetConsumptionHistoryPerProjectResponse406> The specified `date-time` range is outside the boundaries of the specified
     * `granularity`.
     * Adjust your `from` and `to` values or select a different `granularity`.
     *
     * @throws FetchError<429, types.GetConsumptionHistoryPerProjectResponse429> Too many requests
     */
    SDK.prototype.getConsumptionHistoryPerProject = function (metadata) {
        return this.core.fetch('/consumption_history/projects', 'get', metadata);
    };
    /**
     * Retrieves consumption metrics for each project for the current billing period.
     * For usage information, see [Retrieving metrics for all
     * projects](https://neon.tech/docs/guides/partner-billing#retrieving-metrics-for-all-projects).
     *
     *
     * @summary Get project consumption metrics
     * @throws FetchError<404, types.ListProjectsConsumptionResponse404> Account is not a member of the organization specified by `org_id`.
     */
    SDK.prototype.listProjectsConsumption = function (metadata) {
        return this.core.fetch('/consumption/projects', 'get', metadata);
    };
    /**
     * Retrieves information about the current Neon user account.
     *
     *
     * @summary Get current user details
     */
    SDK.prototype.getCurrentUserInfo = function () {
        return this.core.fetch('/users/me', 'get');
    };
    /**
     * Retrieves information about the current Neon user's organizations
     *
     *
     * @summary Get current user organizations list
     */
    SDK.prototype.getCurrentUserOrganizations = function () {
        return this.core.fetch('/users/me/organizations', 'get');
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
