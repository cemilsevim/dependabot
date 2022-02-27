import { Client } from "../git_clients/Client";

export type GitClientNames = 'github';
export interface FileContent {
    name: string;
    path: string;
    content: string;
    size: number;
}

export interface FetchedFileContents {
    client: Client;
    fileContents: FileContent[];
};