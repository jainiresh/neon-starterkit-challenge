declare const AddProjectJwks: {
    readonly body: {
        readonly description: "Add a new JWKS to a specific endpoint of a project";
        readonly type: "object";
        readonly required: readonly ["jwks_url", "provider_name"];
        readonly properties: {
            readonly jwks_url: {
                readonly description: "The URL that lists the JWKS";
                readonly type: "string";
            };
            readonly provider_name: {
                readonly description: "The name of the authentication provider (e.g., Clerk, Stytch, Auth0)";
                readonly type: "string";
            };
            readonly branch_id: {
                readonly description: "Branch ID";
                readonly type: "string";
            };
            readonly jwt_audience: {
                readonly description: "The name of the required JWT Audience to be used";
                readonly type: "string";
            };
            readonly role_names: {
                readonly description: "The roles the JWKS should be mapped to";
                readonly type: "array";
                readonly maxItems: 10;
                readonly items: {
                    readonly type: "string";
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
            };
            readonly required: readonly ["project_id"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly required: readonly ["id", "project_id", "jwks_url", "provider_name", "created_at", "updated_at"];
            readonly properties: {
                readonly id: {
                    readonly description: "JWKS ID";
                    readonly type: "string";
                };
                readonly project_id: {
                    readonly description: "Project ID";
                    readonly type: "string";
                };
                readonly branch_id: {
                    readonly description: "Branch ID";
                    readonly type: "string";
                };
                readonly jwks_url: {
                    readonly description: "The URL that lists the JWKS";
                    readonly type: "string";
                };
                readonly provider_name: {
                    readonly description: "The name of the authentication provider (e.g., Clerk, Stytch, Auth0)";
                    readonly type: "string";
                };
                readonly created_at: {
                    readonly description: "The date and time when the JWKS was created";
                    readonly type: "string";
                    readonly format: "date-time";
                };
                readonly updated_at: {
                    readonly description: "The date and time when the JWKS was last modified";
                    readonly type: "string";
                    readonly format: "date-time";
                };
                readonly jwt_audience: {
                    readonly description: "The name of the required JWT Audience to be used";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CreateApiKey: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["key_name"];
        readonly properties: {
            readonly key_name: {
                readonly type: "string";
                readonly description: "A user-specified API key name. This value is required when creating an API key.";
                readonly examples: readonly ["mykey"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["key", "id", "name", "created_at"];
            readonly properties: {
                readonly id: {
                    readonly description: "The API key ID";
                    readonly type: "integer";
                    readonly format: "int64";
                    readonly minimum: -9223372036854776000;
                    readonly maximum: 9223372036854776000;
                };
                readonly key: {
                    readonly description: "The generated 64-bit token required to access the Neon API";
                    readonly type: "string";
                };
                readonly name: {
                    readonly description: "The user-specified API key name";
                    readonly type: "string";
                };
                readonly created_at: {
                    readonly description: "A timestamp indicating when the API key was created";
                    readonly type: "string";
                    readonly format: "date-time";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CreateProject: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["project"];
        readonly properties: {
            readonly project: {
                readonly type: "object";
                readonly properties: {
                    readonly settings: {
                        readonly type: "object";
                        readonly properties: {
                            readonly quota: {
                                readonly type: "object";
                                readonly description: "Per-project consumption quota. If the quota is exceeded, all active computes\nare automatically suspended and it will not be possible to start them with\nan API method call or incoming proxy connections. The only exception is\n`logical_size_bytes`, which is applied on per-branch basis, i.e., only the\ncompute on the branch that exceeds the `logical_size` quota will be suspended.\n\nQuotas are enforced based on per-project consumption metrics with the same names,\nwhich are reset at the end of each billing period (the first day of the month).\nLogical size is also an exception in this case, as it represents the total size\nof data stored in a branch, so it is not reset.\n\nA zero or empty quota value means 'unlimited'.\n";
                                readonly properties: {
                                    readonly active_time_seconds: {
                                        readonly description: "The total amount of wall-clock time allowed to be spent by the project's compute endpoints.\n";
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly minimum: 0;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly compute_time_seconds: {
                                        readonly description: "The total amount of CPU seconds allowed to be spent by the project's compute endpoints.\n";
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly minimum: 0;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly written_data_bytes: {
                                        readonly description: "Total amount of data written to all of a project's branches.\n";
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly minimum: 0;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly data_transfer_bytes: {
                                        readonly description: "Total amount of data transferred from all of a project's branches using the proxy.\n";
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly minimum: 0;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly logical_size_bytes: {
                                        readonly description: "Limit on the logical size of every project's branch.\n";
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly minimum: 0;
                                        readonly maximum: 9223372036854776000;
                                    };
                                };
                            };
                            readonly allowed_ips: {
                                readonly description: "A list of IP addresses that are allowed to connect to the compute endpoint.\nIf the list is empty or not set, all IP addresses are allowed.\nIf protected_branches_only is true, the list will be applied only to protected branches.\n";
                                readonly type: "object";
                                readonly properties: {
                                    readonly ips: {
                                        readonly description: "A list of IP addresses that are allowed to connect to the endpoint.";
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly protected_branches_only: {
                                        readonly description: "If true, the list will be applied only to protected branches.";
                                        readonly type: "boolean";
                                    };
                                    readonly primary_branch_only: {
                                        readonly deprecated: true;
                                        readonly description: "DEPRECATED: Use `protected_branches_only`.\nIf true, the list will be applied only to the default branch.\n";
                                        readonly type: "boolean";
                                    };
                                };
                            };
                            readonly enable_logical_replication: {
                                readonly description: "Sets wal_level=logical for all compute endpoints in this project.\nAll active endpoints will be suspended.\nOnce enabled, logical replication cannot be disabled.\n";
                                readonly type: "boolean";
                            };
                        };
                    };
                    readonly name: {
                        readonly description: "The project name";
                        readonly type: "string";
                        readonly examples: readonly ["myproject"];
                    };
                    readonly branch: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly description: "The branch name. If not specified, the default branch name will be used.\n";
                                readonly type: "string";
                            };
                            readonly role_name: {
                                readonly description: "The role name. If not specified, the default role name will be used.\n";
                                readonly type: "string";
                            };
                            readonly database_name: {
                                readonly description: "The database name. If not specified, the default database name will be used.\n";
                                readonly type: "string";
                            };
                        };
                    };
                    readonly autoscaling_limit_min_cu: {
                        readonly deprecated: true;
                        readonly description: "DEPRECATED, use default_endpoint_settings.autoscaling_limit_min_cu instead.\n\nThe minimum number of Compute Units. The minimum value is `0.25`.\nSee [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\nfor more information.\n";
                        readonly type: "number";
                        readonly minimum: 0.25;
                    };
                    readonly autoscaling_limit_max_cu: {
                        readonly deprecated: true;
                        readonly description: "DEPRECATED, use default_endpoint_settings.autoscaling_limit_max_cu instead.\n\nThe maximum number of Compute Units. See [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\nfor more information.\n";
                        readonly type: "number";
                        readonly minimum: 0.25;
                    };
                    readonly provisioner: {
                        readonly type: "string";
                        readonly description: "The Neon compute provisioner.\nSpecify the `k8s-neonvm` provisioner to create a compute endpoint that supports Autoscaling.\n";
                        readonly enum: readonly ["k8s-pod", "k8s-neonvm"];
                    };
                    readonly region_id: {
                        readonly description: "The region identifier. Refer to our [Regions](https://neon.tech/docs/introduction/regions) documentation for supported regions. Values are specified in this format: `aws-us-east-1`\n";
                        readonly type: "string";
                    };
                    readonly default_endpoint_settings: {
                        readonly type: "object";
                        readonly description: "A collection of settings for a Neon endpoint";
                        readonly properties: {
                            readonly pg_settings: {
                                readonly description: "A raw representation of Postgres settings";
                                readonly type: "object";
                                readonly additionalProperties: {
                                    readonly type: "string";
                                };
                            };
                            readonly pgbouncer_settings: {
                                readonly description: "A raw representation of PgBouncer settings";
                                readonly type: "object";
                                readonly additionalProperties: {
                                    readonly type: "string";
                                };
                            };
                            readonly autoscaling_limit_min_cu: {
                                readonly description: "The minimum number of Compute Units. The minimum value is `0.25`.\nSee [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\nfor more information.\n";
                                readonly type: "number";
                                readonly minimum: 0.25;
                            };
                            readonly autoscaling_limit_max_cu: {
                                readonly description: "The maximum number of Compute Units. See [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\nfor more information.\n";
                                readonly type: "number";
                                readonly minimum: 0.25;
                            };
                            readonly suspend_timeout_seconds: {
                                readonly description: "Duration of inactivity in seconds after which the compute endpoint is\nautomatically suspended. The value `0` means use the global default.\nThe value `-1` means never suspend. The default value is `300` seconds (5 minutes).\nThe minimum value is `60` seconds (1 minute).\nThe maximum value is `604800` seconds (1 week). For more information, see\n[Auto-suspend configuration](https://neon.tech/docs/manage/endpoints#auto-suspend-configuration).\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: -1;
                                readonly maximum: 604800;
                            };
                        };
                        readonly additionalProperties: {
                            readonly type: "string";
                        };
                    };
                    readonly pg_version: {
                        readonly description: "The major Postgres version number. Currently supported versions are `14`, `15`, and `16`.";
                        readonly type: "integer";
                        readonly minimum: 14;
                        readonly maximum: 16;
                        readonly default: 16;
                    };
                    readonly store_passwords: {
                        readonly description: "Whether or not passwords are stored for roles in the Neon project. Storing passwords facilitates access to Neon features that require authorization.\n";
                        readonly type: "boolean";
                    };
                    readonly history_retention_seconds: {
                        readonly description: "The number of seconds to retain the point-in-time restore (PITR) backup history for this project.\nThe default is 604800 seconds (7 days).\n";
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: 0;
                        readonly maximum: 2592000;
                    };
                    readonly org_id: {
                        readonly type: "string";
                        readonly description: "Organization id in case the project created belongs to an organization.\nIf not present, project is owned by a user and not by org.\n";
                    };
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly required: readonly ["branch", "connection_uris", "databases", "endpoints", "operations", "project", "roles"];
            readonly properties: {
                readonly project: {
                    readonly type: "object";
                    readonly required: readonly ["consumption_period_end", "consumption_period_start", "active_time_seconds", "compute_time_seconds", "written_data_bytes", "data_transfer_bytes", "data_storage_bytes_hour", "id", "platform_id", "region_id", "name", "pg_version", "proxy_host", "branch_logical_size_limit", "branch_logical_size_limit_bytes", "store_passwords", "cpu_used_sec", "provisioner", "creation_source", "history_retention_seconds", "created_at", "updated_at", "owner_id"];
                    readonly properties: {
                        readonly data_storage_bytes_hour: {
                            readonly description: "Bytes-Hour. Project consumed that much storage hourly during the billing period. The value has some lag.\nThe value is reset at the beginning of each billing period.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: 0;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly data_transfer_bytes: {
                            readonly description: "Bytes. Egress traffic from the Neon cloud to the client for given project over the billing period.\nIncludes deleted endpoints. The value has some lag. The value is reset at the beginning of each billing period.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: 0;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly written_data_bytes: {
                            readonly description: "Bytes. Amount of WAL that travelled through storage for given project across all branches.\nThe value has some lag. The value is reset at the beginning of each billing period.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: 0;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly compute_time_seconds: {
                            readonly description: "Seconds. The number of CPU seconds used by the project's compute endpoints, including compute endpoints that have been deleted.\nThe value has some lag. The value is reset at the beginning of each billing period.\nExamples:\n1. An endpoint that uses 1 CPU for 1 second is equal to `compute_time=1`.\n2. An endpoint that uses 2 CPUs simultaneously for 1 second is equal to `compute_time=2`.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: 0;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly active_time_seconds: {
                            readonly description: "Seconds. Control plane observed endpoints of this project being active this amount of wall-clock time.\nThe value has some lag.\nThe value is reset at the beginning of each billing period.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: 0;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly cpu_used_sec: {
                            readonly description: "DEPRECATED, use compute_time instead.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly deprecated: true;
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly id: {
                            readonly description: "The project ID\n";
                            readonly type: "string";
                            readonly examples: readonly ["spring-example-302709"];
                        };
                        readonly platform_id: {
                            readonly description: "The cloud platform identifier. Currently, only AWS is supported, for which the identifier is `aws`.\n";
                            readonly type: "string";
                            readonly examples: readonly ["aws"];
                        };
                        readonly region_id: {
                            readonly description: "The region identifier\n";
                            readonly type: "string";
                            readonly examples: readonly ["aws-us-east-2"];
                        };
                        readonly name: {
                            readonly description: "The project name\n";
                            readonly type: "string";
                            readonly examples: readonly ["spring-example-302709"];
                        };
                        readonly provisioner: {
                            readonly type: "string";
                            readonly description: "The Neon compute provisioner.\nSpecify the `k8s-neonvm` provisioner to create a compute endpoint that supports Autoscaling.\n\n\n`k8s-pod` `k8s-neonvm`";
                            readonly enum: readonly ["k8s-pod", "k8s-neonvm"];
                            readonly examples: readonly ["k8s-pod"];
                        };
                        readonly default_endpoint_settings: {
                            readonly type: "object";
                            readonly description: "A collection of settings for a Neon endpoint";
                            readonly additionalProperties: {
                                readonly type: "string";
                            };
                            readonly properties: {
                                readonly pg_settings: {
                                    readonly description: "A raw representation of Postgres settings";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                    };
                                };
                                readonly pgbouncer_settings: {
                                    readonly description: "A raw representation of PgBouncer settings";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                    };
                                };
                                readonly autoscaling_limit_min_cu: {
                                    readonly description: "The minimum number of Compute Units. The minimum value is `0.25`.\nSee [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\nfor more information.\n";
                                    readonly type: "number";
                                    readonly minimum: 0.25;
                                };
                                readonly autoscaling_limit_max_cu: {
                                    readonly description: "The maximum number of Compute Units. See [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\nfor more information.\n";
                                    readonly type: "number";
                                    readonly minimum: 0.25;
                                };
                                readonly suspend_timeout_seconds: {
                                    readonly description: "Duration of inactivity in seconds after which the compute endpoint is\nautomatically suspended. The value `0` means use the global default.\nThe value `-1` means never suspend. The default value is `300` seconds (5 minutes).\nThe minimum value is `60` seconds (1 minute).\nThe maximum value is `604800` seconds (1 week). For more information, see\n[Auto-suspend configuration](https://neon.tech/docs/manage/endpoints#auto-suspend-configuration).\n";
                                    readonly type: "integer";
                                    readonly format: "int64";
                                    readonly minimum: -1;
                                    readonly maximum: 604800;
                                };
                            };
                        };
                        readonly settings: {
                            readonly type: "object";
                            readonly properties: {
                                readonly quota: {
                                    readonly type: "object";
                                    readonly description: "Per-project consumption quota. If the quota is exceeded, all active computes\nare automatically suspended and it will not be possible to start them with\nan API method call or incoming proxy connections. The only exception is\n`logical_size_bytes`, which is applied on per-branch basis, i.e., only the\ncompute on the branch that exceeds the `logical_size` quota will be suspended.\n\nQuotas are enforced based on per-project consumption metrics with the same names,\nwhich are reset at the end of each billing period (the first day of the month).\nLogical size is also an exception in this case, as it represents the total size\nof data stored in a branch, so it is not reset.\n\nA zero or empty quota value means 'unlimited'.\n";
                                    readonly properties: {
                                        readonly active_time_seconds: {
                                            readonly description: "The total amount of wall-clock time allowed to be spent by the project's compute endpoints.\n";
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly compute_time_seconds: {
                                            readonly description: "The total amount of CPU seconds allowed to be spent by the project's compute endpoints.\n";
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly written_data_bytes: {
                                            readonly description: "Total amount of data written to all of a project's branches.\n";
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly data_transfer_bytes: {
                                            readonly description: "Total amount of data transferred from all of a project's branches using the proxy.\n";
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly logical_size_bytes: {
                                            readonly description: "Limit on the logical size of every project's branch.\n";
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly maximum: 9223372036854776000;
                                        };
                                    };
                                };
                                readonly allowed_ips: {
                                    readonly description: "A list of IP addresses that are allowed to connect to the compute endpoint.\nIf the list is empty or not set, all IP addresses are allowed.\nIf protected_branches_only is true, the list will be applied only to protected branches.\n";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly ips: {
                                            readonly description: "A list of IP addresses that are allowed to connect to the endpoint.";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                        readonly protected_branches_only: {
                                            readonly description: "If true, the list will be applied only to protected branches.";
                                            readonly type: "boolean";
                                        };
                                        readonly primary_branch_only: {
                                            readonly deprecated: true;
                                            readonly description: "DEPRECATED: Use `protected_branches_only`.\nIf true, the list will be applied only to the default branch.\n";
                                            readonly type: "boolean";
                                        };
                                    };
                                };
                                readonly enable_logical_replication: {
                                    readonly description: "Sets wal_level=logical for all compute endpoints in this project.\nAll active endpoints will be suspended.\nOnce enabled, logical replication cannot be disabled.\n";
                                    readonly type: "boolean";
                                };
                            };
                        };
                        readonly pg_version: {
                            readonly description: "The major Postgres version number. Currently supported versions are `14`, `15`, and `16`.";
                            readonly type: "integer";
                            readonly minimum: 14;
                            readonly maximum: 16;
                            readonly default: 16;
                            readonly examples: readonly [15];
                        };
                        readonly proxy_host: {
                            readonly description: "The proxy host for the project. This value combines the `region_id`, the `platform_id`, and the Neon domain (`neon.tech`).\n";
                            readonly type: "string";
                            readonly examples: readonly ["us-east-2.aws.neon.tech"];
                        };
                        readonly branch_logical_size_limit: {
                            readonly description: "The logical size limit for a branch. The value is in MiB.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly branch_logical_size_limit_bytes: {
                            readonly description: "The logical size limit for a branch. The value is in B.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly store_passwords: {
                            readonly description: "Whether or not passwords are stored for roles in the Neon project. Storing passwords facilitates access to Neon features that require authorization.\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly maintenance_starts_at: {
                            readonly description: "A timestamp indicating when project maintenance begins. If set, the project is placed into maintenance mode at this time.\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly creation_source: {
                            readonly description: "The project creation source\n";
                            readonly type: "string";
                            readonly examples: readonly ["console"];
                        };
                        readonly history_retention_seconds: {
                            readonly description: "The number of seconds to retain point-in-time restore (PITR) backup history for this project.\n";
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly examples: readonly [604800];
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the project was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-13T01:30:55Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the project was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-13T01:30:55Z"];
                        };
                        readonly synthetic_storage_size: {
                            readonly description: "The current space occupied by the project in storage, in bytes. Synthetic storage size combines the logical data size and Write-Ahead Log (WAL) size for all branches in a project.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly consumption_period_start: {
                            readonly description: "A date-time indicating when Neon Cloud started measuring consumption for current consumption period.\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly consumption_period_end: {
                            readonly description: "A date-time indicating when Neon Cloud plans to stop measuring consumption for current consumption period.\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly quota_reset_at: {
                            readonly deprecated: true;
                            readonly description: "DEPRECATED. Use `consumption_period_end` from the getProject endpoint instead.\nA timestamp indicating when the project quota resets.\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly owner_id: {
                            readonly type: "string";
                        };
                        readonly owner: {
                            readonly type: "object";
                            readonly required: readonly ["email", "branches_limit", "subscription_type"];
                            readonly properties: {
                                readonly email: {
                                    readonly type: "string";
                                    readonly examples: readonly ["some@email.com"];
                                };
                                readonly branches_limit: {
                                    readonly type: "integer";
                                    readonly examples: readonly [10];
                                };
                                readonly subscription_type: {
                                    readonly type: "string";
                                    readonly description: "Type of subscription to Neon Cloud.\nNotice that for users without billing account this will be \"UNKNOWN\"\n\n\n`UNKNOWN` `direct_sales` `aws_marketplace` `free_v2` `launch` `scale`";
                                    readonly enum: readonly ["UNKNOWN", "direct_sales", "aws_marketplace", "free_v2", "launch", "scale"];
                                    readonly examples: readonly ["scale"];
                                };
                            };
                        };
                        readonly compute_last_active_at: {
                            readonly description: "The most recent time when any endpoint of this project was active.\n\nOmitted when observed no actitivy for endpoints of this project.\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly org_id: {
                            readonly type: "string";
                            readonly examples: readonly ["org-morning-bread-81040908"];
                        };
                    };
                };
                readonly connection_uris: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["connection_uri", "connection_parameters"];
                        readonly properties: {
                            readonly connection_uri: {
                                readonly description: "The connection URI is defined as specified here: [Connection URIs](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING-URIS)\nThe connection URI can be used to connect to a Postgres database with psql or defined in a DATABASE_URL environment variable.\n";
                                readonly type: "string";
                            };
                            readonly connection_parameters: {
                                readonly type: "object";
                                readonly required: readonly ["database", "password", "role", "host", "pooler_host"];
                                readonly properties: {
                                    readonly database: {
                                        readonly description: "Database name\n";
                                        readonly type: "string";
                                    };
                                    readonly password: {
                                        readonly description: "Password for the role\n";
                                        readonly type: "string";
                                    };
                                    readonly role: {
                                        readonly description: "Role name\n";
                                        readonly type: "string";
                                    };
                                    readonly host: {
                                        readonly description: "Hostname\n";
                                        readonly type: "string";
                                    };
                                    readonly pooler_host: {
                                        readonly description: "Pooler hostname\n";
                                        readonly type: "string";
                                    };
                                };
                            };
                        };
                    };
                };
                readonly roles: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["branch_id", "name", "created_at", "updated_at"];
                        readonly properties: {
                            readonly branch_id: {
                                readonly description: "The ID of the branch to which the role belongs\n";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly name: {
                                readonly description: "The role name\n";
                                readonly type: "string";
                                readonly examples: readonly ["casey"];
                            };
                            readonly password: {
                                readonly description: "The role password\n";
                                readonly type: "string";
                            };
                            readonly protected: {
                                readonly description: "Whether or not the role is system-protected\n";
                                readonly type: "boolean";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the role was created\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-23T17:42:25Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the role was last updated\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-23T17:42:25Z"];
                            };
                        };
                    };
                };
                readonly databases: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "branch_id", "name", "owner_name", "created_at", "updated_at"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The database ID\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly examples: readonly [834686];
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly branch_id: {
                                readonly description: "The ID of the branch to which the database belongs\n";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly name: {
                                readonly description: "The database name\n";
                                readonly type: "string";
                                readonly examples: readonly ["neondb"];
                            };
                            readonly owner_name: {
                                readonly description: "The name of role that owns the database\n";
                                readonly type: "string";
                                readonly examples: readonly ["casey"];
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the database was created\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-30T18:25:15Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the database was last updated\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-30T18:25:15Z"];
                            };
                        };
                    };
                };
                readonly operations: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "project_id", "action", "status", "failures_count", "created_at", "updated_at", "total_duration_ms"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The operation ID";
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly examples: readonly [834686];
                            };
                            readonly project_id: {
                                readonly description: "The Neon project ID";
                                readonly type: "string";
                            };
                            readonly branch_id: {
                                readonly description: "The branch ID";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly endpoint_id: {
                                readonly description: "The endpoint ID";
                                readonly type: "string";
                            };
                            readonly action: {
                                readonly description: "The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_ignore` `tenant_attach` `tenant_detach` `tenant_reattach` `replace_safekeeper` `disable_maintenance` `apply_storage_config` `prepare_secondary_pageserver` `switch_pageserver`";
                                readonly type: "string";
                                readonly enum: readonly ["create_compute", "create_timeline", "start_compute", "suspend_compute", "apply_config", "check_availability", "delete_timeline", "create_branch", "tenant_ignore", "tenant_attach", "tenant_detach", "tenant_reattach", "replace_safekeeper", "disable_maintenance", "apply_storage_config", "prepare_secondary_pageserver", "switch_pageserver"];
                            };
                            readonly status: {
                                readonly description: "The status of the operation\n\n`scheduling` `running` `finished` `failed` `error` `cancelling` `cancelled` `skipped`";
                                readonly type: "string";
                                readonly enum: readonly ["scheduling", "running", "finished", "failed", "error", "cancelling", "cancelled", "skipped"];
                            };
                            readonly error: {
                                readonly description: "The error that occured";
                                readonly type: "string";
                            };
                            readonly failures_count: {
                                readonly description: "The number of times the operation failed";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly retry_at: {
                                readonly description: "A timestamp indicating when the operation was last retried";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the operation was created";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-30T18:25:15Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the operation status was last updated";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-30T18:25:15Z"];
                            };
                            readonly total_duration_ms: {
                                readonly description: "The total duration of the operation in milliseconds";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                    };
                };
                readonly branch: {
                    readonly type: "object";
                    readonly required: readonly ["id", "project_id", "name", "current_state", "creation_source", "created_at", "updated_at", "primary", "default", "protected", "cpu_used_sec", "active_time_seconds", "compute_time_seconds", "written_data_bytes", "data_transfer_bytes"];
                    readonly properties: {
                        readonly id: {
                            readonly description: "The branch ID. This value is generated when a branch is created. A `branch_id` value has a `br` prefix. For example: `br-small-term-683261`.\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-wispy-meadow-118737"];
                        };
                        readonly project_id: {
                            readonly description: "The ID of the project to which the branch belongs\n";
                            readonly type: "string";
                            readonly examples: readonly ["spring-example-302709"];
                        };
                        readonly parent_id: {
                            readonly description: "The `branch_id` of the parent branch\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-aged-salad-637688"];
                        };
                        readonly parent_lsn: {
                            readonly description: "The Log Sequence Number (LSN) on the parent branch from which this branch was created\n";
                            readonly type: "string";
                            readonly examples: readonly ["0/1DE2850"];
                        };
                        readonly parent_timestamp: {
                            readonly description: "The point in time on the parent branch from which this branch was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly name: {
                            readonly description: "The branch name\n";
                            readonly type: "string";
                            readonly examples: readonly ["dev2"];
                        };
                        readonly current_state: {
                            readonly description: "The branch state\n\n`init` `ready`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "ready"];
                            readonly examples: readonly ["ready"];
                        };
                        readonly pending_state: {
                            readonly description: "The branch state\n\n`init` `ready`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "ready"];
                        };
                        readonly logical_size: {
                            readonly description: "The logical size of the branch, in bytes\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly creation_source: {
                            readonly description: "The branch creation source\n";
                            readonly type: "string";
                            readonly examples: readonly ["console"];
                        };
                        readonly primary: {
                            readonly deprecated: true;
                            readonly description: "DEPRECATED. Use `default` field.\nWhether the branch is the project's primary branch\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly default: {
                            readonly description: "Whether the branch is the project's default branch\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly protected: {
                            readonly description: "Whether the branch is protected\n";
                            readonly type: "boolean";
                        };
                        readonly cpu_used_sec: {
                            readonly deprecated: true;
                            readonly description: "CPU seconds used by all of the branch's compute endpoints, including deleted ones.\nThis value is reset at the beginning of each billing period.\nExamples:\n1. A branch that uses 1 CPU for 1 second is equal to `cpu_used_sec=1`.\n2. A branch that uses 2 CPUs simultaneously for 1 second is equal to `cpu_used_sec=2`.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly compute_time_seconds: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly active_time_seconds: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly written_data_bytes: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly data_transfer_bytes: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the branch was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-30T19:09:48Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the branch was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-01T19:53:05Z"];
                        };
                        readonly last_reset_at: {
                            readonly description: "A timestamp indicating when the branch was last reset\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                    };
                };
                readonly endpoints: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["host", "id", "project_id", "branch_id", "region_id", "autoscaling_limit_max_cu", "autoscaling_limit_min_cu", "type", "current_state", "pooler_enabled", "pooler_mode", "disabled", "passwordless_access", "creation_source", "created_at", "updated_at", "settings", "proxy_host", "suspend_timeout_seconds", "provisioner"];
                        readonly properties: {
                            readonly host: {
                                readonly description: "The hostname of the compute endpoint. This is the hostname specified when connecting to a Neon database.\n";
                                readonly type: "string";
                                readonly examples: readonly ["ep-silent-smoke-806639.us-east-2.aws.neon.tech"];
                            };
                            readonly id: {
                                readonly description: "The compute endpoint ID. Compute endpoint IDs have an `ep-` prefix. For example: `ep-little-smoke-851426`\n";
                                readonly type: "string";
                                readonly examples: readonly ["ep-silent-smoke-806639"];
                            };
                            readonly project_id: {
                                readonly description: "The ID of the project to which the compute endpoint belongs\n";
                                readonly type: "string";
                                readonly examples: readonly ["spring-example-302709"];
                            };
                            readonly branch_id: {
                                readonly description: "The ID of the branch that the compute endpoint is associated with\n";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly autoscaling_limit_min_cu: {
                                readonly description: "The minimum number of Compute Units\n";
                                readonly type: "number";
                                readonly minimum: 0.25;
                                readonly examples: readonly [1];
                            };
                            readonly autoscaling_limit_max_cu: {
                                readonly description: "The maximum number of Compute Units\n";
                                readonly type: "number";
                                readonly minimum: 0.25;
                                readonly examples: readonly [1];
                            };
                            readonly region_id: {
                                readonly type: "string";
                                readonly description: "The region identifier\n";
                                readonly examples: readonly ["aws-us-east-2"];
                            };
                            readonly type: {
                                readonly description: "The compute endpoint type. Either `read_write` or `read_only`.\n\n\n`read_only` `read_write`";
                                readonly type: "string";
                                readonly enum: readonly ["read_only", "read_write"];
                                readonly examples: readonly ["read_write"];
                            };
                            readonly current_state: {
                                readonly description: "The state of the compute endpoint\n\n\n`init` `active` `idle`";
                                readonly type: "string";
                                readonly enum: readonly ["init", "active", "idle"];
                                readonly examples: readonly ["init"];
                            };
                            readonly pending_state: {
                                readonly description: "The state of the compute endpoint\n\n\n`init` `active` `idle`";
                                readonly type: "string";
                                readonly enum: readonly ["init", "active", "idle"];
                                readonly examples: readonly ["active"];
                            };
                            readonly settings: {
                                readonly type: "object";
                                readonly description: "A collection of settings for a compute endpoint";
                                readonly properties: {
                                    readonly pg_settings: {
                                        readonly description: "A raw representation of Postgres settings";
                                        readonly type: "object";
                                        readonly additionalProperties: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly pgbouncer_settings: {
                                        readonly description: "A raw representation of PgBouncer settings";
                                        readonly type: "object";
                                        readonly additionalProperties: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                            readonly pooler_enabled: {
                                readonly description: "Whether connection pooling is enabled for the compute endpoint\n";
                                readonly type: "boolean";
                            };
                            readonly pooler_mode: {
                                readonly description: "The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n\n\n`transaction`";
                                readonly type: "string";
                                readonly enum: readonly ["transaction"];
                                readonly examples: readonly ["transaction"];
                            };
                            readonly disabled: {
                                readonly description: "Whether to restrict connections to the compute endpoint.\nEnabling this option schedules a suspend compute operation.\nA disabled compute endpoint cannot be enabled by a connection or\nconsole action. However, the compute endpoint is periodically\nenabled by check_availability operations.\n";
                                readonly type: "boolean";
                            };
                            readonly passwordless_access: {
                                readonly description: "Whether to permit passwordless access to the compute endpoint\n";
                                readonly type: "boolean";
                                readonly examples: readonly [true];
                            };
                            readonly last_active: {
                                readonly description: "A timestamp indicating when the compute endpoint was last active\n";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly creation_source: {
                                readonly description: "The compute endpoint creation source\n";
                                readonly type: "string";
                                readonly examples: readonly ["console"];
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the compute endpoint was created\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-03T15:37:07Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the compute endpoint was last updated\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-03T15:37:07Z"];
                            };
                            readonly proxy_host: {
                                readonly description: "DEPRECATED. Use the \"host\" property instead.\n";
                                readonly type: "string";
                                readonly examples: readonly ["us-east-2.aws.neon.tech"];
                            };
                            readonly suspend_timeout_seconds: {
                                readonly description: "Duration of inactivity in seconds after which the compute endpoint is\nautomatically suspended. The value `0` means use the global default.\nThe value `-1` means never suspend. The default value is `300` seconds (5 minutes).\nThe minimum value is `60` seconds (1 minute).\nThe maximum value is `604800` seconds (1 week). For more information, see\n[Auto-suspend configuration](https://neon.tech/docs/manage/endpoints#auto-suspend-configuration).\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: -1;
                                readonly maximum: 604800;
                            };
                            readonly provisioner: {
                                readonly type: "string";
                                readonly description: "The Neon compute provisioner.\nSpecify the `k8s-neonvm` provisioner to create a compute endpoint that supports Autoscaling.\n\n\n`k8s-pod` `k8s-neonvm`";
                                readonly enum: readonly ["k8s-pod", "k8s-neonvm"];
                                readonly examples: readonly ["k8s-pod"];
                            };
                            readonly compute_release_version: {
                                readonly description: "Attached compute's release version number.\n";
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CreateProjectBranch: {
    readonly body: {
        readonly type: "object";
        readonly "x-tags": readonly ["Branch"];
        readonly properties: {
            readonly endpoints: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly required: readonly ["type"];
                    readonly properties: {
                        readonly type: {
                            readonly description: "The compute endpoint type. Either `read_write` or `read_only`.\n";
                            readonly type: "string";
                            readonly enum: readonly ["read_only", "read_write"];
                        };
                        readonly autoscaling_limit_min_cu: {
                            readonly description: "The minimum number of Compute Units. The minimum value is `0.25`.\n    See [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\n    for more information.\n";
                            readonly type: "number";
                            readonly minimum: 0.25;
                        };
                        readonly autoscaling_limit_max_cu: {
                            readonly description: "The maximum number of Compute Units.\n    See [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\n    for more information.\n";
                            readonly type: "number";
                            readonly minimum: 0.25;
                        };
                        readonly provisioner: {
                            readonly type: "string";
                            readonly description: "The Neon compute provisioner.\nSpecify the `k8s-neonvm` provisioner to create a compute endpoint that supports Autoscaling.\n";
                            readonly enum: readonly ["k8s-pod", "k8s-neonvm"];
                        };
                        readonly suspend_timeout_seconds: {
                            readonly description: "Duration of inactivity in seconds after which the compute endpoint is\nautomatically suspended. The value `0` means use the global default.\nThe value `-1` means never suspend. The default value is `300` seconds (5 minutes).\nThe minimum value is `60` seconds (1 minute).\nThe maximum value is `604800` seconds (1 week). For more information, see\n[Auto-suspend configuration](https://neon.tech/docs/manage/endpoints#auto-suspend-configuration).\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -1;
                            readonly maximum: 604800;
                        };
                    };
                };
            };
            readonly branch: {
                readonly type: "object";
                readonly properties: {
                    readonly parent_id: {
                        readonly description: "The `branch_id` of the parent branch. If omitted or empty, the branch will be created from the project's default branch.\n";
                        readonly type: "string";
                        readonly examples: readonly ["br-aged-salad-637688"];
                    };
                    readonly name: {
                        readonly description: "The branch name\n";
                        readonly type: "string";
                        readonly examples: readonly ["mybranch"];
                    };
                    readonly parent_lsn: {
                        readonly description: "A Log Sequence Number (LSN) on the parent branch. The branch will be created with data from this LSN.\n";
                        readonly type: "string";
                    };
                    readonly parent_timestamp: {
                        readonly description: "A timestamp identifying a point in time on the parent branch. The branch will be created with data starting from this point in time.\nThe timestamp must be provided in ISO 8601 format; for example: `2024-02-26T12:00:00Z`.\n";
                        readonly type: "string";
                        readonly format: "date-time";
                    };
                    readonly protected: {
                        readonly description: "Whether the branch is protected\n";
                        readonly type: "boolean";
                    };
                };
            };
            readonly annotation_value: {
                readonly type: "object";
                readonly description: "Annotation properties.";
                readonly "x-tags": readonly ["Branch"];
                readonly maxProperties: 50;
                readonly additionalProperties: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly maxLength: 200;
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
            };
            readonly required: readonly ["project_id"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly required: readonly ["branch", "databases", "endpoints", "operations", "roles"];
            readonly properties: {
                readonly branch: {
                    readonly type: "object";
                    readonly required: readonly ["id", "project_id", "name", "current_state", "creation_source", "created_at", "updated_at", "primary", "default", "protected", "cpu_used_sec", "active_time_seconds", "compute_time_seconds", "written_data_bytes", "data_transfer_bytes"];
                    readonly properties: {
                        readonly id: {
                            readonly description: "The branch ID. This value is generated when a branch is created. A `branch_id` value has a `br` prefix. For example: `br-small-term-683261`.\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-wispy-meadow-118737"];
                        };
                        readonly project_id: {
                            readonly description: "The ID of the project to which the branch belongs\n";
                            readonly type: "string";
                            readonly examples: readonly ["spring-example-302709"];
                        };
                        readonly parent_id: {
                            readonly description: "The `branch_id` of the parent branch\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-aged-salad-637688"];
                        };
                        readonly parent_lsn: {
                            readonly description: "The Log Sequence Number (LSN) on the parent branch from which this branch was created\n";
                            readonly type: "string";
                            readonly examples: readonly ["0/1DE2850"];
                        };
                        readonly parent_timestamp: {
                            readonly description: "The point in time on the parent branch from which this branch was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly name: {
                            readonly description: "The branch name\n";
                            readonly type: "string";
                            readonly examples: readonly ["dev2"];
                        };
                        readonly current_state: {
                            readonly description: "The branch state\n\n`init` `ready`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "ready"];
                            readonly examples: readonly ["ready"];
                        };
                        readonly pending_state: {
                            readonly description: "The branch state\n\n`init` `ready`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "ready"];
                        };
                        readonly logical_size: {
                            readonly description: "The logical size of the branch, in bytes\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly creation_source: {
                            readonly description: "The branch creation source\n";
                            readonly type: "string";
                            readonly examples: readonly ["console"];
                        };
                        readonly primary: {
                            readonly deprecated: true;
                            readonly description: "DEPRECATED. Use `default` field.\nWhether the branch is the project's primary branch\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly default: {
                            readonly description: "Whether the branch is the project's default branch\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly protected: {
                            readonly description: "Whether the branch is protected\n";
                            readonly type: "boolean";
                        };
                        readonly cpu_used_sec: {
                            readonly deprecated: true;
                            readonly description: "CPU seconds used by all of the branch's compute endpoints, including deleted ones.\nThis value is reset at the beginning of each billing period.\nExamples:\n1. A branch that uses 1 CPU for 1 second is equal to `cpu_used_sec=1`.\n2. A branch that uses 2 CPUs simultaneously for 1 second is equal to `cpu_used_sec=2`.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly compute_time_seconds: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly active_time_seconds: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly written_data_bytes: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly data_transfer_bytes: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the branch was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-30T19:09:48Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the branch was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-01T19:53:05Z"];
                        };
                        readonly last_reset_at: {
                            readonly description: "A timestamp indicating when the branch was last reset\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                    };
                };
                readonly endpoints: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["host", "id", "project_id", "branch_id", "region_id", "autoscaling_limit_max_cu", "autoscaling_limit_min_cu", "type", "current_state", "pooler_enabled", "pooler_mode", "disabled", "passwordless_access", "creation_source", "created_at", "updated_at", "settings", "proxy_host", "suspend_timeout_seconds", "provisioner"];
                        readonly properties: {
                            readonly host: {
                                readonly description: "The hostname of the compute endpoint. This is the hostname specified when connecting to a Neon database.\n";
                                readonly type: "string";
                                readonly examples: readonly ["ep-silent-smoke-806639.us-east-2.aws.neon.tech"];
                            };
                            readonly id: {
                                readonly description: "The compute endpoint ID. Compute endpoint IDs have an `ep-` prefix. For example: `ep-little-smoke-851426`\n";
                                readonly type: "string";
                                readonly examples: readonly ["ep-silent-smoke-806639"];
                            };
                            readonly project_id: {
                                readonly description: "The ID of the project to which the compute endpoint belongs\n";
                                readonly type: "string";
                                readonly examples: readonly ["spring-example-302709"];
                            };
                            readonly branch_id: {
                                readonly description: "The ID of the branch that the compute endpoint is associated with\n";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly autoscaling_limit_min_cu: {
                                readonly description: "The minimum number of Compute Units\n";
                                readonly type: "number";
                                readonly minimum: 0.25;
                                readonly examples: readonly [1];
                            };
                            readonly autoscaling_limit_max_cu: {
                                readonly description: "The maximum number of Compute Units\n";
                                readonly type: "number";
                                readonly minimum: 0.25;
                                readonly examples: readonly [1];
                            };
                            readonly region_id: {
                                readonly type: "string";
                                readonly description: "The region identifier\n";
                                readonly examples: readonly ["aws-us-east-2"];
                            };
                            readonly type: {
                                readonly description: "The compute endpoint type. Either `read_write` or `read_only`.\n\n\n`read_only` `read_write`";
                                readonly type: "string";
                                readonly enum: readonly ["read_only", "read_write"];
                                readonly examples: readonly ["read_write"];
                            };
                            readonly current_state: {
                                readonly description: "The state of the compute endpoint\n\n\n`init` `active` `idle`";
                                readonly type: "string";
                                readonly enum: readonly ["init", "active", "idle"];
                                readonly examples: readonly ["init"];
                            };
                            readonly pending_state: {
                                readonly description: "The state of the compute endpoint\n\n\n`init` `active` `idle`";
                                readonly type: "string";
                                readonly enum: readonly ["init", "active", "idle"];
                                readonly examples: readonly ["active"];
                            };
                            readonly settings: {
                                readonly type: "object";
                                readonly description: "A collection of settings for a compute endpoint";
                                readonly properties: {
                                    readonly pg_settings: {
                                        readonly description: "A raw representation of Postgres settings";
                                        readonly type: "object";
                                        readonly additionalProperties: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly pgbouncer_settings: {
                                        readonly description: "A raw representation of PgBouncer settings";
                                        readonly type: "object";
                                        readonly additionalProperties: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                            readonly pooler_enabled: {
                                readonly description: "Whether connection pooling is enabled for the compute endpoint\n";
                                readonly type: "boolean";
                            };
                            readonly pooler_mode: {
                                readonly description: "The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n\n\n`transaction`";
                                readonly type: "string";
                                readonly enum: readonly ["transaction"];
                                readonly examples: readonly ["transaction"];
                            };
                            readonly disabled: {
                                readonly description: "Whether to restrict connections to the compute endpoint.\nEnabling this option schedules a suspend compute operation.\nA disabled compute endpoint cannot be enabled by a connection or\nconsole action. However, the compute endpoint is periodically\nenabled by check_availability operations.\n";
                                readonly type: "boolean";
                            };
                            readonly passwordless_access: {
                                readonly description: "Whether to permit passwordless access to the compute endpoint\n";
                                readonly type: "boolean";
                                readonly examples: readonly [true];
                            };
                            readonly last_active: {
                                readonly description: "A timestamp indicating when the compute endpoint was last active\n";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly creation_source: {
                                readonly description: "The compute endpoint creation source\n";
                                readonly type: "string";
                                readonly examples: readonly ["console"];
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the compute endpoint was created\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-03T15:37:07Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the compute endpoint was last updated\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-03T15:37:07Z"];
                            };
                            readonly proxy_host: {
                                readonly description: "DEPRECATED. Use the \"host\" property instead.\n";
                                readonly type: "string";
                                readonly examples: readonly ["us-east-2.aws.neon.tech"];
                            };
                            readonly suspend_timeout_seconds: {
                                readonly description: "Duration of inactivity in seconds after which the compute endpoint is\nautomatically suspended. The value `0` means use the global default.\nThe value `-1` means never suspend. The default value is `300` seconds (5 minutes).\nThe minimum value is `60` seconds (1 minute).\nThe maximum value is `604800` seconds (1 week). For more information, see\n[Auto-suspend configuration](https://neon.tech/docs/manage/endpoints#auto-suspend-configuration).\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: -1;
                                readonly maximum: 604800;
                            };
                            readonly provisioner: {
                                readonly type: "string";
                                readonly description: "The Neon compute provisioner.\nSpecify the `k8s-neonvm` provisioner to create a compute endpoint that supports Autoscaling.\n\n\n`k8s-pod` `k8s-neonvm`";
                                readonly enum: readonly ["k8s-pod", "k8s-neonvm"];
                            };
                            readonly compute_release_version: {
                                readonly description: "Attached compute's release version number.\n";
                                readonly type: "string";
                            };
                        };
                    };
                };
                readonly operations: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "project_id", "action", "status", "failures_count", "created_at", "updated_at", "total_duration_ms"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The operation ID";
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly examples: readonly ["ep-silent-smoke-806639"];
                            };
                            readonly project_id: {
                                readonly description: "The Neon project ID";
                                readonly type: "string";
                                readonly examples: readonly ["spring-example-302709"];
                            };
                            readonly branch_id: {
                                readonly description: "The branch ID";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly endpoint_id: {
                                readonly description: "The endpoint ID";
                                readonly type: "string";
                            };
                            readonly action: {
                                readonly description: "The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_ignore` `tenant_attach` `tenant_detach` `tenant_reattach` `replace_safekeeper` `disable_maintenance` `apply_storage_config` `prepare_secondary_pageserver` `switch_pageserver`";
                                readonly type: "string";
                                readonly enum: readonly ["create_compute", "create_timeline", "start_compute", "suspend_compute", "apply_config", "check_availability", "delete_timeline", "create_branch", "tenant_ignore", "tenant_attach", "tenant_detach", "tenant_reattach", "replace_safekeeper", "disable_maintenance", "apply_storage_config", "prepare_secondary_pageserver", "switch_pageserver"];
                            };
                            readonly status: {
                                readonly description: "The status of the operation\n\n`scheduling` `running` `finished` `failed` `error` `cancelling` `cancelled` `skipped`";
                                readonly type: "string";
                                readonly enum: readonly ["scheduling", "running", "finished", "failed", "error", "cancelling", "cancelled", "skipped"];
                            };
                            readonly error: {
                                readonly description: "The error that occured";
                                readonly type: "string";
                            };
                            readonly failures_count: {
                                readonly description: "The number of times the operation failed";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly retry_at: {
                                readonly description: "A timestamp indicating when the operation was last retried";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the operation was created";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-03T15:37:07Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the operation status was last updated";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-03T15:37:07Z"];
                            };
                            readonly total_duration_ms: {
                                readonly description: "The total duration of the operation in milliseconds";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                    };
                };
                readonly roles: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["branch_id", "name", "created_at", "updated_at"];
                        readonly properties: {
                            readonly branch_id: {
                                readonly description: "The ID of the branch to which the role belongs\n";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly name: {
                                readonly description: "The role name\n";
                                readonly type: "string";
                                readonly examples: readonly ["casey"];
                            };
                            readonly password: {
                                readonly description: "The role password\n";
                                readonly type: "string";
                            };
                            readonly protected: {
                                readonly description: "Whether or not the role is system-protected\n";
                                readonly type: "boolean";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the role was created\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-23T17:42:25Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the role was last updated\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-23T17:42:25Z"];
                            };
                        };
                    };
                };
                readonly databases: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "branch_id", "name", "owner_name", "created_at", "updated_at"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The database ID\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly examples: readonly [834686];
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly branch_id: {
                                readonly description: "The ID of the branch to which the database belongs\n";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly name: {
                                readonly description: "The database name\n";
                                readonly type: "string";
                                readonly examples: readonly ["neondb"];
                            };
                            readonly owner_name: {
                                readonly description: "The name of role that owns the database\n";
                                readonly type: "string";
                                readonly examples: readonly ["casey"];
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the database was created\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-30T18:25:15Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the database was last updated\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-30T18:25:15Z"];
                            };
                        };
                    };
                };
                readonly connection_uris: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["connection_uri", "connection_parameters"];
                        readonly properties: {
                            readonly connection_uri: {
                                readonly description: "The connection URI is defined as specified here: [Connection URIs](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING-URIS)\nThe connection URI can be used to connect to a Postgres database with psql or defined in a DATABASE_URL environment variable.\n";
                                readonly type: "string";
                            };
                            readonly connection_parameters: {
                                readonly type: "object";
                                readonly required: readonly ["database", "password", "role", "host", "pooler_host"];
                                readonly properties: {
                                    readonly database: {
                                        readonly description: "Database name\n";
                                        readonly type: "string";
                                    };
                                    readonly password: {
                                        readonly description: "Password for the role\n";
                                        readonly type: "string";
                                    };
                                    readonly role: {
                                        readonly description: "Role name\n";
                                        readonly type: "string";
                                    };
                                    readonly host: {
                                        readonly description: "Hostname\n";
                                        readonly type: "string";
                                        readonly examples: readonly ["ep-silent-smoke-806639.us-east-2.aws.neon.tech"];
                                    };
                                    readonly pooler_host: {
                                        readonly description: "Pooler hostname\n";
                                        readonly type: "string";
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CreateProjectBranchDatabase: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["database"];
        readonly properties: {
            readonly database: {
                readonly type: "object";
                readonly required: readonly ["name", "owner_name"];
                readonly properties: {
                    readonly name: {
                        readonly description: "The name of the datbase\n";
                        readonly type: "string";
                        readonly examples: readonly ["mydb"];
                    };
                    readonly owner_name: {
                        readonly description: "The name of the role that owns the database\n";
                        readonly type: "string";
                        readonly examples: readonly ["casey"];
                    };
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly branch_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The branch ID";
                };
            };
            readonly required: readonly ["project_id", "branch_id"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly required: readonly ["database", "operations"];
            readonly properties: {
                readonly database: {
                    readonly type: "object";
                    readonly required: readonly ["id", "branch_id", "name", "owner_name", "created_at", "updated_at"];
                    readonly properties: {
                        readonly id: {
                            readonly description: "The database ID\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly examples: readonly [834686];
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly branch_id: {
                            readonly description: "The ID of the branch to which the database belongs\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-wispy-meadow-118737"];
                        };
                        readonly name: {
                            readonly description: "The database name\n";
                            readonly type: "string";
                            readonly examples: readonly ["neondb"];
                        };
                        readonly owner_name: {
                            readonly description: "The name of role that owns the database\n";
                            readonly type: "string";
                            readonly examples: readonly ["casey"];
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the database was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-30T18:25:15Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the database was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-30T18:25:15Z"];
                        };
                    };
                };
                readonly operations: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "project_id", "action", "status", "failures_count", "created_at", "updated_at", "total_duration_ms"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The operation ID";
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly examples: readonly [834686];
                            };
                            readonly project_id: {
                                readonly description: "The Neon project ID";
                                readonly type: "string";
                            };
                            readonly branch_id: {
                                readonly description: "The branch ID";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly endpoint_id: {
                                readonly description: "The endpoint ID";
                                readonly type: "string";
                            };
                            readonly action: {
                                readonly description: "The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_ignore` `tenant_attach` `tenant_detach` `tenant_reattach` `replace_safekeeper` `disable_maintenance` `apply_storage_config` `prepare_secondary_pageserver` `switch_pageserver`";
                                readonly type: "string";
                                readonly enum: readonly ["create_compute", "create_timeline", "start_compute", "suspend_compute", "apply_config", "check_availability", "delete_timeline", "create_branch", "tenant_ignore", "tenant_attach", "tenant_detach", "tenant_reattach", "replace_safekeeper", "disable_maintenance", "apply_storage_config", "prepare_secondary_pageserver", "switch_pageserver"];
                            };
                            readonly status: {
                                readonly description: "The status of the operation\n\n`scheduling` `running` `finished` `failed` `error` `cancelling` `cancelled` `skipped`";
                                readonly type: "string";
                                readonly enum: readonly ["scheduling", "running", "finished", "failed", "error", "cancelling", "cancelled", "skipped"];
                            };
                            readonly error: {
                                readonly description: "The error that occured";
                                readonly type: "string";
                            };
                            readonly failures_count: {
                                readonly description: "The number of times the operation failed";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly retry_at: {
                                readonly description: "A timestamp indicating when the operation was last retried";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the operation was created";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-30T18:25:15Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the operation status was last updated";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-30T18:25:15Z"];
                            };
                            readonly total_duration_ms: {
                                readonly description: "The total duration of the operation in milliseconds";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CreateProjectBranchRole: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["role"];
        readonly properties: {
            readonly role: {
                readonly type: "object";
                readonly required: readonly ["name"];
                readonly properties: {
                    readonly name: {
                        readonly description: "The role name. Cannot exceed 63 bytes in length.\n";
                        readonly type: "string";
                        readonly examples: readonly ["sally"];
                    };
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly branch_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The branch ID";
                };
            };
            readonly required: readonly ["project_id", "branch_id"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly required: readonly ["operations", "role"];
            readonly properties: {
                readonly role: {
                    readonly type: "object";
                    readonly required: readonly ["branch_id", "name", "created_at", "updated_at"];
                    readonly properties: {
                        readonly branch_id: {
                            readonly description: "The ID of the branch to which the role belongs\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-wispy-meadow-118737"];
                        };
                        readonly name: {
                            readonly description: "The role name\n";
                            readonly type: "string";
                            readonly examples: readonly ["casey"];
                        };
                        readonly password: {
                            readonly description: "The role password\n";
                            readonly type: "string";
                        };
                        readonly protected: {
                            readonly description: "Whether or not the role is system-protected\n";
                            readonly type: "boolean";
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the role was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-23T17:42:25Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the role was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-23T17:42:25Z"];
                        };
                    };
                };
                readonly operations: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "project_id", "action", "status", "failures_count", "created_at", "updated_at", "total_duration_ms"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The operation ID";
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly project_id: {
                                readonly description: "The Neon project ID";
                                readonly type: "string";
                            };
                            readonly branch_id: {
                                readonly description: "The branch ID";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly endpoint_id: {
                                readonly description: "The endpoint ID";
                                readonly type: "string";
                            };
                            readonly action: {
                                readonly description: "The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_ignore` `tenant_attach` `tenant_detach` `tenant_reattach` `replace_safekeeper` `disable_maintenance` `apply_storage_config` `prepare_secondary_pageserver` `switch_pageserver`";
                                readonly type: "string";
                                readonly enum: readonly ["create_compute", "create_timeline", "start_compute", "suspend_compute", "apply_config", "check_availability", "delete_timeline", "create_branch", "tenant_ignore", "tenant_attach", "tenant_detach", "tenant_reattach", "replace_safekeeper", "disable_maintenance", "apply_storage_config", "prepare_secondary_pageserver", "switch_pageserver"];
                            };
                            readonly status: {
                                readonly description: "The status of the operation\n\n`scheduling` `running` `finished` `failed` `error` `cancelling` `cancelled` `skipped`";
                                readonly type: "string";
                                readonly enum: readonly ["scheduling", "running", "finished", "failed", "error", "cancelling", "cancelled", "skipped"];
                            };
                            readonly error: {
                                readonly description: "The error that occured";
                                readonly type: "string";
                            };
                            readonly failures_count: {
                                readonly description: "The number of times the operation failed";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly retry_at: {
                                readonly description: "A timestamp indicating when the operation was last retried";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the operation was created";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-23T17:42:25Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the operation status was last updated";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-23T17:42:25Z"];
                            };
                            readonly total_duration_ms: {
                                readonly description: "The total duration of the operation in milliseconds";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CreateProjectEndpoint: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["endpoint"];
        readonly properties: {
            readonly endpoint: {
                readonly type: "object";
                readonly required: readonly ["branch_id", "type"];
                readonly properties: {
                    readonly branch_id: {
                        readonly description: "The ID of the branch the compute endpoint will be associated with\n";
                        readonly type: "string";
                        readonly examples: readonly ["br-floral-mountain-251143"];
                    };
                    readonly region_id: {
                        readonly description: "The region where the compute endpoint will be created. Only the project's `region_id` is permitted.\n";
                        readonly type: "string";
                    };
                    readonly type: {
                        readonly description: "The compute endpoint type. Either `read_write` or `read_only`.\n";
                        readonly type: "string";
                        readonly enum: readonly ["read_only", "read_write"];
                        readonly examples: readonly ["read_write"];
                    };
                    readonly settings: {
                        readonly type: "object";
                        readonly description: "A collection of settings for a compute endpoint";
                        readonly properties: {
                            readonly pg_settings: {
                                readonly description: "A raw representation of Postgres settings";
                                readonly type: "object";
                                readonly additionalProperties: {
                                    readonly type: "string";
                                };
                            };
                            readonly pgbouncer_settings: {
                                readonly description: "A raw representation of PgBouncer settings";
                                readonly type: "object";
                                readonly additionalProperties: {
                                    readonly type: "string";
                                };
                            };
                        };
                    };
                    readonly autoscaling_limit_min_cu: {
                        readonly description: "The minimum number of Compute Units. The minimum value is `0.25`.\nSee [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\nfor more information.\n";
                        readonly type: "number";
                        readonly minimum: 0.25;
                    };
                    readonly autoscaling_limit_max_cu: {
                        readonly description: "The maximum number of Compute Units.\nSee [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\nfor more information.\n";
                        readonly type: "number";
                        readonly minimum: 0.25;
                    };
                    readonly provisioner: {
                        readonly type: "string";
                        readonly description: "The Neon compute provisioner.\nSpecify the `k8s-neonvm` provisioner to create a compute endpoint that supports Autoscaling.\n";
                        readonly enum: readonly ["k8s-pod", "k8s-neonvm"];
                    };
                    readonly pooler_enabled: {
                        readonly deprecated: true;
                        readonly description: "Whether to enable connection pooling for the compute endpoint\n";
                        readonly type: "boolean";
                    };
                    readonly pooler_mode: {
                        readonly description: "The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n";
                        readonly type: "string";
                        readonly enum: readonly ["transaction"];
                    };
                    readonly disabled: {
                        readonly type: "boolean";
                        readonly description: "Whether to restrict connections to the compute endpoint.\nEnabling this option schedules a suspend compute operation.\nA disabled compute endpoint cannot be enabled by a connection or\nconsole action. However, the compute endpoint is periodically\nenabled by check_availability operations.\n";
                    };
                    readonly passwordless_access: {
                        readonly type: "boolean";
                        readonly description: "NOT YET IMPLEMENTED. Whether to permit passwordless access to the compute endpoint.\n";
                    };
                    readonly suspend_timeout_seconds: {
                        readonly description: "Duration of inactivity in seconds after which the compute endpoint is\nautomatically suspended. The value `0` means use the global default.\nThe value `-1` means never suspend. The default value is `300` seconds (5 minutes).\nThe minimum value is `60` seconds (1 minute).\nThe maximum value is `604800` seconds (1 week). For more information, see\n[Auto-suspend configuration](https://neon.tech/docs/manage/endpoints#auto-suspend-configuration).\n";
                        readonly type: "integer";
                        readonly format: "int64";
                        readonly minimum: -1;
                        readonly maximum: 604800;
                    };
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
            };
            readonly required: readonly ["project_id"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly required: readonly ["endpoint", "operations"];
            readonly properties: {
                readonly endpoint: {
                    readonly type: "object";
                    readonly required: readonly ["host", "id", "project_id", "branch_id", "region_id", "autoscaling_limit_max_cu", "autoscaling_limit_min_cu", "type", "current_state", "pooler_enabled", "pooler_mode", "disabled", "passwordless_access", "creation_source", "created_at", "updated_at", "settings", "proxy_host", "suspend_timeout_seconds", "provisioner"];
                    readonly properties: {
                        readonly host: {
                            readonly description: "The hostname of the compute endpoint. This is the hostname specified when connecting to a Neon database.\n";
                            readonly type: "string";
                            readonly examples: readonly ["ep-silent-smoke-806639.us-east-2.aws.neon.tech"];
                        };
                        readonly id: {
                            readonly description: "The compute endpoint ID. Compute endpoint IDs have an `ep-` prefix. For example: `ep-little-smoke-851426`\n";
                            readonly type: "string";
                            readonly examples: readonly ["ep-silent-smoke-806639"];
                        };
                        readonly project_id: {
                            readonly description: "The ID of the project to which the compute endpoint belongs\n";
                            readonly type: "string";
                            readonly examples: readonly ["spring-example-302709"];
                        };
                        readonly branch_id: {
                            readonly description: "The ID of the branch that the compute endpoint is associated with\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-wispy-meadow-118737"];
                        };
                        readonly autoscaling_limit_min_cu: {
                            readonly description: "The minimum number of Compute Units\n";
                            readonly type: "number";
                            readonly minimum: 0.25;
                            readonly examples: readonly [1];
                        };
                        readonly autoscaling_limit_max_cu: {
                            readonly description: "The maximum number of Compute Units\n";
                            readonly type: "number";
                            readonly minimum: 0.25;
                            readonly examples: readonly [1];
                        };
                        readonly region_id: {
                            readonly type: "string";
                            readonly description: "The region identifier\n";
                            readonly examples: readonly ["aws-us-east-2"];
                        };
                        readonly type: {
                            readonly description: "The compute endpoint type. Either `read_write` or `read_only`.\n\n\n`read_only` `read_write`";
                            readonly type: "string";
                            readonly enum: readonly ["read_only", "read_write"];
                            readonly examples: readonly ["read_write"];
                        };
                        readonly current_state: {
                            readonly description: "The state of the compute endpoint\n\n\n`init` `active` `idle`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "active", "idle"];
                            readonly examples: readonly ["init"];
                        };
                        readonly pending_state: {
                            readonly description: "The state of the compute endpoint\n\n\n`init` `active` `idle`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "active", "idle"];
                            readonly examples: readonly ["active"];
                        };
                        readonly settings: {
                            readonly type: "object";
                            readonly description: "A collection of settings for a compute endpoint";
                            readonly properties: {
                                readonly pg_settings: {
                                    readonly description: "A raw representation of Postgres settings";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                    };
                                };
                                readonly pgbouncer_settings: {
                                    readonly description: "A raw representation of PgBouncer settings";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                    };
                                };
                            };
                        };
                        readonly pooler_enabled: {
                            readonly description: "Whether connection pooling is enabled for the compute endpoint\n";
                            readonly type: "boolean";
                        };
                        readonly pooler_mode: {
                            readonly description: "The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n\n\n`transaction`";
                            readonly type: "string";
                            readonly enum: readonly ["transaction"];
                            readonly examples: readonly ["transaction"];
                        };
                        readonly disabled: {
                            readonly description: "Whether to restrict connections to the compute endpoint.\nEnabling this option schedules a suspend compute operation.\nA disabled compute endpoint cannot be enabled by a connection or\nconsole action. However, the compute endpoint is periodically\nenabled by check_availability operations.\n";
                            readonly type: "boolean";
                        };
                        readonly passwordless_access: {
                            readonly description: "Whether to permit passwordless access to the compute endpoint\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly last_active: {
                            readonly description: "A timestamp indicating when the compute endpoint was last active\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly creation_source: {
                            readonly description: "The compute endpoint creation source\n";
                            readonly type: "string";
                            readonly examples: readonly ["console"];
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the compute endpoint was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-03T15:37:07Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the compute endpoint was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-03T15:37:07Z"];
                        };
                        readonly proxy_host: {
                            readonly description: "DEPRECATED. Use the \"host\" property instead.\n";
                            readonly type: "string";
                            readonly examples: readonly ["us-east-2.aws.neon.tech"];
                        };
                        readonly suspend_timeout_seconds: {
                            readonly description: "Duration of inactivity in seconds after which the compute endpoint is\nautomatically suspended. The value `0` means use the global default.\nThe value `-1` means never suspend. The default value is `300` seconds (5 minutes).\nThe minimum value is `60` seconds (1 minute).\nThe maximum value is `604800` seconds (1 week). For more information, see\n[Auto-suspend configuration](https://neon.tech/docs/manage/endpoints#auto-suspend-configuration).\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -1;
                            readonly maximum: 604800;
                        };
                        readonly provisioner: {
                            readonly type: "string";
                            readonly description: "The Neon compute provisioner.\nSpecify the `k8s-neonvm` provisioner to create a compute endpoint that supports Autoscaling.\n\n\n`k8s-pod` `k8s-neonvm`";
                            readonly enum: readonly ["k8s-pod", "k8s-neonvm"];
                        };
                        readonly compute_release_version: {
                            readonly description: "Attached compute's release version number.\n";
                            readonly type: "string";
                        };
                    };
                };
                readonly operations: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "project_id", "action", "status", "failures_count", "created_at", "updated_at", "total_duration_ms"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The operation ID";
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly examples: readonly ["ep-silent-smoke-806639"];
                            };
                            readonly project_id: {
                                readonly description: "The Neon project ID";
                                readonly type: "string";
                                readonly examples: readonly ["spring-example-302709"];
                            };
                            readonly branch_id: {
                                readonly description: "The branch ID";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly endpoint_id: {
                                readonly description: "The endpoint ID";
                                readonly type: "string";
                            };
                            readonly action: {
                                readonly description: "The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_ignore` `tenant_attach` `tenant_detach` `tenant_reattach` `replace_safekeeper` `disable_maintenance` `apply_storage_config` `prepare_secondary_pageserver` `switch_pageserver`";
                                readonly type: "string";
                                readonly enum: readonly ["create_compute", "create_timeline", "start_compute", "suspend_compute", "apply_config", "check_availability", "delete_timeline", "create_branch", "tenant_ignore", "tenant_attach", "tenant_detach", "tenant_reattach", "replace_safekeeper", "disable_maintenance", "apply_storage_config", "prepare_secondary_pageserver", "switch_pageserver"];
                            };
                            readonly status: {
                                readonly description: "The status of the operation\n\n`scheduling` `running` `finished` `failed` `error` `cancelling` `cancelled` `skipped`";
                                readonly type: "string";
                                readonly enum: readonly ["scheduling", "running", "finished", "failed", "error", "cancelling", "cancelled", "skipped"];
                            };
                            readonly error: {
                                readonly description: "The error that occured";
                                readonly type: "string";
                            };
                            readonly failures_count: {
                                readonly description: "The number of times the operation failed";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly retry_at: {
                                readonly description: "A timestamp indicating when the operation was last retried";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the operation was created";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-03T15:37:07Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the operation status was last updated";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-03T15:37:07Z"];
                            };
                            readonly total_duration_ms: {
                                readonly description: "The total duration of the operation in milliseconds";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteProject: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
            };
            readonly required: readonly ["project_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["project"];
            readonly properties: {
                readonly project: {
                    readonly type: "object";
                    readonly required: readonly ["consumption_period_end", "consumption_period_start", "active_time_seconds", "compute_time_seconds", "written_data_bytes", "data_transfer_bytes", "data_storage_bytes_hour", "id", "platform_id", "region_id", "name", "pg_version", "proxy_host", "branch_logical_size_limit", "branch_logical_size_limit_bytes", "store_passwords", "cpu_used_sec", "provisioner", "creation_source", "history_retention_seconds", "created_at", "updated_at", "owner_id"];
                    readonly properties: {
                        readonly data_storage_bytes_hour: {
                            readonly description: "Bytes-Hour. Project consumed that much storage hourly during the billing period. The value has some lag.\nThe value is reset at the beginning of each billing period.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: 0;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly data_transfer_bytes: {
                            readonly description: "Bytes. Egress traffic from the Neon cloud to the client for given project over the billing period.\nIncludes deleted endpoints. The value has some lag. The value is reset at the beginning of each billing period.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: 0;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly written_data_bytes: {
                            readonly description: "Bytes. Amount of WAL that travelled through storage for given project across all branches.\nThe value has some lag. The value is reset at the beginning of each billing period.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: 0;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly compute_time_seconds: {
                            readonly description: "Seconds. The number of CPU seconds used by the project's compute endpoints, including compute endpoints that have been deleted.\nThe value has some lag. The value is reset at the beginning of each billing period.\nExamples:\n1. An endpoint that uses 1 CPU for 1 second is equal to `compute_time=1`.\n2. An endpoint that uses 2 CPUs simultaneously for 1 second is equal to `compute_time=2`.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: 0;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly active_time_seconds: {
                            readonly description: "Seconds. Control plane observed endpoints of this project being active this amount of wall-clock time.\nThe value has some lag.\nThe value is reset at the beginning of each billing period.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: 0;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly cpu_used_sec: {
                            readonly description: "DEPRECATED, use compute_time instead.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly deprecated: true;
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly id: {
                            readonly description: "The project ID\n";
                            readonly type: "string";
                            readonly examples: readonly ["spring-example-302709"];
                        };
                        readonly platform_id: {
                            readonly description: "The cloud platform identifier. Currently, only AWS is supported, for which the identifier is `aws`.\n";
                            readonly type: "string";
                            readonly examples: readonly ["aws"];
                        };
                        readonly region_id: {
                            readonly description: "The region identifier\n";
                            readonly type: "string";
                            readonly examples: readonly ["aws-us-east-2"];
                        };
                        readonly name: {
                            readonly description: "The project name\n";
                            readonly type: "string";
                            readonly examples: readonly ["spring-example-302709"];
                        };
                        readonly provisioner: {
                            readonly type: "string";
                            readonly description: "The Neon compute provisioner.\nSpecify the `k8s-neonvm` provisioner to create a compute endpoint that supports Autoscaling.\n\n\n`k8s-pod` `k8s-neonvm`";
                            readonly enum: readonly ["k8s-pod", "k8s-neonvm"];
                            readonly examples: readonly ["k8s-pod"];
                        };
                        readonly default_endpoint_settings: {
                            readonly type: "object";
                            readonly description: "A collection of settings for a Neon endpoint";
                            readonly properties: {
                                readonly pg_settings: {
                                    readonly description: "A raw representation of Postgres settings";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                    };
                                };
                                readonly pgbouncer_settings: {
                                    readonly description: "A raw representation of PgBouncer settings";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                    };
                                };
                                readonly autoscaling_limit_min_cu: {
                                    readonly description: "The minimum number of Compute Units. The minimum value is `0.25`.\nSee [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\nfor more information.\n";
                                    readonly type: "number";
                                    readonly minimum: 0.25;
                                };
                                readonly autoscaling_limit_max_cu: {
                                    readonly description: "The maximum number of Compute Units. See [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\nfor more information.\n";
                                    readonly type: "number";
                                    readonly minimum: 0.25;
                                };
                                readonly suspend_timeout_seconds: {
                                    readonly description: "Duration of inactivity in seconds after which the compute endpoint is\nautomatically suspended. The value `0` means use the global default.\nThe value `-1` means never suspend. The default value is `300` seconds (5 minutes).\nThe minimum value is `60` seconds (1 minute).\nThe maximum value is `604800` seconds (1 week). For more information, see\n[Auto-suspend configuration](https://neon.tech/docs/manage/endpoints#auto-suspend-configuration).\n";
                                    readonly type: "integer";
                                    readonly format: "int64";
                                    readonly minimum: -1;
                                    readonly maximum: 604800;
                                };
                            };
                            readonly additionalProperties: {
                                readonly type: "string";
                            };
                        };
                        readonly settings: {
                            readonly type: "object";
                            readonly properties: {
                                readonly quota: {
                                    readonly type: "object";
                                    readonly description: "Per-project consumption quota. If the quota is exceeded, all active computes\nare automatically suspended and it will not be possible to start them with\nan API method call or incoming proxy connections. The only exception is\n`logical_size_bytes`, which is applied on per-branch basis, i.e., only the\ncompute on the branch that exceeds the `logical_size` quota will be suspended.\n\nQuotas are enforced based on per-project consumption metrics with the same names,\nwhich are reset at the end of each billing period (the first day of the month).\nLogical size is also an exception in this case, as it represents the total size\nof data stored in a branch, so it is not reset.\n\nA zero or empty quota value means 'unlimited'.\n";
                                    readonly properties: {
                                        readonly active_time_seconds: {
                                            readonly description: "The total amount of wall-clock time allowed to be spent by the project's compute endpoints.\n";
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly compute_time_seconds: {
                                            readonly description: "The total amount of CPU seconds allowed to be spent by the project's compute endpoints.\n";
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly written_data_bytes: {
                                            readonly description: "Total amount of data written to all of a project's branches.\n";
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly data_transfer_bytes: {
                                            readonly description: "Total amount of data transferred from all of a project's branches using the proxy.\n";
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly logical_size_bytes: {
                                            readonly description: "Limit on the logical size of every project's branch.\n";
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly maximum: 9223372036854776000;
                                        };
                                    };
                                };
                                readonly allowed_ips: {
                                    readonly description: "A list of IP addresses that are allowed to connect to the compute endpoint.\nIf the list is empty or not set, all IP addresses are allowed.\nIf protected_branches_only is true, the list will be applied only to protected branches.\n";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly ips: {
                                            readonly description: "A list of IP addresses that are allowed to connect to the endpoint.";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                        readonly protected_branches_only: {
                                            readonly description: "If true, the list will be applied only to protected branches.";
                                            readonly type: "boolean";
                                        };
                                        readonly primary_branch_only: {
                                            readonly deprecated: true;
                                            readonly description: "DEPRECATED: Use `protected_branches_only`.\nIf true, the list will be applied only to the default branch.\n";
                                            readonly type: "boolean";
                                        };
                                    };
                                };
                                readonly enable_logical_replication: {
                                    readonly description: "Sets wal_level=logical for all compute endpoints in this project.\nAll active endpoints will be suspended.\nOnce enabled, logical replication cannot be disabled.\n";
                                    readonly type: "boolean";
                                };
                            };
                        };
                        readonly pg_version: {
                            readonly description: "The major Postgres version number. Currently supported versions are `14`, `15`, and `16`.";
                            readonly type: "integer";
                            readonly minimum: 14;
                            readonly maximum: 16;
                            readonly default: 16;
                            readonly examples: readonly [15];
                        };
                        readonly proxy_host: {
                            readonly description: "The proxy host for the project. This value combines the `region_id`, the `platform_id`, and the Neon domain (`neon.tech`).\n";
                            readonly type: "string";
                            readonly examples: readonly ["us-east-2.aws.neon.tech"];
                        };
                        readonly branch_logical_size_limit: {
                            readonly description: "The logical size limit for a branch. The value is in MiB.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly branch_logical_size_limit_bytes: {
                            readonly description: "The logical size limit for a branch. The value is in B.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly store_passwords: {
                            readonly description: "Whether or not passwords are stored for roles in the Neon project. Storing passwords facilitates access to Neon features that require authorization.\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly maintenance_starts_at: {
                            readonly description: "A timestamp indicating when project maintenance begins. If set, the project is placed into maintenance mode at this time.\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly creation_source: {
                            readonly description: "The project creation source\n";
                            readonly type: "string";
                            readonly examples: readonly ["console"];
                        };
                        readonly history_retention_seconds: {
                            readonly description: "The number of seconds to retain point-in-time restore (PITR) backup history for this project.\n";
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly examples: readonly [604800];
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the project was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-13T01:30:55Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the project was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-13T01:30:55Z"];
                        };
                        readonly synthetic_storage_size: {
                            readonly description: "The current space occupied by the project in storage, in bytes. Synthetic storage size combines the logical data size and Write-Ahead Log (WAL) size for all branches in a project.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly consumption_period_start: {
                            readonly description: "A date-time indicating when Neon Cloud started measuring consumption for current consumption period.\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly consumption_period_end: {
                            readonly description: "A date-time indicating when Neon Cloud plans to stop measuring consumption for current consumption period.\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly quota_reset_at: {
                            readonly deprecated: true;
                            readonly description: "DEPRECATED. Use `consumption_period_end` from the getProject endpoint instead.\nA timestamp indicating when the project quota resets.\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly owner_id: {
                            readonly type: "string";
                        };
                        readonly owner: {
                            readonly type: "object";
                            readonly required: readonly ["email", "branches_limit", "subscription_type"];
                            readonly properties: {
                                readonly email: {
                                    readonly type: "string";
                                    readonly examples: readonly ["some@email.com"];
                                };
                                readonly branches_limit: {
                                    readonly type: "integer";
                                    readonly examples: readonly [10];
                                };
                                readonly subscription_type: {
                                    readonly type: "string";
                                    readonly description: "Type of subscription to Neon Cloud.\nNotice that for users without billing account this will be \"UNKNOWN\"\n\n\n`UNKNOWN` `direct_sales` `aws_marketplace` `free_v2` `launch` `scale`";
                                    readonly enum: readonly ["UNKNOWN", "direct_sales", "aws_marketplace", "free_v2", "launch", "scale"];
                                    readonly examples: readonly ["scale"];
                                };
                            };
                        };
                        readonly compute_last_active_at: {
                            readonly description: "The most recent time when any endpoint of this project was active.\n\nOmitted when observed no actitivy for endpoints of this project.\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly org_id: {
                            readonly type: "string";
                            readonly examples: readonly ["org-morning-bread-81040908"];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteProjectBranch: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly branch_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The branch ID";
                };
            };
            readonly required: readonly ["project_id", "branch_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["branch", "operations"];
            readonly properties: {
                readonly branch: {
                    readonly type: "object";
                    readonly required: readonly ["id", "project_id", "name", "current_state", "creation_source", "created_at", "updated_at", "primary", "default", "protected", "cpu_used_sec", "active_time_seconds", "compute_time_seconds", "written_data_bytes", "data_transfer_bytes"];
                    readonly properties: {
                        readonly id: {
                            readonly description: "The branch ID. This value is generated when a branch is created. A `branch_id` value has a `br` prefix. For example: `br-small-term-683261`.\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-wispy-meadow-118737"];
                        };
                        readonly project_id: {
                            readonly description: "The ID of the project to which the branch belongs\n";
                            readonly type: "string";
                            readonly examples: readonly ["spring-example-302709"];
                        };
                        readonly parent_id: {
                            readonly description: "The `branch_id` of the parent branch\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-aged-salad-637688"];
                        };
                        readonly parent_lsn: {
                            readonly description: "The Log Sequence Number (LSN) on the parent branch from which this branch was created\n";
                            readonly type: "string";
                            readonly examples: readonly ["0/1DE2850"];
                        };
                        readonly parent_timestamp: {
                            readonly description: "The point in time on the parent branch from which this branch was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly name: {
                            readonly description: "The branch name\n";
                            readonly type: "string";
                            readonly examples: readonly ["dev2"];
                        };
                        readonly current_state: {
                            readonly description: "The branch state\n\n`init` `ready`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "ready"];
                            readonly examples: readonly ["ready"];
                        };
                        readonly pending_state: {
                            readonly description: "The branch state\n\n`init` `ready`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "ready"];
                        };
                        readonly logical_size: {
                            readonly description: "The logical size of the branch, in bytes\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly creation_source: {
                            readonly description: "The branch creation source\n";
                            readonly type: "string";
                            readonly examples: readonly ["console"];
                        };
                        readonly primary: {
                            readonly deprecated: true;
                            readonly description: "DEPRECATED. Use `default` field.\nWhether the branch is the project's primary branch\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly default: {
                            readonly description: "Whether the branch is the project's default branch\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly protected: {
                            readonly description: "Whether the branch is protected\n";
                            readonly type: "boolean";
                        };
                        readonly cpu_used_sec: {
                            readonly deprecated: true;
                            readonly description: "CPU seconds used by all of the branch's compute endpoints, including deleted ones.\nThis value is reset at the beginning of each billing period.\nExamples:\n1. A branch that uses 1 CPU for 1 second is equal to `cpu_used_sec=1`.\n2. A branch that uses 2 CPUs simultaneously for 1 second is equal to `cpu_used_sec=2`.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly compute_time_seconds: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly active_time_seconds: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly written_data_bytes: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly data_transfer_bytes: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the branch was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-30T19:09:48Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the branch was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-01T19:53:05Z"];
                        };
                        readonly last_reset_at: {
                            readonly description: "A timestamp indicating when the branch was last reset\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                    };
                };
                readonly operations: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "project_id", "action", "status", "failures_count", "created_at", "updated_at", "total_duration_ms"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The operation ID";
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly project_id: {
                                readonly description: "The Neon project ID";
                                readonly type: "string";
                                readonly examples: readonly ["spring-example-302709"];
                            };
                            readonly branch_id: {
                                readonly description: "The branch ID";
                                readonly type: "string";
                            };
                            readonly endpoint_id: {
                                readonly description: "The endpoint ID";
                                readonly type: "string";
                            };
                            readonly action: {
                                readonly description: "The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_ignore` `tenant_attach` `tenant_detach` `tenant_reattach` `replace_safekeeper` `disable_maintenance` `apply_storage_config` `prepare_secondary_pageserver` `switch_pageserver`";
                                readonly type: "string";
                                readonly enum: readonly ["create_compute", "create_timeline", "start_compute", "suspend_compute", "apply_config", "check_availability", "delete_timeline", "create_branch", "tenant_ignore", "tenant_attach", "tenant_detach", "tenant_reattach", "replace_safekeeper", "disable_maintenance", "apply_storage_config", "prepare_secondary_pageserver", "switch_pageserver"];
                            };
                            readonly status: {
                                readonly description: "The status of the operation\n\n`scheduling` `running` `finished` `failed` `error` `cancelling` `cancelled` `skipped`";
                                readonly type: "string";
                                readonly enum: readonly ["scheduling", "running", "finished", "failed", "error", "cancelling", "cancelled", "skipped"];
                            };
                            readonly error: {
                                readonly description: "The error that occured";
                                readonly type: "string";
                            };
                            readonly failures_count: {
                                readonly description: "The number of times the operation failed";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly retry_at: {
                                readonly description: "A timestamp indicating when the operation was last retried";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the operation was created";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-30T19:09:48Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the operation status was last updated";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-01T19:53:05Z"];
                            };
                            readonly total_duration_ms: {
                                readonly description: "The total duration of the operation in milliseconds";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteProjectBranchDatabase: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly branch_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The branch ID";
                };
                readonly database_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The database name";
                };
            };
            readonly required: readonly ["project_id", "branch_id", "database_name"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["database", "operations"];
            readonly properties: {
                readonly database: {
                    readonly type: "object";
                    readonly required: readonly ["id", "branch_id", "name", "owner_name", "created_at", "updated_at"];
                    readonly properties: {
                        readonly id: {
                            readonly description: "The database ID\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly examples: readonly [834686];
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly branch_id: {
                            readonly description: "The ID of the branch to which the database belongs\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-wispy-meadow-118737"];
                        };
                        readonly name: {
                            readonly description: "The database name\n";
                            readonly type: "string";
                            readonly examples: readonly ["neondb"];
                        };
                        readonly owner_name: {
                            readonly description: "The name of role that owns the database\n";
                            readonly type: "string";
                            readonly examples: readonly ["casey"];
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the database was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-30T18:25:15Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the database was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-30T18:25:15Z"];
                        };
                    };
                };
                readonly operations: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "project_id", "action", "status", "failures_count", "created_at", "updated_at", "total_duration_ms"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The operation ID";
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly examples: readonly [834686];
                            };
                            readonly project_id: {
                                readonly description: "The Neon project ID";
                                readonly type: "string";
                            };
                            readonly branch_id: {
                                readonly description: "The branch ID";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly endpoint_id: {
                                readonly description: "The endpoint ID";
                                readonly type: "string";
                            };
                            readonly action: {
                                readonly description: "The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_ignore` `tenant_attach` `tenant_detach` `tenant_reattach` `replace_safekeeper` `disable_maintenance` `apply_storage_config` `prepare_secondary_pageserver` `switch_pageserver`";
                                readonly type: "string";
                                readonly enum: readonly ["create_compute", "create_timeline", "start_compute", "suspend_compute", "apply_config", "check_availability", "delete_timeline", "create_branch", "tenant_ignore", "tenant_attach", "tenant_detach", "tenant_reattach", "replace_safekeeper", "disable_maintenance", "apply_storage_config", "prepare_secondary_pageserver", "switch_pageserver"];
                            };
                            readonly status: {
                                readonly description: "The status of the operation\n\n`scheduling` `running` `finished` `failed` `error` `cancelling` `cancelled` `skipped`";
                                readonly type: "string";
                                readonly enum: readonly ["scheduling", "running", "finished", "failed", "error", "cancelling", "cancelled", "skipped"];
                            };
                            readonly error: {
                                readonly description: "The error that occured";
                                readonly type: "string";
                            };
                            readonly failures_count: {
                                readonly description: "The number of times the operation failed";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly retry_at: {
                                readonly description: "A timestamp indicating when the operation was last retried";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the operation was created";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-30T18:25:15Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the operation status was last updated";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-30T18:25:15Z"];
                            };
                            readonly total_duration_ms: {
                                readonly description: "The total duration of the operation in milliseconds";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteProjectBranchRole: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly branch_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The branch ID";
                };
                readonly role_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The role name";
                };
            };
            readonly required: readonly ["project_id", "branch_id", "role_name"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["operations", "role"];
            readonly properties: {
                readonly role: {
                    readonly type: "object";
                    readonly required: readonly ["branch_id", "name", "created_at", "updated_at"];
                    readonly properties: {
                        readonly branch_id: {
                            readonly description: "The ID of the branch to which the role belongs\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-wispy-meadow-118737"];
                        };
                        readonly name: {
                            readonly description: "The role name\n";
                            readonly type: "string";
                            readonly examples: readonly ["casey"];
                        };
                        readonly password: {
                            readonly description: "The role password\n";
                            readonly type: "string";
                        };
                        readonly protected: {
                            readonly description: "Whether or not the role is system-protected\n";
                            readonly type: "boolean";
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the role was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-23T17:42:25Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the role was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-23T17:42:25Z"];
                        };
                    };
                };
                readonly operations: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "project_id", "action", "status", "failures_count", "created_at", "updated_at", "total_duration_ms"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The operation ID";
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly project_id: {
                                readonly description: "The Neon project ID";
                                readonly type: "string";
                            };
                            readonly branch_id: {
                                readonly description: "The branch ID";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly endpoint_id: {
                                readonly description: "The endpoint ID";
                                readonly type: "string";
                            };
                            readonly action: {
                                readonly description: "The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_ignore` `tenant_attach` `tenant_detach` `tenant_reattach` `replace_safekeeper` `disable_maintenance` `apply_storage_config` `prepare_secondary_pageserver` `switch_pageserver`";
                                readonly type: "string";
                                readonly enum: readonly ["create_compute", "create_timeline", "start_compute", "suspend_compute", "apply_config", "check_availability", "delete_timeline", "create_branch", "tenant_ignore", "tenant_attach", "tenant_detach", "tenant_reattach", "replace_safekeeper", "disable_maintenance", "apply_storage_config", "prepare_secondary_pageserver", "switch_pageserver"];
                            };
                            readonly status: {
                                readonly description: "The status of the operation\n\n`scheduling` `running` `finished` `failed` `error` `cancelling` `cancelled` `skipped`";
                                readonly type: "string";
                                readonly enum: readonly ["scheduling", "running", "finished", "failed", "error", "cancelling", "cancelled", "skipped"];
                            };
                            readonly error: {
                                readonly description: "The error that occured";
                                readonly type: "string";
                            };
                            readonly failures_count: {
                                readonly description: "The number of times the operation failed";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly retry_at: {
                                readonly description: "A timestamp indicating when the operation was last retried";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the operation was created";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-23T17:42:25Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the operation status was last updated";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-23T17:42:25Z"];
                            };
                            readonly total_duration_ms: {
                                readonly description: "The total duration of the operation in milliseconds";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteProjectEndpoint: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly endpoint_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The endpoint ID";
                };
            };
            readonly required: readonly ["project_id", "endpoint_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["endpoint", "operations"];
            readonly properties: {
                readonly endpoint: {
                    readonly type: "object";
                    readonly required: readonly ["host", "id", "project_id", "branch_id", "region_id", "autoscaling_limit_max_cu", "autoscaling_limit_min_cu", "type", "current_state", "pooler_enabled", "pooler_mode", "disabled", "passwordless_access", "creation_source", "created_at", "updated_at", "settings", "proxy_host", "suspend_timeout_seconds", "provisioner"];
                    readonly properties: {
                        readonly host: {
                            readonly description: "The hostname of the compute endpoint. This is the hostname specified when connecting to a Neon database.\n";
                            readonly type: "string";
                            readonly examples: readonly ["ep-silent-smoke-806639.us-east-2.aws.neon.tech"];
                        };
                        readonly id: {
                            readonly description: "The compute endpoint ID. Compute endpoint IDs have an `ep-` prefix. For example: `ep-little-smoke-851426`\n";
                            readonly type: "string";
                            readonly examples: readonly ["ep-silent-smoke-806639"];
                        };
                        readonly project_id: {
                            readonly description: "The ID of the project to which the compute endpoint belongs\n";
                            readonly type: "string";
                            readonly examples: readonly ["spring-example-302709"];
                        };
                        readonly branch_id: {
                            readonly description: "The ID of the branch that the compute endpoint is associated with\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-wispy-meadow-118737"];
                        };
                        readonly autoscaling_limit_min_cu: {
                            readonly description: "The minimum number of Compute Units\n";
                            readonly type: "number";
                            readonly minimum: 0.25;
                            readonly examples: readonly [1];
                        };
                        readonly autoscaling_limit_max_cu: {
                            readonly description: "The maximum number of Compute Units\n";
                            readonly type: "number";
                            readonly minimum: 0.25;
                            readonly examples: readonly [1];
                        };
                        readonly region_id: {
                            readonly type: "string";
                            readonly description: "The region identifier\n";
                            readonly examples: readonly ["aws-us-east-2"];
                        };
                        readonly type: {
                            readonly description: "The compute endpoint type. Either `read_write` or `read_only`.\n\n\n`read_only` `read_write`";
                            readonly type: "string";
                            readonly enum: readonly ["read_only", "read_write"];
                            readonly examples: readonly ["read_write"];
                        };
                        readonly current_state: {
                            readonly description: "The state of the compute endpoint\n\n\n`init` `active` `idle`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "active", "idle"];
                            readonly examples: readonly ["init"];
                        };
                        readonly pending_state: {
                            readonly description: "The state of the compute endpoint\n\n\n`init` `active` `idle`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "active", "idle"];
                            readonly examples: readonly ["active"];
                        };
                        readonly settings: {
                            readonly type: "object";
                            readonly description: "A collection of settings for a compute endpoint";
                            readonly properties: {
                                readonly pg_settings: {
                                    readonly description: "A raw representation of Postgres settings";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                    };
                                };
                                readonly pgbouncer_settings: {
                                    readonly description: "A raw representation of PgBouncer settings";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                    };
                                };
                            };
                        };
                        readonly pooler_enabled: {
                            readonly description: "Whether connection pooling is enabled for the compute endpoint\n";
                            readonly type: "boolean";
                        };
                        readonly pooler_mode: {
                            readonly description: "The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n\n\n`transaction`";
                            readonly type: "string";
                            readonly enum: readonly ["transaction"];
                            readonly examples: readonly ["transaction"];
                        };
                        readonly disabled: {
                            readonly description: "Whether to restrict connections to the compute endpoint.\nEnabling this option schedules a suspend compute operation.\nA disabled compute endpoint cannot be enabled by a connection or\nconsole action. However, the compute endpoint is periodically\nenabled by check_availability operations.\n";
                            readonly type: "boolean";
                        };
                        readonly passwordless_access: {
                            readonly description: "Whether to permit passwordless access to the compute endpoint\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly last_active: {
                            readonly description: "A timestamp indicating when the compute endpoint was last active\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly creation_source: {
                            readonly description: "The compute endpoint creation source\n";
                            readonly type: "string";
                            readonly examples: readonly ["console"];
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the compute endpoint was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-03T15:37:07Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the compute endpoint was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-03T15:37:07Z"];
                        };
                        readonly proxy_host: {
                            readonly description: "DEPRECATED. Use the \"host\" property instead.\n";
                            readonly type: "string";
                            readonly examples: readonly ["us-east-2.aws.neon.tech"];
                        };
                        readonly suspend_timeout_seconds: {
                            readonly description: "Duration of inactivity in seconds after which the compute endpoint is\nautomatically suspended. The value `0` means use the global default.\nThe value `-1` means never suspend. The default value is `300` seconds (5 minutes).\nThe minimum value is `60` seconds (1 minute).\nThe maximum value is `604800` seconds (1 week). For more information, see\n[Auto-suspend configuration](https://neon.tech/docs/manage/endpoints#auto-suspend-configuration).\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -1;
                            readonly maximum: 604800;
                        };
                        readonly provisioner: {
                            readonly type: "string";
                            readonly description: "The Neon compute provisioner.\nSpecify the `k8s-neonvm` provisioner to create a compute endpoint that supports Autoscaling.\n\n\n`k8s-pod` `k8s-neonvm`";
                            readonly enum: readonly ["k8s-pod", "k8s-neonvm"];
                        };
                        readonly compute_release_version: {
                            readonly description: "Attached compute's release version number.\n";
                            readonly type: "string";
                        };
                    };
                };
                readonly operations: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "project_id", "action", "status", "failures_count", "created_at", "updated_at", "total_duration_ms"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The operation ID";
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly examples: readonly ["ep-silent-smoke-806639"];
                            };
                            readonly project_id: {
                                readonly description: "The Neon project ID";
                                readonly type: "string";
                                readonly examples: readonly ["spring-example-302709"];
                            };
                            readonly branch_id: {
                                readonly description: "The branch ID";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly endpoint_id: {
                                readonly description: "The endpoint ID";
                                readonly type: "string";
                            };
                            readonly action: {
                                readonly description: "The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_ignore` `tenant_attach` `tenant_detach` `tenant_reattach` `replace_safekeeper` `disable_maintenance` `apply_storage_config` `prepare_secondary_pageserver` `switch_pageserver`";
                                readonly type: "string";
                                readonly enum: readonly ["create_compute", "create_timeline", "start_compute", "suspend_compute", "apply_config", "check_availability", "delete_timeline", "create_branch", "tenant_ignore", "tenant_attach", "tenant_detach", "tenant_reattach", "replace_safekeeper", "disable_maintenance", "apply_storage_config", "prepare_secondary_pageserver", "switch_pageserver"];
                            };
                            readonly status: {
                                readonly description: "The status of the operation\n\n`scheduling` `running` `finished` `failed` `error` `cancelling` `cancelled` `skipped`";
                                readonly type: "string";
                                readonly enum: readonly ["scheduling", "running", "finished", "failed", "error", "cancelling", "cancelled", "skipped"];
                            };
                            readonly error: {
                                readonly description: "The error that occured";
                                readonly type: "string";
                            };
                            readonly failures_count: {
                                readonly description: "The number of times the operation failed";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly retry_at: {
                                readonly description: "A timestamp indicating when the operation was last retried";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the operation was created";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-03T15:37:07Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the operation status was last updated";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-03T15:37:07Z"];
                            };
                            readonly total_duration_ms: {
                                readonly description: "The total duration of the operation in milliseconds";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteProjectJwks: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly jwks_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The JWKS ID";
                };
            };
            readonly required: readonly ["project_id", "jwks_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["id", "project_id", "jwks_url", "provider_name", "created_at", "updated_at"];
            readonly properties: {
                readonly id: {
                    readonly description: "JWKS ID";
                    readonly type: "string";
                };
                readonly project_id: {
                    readonly description: "Project ID";
                    readonly type: "string";
                };
                readonly branch_id: {
                    readonly description: "Branch ID";
                    readonly type: "string";
                };
                readonly jwks_url: {
                    readonly description: "The URL that lists the JWKS";
                    readonly type: "string";
                };
                readonly provider_name: {
                    readonly description: "The name of the authentication provider (e.g., Clerk, Stytch, Auth0)";
                    readonly type: "string";
                };
                readonly created_at: {
                    readonly description: "The date and time when the JWKS was created";
                    readonly type: "string";
                    readonly format: "date-time";
                };
                readonly updated_at: {
                    readonly description: "The date and time when the JWKS was last modified";
                    readonly type: "string";
                    readonly format: "date-time";
                };
                readonly jwt_audience: {
                    readonly description: "The name of the required JWT Audience to be used";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetConnectionUri: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
            };
            readonly required: readonly ["project_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly branch_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The branch ID. Defaults to your project's default `branch_id` if not specified.";
                };
                readonly endpoint_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The endpoint ID. Defaults to the read-write `endpoint_id` associated with the `branch_id` if not specified.";
                };
                readonly database_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The database name";
                };
                readonly role_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The role name";
                };
                readonly pooled: {
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Adds the `-pooler` option to the connection URI when set to `true`, creating a pooled connection URI.";
                };
            };
            readonly required: readonly ["database_name", "role_name"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["uri"];
            readonly properties: {
                readonly uri: {
                    readonly description: "The connection URI.\n";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetConsumptionHistoryPerAccount: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly from: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specify the start `date-time` for the consumption period.\nThe `date-time` value is rounded according to the specified `granularity`.\nFor example, `2024-03-15T15:30:00Z` for `daily` granularity will be rounded to `2024-03-15T00:00:00Z`.\nThe specified `date-time` value must respect the specified granularity:\n- For `hourly`, consumption metrics are limited to the last 168 hours.\n- For `daily`, consumption metrics are limited to the last 60 days.\n- For `monthly`, consumption metrics are limited to the past year.\n\nThe consumption history is available starting from `March 1, 2024, at 00:00:00 UTC`.\n";
                };
                readonly to: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specify the end `date-time` for the consumption period.\nThe `date-time` value is rounded according to the specified granularity.\nFor example, `2024-03-15T15:30:00Z` for `daily` granularity will be rounded to `2024-03-15T00:00:00Z`.\nThe specified `date-time` value must respect the specified granularity:\n- For `hourly`, consumption metrics are limited to the last 168 hours.\n- For `daily`, consumption metrics are limited to the last 60 days.\n- For `monthly`, consumption metrics are limited to the past year.\n";
                };
                readonly granularity: {
                    readonly type: "string";
                    readonly enum: readonly ["hourly", "daily", "monthly"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specify the granularity of consumption metrics.\nHourly, daily, and monthly metrics are available for the last 168 hours, 60 days,\nand 1 year, respectively.\n";
                };
                readonly org_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specify the organization for which the consumption metrics should be returned.\nIf this parameter is not provided, the endpoint will return the metrics for the\nauthenticated user's account.\n";
                };
                readonly include_v1_metrics: {
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Include metrics utilized in previous pricing models.\n- **data_storage_bytes_hour**: The sum of the maximum observed storage values for each hour\n  for each project, which never decreases.\n";
                };
            };
            readonly required: readonly ["from", "to", "granularity"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly periods: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly period_id: {
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly examples: readonly ["79ec829f-1828-4006-ac82-9f1828a0067d"];
                            };
                            readonly consumption: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly timeframe_start: {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly examples: readonly ["2024-03-22T00:00:00Z"];
                                        };
                                        readonly timeframe_end: {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly examples: readonly ["2024-03-23T00:00:00Z"];
                                        };
                                        readonly active_time_seconds: {
                                            readonly type: "integer";
                                            readonly format: "uint64";
                                            readonly examples: readonly [27853];
                                            readonly minimum: 0;
                                            readonly maximum: 18446744073709552000;
                                        };
                                        readonly compute_time_seconds: {
                                            readonly type: "integer";
                                            readonly format: "uint64";
                                            readonly examples: readonly [18346];
                                            readonly minimum: 0;
                                            readonly maximum: 18446744073709552000;
                                        };
                                        readonly written_data_bytes: {
                                            readonly type: "integer";
                                            readonly format: "uint64";
                                            readonly examples: readonly [1073741824];
                                            readonly minimum: 0;
                                            readonly maximum: 18446744073709552000;
                                        };
                                        readonly synthetic_storage_size_bytes: {
                                            readonly type: "integer";
                                            readonly format: "uint64";
                                            readonly examples: readonly [5368709120];
                                            readonly minimum: 0;
                                            readonly maximum: 18446744073709552000;
                                        };
                                        readonly data_storage_bytes_hour: {
                                            readonly type: "integer";
                                            readonly format: "uint64";
                                            readonly minimum: 0;
                                            readonly maximum: 18446744073709552000;
                                        };
                                    };
                                    readonly required: readonly ["timeframe_start", "timeframe_end", "active_time_seconds", "compute_time_seconds", "written_data_bytes", "synthetic_storage_size_bytes"];
                                };
                            };
                        };
                        readonly required: readonly ["period_id", "consumption"];
                    };
                };
            };
            readonly required: readonly ["periods"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "406": {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetConsumptionHistoryPerProject: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specify the cursor value from the previous response to get the next batch of projects.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly default: 10;
                    readonly maximum: 100;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specify a value from 1 to 100 to limit number of projects in the response.";
                };
                readonly project_ids: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly minItems: 0;
                    readonly maxItems: 100;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specify a list of project IDs to filter the response.\nIf omitted, the response will contain all projects.\n";
                };
                readonly from: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specify the start `date-time` for the consumption period.\nThe `date-time` value is rounded according to the specified `granularity`.\nFor example, `2024-03-15T15:30:00Z` for `daily` granularity will be rounded to `2024-03-15T00:00:00Z`.\nThe specified `date-time` value must respect the specified `granularity`:\n- For `hourly`, consumption metrics are limited to the last 168 hours.\n- For `daily`, consumption metrics are limited to the last 60 days.\n- For `monthly`, consumption metrics are limited to the last year.\n\nThe consumption history is available starting from `March 1, 2024, at 00:00:00 UTC`.\n";
                };
                readonly to: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specify the end `date-time` for the consumption period.\nThe `date-time` value is rounded according to the specified granularity.\nFor example, `2024-03-15T15:30:00Z` for `daily` granularity will be rounded to `2024-03-15T00:00:00Z`.\nThe specified `date-time` value must respect the specified `granularity`:\n- For `hourly`, consumption metrics are limited to the last 168 hours.\n- For `daily`, consumption metrics are limited to the last 60 days.\n- For `monthly`, consumption metrics are limited to the last year.\n";
                };
                readonly granularity: {
                    readonly type: "string";
                    readonly enum: readonly ["hourly", "daily", "monthly"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specify the granularity of consumption metrics.\nHourly, daily, and monthly metrics are available for the last 168 hours, 60 days,\nand 1 year, respectively.\n";
                };
                readonly org_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specify the organization for which the project consumption metrics should be returned.\nIf this parameter is not provided, the endpoint will return the metrics for the\nauthenticated user's projects.\n";
                };
                readonly include_v1_metrics: {
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Include metrics utilized in previous pricing models.\n- **data_storage_bytes_hour**: The sum of the maximum observed storage values for each hour,\n  which never decreases.\n";
                };
            };
            readonly required: readonly ["from", "to", "granularity"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["projects"];
            readonly properties: {
                readonly projects: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["project_id", "periods"];
                        readonly properties: {
                            readonly project_id: {
                                readonly type: "string";
                            };
                            readonly periods: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly required: readonly ["period_id", "consumption"];
                                    readonly properties: {
                                        readonly period_id: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                            readonly examples: readonly ["79ec829f-1828-4006-ac82-9f1828a0067d"];
                                        };
                                        readonly consumption: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly required: readonly ["timeframe_start", "timeframe_end", "active_time_seconds", "compute_time_seconds", "written_data_bytes", "synthetic_storage_size_bytes"];
                                                readonly properties: {
                                                    readonly timeframe_start: {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly examples: readonly ["2024-03-22T00:00:00Z"];
                                                    };
                                                    readonly timeframe_end: {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly examples: readonly ["2024-03-23T00:00:00Z"];
                                                    };
                                                    readonly active_time_seconds: {
                                                        readonly type: "integer";
                                                        readonly format: "uint64";
                                                        readonly examples: readonly [27853];
                                                        readonly minimum: 0;
                                                        readonly maximum: 18446744073709552000;
                                                    };
                                                    readonly compute_time_seconds: {
                                                        readonly type: "integer";
                                                        readonly format: "uint64";
                                                        readonly examples: readonly [18346];
                                                        readonly minimum: 0;
                                                        readonly maximum: 18446744073709552000;
                                                    };
                                                    readonly written_data_bytes: {
                                                        readonly type: "integer";
                                                        readonly format: "uint64";
                                                        readonly examples: readonly [1073741824];
                                                        readonly minimum: 0;
                                                        readonly maximum: 18446744073709552000;
                                                    };
                                                    readonly synthetic_storage_size_bytes: {
                                                        readonly type: "integer";
                                                        readonly format: "uint64";
                                                        readonly examples: readonly [5368709120];
                                                        readonly minimum: 0;
                                                        readonly maximum: 18446744073709552000;
                                                    };
                                                    readonly data_storage_bytes_hour: {
                                                        readonly type: "integer";
                                                        readonly format: "uint64";
                                                        readonly minimum: 0;
                                                        readonly maximum: 18446744073709552000;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                readonly pagination: {
                    readonly description: "Cursor based pagination is used. The user must pass the cursor as is to the backend.\nFor more information about cursor based pagination, see\nhttps://learn.microsoft.com/en-us/ef/core/querying/pagination#keyset-pagination\n";
                    readonly type: "object";
                    readonly required: readonly ["cursor", "limit"];
                    readonly properties: {
                        readonly cursor: {
                            readonly type: "string";
                            readonly minLength: 1;
                            readonly examples: readonly ["2022-12-07T00:45:05.262011Z"];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "406": {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetCurrentUserInfo: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["active_seconds_limit", "billing_account", "id", "email", "login", "name", "last_name", "image", "projects_limit", "branches_limit", "max_autoscaling_limit", "auth_accounts", "plan"];
            readonly properties: {
                readonly active_seconds_limit: {
                    readonly description: "Control plane observes active endpoints of a user this amount of wall-clock time.\n";
                    readonly type: "integer";
                    readonly format: "int64";
                    readonly minimum: -9223372036854776000;
                    readonly maximum: 9223372036854776000;
                };
                readonly billing_account: {
                    readonly type: "object";
                    readonly required: readonly ["payment_source", "subscription_type", "payment_method", "quota_reset_at_last", "name", "email", "address_city", "address_country", "address_line1", "address_line2", "address_postal_code", "address_state"];
                    readonly properties: {
                        readonly payment_source: {
                            readonly type: "object";
                            readonly required: readonly ["type"];
                            readonly properties: {
                                readonly type: {
                                    readonly type: "string";
                                    readonly description: "Type of payment source. E.g. \"card\".\n";
                                };
                                readonly card: {
                                    readonly type: "object";
                                    readonly required: readonly ["last4"];
                                    readonly properties: {
                                        readonly last4: {
                                            readonly type: "string";
                                            readonly description: "Last 4 digits of the card.\n";
                                        };
                                        readonly brand: {
                                            readonly type: "string";
                                            readonly description: "Brand of credit card.\n\n\n`amex` `diners` `discover` `jcb` `mastercard` `unionpay` `unknown` `visa`";
                                            readonly enum: readonly ["amex", "diners", "discover", "jcb", "mastercard", "unionpay", "unknown", "visa"];
                                        };
                                        readonly exp_month: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly description: "Credit card expiration month\n";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly exp_year: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly description: "Credit card expiration year\n";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                    };
                                };
                            };
                        };
                        readonly subscription_type: {
                            readonly type: "string";
                            readonly description: "Type of subscription to Neon Cloud.\nNotice that for users without billing account this will be \"UNKNOWN\"\n\n\n`UNKNOWN` `direct_sales` `aws_marketplace` `free_v2` `launch` `scale`";
                            readonly enum: readonly ["UNKNOWN", "direct_sales", "aws_marketplace", "free_v2", "launch", "scale"];
                        };
                        readonly payment_method: {
                            readonly type: "string";
                            readonly description: "Indicates whether and how an account makes payments.\n\n\n`UNKNOWN` `none` `stripe` `direct_payment` `aws_mp` `vercel_mp` `staff` `trial` `sponsorship`";
                            readonly enum: readonly ["UNKNOWN", "none", "stripe", "direct_payment", "aws_mp", "vercel_mp", "staff", "trial", "sponsorship"];
                        };
                        readonly quota_reset_at_last: {
                            readonly description: "The last time the quota was reset. Defaults to the date-time the account is created.\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly name: {
                            readonly description: "The full name of the individual or entity that owns the billing account. This name appears on invoices.";
                            readonly type: "string";
                        };
                        readonly email: {
                            readonly description: "Billing email, to receive emails related to invoices and subscriptions.\n";
                            readonly type: "string";
                        };
                        readonly address_city: {
                            readonly description: "Billing address city.\n";
                            readonly type: "string";
                        };
                        readonly address_country: {
                            readonly description: "Billing address country code defined by ISO 3166-1 alpha-2.\n";
                            readonly type: "string";
                        };
                        readonly address_country_name: {
                            readonly description: "Billing address country name.\n";
                            readonly type: "string";
                        };
                        readonly address_line1: {
                            readonly description: "Billing address line 1.\n";
                            readonly type: "string";
                        };
                        readonly address_line2: {
                            readonly description: "Billing address line 2.\n";
                            readonly type: "string";
                        };
                        readonly address_postal_code: {
                            readonly description: "Billing address postal code.\n";
                            readonly type: "string";
                        };
                        readonly address_state: {
                            readonly description: "Billing address state or region.\n";
                            readonly type: "string";
                        };
                        readonly orb_portal_url: {
                            readonly description: "Orb user portal url\n";
                            readonly type: "string";
                        };
                        readonly tax_id: {
                            readonly description: "The tax identification number for the billing account, displayed on invoices.\n";
                            readonly type: "string";
                        };
                        readonly tax_id_type: {
                            readonly description: "The type of the tax identification number based on the country.\n";
                            readonly type: "string";
                        };
                    };
                };
                readonly auth_accounts: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["provider", "email", "name", "login", "image"];
                        readonly properties: {
                            readonly email: {
                                readonly type: "string";
                            };
                            readonly image: {
                                readonly type: "string";
                            };
                            readonly login: {
                                readonly type: "string";
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly provider: {
                                readonly description: "Identity provider id from keycloak\n\n`github` `google` `hasura` `keycloak`";
                                readonly type: "string";
                                readonly enum: readonly ["github", "google", "hasura", "keycloak"];
                            };
                        };
                    };
                };
                readonly email: {
                    readonly type: "string";
                };
                readonly id: {
                    readonly type: "string";
                };
                readonly image: {
                    readonly type: "string";
                };
                readonly login: {
                    readonly type: "string";
                };
                readonly name: {
                    readonly type: "string";
                };
                readonly last_name: {
                    readonly type: "string";
                };
                readonly projects_limit: {
                    readonly type: "integer";
                    readonly format: "int64";
                    readonly minimum: -9223372036854776000;
                    readonly maximum: 9223372036854776000;
                };
                readonly branches_limit: {
                    readonly type: "integer";
                    readonly format: "int64";
                    readonly minimum: -9223372036854776000;
                    readonly maximum: 9223372036854776000;
                };
                readonly max_autoscaling_limit: {
                    readonly type: "number";
                    readonly minimum: 0.25;
                };
                readonly compute_seconds_limit: {
                    readonly type: "integer";
                    readonly format: "int64";
                    readonly minimum: -9223372036854776000;
                    readonly maximum: 9223372036854776000;
                };
                readonly plan: {
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetCurrentUserOrganizations: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["organizations"];
            readonly properties: {
                readonly organizations: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "name", "handle", "created_at", "updated_at"];
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly handle: {
                                readonly type: "string";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicting when the organization was created\n";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the organization was updated\n";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetProject: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
            };
            readonly required: readonly ["project_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["project"];
            readonly properties: {
                readonly project: {
                    readonly type: "object";
                    readonly required: readonly ["consumption_period_end", "consumption_period_start", "active_time_seconds", "compute_time_seconds", "written_data_bytes", "data_transfer_bytes", "data_storage_bytes_hour", "id", "platform_id", "region_id", "name", "pg_version", "proxy_host", "branch_logical_size_limit", "branch_logical_size_limit_bytes", "store_passwords", "cpu_used_sec", "provisioner", "creation_source", "history_retention_seconds", "created_at", "updated_at", "owner_id"];
                    readonly properties: {
                        readonly data_storage_bytes_hour: {
                            readonly description: "Bytes-Hour. Project consumed that much storage hourly during the billing period. The value has some lag.\nThe value is reset at the beginning of each billing period.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: 0;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly data_transfer_bytes: {
                            readonly description: "Bytes. Egress traffic from the Neon cloud to the client for given project over the billing period.\nIncludes deleted endpoints. The value has some lag. The value is reset at the beginning of each billing period.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: 0;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly written_data_bytes: {
                            readonly description: "Bytes. Amount of WAL that travelled through storage for given project across all branches.\nThe value has some lag. The value is reset at the beginning of each billing period.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: 0;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly compute_time_seconds: {
                            readonly description: "Seconds. The number of CPU seconds used by the project's compute endpoints, including compute endpoints that have been deleted.\nThe value has some lag. The value is reset at the beginning of each billing period.\nExamples:\n1. An endpoint that uses 1 CPU for 1 second is equal to `compute_time=1`.\n2. An endpoint that uses 2 CPUs simultaneously for 1 second is equal to `compute_time=2`.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: 0;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly active_time_seconds: {
                            readonly description: "Seconds. Control plane observed endpoints of this project being active this amount of wall-clock time.\nThe value has some lag.\nThe value is reset at the beginning of each billing period.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: 0;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly cpu_used_sec: {
                            readonly description: "DEPRECATED, use compute_time instead.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly deprecated: true;
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly id: {
                            readonly description: "The project ID\n";
                            readonly type: "string";
                            readonly examples: readonly ["spring-example-302709"];
                        };
                        readonly platform_id: {
                            readonly description: "The cloud platform identifier. Currently, only AWS is supported, for which the identifier is `aws`.\n";
                            readonly type: "string";
                            readonly examples: readonly ["aws"];
                        };
                        readonly region_id: {
                            readonly description: "The region identifier\n";
                            readonly type: "string";
                            readonly examples: readonly ["aws-us-east-2"];
                        };
                        readonly name: {
                            readonly description: "The project name\n";
                            readonly type: "string";
                            readonly examples: readonly ["spring-example-302709"];
                        };
                        readonly provisioner: {
                            readonly type: "string";
                            readonly description: "The Neon compute provisioner.\nSpecify the `k8s-neonvm` provisioner to create a compute endpoint that supports Autoscaling.\n\n\n`k8s-pod` `k8s-neonvm`";
                            readonly enum: readonly ["k8s-pod", "k8s-neonvm"];
                            readonly examples: readonly ["k8s-pod"];
                        };
                        readonly default_endpoint_settings: {
                            readonly type: "object";
                            readonly description: "A collection of settings for a Neon endpoint";
                            readonly properties: {
                                readonly pg_settings: {
                                    readonly description: "A raw representation of Postgres settings";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                    };
                                };
                                readonly pgbouncer_settings: {
                                    readonly description: "A raw representation of PgBouncer settings";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                    };
                                };
                                readonly autoscaling_limit_min_cu: {
                                    readonly description: "The minimum number of Compute Units. The minimum value is `0.25`.\nSee [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\nfor more information.\n";
                                    readonly type: "number";
                                    readonly minimum: 0.25;
                                };
                                readonly autoscaling_limit_max_cu: {
                                    readonly description: "The maximum number of Compute Units. See [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\nfor more information.\n";
                                    readonly type: "number";
                                    readonly minimum: 0.25;
                                };
                                readonly suspend_timeout_seconds: {
                                    readonly description: "Duration of inactivity in seconds after which the compute endpoint is\nautomatically suspended. The value `0` means use the global default.\nThe value `-1` means never suspend. The default value is `300` seconds (5 minutes).\nThe minimum value is `60` seconds (1 minute).\nThe maximum value is `604800` seconds (1 week). For more information, see\n[Auto-suspend configuration](https://neon.tech/docs/manage/endpoints#auto-suspend-configuration).\n";
                                    readonly type: "integer";
                                    readonly format: "int64";
                                    readonly minimum: -1;
                                    readonly maximum: 604800;
                                };
                            };
                            readonly additionalProperties: {
                                readonly type: "string";
                            };
                        };
                        readonly settings: {
                            readonly type: "object";
                            readonly properties: {
                                readonly quota: {
                                    readonly type: "object";
                                    readonly description: "Per-project consumption quota. If the quota is exceeded, all active computes\nare automatically suspended and it will not be possible to start them with\nan API method call or incoming proxy connections. The only exception is\n`logical_size_bytes`, which is applied on per-branch basis, i.e., only the\ncompute on the branch that exceeds the `logical_size` quota will be suspended.\n\nQuotas are enforced based on per-project consumption metrics with the same names,\nwhich are reset at the end of each billing period (the first day of the month).\nLogical size is also an exception in this case, as it represents the total size\nof data stored in a branch, so it is not reset.\n\nA zero or empty quota value means 'unlimited'.\n";
                                    readonly properties: {
                                        readonly active_time_seconds: {
                                            readonly description: "The total amount of wall-clock time allowed to be spent by the project's compute endpoints.\n";
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly compute_time_seconds: {
                                            readonly description: "The total amount of CPU seconds allowed to be spent by the project's compute endpoints.\n";
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly written_data_bytes: {
                                            readonly description: "Total amount of data written to all of a project's branches.\n";
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly data_transfer_bytes: {
                                            readonly description: "Total amount of data transferred from all of a project's branches using the proxy.\n";
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly logical_size_bytes: {
                                            readonly description: "Limit on the logical size of every project's branch.\n";
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly maximum: 9223372036854776000;
                                        };
                                    };
                                };
                                readonly allowed_ips: {
                                    readonly description: "A list of IP addresses that are allowed to connect to the compute endpoint.\nIf the list is empty or not set, all IP addresses are allowed.\nIf protected_branches_only is true, the list will be applied only to protected branches.\n";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly ips: {
                                            readonly description: "A list of IP addresses that are allowed to connect to the endpoint.";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                        readonly protected_branches_only: {
                                            readonly description: "If true, the list will be applied only to protected branches.";
                                            readonly type: "boolean";
                                        };
                                        readonly primary_branch_only: {
                                            readonly deprecated: true;
                                            readonly description: "DEPRECATED: Use `protected_branches_only`.\nIf true, the list will be applied only to the default branch.\n";
                                            readonly type: "boolean";
                                        };
                                    };
                                };
                                readonly enable_logical_replication: {
                                    readonly description: "Sets wal_level=logical for all compute endpoints in this project.\nAll active endpoints will be suspended.\nOnce enabled, logical replication cannot be disabled.\n";
                                    readonly type: "boolean";
                                };
                            };
                        };
                        readonly pg_version: {
                            readonly description: "The major Postgres version number. Currently supported versions are `14`, `15`, and `16`.";
                            readonly type: "integer";
                            readonly minimum: 14;
                            readonly maximum: 16;
                            readonly default: 16;
                            readonly examples: readonly [15];
                        };
                        readonly proxy_host: {
                            readonly description: "The proxy host for the project. This value combines the `region_id`, the `platform_id`, and the Neon domain (`neon.tech`).\n";
                            readonly type: "string";
                            readonly examples: readonly ["us-east-2.aws.neon.tech"];
                        };
                        readonly branch_logical_size_limit: {
                            readonly description: "The logical size limit for a branch. The value is in MiB.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly branch_logical_size_limit_bytes: {
                            readonly description: "The logical size limit for a branch. The value is in B.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly store_passwords: {
                            readonly description: "Whether or not passwords are stored for roles in the Neon project. Storing passwords facilitates access to Neon features that require authorization.\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly maintenance_starts_at: {
                            readonly description: "A timestamp indicating when project maintenance begins. If set, the project is placed into maintenance mode at this time.\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly creation_source: {
                            readonly description: "The project creation source\n";
                            readonly type: "string";
                            readonly examples: readonly ["console"];
                        };
                        readonly history_retention_seconds: {
                            readonly description: "The number of seconds to retain point-in-time restore (PITR) backup history for this project.\n";
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly examples: readonly [604800];
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the project was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-13T01:30:55Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the project was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-13T01:30:55Z"];
                        };
                        readonly synthetic_storage_size: {
                            readonly description: "The current space occupied by the project in storage, in bytes. Synthetic storage size combines the logical data size and Write-Ahead Log (WAL) size for all branches in a project.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly consumption_period_start: {
                            readonly description: "A date-time indicating when Neon Cloud started measuring consumption for current consumption period.\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly consumption_period_end: {
                            readonly description: "A date-time indicating when Neon Cloud plans to stop measuring consumption for current consumption period.\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly quota_reset_at: {
                            readonly deprecated: true;
                            readonly description: "DEPRECATED. Use `consumption_period_end` from the getProject endpoint instead.\nA timestamp indicating when the project quota resets.\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly owner_id: {
                            readonly type: "string";
                        };
                        readonly owner: {
                            readonly type: "object";
                            readonly required: readonly ["email", "branches_limit", "subscription_type"];
                            readonly properties: {
                                readonly email: {
                                    readonly type: "string";
                                    readonly examples: readonly ["some@email.com"];
                                };
                                readonly branches_limit: {
                                    readonly type: "integer";
                                    readonly examples: readonly [10];
                                };
                                readonly subscription_type: {
                                    readonly type: "string";
                                    readonly description: "Type of subscription to Neon Cloud.\nNotice that for users without billing account this will be \"UNKNOWN\"\n\n\n`UNKNOWN` `direct_sales` `aws_marketplace` `free_v2` `launch` `scale`";
                                    readonly enum: readonly ["UNKNOWN", "direct_sales", "aws_marketplace", "free_v2", "launch", "scale"];
                                    readonly examples: readonly ["scale"];
                                };
                            };
                        };
                        readonly compute_last_active_at: {
                            readonly description: "The most recent time when any endpoint of this project was active.\n\nOmitted when observed no actitivy for endpoints of this project.\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly org_id: {
                            readonly type: "string";
                            readonly examples: readonly ["org-morning-bread-81040908"];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetProjectBranch: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly branch_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The branch ID";
                };
            };
            readonly required: readonly ["project_id", "branch_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["annotation", "branch"];
            readonly "x-tags": readonly ["Branch"];
            readonly properties: {
                readonly branch: {
                    readonly type: "object";
                    readonly required: readonly ["id", "project_id", "name", "current_state", "creation_source", "created_at", "updated_at", "primary", "default", "protected", "cpu_used_sec", "active_time_seconds", "compute_time_seconds", "written_data_bytes", "data_transfer_bytes"];
                    readonly properties: {
                        readonly id: {
                            readonly description: "The branch ID. This value is generated when a branch is created. A `branch_id` value has a `br` prefix. For example: `br-small-term-683261`.\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-wispy-meadow-118737"];
                        };
                        readonly project_id: {
                            readonly description: "The ID of the project to which the branch belongs\n";
                            readonly type: "string";
                            readonly examples: readonly ["spring-example-302709"];
                        };
                        readonly parent_id: {
                            readonly description: "The `branch_id` of the parent branch\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-aged-salad-637688"];
                        };
                        readonly parent_lsn: {
                            readonly description: "The Log Sequence Number (LSN) on the parent branch from which this branch was created\n";
                            readonly type: "string";
                            readonly examples: readonly ["0/1DE2850"];
                        };
                        readonly parent_timestamp: {
                            readonly description: "The point in time on the parent branch from which this branch was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly name: {
                            readonly description: "The branch name\n";
                            readonly type: "string";
                            readonly examples: readonly ["dev2"];
                        };
                        readonly current_state: {
                            readonly description: "The branch state\n\n`init` `ready`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "ready"];
                            readonly examples: readonly ["ready"];
                        };
                        readonly pending_state: {
                            readonly description: "The branch state\n\n`init` `ready`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "ready"];
                        };
                        readonly logical_size: {
                            readonly description: "The logical size of the branch, in bytes\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly creation_source: {
                            readonly description: "The branch creation source\n";
                            readonly type: "string";
                            readonly examples: readonly ["console"];
                        };
                        readonly primary: {
                            readonly deprecated: true;
                            readonly description: "DEPRECATED. Use `default` field.\nWhether the branch is the project's primary branch\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly default: {
                            readonly description: "Whether the branch is the project's default branch\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly protected: {
                            readonly description: "Whether the branch is protected\n";
                            readonly type: "boolean";
                        };
                        readonly cpu_used_sec: {
                            readonly deprecated: true;
                            readonly description: "CPU seconds used by all of the branch's compute endpoints, including deleted ones.\nThis value is reset at the beginning of each billing period.\nExamples:\n1. A branch that uses 1 CPU for 1 second is equal to `cpu_used_sec=1`.\n2. A branch that uses 2 CPUs simultaneously for 1 second is equal to `cpu_used_sec=2`.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly compute_time_seconds: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly active_time_seconds: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly written_data_bytes: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly data_transfer_bytes: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the branch was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-30T19:09:48Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the branch was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-01T19:53:05Z"];
                        };
                        readonly last_reset_at: {
                            readonly description: "A timestamp indicating when the branch was last reset\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                    };
                };
                readonly annotation: {
                    readonly type: "object";
                    readonly "x-tags": readonly ["Branch"];
                    readonly required: readonly ["object", "value"];
                    readonly properties: {
                        readonly object: {
                            readonly type: "object";
                            readonly "x-tags": readonly ["Branch"];
                            readonly required: readonly ["type", "id"];
                            readonly properties: {
                                readonly type: {
                                    readonly type: "string";
                                };
                                readonly id: {
                                    readonly type: "string";
                                    readonly examples: readonly ["br-wispy-meadow-118737"];
                                };
                            };
                        };
                        readonly value: {
                            readonly type: "object";
                            readonly description: "Annotation properties.";
                            readonly "x-tags": readonly ["Branch"];
                            readonly maxProperties: 50;
                            readonly additionalProperties: {
                                readonly type: "string";
                                readonly minLength: 1;
                                readonly maxLength: 200;
                            };
                        };
                        readonly created_at: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-30T19:09:48Z"];
                        };
                        readonly updated_at: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-01T19:53:05Z"];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetProjectBranchDatabase: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly branch_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The branch ID";
                };
                readonly database_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The database name";
                };
            };
            readonly required: readonly ["project_id", "branch_id", "database_name"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["database"];
            readonly properties: {
                readonly database: {
                    readonly type: "object";
                    readonly required: readonly ["id", "branch_id", "name", "owner_name", "created_at", "updated_at"];
                    readonly properties: {
                        readonly id: {
                            readonly description: "The database ID\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly examples: readonly [834686];
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly branch_id: {
                            readonly description: "The ID of the branch to which the database belongs\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-wispy-meadow-118737"];
                        };
                        readonly name: {
                            readonly description: "The database name\n";
                            readonly type: "string";
                            readonly examples: readonly ["neondb"];
                        };
                        readonly owner_name: {
                            readonly description: "The name of role that owns the database\n";
                            readonly type: "string";
                            readonly examples: readonly ["casey"];
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the database was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-30T18:25:15Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the database was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-30T18:25:15Z"];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetProjectBranchRole: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly branch_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The branch ID";
                };
                readonly role_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The role name";
                };
            };
            readonly required: readonly ["project_id", "branch_id", "role_name"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["role"];
            readonly properties: {
                readonly role: {
                    readonly type: "object";
                    readonly required: readonly ["branch_id", "name", "created_at", "updated_at"];
                    readonly properties: {
                        readonly branch_id: {
                            readonly description: "The ID of the branch to which the role belongs\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-wispy-meadow-118737"];
                        };
                        readonly name: {
                            readonly description: "The role name\n";
                            readonly type: "string";
                            readonly examples: readonly ["casey"];
                        };
                        readonly password: {
                            readonly description: "The role password\n";
                            readonly type: "string";
                        };
                        readonly protected: {
                            readonly description: "Whether or not the role is system-protected\n";
                            readonly type: "boolean";
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the role was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-23T17:42:25Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the role was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-23T17:42:25Z"];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetProjectBranchRolePassword: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly branch_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The branch ID";
                };
                readonly role_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The role name";
                };
            };
            readonly required: readonly ["project_id", "branch_id", "role_name"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["password"];
            readonly properties: {
                readonly password: {
                    readonly description: "The role password\n";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "412": {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetProjectBranchSchema: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly branch_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The branch ID";
                };
            };
            readonly required: readonly ["project_id", "branch_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly role: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The role on whose behalf the schema is retrieved";
                };
                readonly db_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Name of the database for which the schema is retrieved";
                };
                readonly lsn: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Log Sequence Number (LSN) for which the schema is retrieved\n";
                };
                readonly timestamp: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The point in time for which the schema is retrieved\n";
                };
            };
            readonly required: readonly ["role", "db_name"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly sql: {
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetProjectEndpoint: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly endpoint_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The endpoint ID";
                };
            };
            readonly required: readonly ["project_id", "endpoint_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["endpoint"];
            readonly properties: {
                readonly endpoint: {
                    readonly type: "object";
                    readonly required: readonly ["host", "id", "project_id", "branch_id", "region_id", "autoscaling_limit_max_cu", "autoscaling_limit_min_cu", "type", "current_state", "pooler_enabled", "pooler_mode", "disabled", "passwordless_access", "creation_source", "created_at", "updated_at", "settings", "proxy_host", "suspend_timeout_seconds", "provisioner"];
                    readonly properties: {
                        readonly host: {
                            readonly description: "The hostname of the compute endpoint. This is the hostname specified when connecting to a Neon database.\n";
                            readonly type: "string";
                            readonly examples: readonly ["ep-silent-smoke-806639.us-east-2.aws.neon.tech"];
                        };
                        readonly id: {
                            readonly description: "The compute endpoint ID. Compute endpoint IDs have an `ep-` prefix. For example: `ep-little-smoke-851426`\n";
                            readonly type: "string";
                            readonly examples: readonly ["ep-silent-smoke-806639"];
                        };
                        readonly project_id: {
                            readonly description: "The ID of the project to which the compute endpoint belongs\n";
                            readonly type: "string";
                            readonly examples: readonly ["spring-example-302709"];
                        };
                        readonly branch_id: {
                            readonly description: "The ID of the branch that the compute endpoint is associated with\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-wispy-meadow-118737"];
                        };
                        readonly autoscaling_limit_min_cu: {
                            readonly description: "The minimum number of Compute Units\n";
                            readonly type: "number";
                            readonly minimum: 0.25;
                            readonly examples: readonly [1];
                        };
                        readonly autoscaling_limit_max_cu: {
                            readonly description: "The maximum number of Compute Units\n";
                            readonly type: "number";
                            readonly minimum: 0.25;
                            readonly examples: readonly [1];
                        };
                        readonly region_id: {
                            readonly type: "string";
                            readonly description: "The region identifier\n";
                            readonly examples: readonly ["aws-us-east-2"];
                        };
                        readonly type: {
                            readonly description: "The compute endpoint type. Either `read_write` or `read_only`.\n\n\n`read_only` `read_write`";
                            readonly type: "string";
                            readonly enum: readonly ["read_only", "read_write"];
                            readonly examples: readonly ["read_write"];
                        };
                        readonly current_state: {
                            readonly description: "The state of the compute endpoint\n\n\n`init` `active` `idle`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "active", "idle"];
                            readonly examples: readonly ["init"];
                        };
                        readonly pending_state: {
                            readonly description: "The state of the compute endpoint\n\n\n`init` `active` `idle`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "active", "idle"];
                            readonly examples: readonly ["active"];
                        };
                        readonly settings: {
                            readonly type: "object";
                            readonly description: "A collection of settings for a compute endpoint";
                            readonly properties: {
                                readonly pg_settings: {
                                    readonly description: "A raw representation of Postgres settings";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                    };
                                };
                                readonly pgbouncer_settings: {
                                    readonly description: "A raw representation of PgBouncer settings";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                    };
                                };
                            };
                        };
                        readonly pooler_enabled: {
                            readonly description: "Whether connection pooling is enabled for the compute endpoint\n";
                            readonly type: "boolean";
                        };
                        readonly pooler_mode: {
                            readonly description: "The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n\n\n`transaction`";
                            readonly type: "string";
                            readonly enum: readonly ["transaction"];
                            readonly examples: readonly ["transaction"];
                        };
                        readonly disabled: {
                            readonly description: "Whether to restrict connections to the compute endpoint.\nEnabling this option schedules a suspend compute operation.\nA disabled compute endpoint cannot be enabled by a connection or\nconsole action. However, the compute endpoint is periodically\nenabled by check_availability operations.\n";
                            readonly type: "boolean";
                        };
                        readonly passwordless_access: {
                            readonly description: "Whether to permit passwordless access to the compute endpoint\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly last_active: {
                            readonly description: "A timestamp indicating when the compute endpoint was last active\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly creation_source: {
                            readonly description: "The compute endpoint creation source\n";
                            readonly type: "string";
                            readonly examples: readonly ["console"];
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the compute endpoint was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-03T15:37:07Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the compute endpoint was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-03T15:37:07Z"];
                        };
                        readonly proxy_host: {
                            readonly description: "DEPRECATED. Use the \"host\" property instead.\n";
                            readonly type: "string";
                            readonly examples: readonly ["us-east-2.aws.neon.tech"];
                        };
                        readonly suspend_timeout_seconds: {
                            readonly description: "Duration of inactivity in seconds after which the compute endpoint is\nautomatically suspended. The value `0` means use the global default.\nThe value `-1` means never suspend. The default value is `300` seconds (5 minutes).\nThe minimum value is `60` seconds (1 minute).\nThe maximum value is `604800` seconds (1 week). For more information, see\n[Auto-suspend configuration](https://neon.tech/docs/manage/endpoints#auto-suspend-configuration).\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -1;
                            readonly maximum: 604800;
                        };
                        readonly provisioner: {
                            readonly type: "string";
                            readonly description: "The Neon compute provisioner.\nSpecify the `k8s-neonvm` provisioner to create a compute endpoint that supports Autoscaling.\n\n\n`k8s-pod` `k8s-neonvm`";
                            readonly enum: readonly ["k8s-pod", "k8s-neonvm"];
                        };
                        readonly compute_release_version: {
                            readonly description: "Attached compute's release version number.\n";
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetProjectJwks: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
            };
            readonly required: readonly ["project_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly description: "The list of configured JWKS definitions for a project";
            readonly type: "object";
            readonly required: readonly ["jwks"];
            readonly properties: {
                readonly jwks: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "project_id", "jwks_url", "provider_name", "created_at", "updated_at"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "JWKS ID";
                                readonly type: "string";
                            };
                            readonly project_id: {
                                readonly description: "Project ID";
                                readonly type: "string";
                            };
                            readonly branch_id: {
                                readonly description: "Branch ID";
                                readonly type: "string";
                            };
                            readonly jwks_url: {
                                readonly description: "The URL that lists the JWKS";
                                readonly type: "string";
                            };
                            readonly provider_name: {
                                readonly description: "The name of the authentication provider (e.g., Clerk, Stytch, Auth0)";
                                readonly type: "string";
                            };
                            readonly created_at: {
                                readonly description: "The date and time when the JWKS was created";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updated_at: {
                                readonly description: "The date and time when the JWKS was last modified";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly jwt_audience: {
                                readonly description: "The name of the required JWT Audience to be used";
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetProjectOperation: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly operation_id: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The operation ID";
                };
            };
            readonly required: readonly ["project_id", "operation_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["operation"];
            readonly properties: {
                readonly operation: {
                    readonly type: "object";
                    readonly required: readonly ["id", "project_id", "action", "status", "failures_count", "created_at", "updated_at", "total_duration_ms"];
                    readonly properties: {
                        readonly id: {
                            readonly description: "The operation ID";
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly project_id: {
                            readonly description: "The Neon project ID";
                            readonly type: "string";
                        };
                        readonly branch_id: {
                            readonly description: "The branch ID";
                            readonly type: "string";
                        };
                        readonly endpoint_id: {
                            readonly description: "The endpoint ID";
                            readonly type: "string";
                        };
                        readonly action: {
                            readonly description: "The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_ignore` `tenant_attach` `tenant_detach` `tenant_reattach` `replace_safekeeper` `disable_maintenance` `apply_storage_config` `prepare_secondary_pageserver` `switch_pageserver`";
                            readonly type: "string";
                            readonly enum: readonly ["create_compute", "create_timeline", "start_compute", "suspend_compute", "apply_config", "check_availability", "delete_timeline", "create_branch", "tenant_ignore", "tenant_attach", "tenant_detach", "tenant_reattach", "replace_safekeeper", "disable_maintenance", "apply_storage_config", "prepare_secondary_pageserver", "switch_pageserver"];
                        };
                        readonly status: {
                            readonly description: "The status of the operation\n\n`scheduling` `running` `finished` `failed` `error` `cancelling` `cancelled` `skipped`";
                            readonly type: "string";
                            readonly enum: readonly ["scheduling", "running", "finished", "failed", "error", "cancelling", "cancelled", "skipped"];
                        };
                        readonly error: {
                            readonly description: "The error that occured";
                            readonly type: "string";
                        };
                        readonly failures_count: {
                            readonly description: "The number of times the operation failed";
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly retry_at: {
                            readonly description: "A timestamp indicating when the operation was last retried";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the operation was created";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the operation status was last updated";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly total_duration_ms: {
                            readonly description: "The total duration of the operation in milliseconds";
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GrantPermissionToProject: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["email"];
        readonly properties: {
            readonly email: {
                readonly type: "string";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["project_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["id", "granted_to_email", "granted_at"];
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                };
                readonly granted_to_email: {
                    readonly type: "string";
                };
                readonly granted_at: {
                    readonly type: "string";
                    readonly format: "date-time";
                };
                readonly revoked_at: {
                    readonly type: "string";
                    readonly format: "date-time";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListApiKeys: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly required: readonly ["last_used_from_addr", "id", "name", "created_at"];
                readonly properties: {
                    readonly id: {
                        readonly description: "The API key ID";
                        readonly type: "integer";
                        readonly format: "int64";
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                    };
                    readonly name: {
                        readonly description: "The user-specified API key name";
                        readonly type: "string";
                    };
                    readonly created_at: {
                        readonly description: "A timestamp indicating when the API key was created";
                        readonly type: "string";
                        readonly format: "date-time";
                    };
                    readonly last_used_at: {
                        readonly description: "A timestamp indicating when the API was last used";
                        readonly type: readonly ["string", "null"];
                        readonly format: "date-time";
                    };
                    readonly last_used_from_addr: {
                        readonly description: "The IP address from which the API key was last used";
                        readonly type: "string";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListProjectBranchDatabases: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly branch_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The branch ID";
                };
            };
            readonly required: readonly ["project_id", "branch_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["databases"];
            readonly properties: {
                readonly databases: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "branch_id", "name", "owner_name", "created_at", "updated_at"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The database ID\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly examples: readonly [834686];
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly branch_id: {
                                readonly description: "The ID of the branch to which the database belongs\n";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly name: {
                                readonly description: "The database name\n";
                                readonly type: "string";
                                readonly examples: readonly ["neondb"];
                            };
                            readonly owner_name: {
                                readonly description: "The name of role that owns the database\n";
                                readonly type: "string";
                                readonly examples: readonly ["casey"];
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the database was created\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-30T18:25:15Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the database was last updated\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-30T18:25:15Z"];
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListProjectBranchEndpoints: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly branch_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The branch ID";
                };
            };
            readonly required: readonly ["project_id", "branch_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["endpoints"];
            readonly properties: {
                readonly endpoints: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["host", "id", "project_id", "branch_id", "region_id", "autoscaling_limit_max_cu", "autoscaling_limit_min_cu", "type", "current_state", "pooler_enabled", "pooler_mode", "disabled", "passwordless_access", "creation_source", "created_at", "updated_at", "settings", "proxy_host", "suspend_timeout_seconds", "provisioner"];
                        readonly properties: {
                            readonly host: {
                                readonly description: "The hostname of the compute endpoint. This is the hostname specified when connecting to a Neon database.\n";
                                readonly type: "string";
                                readonly examples: readonly ["ep-silent-smoke-806639.us-east-2.aws.neon.tech"];
                            };
                            readonly id: {
                                readonly description: "The compute endpoint ID. Compute endpoint IDs have an `ep-` prefix. For example: `ep-little-smoke-851426`\n";
                                readonly type: "string";
                                readonly examples: readonly ["ep-silent-smoke-806639"];
                            };
                            readonly project_id: {
                                readonly description: "The ID of the project to which the compute endpoint belongs\n";
                                readonly type: "string";
                                readonly examples: readonly ["spring-example-302709"];
                            };
                            readonly branch_id: {
                                readonly description: "The ID of the branch that the compute endpoint is associated with\n";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly autoscaling_limit_min_cu: {
                                readonly description: "The minimum number of Compute Units\n";
                                readonly type: "number";
                                readonly minimum: 0.25;
                                readonly examples: readonly [1];
                            };
                            readonly autoscaling_limit_max_cu: {
                                readonly description: "The maximum number of Compute Units\n";
                                readonly type: "number";
                                readonly minimum: 0.25;
                                readonly examples: readonly [1];
                            };
                            readonly region_id: {
                                readonly type: "string";
                                readonly description: "The region identifier\n";
                                readonly examples: readonly ["aws-us-east-2"];
                            };
                            readonly type: {
                                readonly description: "The compute endpoint type. Either `read_write` or `read_only`.\n\n\n`read_only` `read_write`";
                                readonly type: "string";
                                readonly enum: readonly ["read_only", "read_write"];
                                readonly examples: readonly ["read_write"];
                            };
                            readonly current_state: {
                                readonly description: "The state of the compute endpoint\n\n\n`init` `active` `idle`";
                                readonly type: "string";
                                readonly enum: readonly ["init", "active", "idle"];
                                readonly examples: readonly ["init"];
                            };
                            readonly pending_state: {
                                readonly description: "The state of the compute endpoint\n\n\n`init` `active` `idle`";
                                readonly type: "string";
                                readonly enum: readonly ["init", "active", "idle"];
                                readonly examples: readonly ["active"];
                            };
                            readonly settings: {
                                readonly type: "object";
                                readonly description: "A collection of settings for a compute endpoint";
                                readonly properties: {
                                    readonly pg_settings: {
                                        readonly description: "A raw representation of Postgres settings";
                                        readonly type: "object";
                                        readonly additionalProperties: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly pgbouncer_settings: {
                                        readonly description: "A raw representation of PgBouncer settings";
                                        readonly type: "object";
                                        readonly additionalProperties: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                            readonly pooler_enabled: {
                                readonly description: "Whether connection pooling is enabled for the compute endpoint\n";
                                readonly type: "boolean";
                            };
                            readonly pooler_mode: {
                                readonly description: "The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n\n\n`transaction`";
                                readonly type: "string";
                                readonly enum: readonly ["transaction"];
                                readonly examples: readonly ["transaction"];
                            };
                            readonly disabled: {
                                readonly description: "Whether to restrict connections to the compute endpoint.\nEnabling this option schedules a suspend compute operation.\nA disabled compute endpoint cannot be enabled by a connection or\nconsole action. However, the compute endpoint is periodically\nenabled by check_availability operations.\n";
                                readonly type: "boolean";
                            };
                            readonly passwordless_access: {
                                readonly description: "Whether to permit passwordless access to the compute endpoint\n";
                                readonly type: "boolean";
                                readonly examples: readonly [true];
                            };
                            readonly last_active: {
                                readonly description: "A timestamp indicating when the compute endpoint was last active\n";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly creation_source: {
                                readonly description: "The compute endpoint creation source\n";
                                readonly type: "string";
                                readonly examples: readonly ["console"];
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the compute endpoint was created\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-03T15:37:07Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the compute endpoint was last updated\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-03T15:37:07Z"];
                            };
                            readonly proxy_host: {
                                readonly description: "DEPRECATED. Use the \"host\" property instead.\n";
                                readonly type: "string";
                                readonly examples: readonly ["us-east-2.aws.neon.tech"];
                            };
                            readonly suspend_timeout_seconds: {
                                readonly description: "Duration of inactivity in seconds after which the compute endpoint is\nautomatically suspended. The value `0` means use the global default.\nThe value `-1` means never suspend. The default value is `300` seconds (5 minutes).\nThe minimum value is `60` seconds (1 minute).\nThe maximum value is `604800` seconds (1 week). For more information, see\n[Auto-suspend configuration](https://neon.tech/docs/manage/endpoints#auto-suspend-configuration).\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: -1;
                                readonly maximum: 604800;
                            };
                            readonly provisioner: {
                                readonly type: "string";
                                readonly description: "The Neon compute provisioner.\nSpecify the `k8s-neonvm` provisioner to create a compute endpoint that supports Autoscaling.\n\n\n`k8s-pod` `k8s-neonvm`";
                                readonly enum: readonly ["k8s-pod", "k8s-neonvm"];
                            };
                            readonly compute_release_version: {
                                readonly description: "Attached compute's release version number.\n";
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListProjectBranchRoles: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly branch_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The branch ID";
                };
            };
            readonly required: readonly ["project_id", "branch_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["roles"];
            readonly properties: {
                readonly roles: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["branch_id", "name", "created_at", "updated_at"];
                        readonly properties: {
                            readonly branch_id: {
                                readonly description: "The ID of the branch to which the role belongs\n";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly name: {
                                readonly description: "The role name\n";
                                readonly type: "string";
                                readonly examples: readonly ["casey"];
                            };
                            readonly password: {
                                readonly description: "The role password\n";
                                readonly type: "string";
                            };
                            readonly protected: {
                                readonly description: "Whether or not the role is system-protected\n";
                                readonly type: "boolean";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the role was created\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-23T17:42:25Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the role was last updated\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-23T17:42:25Z"];
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListProjectBranches: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
            };
            readonly required: readonly ["project_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["annotations", "branches"];
            readonly "x-tags": readonly ["Branch"];
            readonly properties: {
                readonly branches: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "project_id", "name", "current_state", "creation_source", "created_at", "updated_at", "primary", "default", "protected", "cpu_used_sec", "active_time_seconds", "compute_time_seconds", "written_data_bytes", "data_transfer_bytes"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The branch ID. This value is generated when a branch is created. A `branch_id` value has a `br` prefix. For example: `br-small-term-683261`.\n";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly project_id: {
                                readonly description: "The ID of the project to which the branch belongs\n";
                                readonly type: "string";
                                readonly examples: readonly ["spring-example-302709"];
                            };
                            readonly parent_id: {
                                readonly description: "The `branch_id` of the parent branch\n";
                                readonly type: "string";
                                readonly examples: readonly ["br-aged-salad-637688"];
                            };
                            readonly parent_lsn: {
                                readonly description: "The Log Sequence Number (LSN) on the parent branch from which this branch was created\n";
                                readonly type: "string";
                                readonly examples: readonly ["0/1DE2850"];
                            };
                            readonly parent_timestamp: {
                                readonly description: "The point in time on the parent branch from which this branch was created\n";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly name: {
                                readonly description: "The branch name\n";
                                readonly type: "string";
                                readonly examples: readonly ["dev2"];
                            };
                            readonly current_state: {
                                readonly description: "The branch state\n\n`init` `ready`";
                                readonly type: "string";
                                readonly enum: readonly ["init", "ready"];
                                readonly examples: readonly ["ready"];
                            };
                            readonly pending_state: {
                                readonly description: "The branch state\n\n`init` `ready`";
                                readonly type: "string";
                                readonly enum: readonly ["init", "ready"];
                            };
                            readonly logical_size: {
                                readonly description: "The logical size of the branch, in bytes\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly creation_source: {
                                readonly description: "The branch creation source\n";
                                readonly type: "string";
                                readonly examples: readonly ["console"];
                            };
                            readonly primary: {
                                readonly deprecated: true;
                                readonly description: "DEPRECATED. Use `default` field.\nWhether the branch is the project's primary branch\n";
                                readonly type: "boolean";
                                readonly examples: readonly [true];
                            };
                            readonly default: {
                                readonly description: "Whether the branch is the project's default branch\n";
                                readonly type: "boolean";
                                readonly examples: readonly [true];
                            };
                            readonly protected: {
                                readonly description: "Whether the branch is protected\n";
                                readonly type: "boolean";
                            };
                            readonly cpu_used_sec: {
                                readonly deprecated: true;
                                readonly description: "CPU seconds used by all of the branch's compute endpoints, including deleted ones.\nThis value is reset at the beginning of each billing period.\nExamples:\n1. A branch that uses 1 CPU for 1 second is equal to `cpu_used_sec=1`.\n2. A branch that uses 2 CPUs simultaneously for 1 second is equal to `cpu_used_sec=2`.\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly compute_time_seconds: {
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly active_time_seconds: {
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly written_data_bytes: {
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly data_transfer_bytes: {
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the branch was created\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-30T19:09:48Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the branch was last updated\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-01T19:53:05Z"];
                            };
                            readonly last_reset_at: {
                                readonly description: "A timestamp indicating when the branch was last reset\n";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                        };
                    };
                };
                readonly annotations: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly "x-tags": readonly ["Branch"];
                        readonly required: readonly ["object", "value"];
                        readonly properties: {
                            readonly object: {
                                readonly type: "object";
                                readonly "x-tags": readonly ["Branch"];
                                readonly required: readonly ["type", "id"];
                                readonly properties: {
                                    readonly type: {
                                        readonly type: "string";
                                    };
                                    readonly id: {
                                        readonly type: "string";
                                        readonly examples: readonly ["br-wispy-meadow-118737"];
                                    };
                                };
                            };
                            readonly value: {
                                readonly type: "object";
                                readonly description: "Annotation properties.";
                                readonly "x-tags": readonly ["Branch"];
                                readonly maxProperties: 50;
                                readonly additionalProperties: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                    readonly maxLength: 200;
                                };
                            };
                            readonly created_at: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-30T19:09:48Z"];
                            };
                            readonly updated_at: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-01T19:53:05Z"];
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListProjectEndpoints: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
            };
            readonly required: readonly ["project_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["endpoints"];
            readonly properties: {
                readonly endpoints: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["host", "id", "project_id", "branch_id", "region_id", "autoscaling_limit_max_cu", "autoscaling_limit_min_cu", "type", "current_state", "pooler_enabled", "pooler_mode", "disabled", "passwordless_access", "creation_source", "created_at", "updated_at", "settings", "proxy_host", "suspend_timeout_seconds", "provisioner"];
                        readonly properties: {
                            readonly host: {
                                readonly description: "The hostname of the compute endpoint. This is the hostname specified when connecting to a Neon database.\n";
                                readonly type: "string";
                                readonly examples: readonly ["ep-silent-smoke-806639.us-east-2.aws.neon.tech"];
                            };
                            readonly id: {
                                readonly description: "The compute endpoint ID. Compute endpoint IDs have an `ep-` prefix. For example: `ep-little-smoke-851426`\n";
                                readonly type: "string";
                                readonly examples: readonly ["ep-silent-smoke-806639"];
                            };
                            readonly project_id: {
                                readonly description: "The ID of the project to which the compute endpoint belongs\n";
                                readonly type: "string";
                                readonly examples: readonly ["spring-example-302709"];
                            };
                            readonly branch_id: {
                                readonly description: "The ID of the branch that the compute endpoint is associated with\n";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly autoscaling_limit_min_cu: {
                                readonly description: "The minimum number of Compute Units\n";
                                readonly type: "number";
                                readonly minimum: 0.25;
                                readonly examples: readonly [1];
                            };
                            readonly autoscaling_limit_max_cu: {
                                readonly description: "The maximum number of Compute Units\n";
                                readonly type: "number";
                                readonly minimum: 0.25;
                                readonly examples: readonly [1];
                            };
                            readonly region_id: {
                                readonly type: "string";
                                readonly description: "The region identifier\n";
                                readonly examples: readonly ["aws-us-east-2"];
                            };
                            readonly type: {
                                readonly description: "The compute endpoint type. Either `read_write` or `read_only`.\n\n\n`read_only` `read_write`";
                                readonly type: "string";
                                readonly enum: readonly ["read_only", "read_write"];
                                readonly examples: readonly ["read_write"];
                            };
                            readonly current_state: {
                                readonly description: "The state of the compute endpoint\n\n\n`init` `active` `idle`";
                                readonly type: "string";
                                readonly enum: readonly ["init", "active", "idle"];
                                readonly examples: readonly ["init"];
                            };
                            readonly pending_state: {
                                readonly description: "The state of the compute endpoint\n\n\n`init` `active` `idle`";
                                readonly type: "string";
                                readonly enum: readonly ["init", "active", "idle"];
                                readonly examples: readonly ["active"];
                            };
                            readonly settings: {
                                readonly type: "object";
                                readonly description: "A collection of settings for a compute endpoint";
                                readonly properties: {
                                    readonly pg_settings: {
                                        readonly description: "A raw representation of Postgres settings";
                                        readonly type: "object";
                                        readonly additionalProperties: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly pgbouncer_settings: {
                                        readonly description: "A raw representation of PgBouncer settings";
                                        readonly type: "object";
                                        readonly additionalProperties: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                            readonly pooler_enabled: {
                                readonly description: "Whether connection pooling is enabled for the compute endpoint\n";
                                readonly type: "boolean";
                            };
                            readonly pooler_mode: {
                                readonly description: "The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n\n\n`transaction`";
                                readonly type: "string";
                                readonly enum: readonly ["transaction"];
                                readonly examples: readonly ["transaction"];
                            };
                            readonly disabled: {
                                readonly description: "Whether to restrict connections to the compute endpoint.\nEnabling this option schedules a suspend compute operation.\nA disabled compute endpoint cannot be enabled by a connection or\nconsole action. However, the compute endpoint is periodically\nenabled by check_availability operations.\n";
                                readonly type: "boolean";
                            };
                            readonly passwordless_access: {
                                readonly description: "Whether to permit passwordless access to the compute endpoint\n";
                                readonly type: "boolean";
                                readonly examples: readonly [true];
                            };
                            readonly last_active: {
                                readonly description: "A timestamp indicating when the compute endpoint was last active\n";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly creation_source: {
                                readonly description: "The compute endpoint creation source\n";
                                readonly type: "string";
                                readonly examples: readonly ["console"];
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the compute endpoint was created\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-03T15:37:07Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the compute endpoint was last updated\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-03T15:37:07Z"];
                            };
                            readonly proxy_host: {
                                readonly description: "DEPRECATED. Use the \"host\" property instead.\n";
                                readonly type: "string";
                                readonly examples: readonly ["us-east-2.aws.neon.tech"];
                            };
                            readonly suspend_timeout_seconds: {
                                readonly description: "Duration of inactivity in seconds after which the compute endpoint is\nautomatically suspended. The value `0` means use the global default.\nThe value `-1` means never suspend. The default value is `300` seconds (5 minutes).\nThe minimum value is `60` seconds (1 minute).\nThe maximum value is `604800` seconds (1 week). For more information, see\n[Auto-suspend configuration](https://neon.tech/docs/manage/endpoints#auto-suspend-configuration).\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: -1;
                                readonly maximum: 604800;
                            };
                            readonly provisioner: {
                                readonly type: "string";
                                readonly description: "The Neon compute provisioner.\nSpecify the `k8s-neonvm` provisioner to create a compute endpoint that supports Autoscaling.\n\n\n`k8s-pod` `k8s-neonvm`";
                                readonly enum: readonly ["k8s-pod", "k8s-neonvm"];
                            };
                            readonly compute_release_version: {
                                readonly description: "Attached compute's release version number.\n";
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListProjectOperations: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
            };
            readonly required: readonly ["project_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specify the cursor value from the previous response to get the next batch of operations";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 1000;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specify a value from 1 to 1000 to limit number of operations in the response";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["operations"];
            readonly properties: {
                readonly operations: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "project_id", "action", "status", "failures_count", "created_at", "updated_at", "total_duration_ms"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The operation ID";
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly project_id: {
                                readonly description: "The Neon project ID";
                                readonly type: "string";
                            };
                            readonly branch_id: {
                                readonly description: "The branch ID";
                                readonly type: "string";
                            };
                            readonly endpoint_id: {
                                readonly description: "The endpoint ID";
                                readonly type: "string";
                            };
                            readonly action: {
                                readonly description: "The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_ignore` `tenant_attach` `tenant_detach` `tenant_reattach` `replace_safekeeper` `disable_maintenance` `apply_storage_config` `prepare_secondary_pageserver` `switch_pageserver`";
                                readonly type: "string";
                                readonly enum: readonly ["create_compute", "create_timeline", "start_compute", "suspend_compute", "apply_config", "check_availability", "delete_timeline", "create_branch", "tenant_ignore", "tenant_attach", "tenant_detach", "tenant_reattach", "replace_safekeeper", "disable_maintenance", "apply_storage_config", "prepare_secondary_pageserver", "switch_pageserver"];
                            };
                            readonly status: {
                                readonly description: "The status of the operation\n\n`scheduling` `running` `finished` `failed` `error` `cancelling` `cancelled` `skipped`";
                                readonly type: "string";
                                readonly enum: readonly ["scheduling", "running", "finished", "failed", "error", "cancelling", "cancelled", "skipped"];
                            };
                            readonly error: {
                                readonly description: "The error that occured";
                                readonly type: "string";
                            };
                            readonly failures_count: {
                                readonly description: "The number of times the operation failed";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly retry_at: {
                                readonly description: "A timestamp indicating when the operation was last retried";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the operation was created";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the operation status was last updated";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly total_duration_ms: {
                                readonly description: "The total duration of the operation in milliseconds";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                    };
                };
                readonly pagination: {
                    readonly description: "Cursor based pagination is used. The user must pass the cursor as is to the backend.\nFor more information about cursor based pagination, see\nhttps://learn.microsoft.com/en-us/ef/core/querying/pagination#keyset-pagination\n";
                    readonly type: "object";
                    readonly required: readonly ["cursor", "limit"];
                    readonly properties: {
                        readonly cursor: {
                            readonly type: "string";
                            readonly minLength: 1;
                            readonly examples: readonly ["2022-12-07T00:45:05.262011Z"];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListProjectPermissions: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["project_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["project_permissions"];
            readonly properties: {
                readonly project_permissions: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "granted_to_email", "granted_at"];
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                            };
                            readonly granted_to_email: {
                                readonly type: "string";
                            };
                            readonly granted_at: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly revoked_at: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListProjects: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specify the cursor value from the previous response to retrieve the next batch of projects.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly default: 10;
                    readonly maximum: 400;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specify a value from 1 to 400 to limit number of projects in the response.";
                };
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Search by project `name` or `id`. You can specify partial `name` or `id` values to filter results.";
                };
                readonly org_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Search for projects by `org_id`.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["projects"];
            readonly properties: {
                readonly projects: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Essential data about the project. Full data is available at the getProject endpoint.\n";
                        readonly type: "object";
                        readonly required: readonly ["active_time", "id", "platform_id", "region_id", "name", "pg_version", "proxy_host", "branch_logical_size_limit", "branch_logical_size_limit_bytes", "provisioner", "store_passwords", "cpu_used_sec", "creation_source", "created_at", "updated_at", "owner_id"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The project ID\n";
                                readonly type: "string";
                                readonly examples: readonly ["spring-example-302709"];
                            };
                            readonly platform_id: {
                                readonly description: "The cloud platform identifier. Currently, only AWS is supported, for which the identifier is `aws`.\n";
                                readonly type: "string";
                                readonly examples: readonly ["aws"];
                            };
                            readonly region_id: {
                                readonly description: "The region identifier\n";
                                readonly type: "string";
                                readonly examples: readonly ["aws-us-east-2"];
                            };
                            readonly name: {
                                readonly description: "The project name\n";
                                readonly type: "string";
                                readonly examples: readonly ["spring-example-302709"];
                            };
                            readonly provisioner: {
                                readonly type: "string";
                                readonly description: "The Neon compute provisioner.\nSpecify the `k8s-neonvm` provisioner to create a compute endpoint that supports Autoscaling.\n\n\n`k8s-pod` `k8s-neonvm`";
                                readonly enum: readonly ["k8s-pod", "k8s-neonvm"];
                                readonly examples: readonly ["k8s-pod"];
                            };
                            readonly default_endpoint_settings: {
                                readonly type: "object";
                                readonly description: "A collection of settings for a Neon endpoint";
                                readonly additionalProperties: {
                                    readonly type: "string";
                                };
                                readonly properties: {
                                    readonly pg_settings: {
                                        readonly description: "A raw representation of Postgres settings";
                                        readonly type: "object";
                                        readonly additionalProperties: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly pgbouncer_settings: {
                                        readonly description: "A raw representation of PgBouncer settings";
                                        readonly type: "object";
                                        readonly additionalProperties: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly autoscaling_limit_min_cu: {
                                        readonly description: "The minimum number of Compute Units. The minimum value is `0.25`.\nSee [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\nfor more information.\n";
                                        readonly type: "number";
                                        readonly minimum: 0.25;
                                    };
                                    readonly autoscaling_limit_max_cu: {
                                        readonly description: "The maximum number of Compute Units. See [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\nfor more information.\n";
                                        readonly type: "number";
                                        readonly minimum: 0.25;
                                    };
                                    readonly suspend_timeout_seconds: {
                                        readonly description: "Duration of inactivity in seconds after which the compute endpoint is\nautomatically suspended. The value `0` means use the global default.\nThe value `-1` means never suspend. The default value is `300` seconds (5 minutes).\nThe minimum value is `60` seconds (1 minute).\nThe maximum value is `604800` seconds (1 week). For more information, see\n[Auto-suspend configuration](https://neon.tech/docs/manage/endpoints#auto-suspend-configuration).\n";
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly minimum: -1;
                                        readonly maximum: 604800;
                                    };
                                };
                            };
                            readonly settings: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly quota: {
                                        readonly type: "object";
                                        readonly description: "Per-project consumption quota. If the quota is exceeded, all active computes\nare automatically suspended and it will not be possible to start them with\nan API method call or incoming proxy connections. The only exception is\n`logical_size_bytes`, which is applied on per-branch basis, i.e., only the\ncompute on the branch that exceeds the `logical_size` quota will be suspended.\n\nQuotas are enforced based on per-project consumption metrics with the same names,\nwhich are reset at the end of each billing period (the first day of the month).\nLogical size is also an exception in this case, as it represents the total size\nof data stored in a branch, so it is not reset.\n\nA zero or empty quota value means 'unlimited'.\n";
                                        readonly properties: {
                                            readonly active_time_seconds: {
                                                readonly description: "The total amount of wall-clock time allowed to be spent by the project's compute endpoints.\n";
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: 0;
                                                readonly maximum: 9223372036854776000;
                                            };
                                            readonly compute_time_seconds: {
                                                readonly description: "The total amount of CPU seconds allowed to be spent by the project's compute endpoints.\n";
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: 0;
                                                readonly maximum: 9223372036854776000;
                                            };
                                            readonly written_data_bytes: {
                                                readonly description: "Total amount of data written to all of a project's branches.\n";
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: 0;
                                                readonly maximum: 9223372036854776000;
                                            };
                                            readonly data_transfer_bytes: {
                                                readonly description: "Total amount of data transferred from all of a project's branches using the proxy.\n";
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: 0;
                                                readonly maximum: 9223372036854776000;
                                            };
                                            readonly logical_size_bytes: {
                                                readonly description: "Limit on the logical size of every project's branch.\n";
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: 0;
                                                readonly maximum: 9223372036854776000;
                                            };
                                        };
                                    };
                                    readonly allowed_ips: {
                                        readonly description: "A list of IP addresses that are allowed to connect to the compute endpoint.\nIf the list is empty or not set, all IP addresses are allowed.\nIf protected_branches_only is true, the list will be applied only to protected branches.\n";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly ips: {
                                                readonly description: "A list of IP addresses that are allowed to connect to the endpoint.";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "string";
                                                };
                                            };
                                            readonly protected_branches_only: {
                                                readonly description: "If true, the list will be applied only to protected branches.";
                                                readonly type: "boolean";
                                            };
                                            readonly primary_branch_only: {
                                                readonly deprecated: true;
                                                readonly description: "DEPRECATED: Use `protected_branches_only`.\nIf true, the list will be applied only to the default branch.\n";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly enable_logical_replication: {
                                        readonly description: "Sets wal_level=logical for all compute endpoints in this project.\nAll active endpoints will be suspended.\nOnce enabled, logical replication cannot be disabled.\n";
                                        readonly type: "boolean";
                                    };
                                };
                            };
                            readonly pg_version: {
                                readonly description: "The major Postgres version number. Currently supported versions are `14`, `15`, and `16`.";
                                readonly type: "integer";
                                readonly minimum: 14;
                                readonly maximum: 16;
                                readonly default: 16;
                                readonly examples: readonly [15];
                            };
                            readonly proxy_host: {
                                readonly description: "The proxy host for the project. This value combines the `region_id`, the `platform_id`, and the Neon domain (`neon.tech`).\n";
                                readonly type: "string";
                                readonly examples: readonly ["us-east-2.aws.neon.tech"];
                            };
                            readonly branch_logical_size_limit: {
                                readonly description: "The logical size limit for a branch. The value is in MiB.\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly branch_logical_size_limit_bytes: {
                                readonly description: "The logical size limit for a branch. The value is in B.\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly store_passwords: {
                                readonly description: "Whether or not passwords are stored for roles in the Neon project. Storing passwords facilitates access to Neon features that require authorization.\n";
                                readonly type: "boolean";
                                readonly examples: readonly [true];
                            };
                            readonly active_time: {
                                readonly description: "Control plane observed endpoints of this project being active this amount of wall-clock time.\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: 0;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly cpu_used_sec: {
                                readonly deprecated: true;
                                readonly description: "DEPRECATED. Use data from the getProject endpoint instead.\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly maintenance_starts_at: {
                                readonly description: "A timestamp indicating when project maintenance begins. If set, the project is placed into maintenance mode at this time.\n";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly creation_source: {
                                readonly description: "The project creation source\n";
                                readonly type: "string";
                                readonly examples: readonly ["console"];
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the project was created\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-13T01:30:55Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the project was last updated\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-13T01:30:55Z"];
                            };
                            readonly synthetic_storage_size: {
                                readonly description: "The current space occupied by the project in storage, in bytes. Synthetic storage size combines the logical data size and Write-Ahead Log (WAL) size for all branches in a project.\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly quota_reset_at: {
                                readonly deprecated: true;
                                readonly description: "DEPRECATED. Use `consumption_period_end` from the getProject endpoint instead.\nA timestamp indicating when the project quota resets\n";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly owner_id: {
                                readonly type: "string";
                            };
                            readonly compute_last_active_at: {
                                readonly description: "The most recent time when any endpoint of this project was active.\n\nOmitted when observed no actitivy for endpoints of this project.\n";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly org_id: {
                                readonly type: "string";
                                readonly description: "Organization id if a project belongs to organization.\nPermissions for the project will be given to organization members as defined by the organization admins.\nThe permissions of the project do not depend on the user that created the project if a project belongs to an organization.\n";
                            };
                        };
                    };
                };
                readonly pagination: {
                    readonly description: "Cursor based pagination is used. The user must pass the cursor as is to the backend.\nFor more information about cursor based pagination, see\nhttps://learn.microsoft.com/en-us/ef/core/querying/pagination#keyset-pagination\n";
                    readonly type: "object";
                    readonly required: readonly ["cursor", "limit"];
                    readonly properties: {
                        readonly cursor: {
                            readonly type: "string";
                            readonly minLength: 1;
                            readonly examples: readonly ["2022-12-07T00:45:05.262011Z"];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListProjectsConsumption: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specify the cursor value from the previous response to get the next batch of projects";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly default: 10;
                    readonly maximum: 1000;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specify a value from 1 to 1000 to limit number of projects in the response";
                };
                readonly from: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specify the start date-time for the consumption period.\nThe time value must be provided in ISO 8601 format.\nIf `from` or `to` is not specified, we return only current consumption period.\n";
                };
                readonly to: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specify the end date-time period for the consumption period.\nThe time value must be provided in ISO 8601 format.\nIf `from` or `to` is not specified, only the current consumption period is returned.\n";
                };
                readonly org_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specify the organization for which the project consumption metrics should be returned.\nIf this parameter is not provided, the endpoint will return the metrics for the authenticated\nuser's projects.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["projects", "periods_in_response"];
            readonly properties: {
                readonly projects: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["period_id", "previous_period_id", "project_id", "active_time_seconds", "compute_time_seconds", "written_data_bytes", "data_transfer_bytes", "data_storage_bytes_hour", "synthetic_storage_size", "updated_at", "period_start", "period_end"];
                        readonly properties: {
                            readonly project_id: {
                                readonly description: "The project ID";
                                readonly type: "string";
                            };
                            readonly period_id: {
                                readonly description: "The Id of the consumption period, used to reference the `previous_period_id` field.\n";
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly data_storage_bytes_hour: {
                                readonly description: "Bytes-Hour. The amount of storage the project consumed during the billing period. Expect some lag in the reported value.\nThe value is reset at the beginning of each billing period.\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: 0;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly data_storage_bytes_hour_updated_at: {
                                readonly description: "The timestamp of the last update of the `data_storage_bytes_hour` field.\n";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly synthetic_storage_size: {
                                readonly description: "Bytes. The current space occupied by project in storage. Expect some lag in the reported value.\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: 0;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly synthetic_storage_size_updated_at: {
                                readonly description: "The timestamp of the last update of the `synthetic_storage_size` field.\n";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly data_transfer_bytes: {
                                readonly description: "Bytes. The egress traffic from the Neon cloud to the client for the project over the billing period.\nIncludes egress traffic for deleted endpoints. Expect some lag in the reported value. The value is reset at the beginning of each billing period.\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: 0;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly data_transfer_bytes_updated_at: {
                                readonly description: "Timestamp of the last update of `data_transfer_bytes` field\n";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly written_data_bytes: {
                                readonly description: "Bytes. The Amount of WAL that travelled through storage for given project for all branches.\nExpect some lag in the reported value. The value is reset at the beginning of each billing period.\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: 0;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly written_data_bytes_updated_at: {
                                readonly description: "The timestamp of the last update of `written_data_bytes` field.\n";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly compute_time_seconds: {
                                readonly description: "Seconds. The number of CPU seconds used by the project's compute endpoints, including compute endpoints that have been deleted.\nExpect some lag in the reported value. The value is reset at the beginning of each billing period.\nExamples:\n1. An endpoint that uses 1 CPU for 1 second is equal to `compute_time=1`.\n2. An endpoint that uses 2 CPUs simultaneously for 1 second is equal to `compute_time=2`.\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: 0;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly compute_time_seconds_updated_at: {
                                readonly description: "The timestamp of the last update of `compute_time_seconds` field.\n";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly active_time_seconds: {
                                readonly description: "Seconds. The amount of time that compute endpoints in this project have been active.\nExpect some lag in the reported value.\n\nThe value is reset at the beginning of each billing period.\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: 0;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly active_time_seconds_updated_at: {
                                readonly description: "The timestamp of the last update of the `active_time_seconds` field.\n";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the period was last updated.\n";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly period_start: {
                                readonly description: "The start of the consumption period.\n";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly period_end: {
                                readonly description: "The end of the consumption period.\n";
                                readonly type: readonly ["string", "null"];
                                readonly format: "date-time";
                            };
                            readonly previous_period_id: {
                                readonly description: "The `period_id` of the previous consumption period.\n";
                                readonly type: readonly ["string", "null"];
                                readonly format: "uuid";
                            };
                        };
                    };
                };
                readonly periods_in_response: {
                    readonly type: "integer";
                    readonly format: "int64";
                    readonly minimum: -9223372036854776000;
                    readonly maximum: 9223372036854776000;
                };
                readonly pagination: {
                    readonly description: "Cursor based pagination is used. The user must pass the cursor as is to the backend.\nFor more information about cursor based pagination, see\nhttps://learn.microsoft.com/en-us/ef/core/querying/pagination#keyset-pagination\n";
                    readonly type: "object";
                    readonly required: readonly ["cursor", "limit"];
                    readonly properties: {
                        readonly cursor: {
                            readonly type: "string";
                            readonly minLength: 1;
                            readonly examples: readonly ["2022-12-07T00:45:05.262011Z"];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListSharedProjects: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specify the cursor value from the previous response to get the next batch of projects.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly default: 10;
                    readonly maximum: 400;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specify a value from 1 to 400 to limit number of projects in the response.";
                };
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Search query by name or id.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["projects"];
            readonly properties: {
                readonly projects: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Essential data about the project. Full data is available at the getProject endpoint.\n";
                        readonly type: "object";
                        readonly required: readonly ["active_time", "id", "platform_id", "region_id", "name", "pg_version", "proxy_host", "branch_logical_size_limit", "branch_logical_size_limit_bytes", "provisioner", "store_passwords", "cpu_used_sec", "creation_source", "created_at", "updated_at", "owner_id"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The project ID\n";
                                readonly type: "string";
                                readonly examples: readonly ["spring-example-302709"];
                            };
                            readonly platform_id: {
                                readonly description: "The cloud platform identifier. Currently, only AWS is supported, for which the identifier is `aws`.\n";
                                readonly type: "string";
                                readonly examples: readonly ["aws"];
                            };
                            readonly region_id: {
                                readonly description: "The region identifier\n";
                                readonly type: "string";
                                readonly examples: readonly ["aws-us-east-2"];
                            };
                            readonly name: {
                                readonly description: "The project name\n";
                                readonly type: "string";
                                readonly examples: readonly ["spring-example-302709"];
                            };
                            readonly provisioner: {
                                readonly type: "string";
                                readonly description: "The Neon compute provisioner.\nSpecify the `k8s-neonvm` provisioner to create a compute endpoint that supports Autoscaling.\n\n\n`k8s-pod` `k8s-neonvm`";
                                readonly enum: readonly ["k8s-pod", "k8s-neonvm"];
                                readonly examples: readonly ["k8s-pod"];
                            };
                            readonly default_endpoint_settings: {
                                readonly type: "object";
                                readonly description: "A collection of settings for a Neon endpoint";
                                readonly additionalProperties: {
                                    readonly type: "string";
                                };
                                readonly properties: {
                                    readonly pg_settings: {
                                        readonly description: "A raw representation of Postgres settings";
                                        readonly type: "object";
                                        readonly additionalProperties: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly pgbouncer_settings: {
                                        readonly description: "A raw representation of PgBouncer settings";
                                        readonly type: "object";
                                        readonly additionalProperties: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly autoscaling_limit_min_cu: {
                                        readonly description: "The minimum number of Compute Units. The minimum value is `0.25`.\nSee [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\nfor more information.\n";
                                        readonly type: "number";
                                        readonly minimum: 0.25;
                                    };
                                    readonly autoscaling_limit_max_cu: {
                                        readonly description: "The maximum number of Compute Units. See [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\nfor more information.\n";
                                        readonly type: "number";
                                        readonly minimum: 0.25;
                                    };
                                    readonly suspend_timeout_seconds: {
                                        readonly description: "Duration of inactivity in seconds after which the compute endpoint is\nautomatically suspended. The value `0` means use the global default.\nThe value `-1` means never suspend. The default value is `300` seconds (5 minutes).\nThe minimum value is `60` seconds (1 minute).\nThe maximum value is `604800` seconds (1 week). For more information, see\n[Auto-suspend configuration](https://neon.tech/docs/manage/endpoints#auto-suspend-configuration).\n";
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly minimum: -1;
                                        readonly maximum: 604800;
                                    };
                                };
                            };
                            readonly settings: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly quota: {
                                        readonly type: "object";
                                        readonly description: "Per-project consumption quota. If the quota is exceeded, all active computes\nare automatically suspended and it will not be possible to start them with\nan API method call or incoming proxy connections. The only exception is\n`logical_size_bytes`, which is applied on per-branch basis, i.e., only the\ncompute on the branch that exceeds the `logical_size` quota will be suspended.\n\nQuotas are enforced based on per-project consumption metrics with the same names,\nwhich are reset at the end of each billing period (the first day of the month).\nLogical size is also an exception in this case, as it represents the total size\nof data stored in a branch, so it is not reset.\n\nA zero or empty quota value means 'unlimited'.\n";
                                        readonly properties: {
                                            readonly active_time_seconds: {
                                                readonly description: "The total amount of wall-clock time allowed to be spent by the project's compute endpoints.\n";
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: 0;
                                                readonly maximum: 9223372036854776000;
                                            };
                                            readonly compute_time_seconds: {
                                                readonly description: "The total amount of CPU seconds allowed to be spent by the project's compute endpoints.\n";
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: 0;
                                                readonly maximum: 9223372036854776000;
                                            };
                                            readonly written_data_bytes: {
                                                readonly description: "Total amount of data written to all of a project's branches.\n";
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: 0;
                                                readonly maximum: 9223372036854776000;
                                            };
                                            readonly data_transfer_bytes: {
                                                readonly description: "Total amount of data transferred from all of a project's branches using the proxy.\n";
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: 0;
                                                readonly maximum: 9223372036854776000;
                                            };
                                            readonly logical_size_bytes: {
                                                readonly description: "Limit on the logical size of every project's branch.\n";
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: 0;
                                                readonly maximum: 9223372036854776000;
                                            };
                                        };
                                    };
                                    readonly allowed_ips: {
                                        readonly description: "A list of IP addresses that are allowed to connect to the compute endpoint.\nIf the list is empty or not set, all IP addresses are allowed.\nIf protected_branches_only is true, the list will be applied only to protected branches.\n";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly ips: {
                                                readonly description: "A list of IP addresses that are allowed to connect to the endpoint.";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "string";
                                                };
                                            };
                                            readonly protected_branches_only: {
                                                readonly description: "If true, the list will be applied only to protected branches.";
                                                readonly type: "boolean";
                                            };
                                            readonly primary_branch_only: {
                                                readonly deprecated: true;
                                                readonly description: "DEPRECATED: Use `protected_branches_only`.\nIf true, the list will be applied only to the default branch.\n";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly enable_logical_replication: {
                                        readonly description: "Sets wal_level=logical for all compute endpoints in this project.\nAll active endpoints will be suspended.\nOnce enabled, logical replication cannot be disabled.\n";
                                        readonly type: "boolean";
                                    };
                                };
                            };
                            readonly pg_version: {
                                readonly description: "The major Postgres version number. Currently supported versions are `14`, `15`, and `16`.";
                                readonly type: "integer";
                                readonly minimum: 14;
                                readonly maximum: 16;
                                readonly default: 16;
                                readonly examples: readonly [15];
                            };
                            readonly proxy_host: {
                                readonly description: "The proxy host for the project. This value combines the `region_id`, the `platform_id`, and the Neon domain (`neon.tech`).\n";
                                readonly type: "string";
                                readonly examples: readonly ["us-east-2.aws.neon.tech"];
                            };
                            readonly branch_logical_size_limit: {
                                readonly description: "The logical size limit for a branch. The value is in MiB.\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly branch_logical_size_limit_bytes: {
                                readonly description: "The logical size limit for a branch. The value is in B.\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly store_passwords: {
                                readonly description: "Whether or not passwords are stored for roles in the Neon project. Storing passwords facilitates access to Neon features that require authorization.\n";
                                readonly type: "boolean";
                                readonly examples: readonly [true];
                            };
                            readonly active_time: {
                                readonly description: "Control plane observed endpoints of this project being active this amount of wall-clock time.\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: 0;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly cpu_used_sec: {
                                readonly deprecated: true;
                                readonly description: "DEPRECATED. Use data from the getProject endpoint instead.\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly maintenance_starts_at: {
                                readonly description: "A timestamp indicating when project maintenance begins. If set, the project is placed into maintenance mode at this time.\n";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly creation_source: {
                                readonly description: "The project creation source\n";
                                readonly type: "string";
                                readonly examples: readonly ["console"];
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the project was created\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-13T01:30:55Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the project was last updated\n";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-13T01:30:55Z"];
                            };
                            readonly synthetic_storage_size: {
                                readonly description: "The current space occupied by the project in storage, in bytes. Synthetic storage size combines the logical data size and Write-Ahead Log (WAL) size for all branches in a project.\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly quota_reset_at: {
                                readonly deprecated: true;
                                readonly description: "DEPRECATED. Use `consumption_period_end` from the getProject endpoint instead.\nA timestamp indicating when the project quota resets\n";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly owner_id: {
                                readonly type: "string";
                            };
                            readonly compute_last_active_at: {
                                readonly description: "The most recent time when any endpoint of this project was active.\n\nOmitted when observed no actitivy for endpoints of this project.\n";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly org_id: {
                                readonly type: "string";
                                readonly description: "Organization id if a project belongs to organization.\nPermissions for the project will be given to organization members as defined by the organization admins.\nThe permissions of the project do not depend on the user that created the project if a project belongs to an organization.\n";
                            };
                        };
                    };
                };
                readonly pagination: {
                    readonly description: "Cursor based pagination is used. The user must pass the cursor as is to the backend.\nFor more information about cursor based pagination, see\nhttps://learn.microsoft.com/en-us/ef/core/querying/pagination#keyset-pagination\n";
                    readonly type: "object";
                    readonly required: readonly ["cursor", "limit"];
                    readonly properties: {
                        readonly cursor: {
                            readonly type: "string";
                            readonly minLength: 1;
                            readonly examples: readonly ["2022-12-07T00:45:05.262011Z"];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ResetProjectBranchRolePassword: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly branch_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The branch ID";
                };
                readonly role_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The role nam";
                };
            };
            readonly required: readonly ["project_id", "branch_id", "role_name"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["operations", "role"];
            readonly properties: {
                readonly role: {
                    readonly type: "object";
                    readonly required: readonly ["branch_id", "name", "created_at", "updated_at"];
                    readonly properties: {
                        readonly branch_id: {
                            readonly description: "The ID of the branch to which the role belongs\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-wispy-meadow-118737"];
                        };
                        readonly name: {
                            readonly description: "The role name\n";
                            readonly type: "string";
                            readonly examples: readonly ["casey"];
                        };
                        readonly password: {
                            readonly description: "The role password\n";
                            readonly type: "string";
                        };
                        readonly protected: {
                            readonly description: "Whether or not the role is system-protected\n";
                            readonly type: "boolean";
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the role was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-23T17:42:25Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the role was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-23T17:42:25Z"];
                        };
                    };
                };
                readonly operations: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "project_id", "action", "status", "failures_count", "created_at", "updated_at", "total_duration_ms"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The operation ID";
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly project_id: {
                                readonly description: "The Neon project ID";
                                readonly type: "string";
                            };
                            readonly branch_id: {
                                readonly description: "The branch ID";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly endpoint_id: {
                                readonly description: "The endpoint ID";
                                readonly type: "string";
                            };
                            readonly action: {
                                readonly description: "The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_ignore` `tenant_attach` `tenant_detach` `tenant_reattach` `replace_safekeeper` `disable_maintenance` `apply_storage_config` `prepare_secondary_pageserver` `switch_pageserver`";
                                readonly type: "string";
                                readonly enum: readonly ["create_compute", "create_timeline", "start_compute", "suspend_compute", "apply_config", "check_availability", "delete_timeline", "create_branch", "tenant_ignore", "tenant_attach", "tenant_detach", "tenant_reattach", "replace_safekeeper", "disable_maintenance", "apply_storage_config", "prepare_secondary_pageserver", "switch_pageserver"];
                            };
                            readonly status: {
                                readonly description: "The status of the operation\n\n`scheduling` `running` `finished` `failed` `error` `cancelling` `cancelled` `skipped`";
                                readonly type: "string";
                                readonly enum: readonly ["scheduling", "running", "finished", "failed", "error", "cancelling", "cancelled", "skipped"];
                            };
                            readonly error: {
                                readonly description: "The error that occured";
                                readonly type: "string";
                            };
                            readonly failures_count: {
                                readonly description: "The number of times the operation failed";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly retry_at: {
                                readonly description: "A timestamp indicating when the operation was last retried";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the operation was created";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-23T17:42:25Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the operation status was last updated";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-23T17:42:25Z"];
                            };
                            readonly total_duration_ms: {
                                readonly description: "The total duration of the operation in milliseconds";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RestartProjectEndpoint: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly endpoint_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The endpoint ID";
                };
            };
            readonly required: readonly ["project_id", "endpoint_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["endpoint", "operations"];
            readonly properties: {
                readonly endpoint: {
                    readonly type: "object";
                    readonly required: readonly ["host", "id", "project_id", "branch_id", "region_id", "autoscaling_limit_max_cu", "autoscaling_limit_min_cu", "type", "current_state", "pooler_enabled", "pooler_mode", "disabled", "passwordless_access", "creation_source", "created_at", "updated_at", "settings", "proxy_host", "suspend_timeout_seconds", "provisioner"];
                    readonly properties: {
                        readonly host: {
                            readonly description: "The hostname of the compute endpoint. This is the hostname specified when connecting to a Neon database.\n";
                            readonly type: "string";
                            readonly examples: readonly ["ep-silent-smoke-806639.us-east-2.aws.neon.tech"];
                        };
                        readonly id: {
                            readonly description: "The compute endpoint ID. Compute endpoint IDs have an `ep-` prefix. For example: `ep-little-smoke-851426`\n";
                            readonly type: "string";
                            readonly examples: readonly ["ep-silent-smoke-806639"];
                        };
                        readonly project_id: {
                            readonly description: "The ID of the project to which the compute endpoint belongs\n";
                            readonly type: "string";
                            readonly examples: readonly ["spring-example-302709"];
                        };
                        readonly branch_id: {
                            readonly description: "The ID of the branch that the compute endpoint is associated with\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-wispy-meadow-118737"];
                        };
                        readonly autoscaling_limit_min_cu: {
                            readonly description: "The minimum number of Compute Units\n";
                            readonly type: "number";
                            readonly minimum: 0.25;
                            readonly examples: readonly [1];
                        };
                        readonly autoscaling_limit_max_cu: {
                            readonly description: "The maximum number of Compute Units\n";
                            readonly type: "number";
                            readonly minimum: 0.25;
                            readonly examples: readonly [1];
                        };
                        readonly region_id: {
                            readonly type: "string";
                            readonly description: "The region identifier\n";
                            readonly examples: readonly ["aws-us-east-2"];
                        };
                        readonly type: {
                            readonly description: "The compute endpoint type. Either `read_write` or `read_only`.\n\n\n`read_only` `read_write`";
                            readonly type: "string";
                            readonly enum: readonly ["read_only", "read_write"];
                            readonly examples: readonly ["read_write"];
                        };
                        readonly current_state: {
                            readonly description: "The state of the compute endpoint\n\n\n`init` `active` `idle`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "active", "idle"];
                            readonly examples: readonly ["init"];
                        };
                        readonly pending_state: {
                            readonly description: "The state of the compute endpoint\n\n\n`init` `active` `idle`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "active", "idle"];
                            readonly examples: readonly ["active"];
                        };
                        readonly settings: {
                            readonly type: "object";
                            readonly description: "A collection of settings for a compute endpoint";
                            readonly properties: {
                                readonly pg_settings: {
                                    readonly description: "A raw representation of Postgres settings";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                    };
                                };
                                readonly pgbouncer_settings: {
                                    readonly description: "A raw representation of PgBouncer settings";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                    };
                                };
                            };
                        };
                        readonly pooler_enabled: {
                            readonly description: "Whether connection pooling is enabled for the compute endpoint\n";
                            readonly type: "boolean";
                        };
                        readonly pooler_mode: {
                            readonly description: "The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n\n\n`transaction`";
                            readonly type: "string";
                            readonly enum: readonly ["transaction"];
                            readonly examples: readonly ["transaction"];
                        };
                        readonly disabled: {
                            readonly description: "Whether to restrict connections to the compute endpoint.\nEnabling this option schedules a suspend compute operation.\nA disabled compute endpoint cannot be enabled by a connection or\nconsole action. However, the compute endpoint is periodically\nenabled by check_availability operations.\n";
                            readonly type: "boolean";
                        };
                        readonly passwordless_access: {
                            readonly description: "Whether to permit passwordless access to the compute endpoint\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly last_active: {
                            readonly description: "A timestamp indicating when the compute endpoint was last active\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly creation_source: {
                            readonly description: "The compute endpoint creation source\n";
                            readonly type: "string";
                            readonly examples: readonly ["console"];
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the compute endpoint was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-03T15:37:07Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the compute endpoint was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-03T15:37:07Z"];
                        };
                        readonly proxy_host: {
                            readonly description: "DEPRECATED. Use the \"host\" property instead.\n";
                            readonly type: "string";
                            readonly examples: readonly ["us-east-2.aws.neon.tech"];
                        };
                        readonly suspend_timeout_seconds: {
                            readonly description: "Duration of inactivity in seconds after which the compute endpoint is\nautomatically suspended. The value `0` means use the global default.\nThe value `-1` means never suspend. The default value is `300` seconds (5 minutes).\nThe minimum value is `60` seconds (1 minute).\nThe maximum value is `604800` seconds (1 week). For more information, see\n[Auto-suspend configuration](https://neon.tech/docs/manage/endpoints#auto-suspend-configuration).\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -1;
                            readonly maximum: 604800;
                        };
                        readonly provisioner: {
                            readonly type: "string";
                            readonly description: "The Neon compute provisioner.\nSpecify the `k8s-neonvm` provisioner to create a compute endpoint that supports Autoscaling.\n\n\n`k8s-pod` `k8s-neonvm`";
                            readonly enum: readonly ["k8s-pod", "k8s-neonvm"];
                        };
                        readonly compute_release_version: {
                            readonly description: "Attached compute's release version number.\n";
                            readonly type: "string";
                        };
                    };
                };
                readonly operations: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "project_id", "action", "status", "failures_count", "created_at", "updated_at", "total_duration_ms"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The operation ID";
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly examples: readonly ["ep-silent-smoke-806639"];
                            };
                            readonly project_id: {
                                readonly description: "The Neon project ID";
                                readonly type: "string";
                                readonly examples: readonly ["spring-example-302709"];
                            };
                            readonly branch_id: {
                                readonly description: "The branch ID";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly endpoint_id: {
                                readonly description: "The endpoint ID";
                                readonly type: "string";
                            };
                            readonly action: {
                                readonly description: "The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_ignore` `tenant_attach` `tenant_detach` `tenant_reattach` `replace_safekeeper` `disable_maintenance` `apply_storage_config` `prepare_secondary_pageserver` `switch_pageserver`";
                                readonly type: "string";
                                readonly enum: readonly ["create_compute", "create_timeline", "start_compute", "suspend_compute", "apply_config", "check_availability", "delete_timeline", "create_branch", "tenant_ignore", "tenant_attach", "tenant_detach", "tenant_reattach", "replace_safekeeper", "disable_maintenance", "apply_storage_config", "prepare_secondary_pageserver", "switch_pageserver"];
                            };
                            readonly status: {
                                readonly description: "The status of the operation\n\n`scheduling` `running` `finished` `failed` `error` `cancelling` `cancelled` `skipped`";
                                readonly type: "string";
                                readonly enum: readonly ["scheduling", "running", "finished", "failed", "error", "cancelling", "cancelled", "skipped"];
                            };
                            readonly error: {
                                readonly description: "The error that occured";
                                readonly type: "string";
                            };
                            readonly failures_count: {
                                readonly description: "The number of times the operation failed";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly retry_at: {
                                readonly description: "A timestamp indicating when the operation was last retried";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the operation was created";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-03T15:37:07Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the operation status was last updated";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-03T15:37:07Z"];
                            };
                            readonly total_duration_ms: {
                                readonly description: "The total duration of the operation in milliseconds";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RestoreProjectBranch: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["source_branch_id"];
        readonly properties: {
            readonly source_branch_id: {
                readonly type: "string";
                readonly description: "The `branch_id` of the restore source branch.\nIf `source_timestamp` and `source_lsn` are omitted, the branch will be restored to head.\nIf `source_branch_id` is equal to the branch's id, `source_timestamp` or `source_lsn` is required.\n";
            };
            readonly source_lsn: {
                readonly description: "A Log Sequence Number (LSN) on the source branch. The branch will be restored with data from this LSN.\n";
                readonly type: "string";
            };
            readonly source_timestamp: {
                readonly description: "A timestamp identifying a point in time on the source branch. The branch will be restored with data starting from this point in time.\nThe timestamp must be provided in ISO 8601 format; for example: `2024-02-26T12:00:00Z`.\n";
                readonly type: "string";
                readonly format: "date-time";
            };
            readonly preserve_under_name: {
                readonly description: "If not empty, the previous state of the branch will be saved to a branch with this name.\nIf the branch has children or the `source_branch_id` is equal to the branch id, this field is required. All existing child branches will be moved to the newly created branch under the name `preserve_under_name`.\n";
                readonly type: "string";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly branch_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The branch ID";
                };
            };
            readonly required: readonly ["project_id", "branch_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["branch", "operations"];
            readonly properties: {
                readonly branch: {
                    readonly type: "object";
                    readonly required: readonly ["id", "project_id", "name", "current_state", "creation_source", "created_at", "updated_at", "primary", "default", "protected", "cpu_used_sec", "active_time_seconds", "compute_time_seconds", "written_data_bytes", "data_transfer_bytes"];
                    readonly properties: {
                        readonly id: {
                            readonly description: "The branch ID. This value is generated when a branch is created. A `branch_id` value has a `br` prefix. For example: `br-small-term-683261`.\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-wispy-meadow-118737"];
                        };
                        readonly project_id: {
                            readonly description: "The ID of the project to which the branch belongs\n";
                            readonly type: "string";
                            readonly examples: readonly ["spring-example-302709"];
                        };
                        readonly parent_id: {
                            readonly description: "The `branch_id` of the parent branch\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-aged-salad-637688"];
                        };
                        readonly parent_lsn: {
                            readonly description: "The Log Sequence Number (LSN) on the parent branch from which this branch was created\n";
                            readonly type: "string";
                            readonly examples: readonly ["0/1DE2850"];
                        };
                        readonly parent_timestamp: {
                            readonly description: "The point in time on the parent branch from which this branch was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly name: {
                            readonly description: "The branch name\n";
                            readonly type: "string";
                            readonly examples: readonly ["dev2"];
                        };
                        readonly current_state: {
                            readonly description: "The branch state\n\n`init` `ready`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "ready"];
                            readonly examples: readonly ["ready"];
                        };
                        readonly pending_state: {
                            readonly description: "The branch state\n\n`init` `ready`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "ready"];
                        };
                        readonly logical_size: {
                            readonly description: "The logical size of the branch, in bytes\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly creation_source: {
                            readonly description: "The branch creation source\n";
                            readonly type: "string";
                            readonly examples: readonly ["console"];
                        };
                        readonly primary: {
                            readonly deprecated: true;
                            readonly description: "DEPRECATED. Use `default` field.\nWhether the branch is the project's primary branch\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly default: {
                            readonly description: "Whether the branch is the project's default branch\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly protected: {
                            readonly description: "Whether the branch is protected\n";
                            readonly type: "boolean";
                        };
                        readonly cpu_used_sec: {
                            readonly deprecated: true;
                            readonly description: "CPU seconds used by all of the branch's compute endpoints, including deleted ones.\nThis value is reset at the beginning of each billing period.\nExamples:\n1. A branch that uses 1 CPU for 1 second is equal to `cpu_used_sec=1`.\n2. A branch that uses 2 CPUs simultaneously for 1 second is equal to `cpu_used_sec=2`.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly compute_time_seconds: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly active_time_seconds: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly written_data_bytes: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly data_transfer_bytes: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the branch was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-30T19:09:48Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the branch was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-01T19:53:05Z"];
                        };
                        readonly last_reset_at: {
                            readonly description: "A timestamp indicating when the branch was last reset\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                    };
                };
                readonly operations: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "project_id", "action", "status", "failures_count", "created_at", "updated_at", "total_duration_ms"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The operation ID";
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly project_id: {
                                readonly description: "The Neon project ID";
                                readonly type: "string";
                                readonly examples: readonly ["spring-example-302709"];
                            };
                            readonly branch_id: {
                                readonly description: "The branch ID";
                                readonly type: "string";
                            };
                            readonly endpoint_id: {
                                readonly description: "The endpoint ID";
                                readonly type: "string";
                            };
                            readonly action: {
                                readonly description: "The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_ignore` `tenant_attach` `tenant_detach` `tenant_reattach` `replace_safekeeper` `disable_maintenance` `apply_storage_config` `prepare_secondary_pageserver` `switch_pageserver`";
                                readonly type: "string";
                                readonly enum: readonly ["create_compute", "create_timeline", "start_compute", "suspend_compute", "apply_config", "check_availability", "delete_timeline", "create_branch", "tenant_ignore", "tenant_attach", "tenant_detach", "tenant_reattach", "replace_safekeeper", "disable_maintenance", "apply_storage_config", "prepare_secondary_pageserver", "switch_pageserver"];
                            };
                            readonly status: {
                                readonly description: "The status of the operation\n\n`scheduling` `running` `finished` `failed` `error` `cancelling` `cancelled` `skipped`";
                                readonly type: "string";
                                readonly enum: readonly ["scheduling", "running", "finished", "failed", "error", "cancelling", "cancelled", "skipped"];
                            };
                            readonly error: {
                                readonly description: "The error that occured";
                                readonly type: "string";
                            };
                            readonly failures_count: {
                                readonly description: "The number of times the operation failed";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly retry_at: {
                                readonly description: "A timestamp indicating when the operation was last retried";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the operation was created";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-30T19:09:48Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the operation status was last updated";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-01T19:53:05Z"];
                            };
                            readonly total_duration_ms: {
                                readonly description: "The total duration of the operation in milliseconds";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RevokeApiKey: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly key_id: {
                    readonly type: "integer";
                    readonly format: "int64";
                    readonly minimum: -9223372036854776000;
                    readonly maximum: 9223372036854776000;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API key ID";
                };
            };
            readonly required: readonly ["key_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["id", "name", "revoked", "last_used_from_addr"];
            readonly properties: {
                readonly id: {
                    readonly description: "The API key ID";
                    readonly type: "integer";
                    readonly format: "int64";
                    readonly minimum: -9223372036854776000;
                    readonly maximum: 9223372036854776000;
                };
                readonly name: {
                    readonly description: "The user-specified API key name";
                    readonly type: "string";
                };
                readonly revoked: {
                    readonly description: "A `true` or `false` value indicating whether the API key is revoked";
                    readonly type: "boolean";
                };
                readonly last_used_at: {
                    readonly description: "A timestamp indicating when the API was last used";
                    readonly type: readonly ["string", "null"];
                    readonly format: "date-time";
                };
                readonly last_used_from_addr: {
                    readonly description: "The IP address from which the API key was last used";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RevokePermissionFromProject: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly permission_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["project_id", "permission_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["id", "granted_to_email", "granted_at"];
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                };
                readonly granted_to_email: {
                    readonly type: "string";
                };
                readonly granted_at: {
                    readonly type: "string";
                    readonly format: "date-time";
                };
                readonly revoked_at: {
                    readonly type: "string";
                    readonly format: "date-time";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SetDefaultProjectBranch: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly branch_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The branch ID";
                };
            };
            readonly required: readonly ["project_id", "branch_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["branch", "operations"];
            readonly properties: {
                readonly branch: {
                    readonly type: "object";
                    readonly required: readonly ["id", "project_id", "name", "current_state", "creation_source", "created_at", "updated_at", "primary", "default", "protected", "cpu_used_sec", "active_time_seconds", "compute_time_seconds", "written_data_bytes", "data_transfer_bytes"];
                    readonly properties: {
                        readonly id: {
                            readonly description: "The branch ID. This value is generated when a branch is created. A `branch_id` value has a `br` prefix. For example: `br-small-term-683261`.\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-wispy-meadow-118737"];
                        };
                        readonly project_id: {
                            readonly description: "The ID of the project to which the branch belongs\n";
                            readonly type: "string";
                            readonly examples: readonly ["spring-example-302709"];
                        };
                        readonly parent_id: {
                            readonly description: "The `branch_id` of the parent branch\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-aged-salad-637688"];
                        };
                        readonly parent_lsn: {
                            readonly description: "The Log Sequence Number (LSN) on the parent branch from which this branch was created\n";
                            readonly type: "string";
                            readonly examples: readonly ["0/1DE2850"];
                        };
                        readonly parent_timestamp: {
                            readonly description: "The point in time on the parent branch from which this branch was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly name: {
                            readonly description: "The branch name\n";
                            readonly type: "string";
                            readonly examples: readonly ["dev2"];
                        };
                        readonly current_state: {
                            readonly description: "The branch state\n\n`init` `ready`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "ready"];
                            readonly examples: readonly ["ready"];
                        };
                        readonly pending_state: {
                            readonly description: "The branch state\n\n`init` `ready`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "ready"];
                        };
                        readonly logical_size: {
                            readonly description: "The logical size of the branch, in bytes\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly creation_source: {
                            readonly description: "The branch creation source\n";
                            readonly type: "string";
                            readonly examples: readonly ["console"];
                        };
                        readonly primary: {
                            readonly deprecated: true;
                            readonly description: "DEPRECATED. Use `default` field.\nWhether the branch is the project's primary branch\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly default: {
                            readonly description: "Whether the branch is the project's default branch\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly protected: {
                            readonly description: "Whether the branch is protected\n";
                            readonly type: "boolean";
                        };
                        readonly cpu_used_sec: {
                            readonly deprecated: true;
                            readonly description: "CPU seconds used by all of the branch's compute endpoints, including deleted ones.\nThis value is reset at the beginning of each billing period.\nExamples:\n1. A branch that uses 1 CPU for 1 second is equal to `cpu_used_sec=1`.\n2. A branch that uses 2 CPUs simultaneously for 1 second is equal to `cpu_used_sec=2`.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly compute_time_seconds: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly active_time_seconds: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly written_data_bytes: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly data_transfer_bytes: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the branch was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-30T19:09:48Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the branch was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-01T19:53:05Z"];
                        };
                        readonly last_reset_at: {
                            readonly description: "A timestamp indicating when the branch was last reset\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                    };
                };
                readonly operations: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "project_id", "action", "status", "failures_count", "created_at", "updated_at", "total_duration_ms"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The operation ID";
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly project_id: {
                                readonly description: "The Neon project ID";
                                readonly type: "string";
                                readonly examples: readonly ["spring-example-302709"];
                            };
                            readonly branch_id: {
                                readonly description: "The branch ID";
                                readonly type: "string";
                            };
                            readonly endpoint_id: {
                                readonly description: "The endpoint ID";
                                readonly type: "string";
                            };
                            readonly action: {
                                readonly description: "The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_ignore` `tenant_attach` `tenant_detach` `tenant_reattach` `replace_safekeeper` `disable_maintenance` `apply_storage_config` `prepare_secondary_pageserver` `switch_pageserver`";
                                readonly type: "string";
                                readonly enum: readonly ["create_compute", "create_timeline", "start_compute", "suspend_compute", "apply_config", "check_availability", "delete_timeline", "create_branch", "tenant_ignore", "tenant_attach", "tenant_detach", "tenant_reattach", "replace_safekeeper", "disable_maintenance", "apply_storage_config", "prepare_secondary_pageserver", "switch_pageserver"];
                            };
                            readonly status: {
                                readonly description: "The status of the operation\n\n`scheduling` `running` `finished` `failed` `error` `cancelling` `cancelled` `skipped`";
                                readonly type: "string";
                                readonly enum: readonly ["scheduling", "running", "finished", "failed", "error", "cancelling", "cancelled", "skipped"];
                            };
                            readonly error: {
                                readonly description: "The error that occured";
                                readonly type: "string";
                            };
                            readonly failures_count: {
                                readonly description: "The number of times the operation failed";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly retry_at: {
                                readonly description: "A timestamp indicating when the operation was last retried";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the operation was created";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-30T19:09:48Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the operation status was last updated";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-01T19:53:05Z"];
                            };
                            readonly total_duration_ms: {
                                readonly description: "The total duration of the operation in milliseconds";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SetPrimaryProjectBranch: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly branch_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The branch ID";
                };
            };
            readonly required: readonly ["project_id", "branch_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["branch", "operations"];
            readonly properties: {
                readonly branch: {
                    readonly type: "object";
                    readonly required: readonly ["id", "project_id", "name", "current_state", "creation_source", "created_at", "updated_at", "primary", "default", "protected", "cpu_used_sec", "active_time_seconds", "compute_time_seconds", "written_data_bytes", "data_transfer_bytes"];
                    readonly properties: {
                        readonly id: {
                            readonly description: "The branch ID. This value is generated when a branch is created. A `branch_id` value has a `br` prefix. For example: `br-small-term-683261`.\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-wispy-meadow-118737"];
                        };
                        readonly project_id: {
                            readonly description: "The ID of the project to which the branch belongs\n";
                            readonly type: "string";
                            readonly examples: readonly ["spring-example-302709"];
                        };
                        readonly parent_id: {
                            readonly description: "The `branch_id` of the parent branch\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-aged-salad-637688"];
                        };
                        readonly parent_lsn: {
                            readonly description: "The Log Sequence Number (LSN) on the parent branch from which this branch was created\n";
                            readonly type: "string";
                            readonly examples: readonly ["0/1DE2850"];
                        };
                        readonly parent_timestamp: {
                            readonly description: "The point in time on the parent branch from which this branch was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly name: {
                            readonly description: "The branch name\n";
                            readonly type: "string";
                            readonly examples: readonly ["dev2"];
                        };
                        readonly current_state: {
                            readonly description: "The branch state\n\n`init` `ready`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "ready"];
                            readonly examples: readonly ["ready"];
                        };
                        readonly pending_state: {
                            readonly description: "The branch state\n\n`init` `ready`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "ready"];
                        };
                        readonly logical_size: {
                            readonly description: "The logical size of the branch, in bytes\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly creation_source: {
                            readonly description: "The branch creation source\n";
                            readonly type: "string";
                            readonly examples: readonly ["console"];
                        };
                        readonly primary: {
                            readonly deprecated: true;
                            readonly description: "DEPRECATED. Use `default` field.\nWhether the branch is the project's primary branch\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly default: {
                            readonly description: "Whether the branch is the project's default branch\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly protected: {
                            readonly description: "Whether the branch is protected\n";
                            readonly type: "boolean";
                        };
                        readonly cpu_used_sec: {
                            readonly deprecated: true;
                            readonly description: "CPU seconds used by all of the branch's compute endpoints, including deleted ones.\nThis value is reset at the beginning of each billing period.\nExamples:\n1. A branch that uses 1 CPU for 1 second is equal to `cpu_used_sec=1`.\n2. A branch that uses 2 CPUs simultaneously for 1 second is equal to `cpu_used_sec=2`.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly compute_time_seconds: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly active_time_seconds: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly written_data_bytes: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly data_transfer_bytes: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the branch was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-30T19:09:48Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the branch was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-01T19:53:05Z"];
                        };
                        readonly last_reset_at: {
                            readonly description: "A timestamp indicating when the branch was last reset\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                    };
                };
                readonly operations: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "project_id", "action", "status", "failures_count", "created_at", "updated_at", "total_duration_ms"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The operation ID";
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly project_id: {
                                readonly description: "The Neon project ID";
                                readonly type: "string";
                                readonly examples: readonly ["spring-example-302709"];
                            };
                            readonly branch_id: {
                                readonly description: "The branch ID";
                                readonly type: "string";
                            };
                            readonly endpoint_id: {
                                readonly description: "The endpoint ID";
                                readonly type: "string";
                            };
                            readonly action: {
                                readonly description: "The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_ignore` `tenant_attach` `tenant_detach` `tenant_reattach` `replace_safekeeper` `disable_maintenance` `apply_storage_config` `prepare_secondary_pageserver` `switch_pageserver`";
                                readonly type: "string";
                                readonly enum: readonly ["create_compute", "create_timeline", "start_compute", "suspend_compute", "apply_config", "check_availability", "delete_timeline", "create_branch", "tenant_ignore", "tenant_attach", "tenant_detach", "tenant_reattach", "replace_safekeeper", "disable_maintenance", "apply_storage_config", "prepare_secondary_pageserver", "switch_pageserver"];
                            };
                            readonly status: {
                                readonly description: "The status of the operation\n\n`scheduling` `running` `finished` `failed` `error` `cancelling` `cancelled` `skipped`";
                                readonly type: "string";
                                readonly enum: readonly ["scheduling", "running", "finished", "failed", "error", "cancelling", "cancelled", "skipped"];
                            };
                            readonly error: {
                                readonly description: "The error that occured";
                                readonly type: "string";
                            };
                            readonly failures_count: {
                                readonly description: "The number of times the operation failed";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly retry_at: {
                                readonly description: "A timestamp indicating when the operation was last retried";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the operation was created";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-30T19:09:48Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the operation status was last updated";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-01T19:53:05Z"];
                            };
                            readonly total_duration_ms: {
                                readonly description: "The total duration of the operation in milliseconds";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const StartProjectEndpoint: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly endpoint_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The endpoint ID";
                };
            };
            readonly required: readonly ["project_id", "endpoint_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["endpoint", "operations"];
            readonly properties: {
                readonly endpoint: {
                    readonly type: "object";
                    readonly required: readonly ["host", "id", "project_id", "branch_id", "region_id", "autoscaling_limit_max_cu", "autoscaling_limit_min_cu", "type", "current_state", "pooler_enabled", "pooler_mode", "disabled", "passwordless_access", "creation_source", "created_at", "updated_at", "settings", "proxy_host", "suspend_timeout_seconds", "provisioner"];
                    readonly properties: {
                        readonly host: {
                            readonly description: "The hostname of the compute endpoint. This is the hostname specified when connecting to a Neon database.\n";
                            readonly type: "string";
                            readonly examples: readonly ["ep-silent-smoke-806639.us-east-2.aws.neon.tech"];
                        };
                        readonly id: {
                            readonly description: "The compute endpoint ID. Compute endpoint IDs have an `ep-` prefix. For example: `ep-little-smoke-851426`\n";
                            readonly type: "string";
                            readonly examples: readonly ["ep-silent-smoke-806639"];
                        };
                        readonly project_id: {
                            readonly description: "The ID of the project to which the compute endpoint belongs\n";
                            readonly type: "string";
                            readonly examples: readonly ["spring-example-302709"];
                        };
                        readonly branch_id: {
                            readonly description: "The ID of the branch that the compute endpoint is associated with\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-wispy-meadow-118737"];
                        };
                        readonly autoscaling_limit_min_cu: {
                            readonly description: "The minimum number of Compute Units\n";
                            readonly type: "number";
                            readonly minimum: 0.25;
                            readonly examples: readonly [1];
                        };
                        readonly autoscaling_limit_max_cu: {
                            readonly description: "The maximum number of Compute Units\n";
                            readonly type: "number";
                            readonly minimum: 0.25;
                            readonly examples: readonly [1];
                        };
                        readonly region_id: {
                            readonly type: "string";
                            readonly description: "The region identifier\n";
                            readonly examples: readonly ["aws-us-east-2"];
                        };
                        readonly type: {
                            readonly description: "The compute endpoint type. Either `read_write` or `read_only`.\n\n\n`read_only` `read_write`";
                            readonly type: "string";
                            readonly enum: readonly ["read_only", "read_write"];
                            readonly examples: readonly ["read_write"];
                        };
                        readonly current_state: {
                            readonly description: "The state of the compute endpoint\n\n\n`init` `active` `idle`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "active", "idle"];
                            readonly examples: readonly ["init"];
                        };
                        readonly pending_state: {
                            readonly description: "The state of the compute endpoint\n\n\n`init` `active` `idle`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "active", "idle"];
                            readonly examples: readonly ["active"];
                        };
                        readonly settings: {
                            readonly type: "object";
                            readonly description: "A collection of settings for a compute endpoint";
                            readonly properties: {
                                readonly pg_settings: {
                                    readonly description: "A raw representation of Postgres settings";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                    };
                                };
                                readonly pgbouncer_settings: {
                                    readonly description: "A raw representation of PgBouncer settings";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                    };
                                };
                            };
                        };
                        readonly pooler_enabled: {
                            readonly description: "Whether connection pooling is enabled for the compute endpoint\n";
                            readonly type: "boolean";
                        };
                        readonly pooler_mode: {
                            readonly description: "The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n\n\n`transaction`";
                            readonly type: "string";
                            readonly enum: readonly ["transaction"];
                            readonly examples: readonly ["transaction"];
                        };
                        readonly disabled: {
                            readonly description: "Whether to restrict connections to the compute endpoint.\nEnabling this option schedules a suspend compute operation.\nA disabled compute endpoint cannot be enabled by a connection or\nconsole action. However, the compute endpoint is periodically\nenabled by check_availability operations.\n";
                            readonly type: "boolean";
                        };
                        readonly passwordless_access: {
                            readonly description: "Whether to permit passwordless access to the compute endpoint\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly last_active: {
                            readonly description: "A timestamp indicating when the compute endpoint was last active\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly creation_source: {
                            readonly description: "The compute endpoint creation source\n";
                            readonly type: "string";
                            readonly examples: readonly ["console"];
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the compute endpoint was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-03T15:37:07Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the compute endpoint was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-03T15:37:07Z"];
                        };
                        readonly proxy_host: {
                            readonly description: "DEPRECATED. Use the \"host\" property instead.\n";
                            readonly type: "string";
                            readonly examples: readonly ["us-east-2.aws.neon.tech"];
                        };
                        readonly suspend_timeout_seconds: {
                            readonly description: "Duration of inactivity in seconds after which the compute endpoint is\nautomatically suspended. The value `0` means use the global default.\nThe value `-1` means never suspend. The default value is `300` seconds (5 minutes).\nThe minimum value is `60` seconds (1 minute).\nThe maximum value is `604800` seconds (1 week). For more information, see\n[Auto-suspend configuration](https://neon.tech/docs/manage/endpoints#auto-suspend-configuration).\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -1;
                            readonly maximum: 604800;
                        };
                        readonly provisioner: {
                            readonly type: "string";
                            readonly description: "The Neon compute provisioner.\nSpecify the `k8s-neonvm` provisioner to create a compute endpoint that supports Autoscaling.\n\n\n`k8s-pod` `k8s-neonvm`";
                            readonly enum: readonly ["k8s-pod", "k8s-neonvm"];
                        };
                        readonly compute_release_version: {
                            readonly description: "Attached compute's release version number.\n";
                            readonly type: "string";
                        };
                    };
                };
                readonly operations: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "project_id", "action", "status", "failures_count", "created_at", "updated_at", "total_duration_ms"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The operation ID";
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly examples: readonly ["ep-silent-smoke-806639"];
                            };
                            readonly project_id: {
                                readonly description: "The Neon project ID";
                                readonly type: "string";
                                readonly examples: readonly ["spring-example-302709"];
                            };
                            readonly branch_id: {
                                readonly description: "The branch ID";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly endpoint_id: {
                                readonly description: "The endpoint ID";
                                readonly type: "string";
                            };
                            readonly action: {
                                readonly description: "The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_ignore` `tenant_attach` `tenant_detach` `tenant_reattach` `replace_safekeeper` `disable_maintenance` `apply_storage_config` `prepare_secondary_pageserver` `switch_pageserver`";
                                readonly type: "string";
                                readonly enum: readonly ["create_compute", "create_timeline", "start_compute", "suspend_compute", "apply_config", "check_availability", "delete_timeline", "create_branch", "tenant_ignore", "tenant_attach", "tenant_detach", "tenant_reattach", "replace_safekeeper", "disable_maintenance", "apply_storage_config", "prepare_secondary_pageserver", "switch_pageserver"];
                            };
                            readonly status: {
                                readonly description: "The status of the operation\n\n`scheduling` `running` `finished` `failed` `error` `cancelling` `cancelled` `skipped`";
                                readonly type: "string";
                                readonly enum: readonly ["scheduling", "running", "finished", "failed", "error", "cancelling", "cancelled", "skipped"];
                            };
                            readonly error: {
                                readonly description: "The error that occured";
                                readonly type: "string";
                            };
                            readonly failures_count: {
                                readonly description: "The number of times the operation failed";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly retry_at: {
                                readonly description: "A timestamp indicating when the operation was last retried";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the operation was created";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-03T15:37:07Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the operation status was last updated";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-03T15:37:07Z"];
                            };
                            readonly total_duration_ms: {
                                readonly description: "The total duration of the operation in milliseconds";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SuspendProjectEndpoint: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly endpoint_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The endpoint ID";
                };
            };
            readonly required: readonly ["project_id", "endpoint_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["endpoint", "operations"];
            readonly properties: {
                readonly endpoint: {
                    readonly type: "object";
                    readonly required: readonly ["host", "id", "project_id", "branch_id", "region_id", "autoscaling_limit_max_cu", "autoscaling_limit_min_cu", "type", "current_state", "pooler_enabled", "pooler_mode", "disabled", "passwordless_access", "creation_source", "created_at", "updated_at", "settings", "proxy_host", "suspend_timeout_seconds", "provisioner"];
                    readonly properties: {
                        readonly host: {
                            readonly description: "The hostname of the compute endpoint. This is the hostname specified when connecting to a Neon database.\n";
                            readonly type: "string";
                            readonly examples: readonly ["ep-silent-smoke-806639.us-east-2.aws.neon.tech"];
                        };
                        readonly id: {
                            readonly description: "The compute endpoint ID. Compute endpoint IDs have an `ep-` prefix. For example: `ep-little-smoke-851426`\n";
                            readonly type: "string";
                            readonly examples: readonly ["ep-silent-smoke-806639"];
                        };
                        readonly project_id: {
                            readonly description: "The ID of the project to which the compute endpoint belongs\n";
                            readonly type: "string";
                            readonly examples: readonly ["spring-example-302709"];
                        };
                        readonly branch_id: {
                            readonly description: "The ID of the branch that the compute endpoint is associated with\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-wispy-meadow-118737"];
                        };
                        readonly autoscaling_limit_min_cu: {
                            readonly description: "The minimum number of Compute Units\n";
                            readonly type: "number";
                            readonly minimum: 0.25;
                            readonly examples: readonly [1];
                        };
                        readonly autoscaling_limit_max_cu: {
                            readonly description: "The maximum number of Compute Units\n";
                            readonly type: "number";
                            readonly minimum: 0.25;
                            readonly examples: readonly [1];
                        };
                        readonly region_id: {
                            readonly type: "string";
                            readonly description: "The region identifier\n";
                            readonly examples: readonly ["aws-us-east-2"];
                        };
                        readonly type: {
                            readonly description: "The compute endpoint type. Either `read_write` or `read_only`.\n\n\n`read_only` `read_write`";
                            readonly type: "string";
                            readonly enum: readonly ["read_only", "read_write"];
                            readonly examples: readonly ["read_write"];
                        };
                        readonly current_state: {
                            readonly description: "The state of the compute endpoint\n\n\n`init` `active` `idle`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "active", "idle"];
                            readonly examples: readonly ["init"];
                        };
                        readonly pending_state: {
                            readonly description: "The state of the compute endpoint\n\n\n`init` `active` `idle`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "active", "idle"];
                            readonly examples: readonly ["active"];
                        };
                        readonly settings: {
                            readonly type: "object";
                            readonly description: "A collection of settings for a compute endpoint";
                            readonly properties: {
                                readonly pg_settings: {
                                    readonly description: "A raw representation of Postgres settings";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                    };
                                };
                                readonly pgbouncer_settings: {
                                    readonly description: "A raw representation of PgBouncer settings";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                    };
                                };
                            };
                        };
                        readonly pooler_enabled: {
                            readonly description: "Whether connection pooling is enabled for the compute endpoint\n";
                            readonly type: "boolean";
                        };
                        readonly pooler_mode: {
                            readonly description: "The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n\n\n`transaction`";
                            readonly type: "string";
                            readonly enum: readonly ["transaction"];
                            readonly examples: readonly ["transaction"];
                        };
                        readonly disabled: {
                            readonly description: "Whether to restrict connections to the compute endpoint.\nEnabling this option schedules a suspend compute operation.\nA disabled compute endpoint cannot be enabled by a connection or\nconsole action. However, the compute endpoint is periodically\nenabled by check_availability operations.\n";
                            readonly type: "boolean";
                        };
                        readonly passwordless_access: {
                            readonly description: "Whether to permit passwordless access to the compute endpoint\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly last_active: {
                            readonly description: "A timestamp indicating when the compute endpoint was last active\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly creation_source: {
                            readonly description: "The compute endpoint creation source\n";
                            readonly type: "string";
                            readonly examples: readonly ["console"];
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the compute endpoint was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-03T15:37:07Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the compute endpoint was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-03T15:37:07Z"];
                        };
                        readonly proxy_host: {
                            readonly description: "DEPRECATED. Use the \"host\" property instead.\n";
                            readonly type: "string";
                            readonly examples: readonly ["us-east-2.aws.neon.tech"];
                        };
                        readonly suspend_timeout_seconds: {
                            readonly description: "Duration of inactivity in seconds after which the compute endpoint is\nautomatically suspended. The value `0` means use the global default.\nThe value `-1` means never suspend. The default value is `300` seconds (5 minutes).\nThe minimum value is `60` seconds (1 minute).\nThe maximum value is `604800` seconds (1 week). For more information, see\n[Auto-suspend configuration](https://neon.tech/docs/manage/endpoints#auto-suspend-configuration).\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -1;
                            readonly maximum: 604800;
                        };
                        readonly provisioner: {
                            readonly type: "string";
                            readonly description: "The Neon compute provisioner.\nSpecify the `k8s-neonvm` provisioner to create a compute endpoint that supports Autoscaling.\n\n\n`k8s-pod` `k8s-neonvm`";
                            readonly enum: readonly ["k8s-pod", "k8s-neonvm"];
                        };
                        readonly compute_release_version: {
                            readonly description: "Attached compute's release version number.\n";
                            readonly type: "string";
                        };
                    };
                };
                readonly operations: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "project_id", "action", "status", "failures_count", "created_at", "updated_at", "total_duration_ms"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The operation ID";
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly examples: readonly ["ep-silent-smoke-806639"];
                            };
                            readonly project_id: {
                                readonly description: "The Neon project ID";
                                readonly type: "string";
                                readonly examples: readonly ["spring-example-302709"];
                            };
                            readonly branch_id: {
                                readonly description: "The branch ID";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly endpoint_id: {
                                readonly description: "The endpoint ID";
                                readonly type: "string";
                            };
                            readonly action: {
                                readonly description: "The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_ignore` `tenant_attach` `tenant_detach` `tenant_reattach` `replace_safekeeper` `disable_maintenance` `apply_storage_config` `prepare_secondary_pageserver` `switch_pageserver`";
                                readonly type: "string";
                                readonly enum: readonly ["create_compute", "create_timeline", "start_compute", "suspend_compute", "apply_config", "check_availability", "delete_timeline", "create_branch", "tenant_ignore", "tenant_attach", "tenant_detach", "tenant_reattach", "replace_safekeeper", "disable_maintenance", "apply_storage_config", "prepare_secondary_pageserver", "switch_pageserver"];
                            };
                            readonly status: {
                                readonly description: "The status of the operation\n\n`scheduling` `running` `finished` `failed` `error` `cancelling` `cancelled` `skipped`";
                                readonly type: "string";
                                readonly enum: readonly ["scheduling", "running", "finished", "failed", "error", "cancelling", "cancelled", "skipped"];
                            };
                            readonly error: {
                                readonly description: "The error that occured";
                                readonly type: "string";
                            };
                            readonly failures_count: {
                                readonly description: "The number of times the operation failed";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly retry_at: {
                                readonly description: "A timestamp indicating when the operation was last retried";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the operation was created";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-03T15:37:07Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the operation status was last updated";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-03T15:37:07Z"];
                            };
                            readonly total_duration_ms: {
                                readonly description: "The total duration of the operation in milliseconds";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const UpdateProject: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["project"];
        readonly properties: {
            readonly project: {
                readonly type: "object";
                readonly properties: {
                    readonly settings: {
                        readonly type: "object";
                        readonly properties: {
                            readonly quota: {
                                readonly type: "object";
                                readonly description: "Per-project consumption quota. If the quota is exceeded, all active computes\nare automatically suspended and it will not be possible to start them with\nan API method call or incoming proxy connections. The only exception is\n`logical_size_bytes`, which is applied on per-branch basis, i.e., only the\ncompute on the branch that exceeds the `logical_size` quota will be suspended.\n\nQuotas are enforced based on per-project consumption metrics with the same names,\nwhich are reset at the end of each billing period (the first day of the month).\nLogical size is also an exception in this case, as it represents the total size\nof data stored in a branch, so it is not reset.\n\nA zero or empty quota value means 'unlimited'.\n";
                                readonly properties: {
                                    readonly active_time_seconds: {
                                        readonly description: "The total amount of wall-clock time allowed to be spent by the project's compute endpoints.\n";
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly minimum: 0;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly compute_time_seconds: {
                                        readonly description: "The total amount of CPU seconds allowed to be spent by the project's compute endpoints.\n";
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly minimum: 0;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly written_data_bytes: {
                                        readonly description: "Total amount of data written to all of a project's branches.\n";
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly minimum: 0;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly data_transfer_bytes: {
                                        readonly description: "Total amount of data transferred from all of a project's branches using the proxy.\n";
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly minimum: 0;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly logical_size_bytes: {
                                        readonly description: "Limit on the logical size of every project's branch.\n";
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly minimum: 0;
                                        readonly maximum: 9223372036854776000;
                                    };
                                };
                            };
                            readonly allowed_ips: {
                                readonly description: "A list of IP addresses that are allowed to connect to the compute endpoint.\nIf the list is empty or not set, all IP addresses are allowed.\nIf protected_branches_only is true, the list will be applied only to protected branches.\n";
                                readonly type: "object";
                                readonly properties: {
                                    readonly ips: {
                                        readonly description: "A list of IP addresses that are allowed to connect to the endpoint.";
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly protected_branches_only: {
                                        readonly description: "If true, the list will be applied only to protected branches.";
                                        readonly type: "boolean";
                                    };
                                    readonly primary_branch_only: {
                                        readonly deprecated: true;
                                        readonly description: "DEPRECATED: Use `protected_branches_only`.\nIf true, the list will be applied only to the default branch.\n";
                                        readonly type: "boolean";
                                    };
                                };
                            };
                            readonly enable_logical_replication: {
                                readonly description: "Sets wal_level=logical for all compute endpoints in this project.\nAll active endpoints will be suspended.\nOnce enabled, logical replication cannot be disabled.\n";
                                readonly type: "boolean";
                            };
                        };
                    };
                    readonly name: {
                        readonly description: "The project name";
                        readonly type: "string";
                        readonly examples: readonly ["myproject"];
                    };
                    readonly default_endpoint_settings: {
                        readonly type: "object";
                        readonly description: "A collection of settings for a Neon endpoint";
                        readonly properties: {
                            readonly pg_settings: {
                                readonly description: "A raw representation of Postgres settings";
                                readonly type: "object";
                                readonly additionalProperties: {
                                    readonly type: "string";
                                };
                            };
                            readonly pgbouncer_settings: {
                                readonly description: "A raw representation of PgBouncer settings";
                                readonly type: "object";
                                readonly additionalProperties: {
                                    readonly type: "string";
                                };
                            };
                            readonly autoscaling_limit_min_cu: {
                                readonly description: "The minimum number of Compute Units. The minimum value is `0.25`.\nSee [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\nfor more information.\n";
                                readonly type: "number";
                                readonly minimum: 0.25;
                            };
                            readonly autoscaling_limit_max_cu: {
                                readonly description: "The maximum number of Compute Units. See [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\nfor more information.\n";
                                readonly type: "number";
                                readonly minimum: 0.25;
                            };
                            readonly suspend_timeout_seconds: {
                                readonly description: "Duration of inactivity in seconds after which the compute endpoint is\nautomatically suspended. The value `0` means use the global default.\nThe value `-1` means never suspend. The default value is `300` seconds (5 minutes).\nThe minimum value is `60` seconds (1 minute).\nThe maximum value is `604800` seconds (1 week). For more information, see\n[Auto-suspend configuration](https://neon.tech/docs/manage/endpoints#auto-suspend-configuration).\n";
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: -1;
                                readonly maximum: 604800;
                            };
                        };
                        readonly additionalProperties: {
                            readonly type: "string";
                        };
                    };
                    readonly history_retention_seconds: {
                        readonly description: "The number of seconds to retain the point-in-time restore (PITR) backup history for this project.\nThe default is 604800 seconds (7 days).\n";
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: 0;
                        readonly maximum: 2592000;
                    };
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
            };
            readonly required: readonly ["project_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["operations", "project"];
            readonly properties: {
                readonly project: {
                    readonly type: "object";
                    readonly required: readonly ["consumption_period_end", "consumption_period_start", "active_time_seconds", "compute_time_seconds", "written_data_bytes", "data_transfer_bytes", "data_storage_bytes_hour", "id", "platform_id", "region_id", "name", "pg_version", "proxy_host", "branch_logical_size_limit", "branch_logical_size_limit_bytes", "store_passwords", "cpu_used_sec", "provisioner", "creation_source", "history_retention_seconds", "created_at", "updated_at", "owner_id"];
                    readonly properties: {
                        readonly data_storage_bytes_hour: {
                            readonly description: "Bytes-Hour. Project consumed that much storage hourly during the billing period. The value has some lag.\nThe value is reset at the beginning of each billing period.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: 0;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly data_transfer_bytes: {
                            readonly description: "Bytes. Egress traffic from the Neon cloud to the client for given project over the billing period.\nIncludes deleted endpoints. The value has some lag. The value is reset at the beginning of each billing period.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: 0;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly written_data_bytes: {
                            readonly description: "Bytes. Amount of WAL that travelled through storage for given project across all branches.\nThe value has some lag. The value is reset at the beginning of each billing period.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: 0;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly compute_time_seconds: {
                            readonly description: "Seconds. The number of CPU seconds used by the project's compute endpoints, including compute endpoints that have been deleted.\nThe value has some lag. The value is reset at the beginning of each billing period.\nExamples:\n1. An endpoint that uses 1 CPU for 1 second is equal to `compute_time=1`.\n2. An endpoint that uses 2 CPUs simultaneously for 1 second is equal to `compute_time=2`.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: 0;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly active_time_seconds: {
                            readonly description: "Seconds. Control plane observed endpoints of this project being active this amount of wall-clock time.\nThe value has some lag.\nThe value is reset at the beginning of each billing period.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: 0;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly cpu_used_sec: {
                            readonly description: "DEPRECATED, use compute_time instead.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly deprecated: true;
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly id: {
                            readonly description: "The project ID\n";
                            readonly type: "string";
                            readonly examples: readonly ["spring-example-302709"];
                        };
                        readonly platform_id: {
                            readonly description: "The cloud platform identifier. Currently, only AWS is supported, for which the identifier is `aws`.\n";
                            readonly type: "string";
                            readonly examples: readonly ["aws"];
                        };
                        readonly region_id: {
                            readonly description: "The region identifier\n";
                            readonly type: "string";
                            readonly examples: readonly ["aws-us-east-2"];
                        };
                        readonly name: {
                            readonly description: "The project name\n";
                            readonly type: "string";
                            readonly examples: readonly ["spring-example-302709"];
                        };
                        readonly provisioner: {
                            readonly type: "string";
                            readonly description: "The Neon compute provisioner.\nSpecify the `k8s-neonvm` provisioner to create a compute endpoint that supports Autoscaling.\n\n\n`k8s-pod` `k8s-neonvm`";
                            readonly enum: readonly ["k8s-pod", "k8s-neonvm"];
                            readonly examples: readonly ["k8s-pod"];
                        };
                        readonly default_endpoint_settings: {
                            readonly type: "object";
                            readonly description: "A collection of settings for a Neon endpoint";
                            readonly additionalProperties: {
                                readonly type: "string";
                            };
                            readonly properties: {
                                readonly pg_settings: {
                                    readonly description: "A raw representation of Postgres settings";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                    };
                                };
                                readonly pgbouncer_settings: {
                                    readonly description: "A raw representation of PgBouncer settings";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                    };
                                };
                                readonly autoscaling_limit_min_cu: {
                                    readonly description: "The minimum number of Compute Units. The minimum value is `0.25`.\nSee [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\nfor more information.\n";
                                    readonly type: "number";
                                    readonly minimum: 0.25;
                                };
                                readonly autoscaling_limit_max_cu: {
                                    readonly description: "The maximum number of Compute Units. See [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\nfor more information.\n";
                                    readonly type: "number";
                                    readonly minimum: 0.25;
                                };
                                readonly suspend_timeout_seconds: {
                                    readonly description: "Duration of inactivity in seconds after which the compute endpoint is\nautomatically suspended. The value `0` means use the global default.\nThe value `-1` means never suspend. The default value is `300` seconds (5 minutes).\nThe minimum value is `60` seconds (1 minute).\nThe maximum value is `604800` seconds (1 week). For more information, see\n[Auto-suspend configuration](https://neon.tech/docs/manage/endpoints#auto-suspend-configuration).\n";
                                    readonly type: "integer";
                                    readonly format: "int64";
                                    readonly minimum: -1;
                                    readonly maximum: 604800;
                                };
                            };
                        };
                        readonly settings: {
                            readonly type: "object";
                            readonly properties: {
                                readonly quota: {
                                    readonly type: "object";
                                    readonly description: "Per-project consumption quota. If the quota is exceeded, all active computes\nare automatically suspended and it will not be possible to start them with\nan API method call or incoming proxy connections. The only exception is\n`logical_size_bytes`, which is applied on per-branch basis, i.e., only the\ncompute on the branch that exceeds the `logical_size` quota will be suspended.\n\nQuotas are enforced based on per-project consumption metrics with the same names,\nwhich are reset at the end of each billing period (the first day of the month).\nLogical size is also an exception in this case, as it represents the total size\nof data stored in a branch, so it is not reset.\n\nA zero or empty quota value means 'unlimited'.\n";
                                    readonly properties: {
                                        readonly active_time_seconds: {
                                            readonly description: "The total amount of wall-clock time allowed to be spent by the project's compute endpoints.\n";
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly compute_time_seconds: {
                                            readonly description: "The total amount of CPU seconds allowed to be spent by the project's compute endpoints.\n";
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly written_data_bytes: {
                                            readonly description: "Total amount of data written to all of a project's branches.\n";
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly data_transfer_bytes: {
                                            readonly description: "Total amount of data transferred from all of a project's branches using the proxy.\n";
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly logical_size_bytes: {
                                            readonly description: "Limit on the logical size of every project's branch.\n";
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly maximum: 9223372036854776000;
                                        };
                                    };
                                };
                                readonly allowed_ips: {
                                    readonly description: "A list of IP addresses that are allowed to connect to the compute endpoint.\nIf the list is empty or not set, all IP addresses are allowed.\nIf protected_branches_only is true, the list will be applied only to protected branches.\n";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly ips: {
                                            readonly description: "A list of IP addresses that are allowed to connect to the endpoint.";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                        readonly protected_branches_only: {
                                            readonly description: "If true, the list will be applied only to protected branches.";
                                            readonly type: "boolean";
                                        };
                                        readonly primary_branch_only: {
                                            readonly deprecated: true;
                                            readonly description: "DEPRECATED: Use `protected_branches_only`.\nIf true, the list will be applied only to the default branch.\n";
                                            readonly type: "boolean";
                                        };
                                    };
                                };
                                readonly enable_logical_replication: {
                                    readonly description: "Sets wal_level=logical for all compute endpoints in this project.\nAll active endpoints will be suspended.\nOnce enabled, logical replication cannot be disabled.\n";
                                    readonly type: "boolean";
                                };
                            };
                        };
                        readonly pg_version: {
                            readonly description: "The major Postgres version number. Currently supported versions are `14`, `15`, and `16`.";
                            readonly type: "integer";
                            readonly minimum: 14;
                            readonly maximum: 16;
                            readonly default: 16;
                            readonly examples: readonly [15];
                        };
                        readonly proxy_host: {
                            readonly description: "The proxy host for the project. This value combines the `region_id`, the `platform_id`, and the Neon domain (`neon.tech`).\n";
                            readonly type: "string";
                            readonly examples: readonly ["us-east-2.aws.neon.tech"];
                        };
                        readonly branch_logical_size_limit: {
                            readonly description: "The logical size limit for a branch. The value is in MiB.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly branch_logical_size_limit_bytes: {
                            readonly description: "The logical size limit for a branch. The value is in B.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly store_passwords: {
                            readonly description: "Whether or not passwords are stored for roles in the Neon project. Storing passwords facilitates access to Neon features that require authorization.\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly maintenance_starts_at: {
                            readonly description: "A timestamp indicating when project maintenance begins. If set, the project is placed into maintenance mode at this time.\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly creation_source: {
                            readonly description: "The project creation source\n";
                            readonly type: "string";
                            readonly examples: readonly ["console"];
                        };
                        readonly history_retention_seconds: {
                            readonly description: "The number of seconds to retain point-in-time restore (PITR) backup history for this project.\n";
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly examples: readonly [604800];
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the project was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-13T01:30:55Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the project was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-13T01:30:55Z"];
                        };
                        readonly synthetic_storage_size: {
                            readonly description: "The current space occupied by the project in storage, in bytes. Synthetic storage size combines the logical data size and Write-Ahead Log (WAL) size for all branches in a project.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly consumption_period_start: {
                            readonly description: "A date-time indicating when Neon Cloud started measuring consumption for current consumption period.\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly consumption_period_end: {
                            readonly description: "A date-time indicating when Neon Cloud plans to stop measuring consumption for current consumption period.\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly quota_reset_at: {
                            readonly deprecated: true;
                            readonly description: "DEPRECATED. Use `consumption_period_end` from the getProject endpoint instead.\nA timestamp indicating when the project quota resets.\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly owner_id: {
                            readonly type: "string";
                        };
                        readonly owner: {
                            readonly type: "object";
                            readonly required: readonly ["email", "branches_limit", "subscription_type"];
                            readonly properties: {
                                readonly email: {
                                    readonly type: "string";
                                    readonly examples: readonly ["some@email.com"];
                                };
                                readonly branches_limit: {
                                    readonly type: "integer";
                                    readonly examples: readonly [10];
                                };
                                readonly subscription_type: {
                                    readonly type: "string";
                                    readonly description: "Type of subscription to Neon Cloud.\nNotice that for users without billing account this will be \"UNKNOWN\"\n\n\n`UNKNOWN` `direct_sales` `aws_marketplace` `free_v2` `launch` `scale`";
                                    readonly enum: readonly ["UNKNOWN", "direct_sales", "aws_marketplace", "free_v2", "launch", "scale"];
                                    readonly examples: readonly ["scale"];
                                };
                            };
                        };
                        readonly compute_last_active_at: {
                            readonly description: "The most recent time when any endpoint of this project was active.\n\nOmitted when observed no actitivy for endpoints of this project.\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly org_id: {
                            readonly type: "string";
                            readonly examples: readonly ["org-morning-bread-81040908"];
                        };
                    };
                };
                readonly operations: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "project_id", "action", "status", "failures_count", "created_at", "updated_at", "total_duration_ms"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The operation ID";
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly examples: readonly ["spring-example-302709"];
                            };
                            readonly project_id: {
                                readonly description: "The Neon project ID";
                                readonly type: "string";
                            };
                            readonly branch_id: {
                                readonly description: "The branch ID";
                                readonly type: "string";
                            };
                            readonly endpoint_id: {
                                readonly description: "The endpoint ID";
                                readonly type: "string";
                            };
                            readonly action: {
                                readonly description: "The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_ignore` `tenant_attach` `tenant_detach` `tenant_reattach` `replace_safekeeper` `disable_maintenance` `apply_storage_config` `prepare_secondary_pageserver` `switch_pageserver`";
                                readonly type: "string";
                                readonly enum: readonly ["create_compute", "create_timeline", "start_compute", "suspend_compute", "apply_config", "check_availability", "delete_timeline", "create_branch", "tenant_ignore", "tenant_attach", "tenant_detach", "tenant_reattach", "replace_safekeeper", "disable_maintenance", "apply_storage_config", "prepare_secondary_pageserver", "switch_pageserver"];
                            };
                            readonly status: {
                                readonly description: "The status of the operation\n\n`scheduling` `running` `finished` `failed` `error` `cancelling` `cancelled` `skipped`";
                                readonly type: "string";
                                readonly enum: readonly ["scheduling", "running", "finished", "failed", "error", "cancelling", "cancelled", "skipped"];
                            };
                            readonly error: {
                                readonly description: "The error that occured";
                                readonly type: "string";
                            };
                            readonly failures_count: {
                                readonly description: "The number of times the operation failed";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly retry_at: {
                                readonly description: "A timestamp indicating when the operation was last retried";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the operation was created";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-13T01:30:55Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the operation status was last updated";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-13T01:30:55Z"];
                            };
                            readonly total_duration_ms: {
                                readonly description: "The total duration of the operation in milliseconds";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const UpdateProjectBranch: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["branch"];
        readonly properties: {
            readonly branch: {
                readonly type: "object";
                readonly properties: {
                    readonly name: {
                        readonly type: "string";
                        readonly examples: readonly ["mybranch"];
                    };
                    readonly protected: {
                        readonly type: "boolean";
                    };
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly branch_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The branch ID";
                };
            };
            readonly required: readonly ["project_id", "branch_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["branch", "operations"];
            readonly properties: {
                readonly branch: {
                    readonly type: "object";
                    readonly required: readonly ["id", "project_id", "name", "current_state", "creation_source", "created_at", "updated_at", "primary", "default", "protected", "cpu_used_sec", "active_time_seconds", "compute_time_seconds", "written_data_bytes", "data_transfer_bytes"];
                    readonly properties: {
                        readonly id: {
                            readonly description: "The branch ID. This value is generated when a branch is created. A `branch_id` value has a `br` prefix. For example: `br-small-term-683261`.\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-wispy-meadow-118737"];
                        };
                        readonly project_id: {
                            readonly description: "The ID of the project to which the branch belongs\n";
                            readonly type: "string";
                            readonly examples: readonly ["spring-example-302709"];
                        };
                        readonly parent_id: {
                            readonly description: "The `branch_id` of the parent branch\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-aged-salad-637688"];
                        };
                        readonly parent_lsn: {
                            readonly description: "The Log Sequence Number (LSN) on the parent branch from which this branch was created\n";
                            readonly type: "string";
                            readonly examples: readonly ["0/1DE2850"];
                        };
                        readonly parent_timestamp: {
                            readonly description: "The point in time on the parent branch from which this branch was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly name: {
                            readonly description: "The branch name\n";
                            readonly type: "string";
                            readonly examples: readonly ["dev2"];
                        };
                        readonly current_state: {
                            readonly description: "The branch state\n\n`init` `ready`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "ready"];
                            readonly examples: readonly ["ready"];
                        };
                        readonly pending_state: {
                            readonly description: "The branch state\n\n`init` `ready`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "ready"];
                        };
                        readonly logical_size: {
                            readonly description: "The logical size of the branch, in bytes\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly creation_source: {
                            readonly description: "The branch creation source\n";
                            readonly type: "string";
                            readonly examples: readonly ["console"];
                        };
                        readonly primary: {
                            readonly deprecated: true;
                            readonly description: "DEPRECATED. Use `default` field.\nWhether the branch is the project's primary branch\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly default: {
                            readonly description: "Whether the branch is the project's default branch\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly protected: {
                            readonly description: "Whether the branch is protected\n";
                            readonly type: "boolean";
                        };
                        readonly cpu_used_sec: {
                            readonly deprecated: true;
                            readonly description: "CPU seconds used by all of the branch's compute endpoints, including deleted ones.\nThis value is reset at the beginning of each billing period.\nExamples:\n1. A branch that uses 1 CPU for 1 second is equal to `cpu_used_sec=1`.\n2. A branch that uses 2 CPUs simultaneously for 1 second is equal to `cpu_used_sec=2`.\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly compute_time_seconds: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly active_time_seconds: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly written_data_bytes: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly data_transfer_bytes: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the branch was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-30T19:09:48Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the branch was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-01T19:53:05Z"];
                        };
                        readonly last_reset_at: {
                            readonly description: "A timestamp indicating when the branch was last reset\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                    };
                };
                readonly operations: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "project_id", "action", "status", "failures_count", "created_at", "updated_at", "total_duration_ms"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The operation ID";
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly project_id: {
                                readonly description: "The Neon project ID";
                                readonly type: "string";
                                readonly examples: readonly ["spring-example-302709"];
                            };
                            readonly branch_id: {
                                readonly description: "The branch ID";
                                readonly type: "string";
                            };
                            readonly endpoint_id: {
                                readonly description: "The endpoint ID";
                                readonly type: "string";
                            };
                            readonly action: {
                                readonly description: "The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_ignore` `tenant_attach` `tenant_detach` `tenant_reattach` `replace_safekeeper` `disable_maintenance` `apply_storage_config` `prepare_secondary_pageserver` `switch_pageserver`";
                                readonly type: "string";
                                readonly enum: readonly ["create_compute", "create_timeline", "start_compute", "suspend_compute", "apply_config", "check_availability", "delete_timeline", "create_branch", "tenant_ignore", "tenant_attach", "tenant_detach", "tenant_reattach", "replace_safekeeper", "disable_maintenance", "apply_storage_config", "prepare_secondary_pageserver", "switch_pageserver"];
                            };
                            readonly status: {
                                readonly description: "The status of the operation\n\n`scheduling` `running` `finished` `failed` `error` `cancelling` `cancelled` `skipped`";
                                readonly type: "string";
                                readonly enum: readonly ["scheduling", "running", "finished", "failed", "error", "cancelling", "cancelled", "skipped"];
                            };
                            readonly error: {
                                readonly description: "The error that occured";
                                readonly type: "string";
                            };
                            readonly failures_count: {
                                readonly description: "The number of times the operation failed";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly retry_at: {
                                readonly description: "A timestamp indicating when the operation was last retried";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the operation was created";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-30T19:09:48Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the operation status was last updated";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-01T19:53:05Z"];
                            };
                            readonly total_duration_ms: {
                                readonly description: "The total duration of the operation in milliseconds";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const UpdateProjectBranchDatabase: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["database"];
        readonly properties: {
            readonly database: {
                readonly type: "object";
                readonly properties: {
                    readonly name: {
                        readonly description: "The name of the database\n";
                        readonly type: "string";
                        readonly examples: readonly ["mydb"];
                    };
                    readonly owner_name: {
                        readonly description: "The name of the role that owns the database\n";
                        readonly type: "string";
                        readonly examples: readonly ["sally"];
                    };
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly branch_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The branch ID";
                };
                readonly database_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The database name";
                };
            };
            readonly required: readonly ["project_id", "branch_id", "database_name"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["database", "operations"];
            readonly properties: {
                readonly database: {
                    readonly type: "object";
                    readonly required: readonly ["id", "branch_id", "name", "owner_name", "created_at", "updated_at"];
                    readonly properties: {
                        readonly id: {
                            readonly description: "The database ID\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly examples: readonly [834686];
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly branch_id: {
                            readonly description: "The ID of the branch to which the database belongs\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-wispy-meadow-118737"];
                        };
                        readonly name: {
                            readonly description: "The database name\n";
                            readonly type: "string";
                            readonly examples: readonly ["neondb"];
                        };
                        readonly owner_name: {
                            readonly description: "The name of role that owns the database\n";
                            readonly type: "string";
                            readonly examples: readonly ["casey"];
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the database was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-30T18:25:15Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the database was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-11-30T18:25:15Z"];
                        };
                    };
                };
                readonly operations: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "project_id", "action", "status", "failures_count", "created_at", "updated_at", "total_duration_ms"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The operation ID";
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly examples: readonly [834686];
                            };
                            readonly project_id: {
                                readonly description: "The Neon project ID";
                                readonly type: "string";
                            };
                            readonly branch_id: {
                                readonly description: "The branch ID";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly endpoint_id: {
                                readonly description: "The endpoint ID";
                                readonly type: "string";
                            };
                            readonly action: {
                                readonly description: "The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_ignore` `tenant_attach` `tenant_detach` `tenant_reattach` `replace_safekeeper` `disable_maintenance` `apply_storage_config` `prepare_secondary_pageserver` `switch_pageserver`";
                                readonly type: "string";
                                readonly enum: readonly ["create_compute", "create_timeline", "start_compute", "suspend_compute", "apply_config", "check_availability", "delete_timeline", "create_branch", "tenant_ignore", "tenant_attach", "tenant_detach", "tenant_reattach", "replace_safekeeper", "disable_maintenance", "apply_storage_config", "prepare_secondary_pageserver", "switch_pageserver"];
                            };
                            readonly status: {
                                readonly description: "The status of the operation\n\n`scheduling` `running` `finished` `failed` `error` `cancelling` `cancelled` `skipped`";
                                readonly type: "string";
                                readonly enum: readonly ["scheduling", "running", "finished", "failed", "error", "cancelling", "cancelled", "skipped"];
                            };
                            readonly error: {
                                readonly description: "The error that occured";
                                readonly type: "string";
                            };
                            readonly failures_count: {
                                readonly description: "The number of times the operation failed";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly retry_at: {
                                readonly description: "A timestamp indicating when the operation was last retried";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the operation was created";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-30T18:25:15Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the operation status was last updated";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-11-30T18:25:15Z"];
                            };
                            readonly total_duration_ms: {
                                readonly description: "The total duration of the operation in milliseconds";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const UpdateProjectEndpoint: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["endpoint"];
        readonly properties: {
            readonly endpoint: {
                readonly type: "object";
                readonly properties: {
                    readonly branch_id: {
                        readonly description: "The destination branch ID. The destination branch must not have an exsiting read-write endpoint.\n";
                        readonly type: "string";
                        readonly examples: readonly ["br-tiny-grass-283160"];
                    };
                    readonly autoscaling_limit_min_cu: {
                        readonly description: "The minimum number of Compute Units. The minimum value is `0.25`.\nSee [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\nfor more information.\n";
                        readonly type: "number";
                        readonly minimum: 0.25;
                    };
                    readonly autoscaling_limit_max_cu: {
                        readonly description: "The maximum number of Compute Units.\nSee [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration)\nfor more information.\n";
                        readonly type: "number";
                        readonly minimum: 0.25;
                    };
                    readonly provisioner: {
                        readonly type: "string";
                        readonly description: "The Neon compute provisioner.\nSpecify the `k8s-neonvm` provisioner to create a compute endpoint that supports Autoscaling.\n";
                        readonly enum: readonly ["k8s-pod", "k8s-neonvm"];
                    };
                    readonly settings: {
                        readonly type: "object";
                        readonly description: "A collection of settings for a compute endpoint";
                        readonly properties: {
                            readonly pg_settings: {
                                readonly description: "A raw representation of Postgres settings";
                                readonly type: "object";
                                readonly additionalProperties: {
                                    readonly type: "string";
                                };
                            };
                            readonly pgbouncer_settings: {
                                readonly description: "A raw representation of PgBouncer settings";
                                readonly type: "object";
                                readonly additionalProperties: {
                                    readonly type: "string";
                                };
                            };
                        };
                    };
                    readonly pooler_enabled: {
                        readonly deprecated: true;
                        readonly description: "Whether to enable connection pooling for the compute endpoint\n";
                        readonly type: "boolean";
                    };
                    readonly pooler_mode: {
                        readonly description: "The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n";
                        readonly type: "string";
                        readonly enum: readonly ["transaction"];
                    };
                    readonly disabled: {
                        readonly description: "Whether to restrict connections to the compute endpoint.\nEnabling this option schedules a suspend compute operation.\nA disabled compute endpoint cannot be enabled by a connection or\nconsole action. However, the compute endpoint is periodically\nenabled by check_availability operations.\n";
                        readonly type: "boolean";
                    };
                    readonly passwordless_access: {
                        readonly description: "NOT YET IMPLEMENTED. Whether to permit passwordless access to the compute endpoint.\n";
                        readonly type: "boolean";
                    };
                    readonly suspend_timeout_seconds: {
                        readonly description: "Duration of inactivity in seconds after which the compute endpoint is\nautomatically suspended. The value `0` means use the global default.\nThe value `-1` means never suspend. The default value is `300` seconds (5 minutes).\nThe minimum value is `60` seconds (1 minute).\nThe maximum value is `604800` seconds (1 week). For more information, see\n[Auto-suspend configuration](https://neon.tech/docs/manage/endpoints#auto-suspend-configuration).\n";
                        readonly type: "integer";
                        readonly format: "int64";
                        readonly minimum: -1;
                        readonly maximum: 604800;
                    };
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Neon project ID";
                };
                readonly endpoint_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The endpoint ID";
                };
            };
            readonly required: readonly ["project_id", "endpoint_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["endpoint", "operations"];
            readonly properties: {
                readonly endpoint: {
                    readonly type: "object";
                    readonly required: readonly ["host", "id", "project_id", "branch_id", "region_id", "autoscaling_limit_max_cu", "autoscaling_limit_min_cu", "type", "current_state", "pooler_enabled", "pooler_mode", "disabled", "passwordless_access", "creation_source", "created_at", "updated_at", "settings", "proxy_host", "suspend_timeout_seconds", "provisioner"];
                    readonly properties: {
                        readonly host: {
                            readonly description: "The hostname of the compute endpoint. This is the hostname specified when connecting to a Neon database.\n";
                            readonly type: "string";
                            readonly examples: readonly ["ep-silent-smoke-806639.us-east-2.aws.neon.tech"];
                        };
                        readonly id: {
                            readonly description: "The compute endpoint ID. Compute endpoint IDs have an `ep-` prefix. For example: `ep-little-smoke-851426`\n";
                            readonly type: "string";
                            readonly examples: readonly ["ep-silent-smoke-806639"];
                        };
                        readonly project_id: {
                            readonly description: "The ID of the project to which the compute endpoint belongs\n";
                            readonly type: "string";
                            readonly examples: readonly ["spring-example-302709"];
                        };
                        readonly branch_id: {
                            readonly description: "The ID of the branch that the compute endpoint is associated with\n";
                            readonly type: "string";
                            readonly examples: readonly ["br-wispy-meadow-118737"];
                        };
                        readonly autoscaling_limit_min_cu: {
                            readonly description: "The minimum number of Compute Units\n";
                            readonly type: "number";
                            readonly minimum: 0.25;
                            readonly examples: readonly [1];
                        };
                        readonly autoscaling_limit_max_cu: {
                            readonly description: "The maximum number of Compute Units\n";
                            readonly type: "number";
                            readonly minimum: 0.25;
                            readonly examples: readonly [1];
                        };
                        readonly region_id: {
                            readonly type: "string";
                            readonly description: "The region identifier\n";
                            readonly examples: readonly ["aws-us-east-2"];
                        };
                        readonly type: {
                            readonly description: "The compute endpoint type. Either `read_write` or `read_only`.\n\n\n`read_only` `read_write`";
                            readonly type: "string";
                            readonly enum: readonly ["read_only", "read_write"];
                            readonly examples: readonly ["read_write"];
                        };
                        readonly current_state: {
                            readonly description: "The state of the compute endpoint\n\n\n`init` `active` `idle`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "active", "idle"];
                            readonly examples: readonly ["init"];
                        };
                        readonly pending_state: {
                            readonly description: "The state of the compute endpoint\n\n\n`init` `active` `idle`";
                            readonly type: "string";
                            readonly enum: readonly ["init", "active", "idle"];
                            readonly examples: readonly ["active"];
                        };
                        readonly settings: {
                            readonly type: "object";
                            readonly description: "A collection of settings for a compute endpoint";
                            readonly properties: {
                                readonly pg_settings: {
                                    readonly description: "A raw representation of Postgres settings";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                    };
                                };
                                readonly pgbouncer_settings: {
                                    readonly description: "A raw representation of PgBouncer settings";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                    };
                                };
                            };
                        };
                        readonly pooler_enabled: {
                            readonly description: "Whether connection pooling is enabled for the compute endpoint\n";
                            readonly type: "boolean";
                        };
                        readonly pooler_mode: {
                            readonly description: "The connection pooler mode. Neon supports PgBouncer in `transaction` mode only.\n\n\n`transaction`";
                            readonly type: "string";
                            readonly enum: readonly ["transaction"];
                            readonly examples: readonly ["transaction"];
                        };
                        readonly disabled: {
                            readonly description: "Whether to restrict connections to the compute endpoint.\nEnabling this option schedules a suspend compute operation.\nA disabled compute endpoint cannot be enabled by a connection or\nconsole action. However, the compute endpoint is periodically\nenabled by check_availability operations.\n";
                            readonly type: "boolean";
                        };
                        readonly passwordless_access: {
                            readonly description: "Whether to permit passwordless access to the compute endpoint\n";
                            readonly type: "boolean";
                            readonly examples: readonly [true];
                        };
                        readonly last_active: {
                            readonly description: "A timestamp indicating when the compute endpoint was last active\n";
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly creation_source: {
                            readonly description: "The compute endpoint creation source\n";
                            readonly type: "string";
                            readonly examples: readonly ["console"];
                        };
                        readonly created_at: {
                            readonly description: "A timestamp indicating when the compute endpoint was created\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-03T15:37:07Z"];
                        };
                        readonly updated_at: {
                            readonly description: "A timestamp indicating when the compute endpoint was last updated\n";
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2022-12-03T15:37:07Z"];
                        };
                        readonly proxy_host: {
                            readonly description: "DEPRECATED. Use the \"host\" property instead.\n";
                            readonly type: "string";
                            readonly examples: readonly ["us-east-2.aws.neon.tech"];
                        };
                        readonly suspend_timeout_seconds: {
                            readonly description: "Duration of inactivity in seconds after which the compute endpoint is\nautomatically suspended. The value `0` means use the global default.\nThe value `-1` means never suspend. The default value is `300` seconds (5 minutes).\nThe minimum value is `60` seconds (1 minute).\nThe maximum value is `604800` seconds (1 week). For more information, see\n[Auto-suspend configuration](https://neon.tech/docs/manage/endpoints#auto-suspend-configuration).\n";
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -1;
                            readonly maximum: 604800;
                        };
                        readonly provisioner: {
                            readonly type: "string";
                            readonly description: "The Neon compute provisioner.\nSpecify the `k8s-neonvm` provisioner to create a compute endpoint that supports Autoscaling.\n\n\n`k8s-pod` `k8s-neonvm`";
                            readonly enum: readonly ["k8s-pod", "k8s-neonvm"];
                        };
                        readonly compute_release_version: {
                            readonly description: "Attached compute's release version number.\n";
                            readonly type: "string";
                        };
                    };
                };
                readonly operations: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "project_id", "action", "status", "failures_count", "created_at", "updated_at", "total_duration_ms"];
                        readonly properties: {
                            readonly id: {
                                readonly description: "The operation ID";
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly examples: readonly ["ep-silent-smoke-806639"];
                            };
                            readonly project_id: {
                                readonly description: "The Neon project ID";
                                readonly type: "string";
                                readonly examples: readonly ["spring-example-302709"];
                            };
                            readonly branch_id: {
                                readonly description: "The branch ID";
                                readonly type: "string";
                                readonly examples: readonly ["br-wispy-meadow-118737"];
                            };
                            readonly endpoint_id: {
                                readonly description: "The endpoint ID";
                                readonly type: "string";
                            };
                            readonly action: {
                                readonly description: "The action performed by the operation\n\n`create_compute` `create_timeline` `start_compute` `suspend_compute` `apply_config` `check_availability` `delete_timeline` `create_branch` `tenant_ignore` `tenant_attach` `tenant_detach` `tenant_reattach` `replace_safekeeper` `disable_maintenance` `apply_storage_config` `prepare_secondary_pageserver` `switch_pageserver`";
                                readonly type: "string";
                                readonly enum: readonly ["create_compute", "create_timeline", "start_compute", "suspend_compute", "apply_config", "check_availability", "delete_timeline", "create_branch", "tenant_ignore", "tenant_attach", "tenant_detach", "tenant_reattach", "replace_safekeeper", "disable_maintenance", "apply_storage_config", "prepare_secondary_pageserver", "switch_pageserver"];
                            };
                            readonly status: {
                                readonly description: "The status of the operation\n\n`scheduling` `running` `finished` `failed` `error` `cancelling` `cancelled` `skipped`";
                                readonly type: "string";
                                readonly enum: readonly ["scheduling", "running", "finished", "failed", "error", "cancelling", "cancelled", "skipped"];
                            };
                            readonly error: {
                                readonly description: "The error that occured";
                                readonly type: "string";
                            };
                            readonly failures_count: {
                                readonly description: "The number of times the operation failed";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly retry_at: {
                                readonly description: "A timestamp indicating when the operation was last retried";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly created_at: {
                                readonly description: "A timestamp indicating when the operation was created";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-03T15:37:07Z"];
                            };
                            readonly updated_at: {
                                readonly description: "A timestamp indicating when the operation status was last updated";
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-12-03T15:37:07Z"];
                            };
                            readonly total_duration_ms: {
                                readonly description: "The total duration of the operation in milliseconds";
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly description: "General Error";
            readonly required: readonly ["message", "code"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
                readonly message: {
                    readonly description: "Error message";
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { AddProjectJwks, CreateApiKey, CreateProject, CreateProjectBranch, CreateProjectBranchDatabase, CreateProjectBranchRole, CreateProjectEndpoint, DeleteProject, DeleteProjectBranch, DeleteProjectBranchDatabase, DeleteProjectBranchRole, DeleteProjectEndpoint, DeleteProjectJwks, GetConnectionUri, GetConsumptionHistoryPerAccount, GetConsumptionHistoryPerProject, GetCurrentUserInfo, GetCurrentUserOrganizations, GetProject, GetProjectBranch, GetProjectBranchDatabase, GetProjectBranchRole, GetProjectBranchRolePassword, GetProjectBranchSchema, GetProjectEndpoint, GetProjectJwks, GetProjectOperation, GrantPermissionToProject, ListApiKeys, ListProjectBranchDatabases, ListProjectBranchEndpoints, ListProjectBranchRoles, ListProjectBranches, ListProjectEndpoints, ListProjectOperations, ListProjectPermissions, ListProjects, ListProjectsConsumption, ListSharedProjects, ResetProjectBranchRolePassword, RestartProjectEndpoint, RestoreProjectBranch, RevokeApiKey, RevokePermissionFromProject, SetDefaultProjectBranch, SetPrimaryProjectBranch, StartProjectEndpoint, SuspendProjectEndpoint, UpdateProject, UpdateProjectBranch, UpdateProjectBranchDatabase, UpdateProjectEndpoint };
