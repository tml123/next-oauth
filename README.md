# Authentication Example with Next.js and Microsoft Office 365 OAuth

## How to use

[Clone the repo](https://github.com/tml123/next-oauth):

```bash
cd next-oauth
```

Install it and run:

```bash
npm install
```

After you've installed it, you'll have to [register an app](https://apps.dev.microsoft.com/) and add a .env file with the following:

```bash
APP_ID=SOME ID HERE
APP_PASSWORD=SOME PASSWORD HERE
APP_SCOPES=THE SCOPES YOU WANT TO INCLUDE e.g. openid profile User.Read Mail.Read Mail.Send
REDIRECT_URI=URI HERE e.g. http://localhost:3000/authorize
TOKEN_HOST=https://login.microsoft.com
AUTHORIZE_PATH=common/oauth2/authorize
TOKEN_PATH=common/oauth2/token
SECRET_KEY=SuperSecretKey
```

```bash
npm run dev
```

## What this demonstrates

This example integrates a custom Express.js server with Next.js and provides a simple example of how one might perform OAuth.  The example draws from several Next.js threads and examples such as [custom-server-express](https://github.com/zeit/next.js/tree/canary/examples/custom-server-express), [with-firebase-authentication](https://github.com/zeit/next.js/tree/canary/examples/with-firebase-authentication), [How to protect routes?](https://github.com/iaincollins/nextjs-starter/issues/12).  Additionally, this example utilizes the [Node.js OAuth with Microsoft 365 Tutorial](https://docs.microsoft.com/en-us/outlook/rest/node-tutorial).

The example shows a VERY simple button when the user navigates to [http://localhost:3000](http://localhost:3000).  The link will redirect the user to the Outlook sign-in page and then redirect back to the app after a successful login.  This assumes that the user has an Office 365 account able to be validated.

Again, this is a simple example.  There are plenty of things that could better, but it at least gives the general idea of how to do the OAuth.  If anyone has suggestions for making it better, please share!