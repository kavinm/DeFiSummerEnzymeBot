"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gql = void 0;
const graphql_request_1 = require("graphql-request");
const subgraph_1 = require("./subgraph");
function gql(endpoint) {
    return subgraph_1.getSdk(new graphql_request_1.GraphQLClient(endpoint));
}
exports.gql = gql;
