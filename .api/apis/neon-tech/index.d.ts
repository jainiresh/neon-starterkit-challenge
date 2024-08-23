import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
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
    auth(...values: string[] | number[]): this;
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
    server(url: string, variables?: {}): void;
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
    listApiKeys(): Promise<FetchResponse<200, types.ListApiKeysResponse200> | FetchResponse<number, types.ListApiKeysResponseDefault>>;
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
    createApiKey(body: types.CreateApiKeyBodyParam): Promise<FetchResponse<200, types.CreateApiKeyResponse200> | FetchResponse<number, types.CreateApiKeyResponseDefault>>;
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
    revokeApiKey(metadata: types.RevokeApiKeyMetadataParam): Promise<FetchResponse<200, types.RevokeApiKeyResponse200> | FetchResponse<number, types.RevokeApiKeyResponseDefault>>;
    /**
     * Retrieves details for the specified operation.
     * An operation is an action performed on a Neon project resource.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain a `operation_id` by listing operations for the project.
     *
     *
     * @summary Get operation details
     */
    getProjectOperation(metadata: types.GetProjectOperationMetadataParam): Promise<FetchResponse<200, types.GetProjectOperationResponse200> | FetchResponse<number, types.GetProjectOperationResponseDefault>>;
    /**
     * Retrieves a list of projects for the Neon account.
     * A project is the top-level object in the Neon object hierarchy.
     * For more information, see [Manage projects](https://neon.tech/docs/manage/projects/).
     *
     *
     * @summary Get a list of projects
     */
    listProjects(metadata?: types.ListProjectsMetadataParam): Promise<FetchResponse<200, types.ListProjectsResponse200> | FetchResponse<number, types.ListProjectsResponseDefault>>;
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
    createProject(body: types.CreateProjectBodyParam): Promise<FetchResponse<201, types.CreateProjectResponse201> | FetchResponse<number, types.CreateProjectResponseDefault>>;
    /**
     * Retrieves a list of shared projects for the Neon account.
     * A project is the top-level object in the Neon object hierarchy.
     * For more information, see [Manage projects](https://neon.tech/docs/manage/projects/).
     *
     *
     * @summary Get a list of shared projects
     */
    listSharedProjects(metadata?: types.ListSharedProjectsMetadataParam): Promise<FetchResponse<200, types.ListSharedProjectsResponse200> | FetchResponse<number, types.ListSharedProjectsResponseDefault>>;
    /**
     * Retrieves information about the specified project.
     * A project is the top-level object in the Neon object hierarchy.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     *
     *
     * @summary Get project details
     */
    getProject(metadata: types.GetProjectMetadataParam): Promise<FetchResponse<200, types.GetProjectResponse200> | FetchResponse<number, types.GetProjectResponseDefault>>;
    /**
     * Updates the specified project.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * Neon permits updating the project name only.
     *
     *
     * @summary Update a project
     */
    updateProject(body: types.UpdateProjectBodyParam, metadata: types.UpdateProjectMetadataParam): Promise<FetchResponse<200, types.UpdateProjectResponse200> | FetchResponse<number, types.UpdateProjectResponseDefault>>;
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
    deleteProject(metadata: types.DeleteProjectMetadataParam): Promise<FetchResponse<200, types.DeleteProjectResponse200> | FetchResponse<number, types.DeleteProjectResponseDefault>>;
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
    listProjectOperations(metadata: types.ListProjectOperationsMetadataParam): Promise<FetchResponse<200, types.ListProjectOperationsResponse200> | FetchResponse<number, types.ListProjectOperationsResponseDefault>>;
    /**
     * Retrieves details about users who have access to the project, including the permission
     * `id`, the granted-to email address, and the date project access was granted.
     *
     * @summary List project access
     */
    listProjectPermissions(metadata: types.ListProjectPermissionsMetadataParam): Promise<FetchResponse<200, types.ListProjectPermissionsResponse200> | FetchResponse<number, types.ListProjectPermissionsResponseDefault>>;
    /**
     * Grants project access to the account associated with the specified email address
     *
     * @summary Grant project access
     */
    grantPermissionToProject(body: types.GrantPermissionToProjectBodyParam, metadata: types.GrantPermissionToProjectMetadataParam): Promise<FetchResponse<200, types.GrantPermissionToProjectResponse200> | FetchResponse<number, types.GrantPermissionToProjectResponseDefault>>;
    /**
     * Revokes project access from the user associted with the specified permisison `id`. You
     * can retrieve a user's permission `id` by listing project access.
     *
     * @summary Revoke project access
     */
    revokePermissionFromProject(metadata: types.RevokePermissionFromProjectMetadataParam): Promise<FetchResponse<200, types.RevokePermissionFromProjectResponse200> | FetchResponse<number, types.RevokePermissionFromProjectResponseDefault>>;
    /**
     * Returns all JWKS definitions for a project
     *
     *
     * @summary Returns all JWKS definitions for a project
     */
    getProjectJWKS(metadata: types.GetProjectJwksMetadataParam): Promise<FetchResponse<200, types.GetProjectJwksResponse200> | FetchResponse<number, types.GetProjectJwksResponseDefault>>;
    /**
     * Add a new JWKS to a project
     *
     * @summary Adds a JWKS to a project
     */
    addProjectJWKS(body: types.AddProjectJwksBodyParam, metadata: types.AddProjectJwksMetadataParam): Promise<FetchResponse<201, types.AddProjectJwksResponse201> | FetchResponse<number, types.AddProjectJwksResponseDefault>>;
    /**
     * Delete the specified JWKS from the project
     *
     * @summary Delete a JWKS
     */
    deleteProjectJWKS(metadata: types.DeleteProjectJwksMetadataParam): Promise<FetchResponse<200, types.DeleteProjectJwksResponse200> | FetchResponse<number, types.DeleteProjectJwksResponseDefault>>;
    /**
     * Retrieves a connection URI for the specified database.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain the `database_name` by listing the databases for a branch.
     * You can obtain a `role_name` by listing the roles for a branch.
     *
     *
     * @summary Get a connection URI
     */
    getConnectionURI(metadata: types.GetConnectionUriMetadataParam): Promise<FetchResponse<200, types.GetConnectionUriResponse200> | FetchResponse<number, types.GetConnectionUriResponseDefault>>;
    /**
     * Creates a branch in the specified project.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     *
     * This method does not require a request body, but you can specify one to create a compute
     * endpoint for the branch or to select a non-default parent branch.
     * The default behavior is to create a branch from the project's default branch with no
     * compute endpoint, and the branch name is auto-generated.
     * There is a maximum of one read-write endpoint per branch.
     * A branch can have multiple read-only endpoints.
     * For related information, see [Manage branches](https://neon.tech/docs/manage/branches/).
     *
     *
     * @summary Create a branch
     */
    createProjectBranch(body: types.CreateProjectBranchBodyParam, metadata: types.CreateProjectBranchMetadataParam): Promise<FetchResponse<201, types.CreateProjectBranchResponse201> | FetchResponse<number, types.CreateProjectBranchResponseDefault>>;
    createProjectBranch(metadata: types.CreateProjectBranchMetadataParam): Promise<FetchResponse<201, types.CreateProjectBranchResponse201> | FetchResponse<number, types.CreateProjectBranchResponseDefault>>;
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
    listProjectBranches(metadata: types.ListProjectBranchesMetadataParam): Promise<FetchResponse<200, types.ListProjectBranchesResponse200> | FetchResponse<number, types.ListProjectBranchesResponseDefault>>;
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
    getProjectBranch(metadata: types.GetProjectBranchMetadataParam): Promise<FetchResponse<200, types.GetProjectBranchResponse200> | FetchResponse<number, types.GetProjectBranchResponseDefault>>;
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
    deleteProjectBranch(metadata: types.DeleteProjectBranchMetadataParam): Promise<FetchResponse<200, types.DeleteProjectBranchResponse200> | FetchResponse<number, types.DeleteProjectBranchResponseDefault>>;
    /**
     * Updates the specified branch.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain the `branch_id` by listing the project's branches.
     * For more information, see [Manage branches](https://neon.tech/docs/manage/branches/).
     *
     *
     * @summary Update a branch
     */
    updateProjectBranch(body: types.UpdateProjectBranchBodyParam, metadata: types.UpdateProjectBranchMetadataParam): Promise<FetchResponse<200, types.UpdateProjectBranchResponse200> | FetchResponse<number, types.UpdateProjectBranchResponseDefault>>;
    /**
     * Restores a branch to an earlier state in its own or another branch's history
     *
     * @summary Restore a branch
     */
    restoreProjectBranch(body: types.RestoreProjectBranchBodyParam, metadata: types.RestoreProjectBranchMetadataParam): Promise<FetchResponse<200, types.RestoreProjectBranchResponse200> | FetchResponse<number, types.RestoreProjectBranchResponseDefault>>;
    /**
     * Retrieves the schema from the specified database. The `lsn` and `timestamp` values
     * cannot be specified at the same time. If both are omitted, the database schema is
     * retrieved from database's head .
     *
     * @summary Get the database schema
     */
    getProjectBranchSchema(metadata: types.GetProjectBranchSchemaMetadataParam): Promise<FetchResponse<200, types.GetProjectBranchSchemaResponse200> | FetchResponse<number, types.GetProjectBranchSchemaResponseDefault>>;
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
    setPrimaryProjectBranch(metadata: types.SetPrimaryProjectBranchMetadataParam): Promise<FetchResponse<200, types.SetPrimaryProjectBranchResponse200> | FetchResponse<number, types.SetPrimaryProjectBranchResponseDefault>>;
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
    setDefaultProjectBranch(metadata: types.SetDefaultProjectBranchMetadataParam): Promise<FetchResponse<200, types.SetDefaultProjectBranchResponse200> | FetchResponse<number, types.SetDefaultProjectBranchResponseDefault>>;
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
    listProjectBranchEndpoints(metadata: types.ListProjectBranchEndpointsMetadataParam): Promise<FetchResponse<200, types.ListProjectBranchEndpointsResponse200> | FetchResponse<number, types.ListProjectBranchEndpointsResponseDefault>>;
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
    listProjectBranchDatabases(metadata: types.ListProjectBranchDatabasesMetadataParam): Promise<FetchResponse<200, types.ListProjectBranchDatabasesResponse200> | FetchResponse<number, types.ListProjectBranchDatabasesResponseDefault>>;
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
    createProjectBranchDatabase(body: types.CreateProjectBranchDatabaseBodyParam, metadata: types.CreateProjectBranchDatabaseMetadataParam): Promise<FetchResponse<201, types.CreateProjectBranchDatabaseResponse201> | FetchResponse<number, types.CreateProjectBranchDatabaseResponseDefault>>;
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
    getProjectBranchDatabase(metadata: types.GetProjectBranchDatabaseMetadataParam): Promise<FetchResponse<200, types.GetProjectBranchDatabaseResponse200> | FetchResponse<number, types.GetProjectBranchDatabaseResponseDefault>>;
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
    updateProjectBranchDatabase(body: types.UpdateProjectBranchDatabaseBodyParam, metadata: types.UpdateProjectBranchDatabaseMetadataParam): Promise<FetchResponse<200, types.UpdateProjectBranchDatabaseResponse200> | FetchResponse<number, types.UpdateProjectBranchDatabaseResponseDefault>>;
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
    deleteProjectBranchDatabase(metadata: types.DeleteProjectBranchDatabaseMetadataParam): Promise<FetchResponse<200, types.DeleteProjectBranchDatabaseResponse200> | FetchResponse<number, types.DeleteProjectBranchDatabaseResponseDefault>>;
    /**
     * Retrieves a list of Postgres roles from the specified branch.
     * You can obtain a `project_id` by listing the projects for your Neon account.
     * You can obtain the `branch_id` by listing the project's branches.
     * For related information, see [Manage roles](https://neon.tech/docs/manage/roles/).
     *
     *
     * @summary Get a list of roles
     */
    listProjectBranchRoles(metadata: types.ListProjectBranchRolesMetadataParam): Promise<FetchResponse<200, types.ListProjectBranchRolesResponse200> | FetchResponse<number, types.ListProjectBranchRolesResponseDefault>>;
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
    createProjectBranchRole(body: types.CreateProjectBranchRoleBodyParam, metadata: types.CreateProjectBranchRoleMetadataParam): Promise<FetchResponse<201, types.CreateProjectBranchRoleResponse201> | FetchResponse<number, types.CreateProjectBranchRoleResponseDefault>>;
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
    getProjectBranchRole(metadata: types.GetProjectBranchRoleMetadataParam): Promise<FetchResponse<200, types.GetProjectBranchRoleResponse200> | FetchResponse<number, types.GetProjectBranchRoleResponseDefault>>;
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
    deleteProjectBranchRole(metadata: types.DeleteProjectBranchRoleMetadataParam): Promise<FetchResponse<200, types.DeleteProjectBranchRoleResponse200> | FetchResponse<number, types.DeleteProjectBranchRoleResponseDefault>>;
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
    getProjectBranchRolePassword(metadata: types.GetProjectBranchRolePasswordMetadataParam): Promise<FetchResponse<200, types.GetProjectBranchRolePasswordResponse200> | FetchResponse<number, types.GetProjectBranchRolePasswordResponseDefault>>;
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
    resetProjectBranchRolePassword(metadata: types.ResetProjectBranchRolePasswordMetadataParam): Promise<FetchResponse<200, types.ResetProjectBranchRolePasswordResponse200> | FetchResponse<number, types.ResetProjectBranchRolePasswordResponseDefault>>;
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
    createProjectEndpoint(body: types.CreateProjectEndpointBodyParam, metadata: types.CreateProjectEndpointMetadataParam): Promise<FetchResponse<201, types.CreateProjectEndpointResponse201> | FetchResponse<number, types.CreateProjectEndpointResponseDefault>>;
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
    listProjectEndpoints(metadata: types.ListProjectEndpointsMetadataParam): Promise<FetchResponse<200, types.ListProjectEndpointsResponse200> | FetchResponse<number, types.ListProjectEndpointsResponseDefault>>;
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
    getProjectEndpoint(metadata: types.GetProjectEndpointMetadataParam): Promise<FetchResponse<200, types.GetProjectEndpointResponse200> | FetchResponse<number, types.GetProjectEndpointResponseDefault>>;
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
    deleteProjectEndpoint(metadata: types.DeleteProjectEndpointMetadataParam): Promise<FetchResponse<200, types.DeleteProjectEndpointResponse200> | FetchResponse<number, types.DeleteProjectEndpointResponseDefault>>;
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
    updateProjectEndpoint(body: types.UpdateProjectEndpointBodyParam, metadata: types.UpdateProjectEndpointMetadataParam): Promise<FetchResponse<200, types.UpdateProjectEndpointResponse200> | FetchResponse<number, types.UpdateProjectEndpointResponseDefault>>;
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
    startProjectEndpoint(metadata: types.StartProjectEndpointMetadataParam): Promise<FetchResponse<200, types.StartProjectEndpointResponse200> | FetchResponse<number, types.StartProjectEndpointResponseDefault>>;
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
    suspendProjectEndpoint(metadata: types.SuspendProjectEndpointMetadataParam): Promise<FetchResponse<200, types.SuspendProjectEndpointResponse200> | FetchResponse<number, types.SuspendProjectEndpointResponseDefault>>;
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
    restartProjectEndpoint(metadata: types.RestartProjectEndpointMetadataParam): Promise<FetchResponse<200, types.RestartProjectEndpointResponse200> | FetchResponse<number, types.RestartProjectEndpointResponseDefault>>;
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
    getConsumptionHistoryPerAccount(metadata: types.GetConsumptionHistoryPerAccountMetadataParam): Promise<FetchResponse<200, types.GetConsumptionHistoryPerAccountResponse200> | FetchResponse<number, types.GetConsumptionHistoryPerAccountResponseDefault>>;
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
    getConsumptionHistoryPerProject(metadata: types.GetConsumptionHistoryPerProjectMetadataParam): Promise<FetchResponse<200, types.GetConsumptionHistoryPerProjectResponse200> | FetchResponse<number, types.GetConsumptionHistoryPerProjectResponseDefault>>;
    /**
     * Retrieves consumption metrics for each project for the current billing period.
     * For usage information, see [Retrieving metrics for all
     * projects](https://neon.tech/docs/guides/partner-billing#retrieving-metrics-for-all-projects).
     *
     *
     * @summary Get project consumption metrics
     * @throws FetchError<404, types.ListProjectsConsumptionResponse404> Account is not a member of the organization specified by `org_id`.
     */
    listProjectsConsumption(metadata?: types.ListProjectsConsumptionMetadataParam): Promise<FetchResponse<200, types.ListProjectsConsumptionResponse200> | FetchResponse<number, types.ListProjectsConsumptionResponseDefault>>;
    /**
     * Retrieves information about the current Neon user account.
     *
     *
     * @summary Get current user details
     */
    getCurrentUserInfo(): Promise<FetchResponse<200, types.GetCurrentUserInfoResponse200> | FetchResponse<number, types.GetCurrentUserInfoResponseDefault>>;
    /**
     * Retrieves information about the current Neon user's organizations
     *
     *
     * @summary Get current user organizations list
     */
    getCurrentUserOrganizations(): Promise<FetchResponse<200, types.GetCurrentUserOrganizationsResponse200> | FetchResponse<number, types.GetCurrentUserOrganizationsResponseDefault>>;
}
declare const createSDK: SDK;
export = createSDK;
