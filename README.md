# Atlas Backend API
This repository contains the Template for Micro Services, including database configuration for `Atlas` stack.


## Getting started
###### Navigate to your work directory and clone the project into <project-name> folder
```
$ git clone https://github.com/AtlasCardDev/nodejs-template.git <project-name>
```

###### Navigate to the new folder 
```
~$ cd <project-name>
```

###### Add a new remote origin pointing to the new project repo 
```
~/project-name$ git remote add origin https://github.com/AtlasCardDev/<project-name>.git
```

###### Install [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started):
```
$ sudo npm install -g gulp
```

###### Navigate to new project directory, then run `sudo npm install` to install Node packages
```
~/project-name $ sudo npm install
```

###### Run `gulp` to start project server
```
~/project-name $ gulp serve
```

###### (Or, `gulp help` to see more task options)
```
~/project-name $ gulp help
```

###### Install [Docker](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/) and configure Dockerfile in the project


## Migration

**Note:**
 - Before running migrations, remove `"rds": {"ENV": "DATABASE_URL"}` from the `database.json` file

###### Install `db-migrate` globally:
```
$ sudo npm install -g db-migrate
```

###### To create migration, Run `db-migrate create <migration_name>`
```
~/project-name $ db-migrate create <migration_name>
```

###### Run `db-migrate up` to create/modify table
```
~/project-name $ db-migrate up
```

###### Run `db-migrate down` to drop table
```
~/project-name $ db-migrate down
```

###### Run `db-migrate` with option `-e` or `--env` to select the environment you want to run migrations against.
This will run all migrations that haven't yet been run in the `prod` environment, grabbing the settings from `./database.json`.

```
~/project-name $ db-migrate up --env prod
```


#### Note
When first running the migrations, all will be executed in sequence.
```
~/project-name $ db-migrate up
  [received data: ALTER TABLE atlas_users ADD _id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc()]
  [INFO] Processed migration 20150928164303-add-user-column-id
  [INFO] Processed migration 20151028112301-create-table-for-pairing-nonagent-and-agent
  [INFO] Done
```

Subsequent attempts to run these migrations will result in the following output

```
~/project-name $ db-migrate up
  [INFO] No migrations to run
  [INFO] Done
```


## Test

###### Run `gulp test`:
```
~/folder-name $ gulp test
```

## Developers Guide

A Developer Guides for getting things done, programming well, and in style.

##### High Level Guidelines:

- Be consistent.
- Don't rewrite existing code to follow guides unless otherwise stated.
- Don't violate a guideline without a good reason.
- A reason is good when you can convince a teammate.


#### Below are links to `thoughbot` Developer Guide

### Best Practices
- [Best Practices](https://github.com/thoughtbot/guides/tree/master/best-practices)

### Style
- [Style](https://github.com/thoughtbot/guides/tree/master/style)
- [Javascript](https://github.com/thoughtbot/guides/tree/master/style/javascript)
- [Testing](https://github.com/thoughtbot/guides/tree/master/style/testing)
- [Git](https://github.com/thoughtbot/guides/tree/master/style/git)
- [Shell](https://github.com/thoughtbot/guides/tree/master/style/shell)

### Code Review

- [Code Review](https://github.com/thoughtbot/guides/tree/master/code-review)
- [Git](https://github.com/thoughtbot/guides/tree/master/protocol/git)

------------------------------------------


Copyright
=========

Copyright (c) 2017 Atlas Card Holdings
