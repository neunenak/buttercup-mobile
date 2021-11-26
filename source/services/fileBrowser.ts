import { AuthType, createClient as createWebDAVClient } from "webdav";
import { createClient as createDropboxClient } from "@buttercup/dropbox-client";
import { createClient as createGoogleDriveClient } from "@buttercup/googledrive-client";
import { DropboxInterface, FileSystemInterface, GoogleDriveInterface, WebDAVInterface } from "@buttercup/file-interface";
import { LocalFileSystemInterface } from "../library/datasource/LocalFileInterface";

let __interface: FileSystemInterface = null;

export function disableCurrentInterface() {
    __interface = null;
}

export function getCurrentInterface(): FileSystemInterface {
    return __interface;
}

export async function prepareDropboxInterface(token: string): Promise<void> {
    const dropboxClient = createDropboxClient(token);
    __interface = new DropboxInterface({
        dropboxClient
    });
}

export async function prepareGoogleDriveInterface(token: string): Promise<void> {
    const googleDriveClient = createGoogleDriveClient(token);
    __interface = new GoogleDriveInterface({
        googleDriveClient
    });
}

export async function prepareLocalFileInterface(): Promise<void> {
    __interface = new LocalFileSystemInterface({});
}

export async function prepareWebDAVInterface(
    url: string,
    username: string,
    password: string
): Promise<void> {
    const webdavClient = createWebDAVClient(url, {
        authType: AuthType.Password,
        username,
        password
    });
    __interface = new WebDAVInterface({
        webdavClient
    });
}
