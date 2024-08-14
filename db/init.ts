import { Account, Client, Databases } from "appwrite";
// Init your Web SDK
const AppwriteClient = new Client();

const EndPoint:string = process.env.APPWRITE_API!;
const ProjectId:string = process.env.APPWRITE_PROJECT_ID!;

AppwriteClient
    .setEndpoint(EndPoint) // Your Appwrite Endpoint
    .setProject(ProjectId) // Your project ID
;
const AppwriteDB = new Databases(AppwriteClient);
const AppwriteUser = new Account(AppwriteClient);

export { AppwriteDB, AppwriteClient, AppwriteUser };