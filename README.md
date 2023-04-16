# MaO Core

This is the core MaO server which manages and monitors the machines.

## Developer setup

If you are contributing to the MaO core server itself, read this description.

To initialize a development server, use `pnpm dev`.

## Database

> **INFO** It is recommended to use a database which only stores data for MaO.
> Also, please ensure that the MongoDB instance allows connections through IPv6.

MaO uses MongoDB for:

- authentication
- server details

For authentication, a collection `mao-auth` is stored on the database.
For server details, a collection `mao-serv` is stored on the database.

## Env setup

Create an `.env` file at the root of this project and fill in:

```shell
# ------------------------------
# The MongoDB database name.
# ------------------------------
MONGODB_DB="mao"

# ------------------------------
# The MongoDB URI.
# ------------------------------
MONGODB_URI="mongodb://..."

# ------------------------------
# The authentication secret.
# Can be a secure random value.
# ------------------------------
AUTH_SECRET=...

# ------------------------------
# Whether to trust host.
# ------------------------------
AUTH_TRUST_HOST=true
```
